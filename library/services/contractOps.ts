import {
  Address,
  createPublicClient,
  createWalletClient,
  custom,
  http,
} from "viem";
import { sepolia } from "viem/chains";

import AlloContract from "../contracts/Allo";
import DVMDDContract from "../contracts/DVMDD";
import DekanContract from "../contracts/Dekan";
import RegistryContract from "../contracts/Registry";

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

  // Create a pool profile id
  const { request: req1, result: poolId } = await publicClient.simulateContract(
    {
      ...RegistryContract,
      functionName: "createProfile",
      args: [
        BigInt(0),
        "Pool Profile",
        { protocol: BigInt(1), pointer: "Profile1" },
        account,
        [],
      ],
      account,
    }
  );

  // Approve Allo on DEKAN
  const { request: req2 } = await publicClient.simulateContract({
    ...DekanContract,
    functionName: "approve",
    args: [AlloContract.address, BigInt(0)],
    account,
  });

  // Create a pool
  const { request: req3 } = await publicClient.simulateContract({
    ...AlloContract,
    functionName: "createPoolWithCustomStrategy",
    args: [
      "0x", // TODO: profile pool id
      strategy,
      "0x_ABI_ENCODE_STRATEGY_ARGS", // TODO:
      (process.env.NEXT_PUBLIC_DEKAN_CONTRACT_ADDRESS as Address) || "0x",
      BigInt(tokenAmount),
      { protocol: BigInt(1), pointer: "" },
      poolManagers,
    ],
    account,
  });

  // renounce pool admin role
  const { request: req4 } = await publicClient.simulateContract({
    ...AlloContract,
    functionName: "revokeRole",
    args: ["0xRole", account],
    account,
  });

  const req1TxHash = await wallet.writeContract(req1);
  const req2TxHash = await wallet.writeContract(req2);
  const req3TxHash = await wallet.writeContract(req3);
  const req4TxHash = await wallet.writeContract(req4);

  callback({
    "Pool profile creation hash": req1TxHash,
    "Allo approval hash": req2TxHash,
    "Create pool hash": req3TxHash,
    "Renounce role hash": req4TxHash,
  });
};
