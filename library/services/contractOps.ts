import {
  Address,
  createPublicClient,
  createWalletClient,
  custom,
  http,
} from "viem";
import { sepolia } from "viem/chains";

import AlloContract from "../contract/Allo";
import DVMDDContract from "../contract/DVMDD";

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

const hasWindow = typeof window !== "undefined";

const walletClient = async () => {
  const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(hasWindow ? (window as any).ethereum : null),
  });

  const chainId = await (window as any).ethereum.request({
    method: "eth_chainId",
  });

  if (walletClient.chain.id !== parseInt(chainId, 16)) {
    await walletClient.switchChain({ id: sepolia.id });
  }

  return walletClient;
};

export const deployDVMDD = async ({
  callback,
}: {
  name: string;
  symbol: string;
  maxSupply: bigint;
  callback: (
    txHash: { [key: string]: Address },
    contractAddress: Address
  ) => void;
}) => {
  const wallet = await walletClient();
  const [account] = await wallet.getAddresses();

  const txHash = await wallet.deployContract({
    ...DVMDDContract,
    account,
    args: [
      (process.env.NEXT_PUBLIC_ALLO_CONTRACT_ADDRESS as Address) || "0x",
      "DonationVotingMerkleDistributionDrip",
    ],
    gas: BigInt(5_000_000),
  });

  const receipt = await publicClient.waitForTransactionReceipt({
    hash: txHash,
  });

  callback({ "Strategy creation hash": txHash }, receipt.contractAddress!);
};

export const setupAllo = async ({
  strategy,
  tokenAmount,
  callback,
  poolProfileId,
  poolManagers,
}: {
  strategy: Address;
  tokenAmount: number;
  callback: (txHash: { [key: string]: Address }) => void;
  poolProfileId?: string;
  poolManagers: `0x${string}`[];
}) => {
  const wallet = await walletClient();
  const [account] = await wallet.getAddresses();

  // TODO: create a pool profile id

  // TODO: approve allo && strategy to use your DEKAN

  // create funding pool
  const { request: req1 } = await publicClient.simulateContract({
    ...AlloContract,
    functionName: "createPoolWithCustomStrategy",
    args: [
      "0x", // TODO:
      strategy,
      "0x_ABI_ENCODE_STRATEGY_ARGS", // TODO:
      (process.env.NEXT_PUBLIC_DEKAN_CONTRACT_ADDRESS as Address) || "0x",
      BigInt(tokenAmount),
      { protocol: BigInt(1), pointer: "" },
      poolManagers,
    ],
    account,
  });

  // renounce admin role
  const { request: req2 } = await publicClient.simulateContract({
    ...AlloContract,
    functionName: "revokeRole",
    args: [],
    account,
  });

  const req1TxHash = await wallet.writeContract(req1);
  const req2TxHash = await wallet.writeContract(req2);

  callback({
    "Strategy creation hash": req1TxHash,
  });
};
