import {
  Address,
  createPublicClient,
  createWalletClient,
  custom,
  encodeAbiParameters,
  http,
  keccak256,
  parseAbiParameters,
} from "viem";
import { sepolia } from "viem/chains";

import AddressDriverContract from "../contracts/AddressDriver";
import AlloContract from "../contracts/Allo";
import DVMDDContract from "../contracts/DVMDD";
import DekanContract from "../contracts/Dekan";
import DripsContract from "../contracts/Drips";
import RegistryContract from "../contracts/Registry";
import CallerContract from "../contracts/Caller";

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
  poolProfileId,
  contractData,
  callback,
}: {
  strategy: Address;
  poolProfileId?: Address;
  contractData: {
    tokenAmount: number;
    poolManagers: Address[];
    stream: boolean;
    registrationStartTime: bigint;
    registrationEndTime: bigint;
    allocationStartTime: bigint;
    allocationEndTime: bigint;
  };
  callback: (
    txHash: { [key: string]: Address },
    poolProfileId: Address
  ) => void;
}) => {
  let profileIdToUse: Address;

  const wallet = await walletClient();
  const [account] = await wallet.getAddresses();

  let req1TxHash: Address | undefined = `0x`;

  // Check if the initial profile id is null
  if (!poolProfileId) {
    // Create a pool profile id
    const { request: req1, result: poolProfileId } =
      await publicClient.simulateContract({
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
      });

    profileIdToUse = poolProfileId; // Use the poolProfileId as the profile id

    req1TxHash = await wallet.writeContract(req1);
  } else {
    profileIdToUse = poolProfileId; // Use the profile id from the prop
  }

  // Approve Allo on DEKAN
  const { request: req2 } = await publicClient.simulateContract({
    ...DekanContract,
    functionName: "approve",
    args: [AlloContract.address, BigInt(2e18)],
    account,
  });

  const predefinedList = {
    useRegistryAnchor: false,
    metadataRequired: false,
    dripsAddress: DripsContract.address as Address,
    callerAddress: CallerContract.address as Address,
    driverAddress: AddressDriverContract.address as Address,
    allowedTokens: [DekanContract.address] as Address[],
  };

  const initStrategyData = encodeAbiParameters(
    parseAbiParameters(
      "bool, bool, bool, uint64, uint64, uint64, uint64, address, address, address, address[]"
    ),
    [
      predefinedList.useRegistryAnchor,
      predefinedList.metadataRequired,
      contractData.stream,
      contractData.registrationStartTime,
      contractData.registrationEndTime,
      contractData.allocationStartTime,
      contractData.allocationEndTime,
      predefinedList.dripsAddress,
      predefinedList.callerAddress,
      predefinedList.driverAddress,
      predefinedList.allowedTokens,
    ]
  );

  // Create a pool
  const { request: req3, result: poolId } = await publicClient.simulateContract(
    {
      ...AlloContract,
      functionName: "createPoolWithCustomStrategy",
      args: [
        profileIdToUse,
        strategy,
        initStrategyData,
        (process.env.NEXT_PUBLIC_DEKAN_CONTRACT_ADDRESS as Address) || "0x",
        BigInt(contractData.tokenAmount),
        { protocol: BigInt(1), pointer: "pool" },
        contractData.poolManagers,
      ],
      account,
    }
  );

  const role = "POOL_ADMIN_ROLE";
  const roleHash = keccak256(
    encodeAbiParameters(parseAbiParameters("uint256, string"), [poolId, role])
  );

  // Renounce pool admin role
  const { request: req4 } = await publicClient.simulateContract({
    ...AlloContract,
    functionName: "revokeRole",
    args: [roleHash, account],
    account,
  });

  const req2TxHash = await wallet.writeContract(req2);
  const req3TxHash = await wallet.writeContract(req3);
  const req4TxHash = await wallet.writeContract(req4);

  callback(
    {
      "Pool profile creation hash": req1TxHash,
      "Allo approval hash": req2TxHash,
      "Create pool hash": req3TxHash,
      "Renounce role hash": req4TxHash,
    },
    profileIdToUse
  );
};
