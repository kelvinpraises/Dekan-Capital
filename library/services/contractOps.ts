import {
  Address,
  createPublicClient,
  createWalletClient,
  custom,
  http,
} from "viem";
import { sepolia } from "viem/chains";

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
      "0xfF65C1D4432D23C45b0730DaeCd03b6B92cd074a",
      "DonationVotingMerkleDistributionDrip",
    ],
    gas: BigInt(5_000_000),
  });

  const receipt = await publicClient.waitForTransactionReceipt({
    hash: txHash,
  });

  callback({ "Strategy creation hash": txHash }, receipt.contractAddress!);
};

export const setupAllo = async () => {
  // create pool strategy
  // aprove allo && strategy to use your DEKAN
  // set timelock as manager
  // renounce admin role
};
