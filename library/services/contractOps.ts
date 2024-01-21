import {
  Address,
  createPublicClient,
  createWalletClient,
  custom,
  encodeAbiParameters,
  http,
  keccak256,
  maxUint256,
  parseAbiParameters,
  zeroAddress,
} from "viem";
import { sepolia } from "viem/chains";

import AddressDriverContract from "../contracts/AddressDriver";
import AlloContract from "../contracts/Allo";
import CallerContract from "../contracts/Caller";
import DVMDDContract from "../contracts/DVMDD";
import DekanContract from "../contracts/Dekan";
import DripsContract from "../contracts/Drips";
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
    args: [AlloContract.address, "DonationVotingMerkleDistributionDrip"],
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
  poolProfileId?: Address | null;
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
          BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)),
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
    args: [AlloContract.address, maxUint256],
    account,
  });

  const req2TxHash = await wallet.writeContract(req2);

  // Create a pool

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

  const req3TxHash = await wallet.writeContract({
    ...AlloContract,
    functionName: "createPoolWithCustomStrategy",
    args: [
      profileIdToUse,
      strategy,
      initStrategyData,
      DekanContract.address,
      BigInt(contractData.tokenAmount),
      { protocol: BigInt(1), pointer: "pool" },
      contractData.poolManagers,
    ],
    account,
  });

  // Renounce pool admin role
  // const role = "POOL_ADMIN_ROLE";
  // const roleHash = keccak256(
  //   encodeAbiParameters(parseAbiParameters("uint256, string"), [poolId, role])
  // );

  // const { request: req4 } = await publicClient.simulateContract({
  //   ...AlloContract,
  //   functionName: "renounceRole",
  //   args: [roleHash, account],
  //   account,
  // });

  // const req4TxHash = await wallet.writeContract(req4);

  callback(
    {
      "Pool profile creation hash": req1TxHash,
      "Allo approval hash": req2TxHash,
      "Create pool hash": req3TxHash,
      // "Renounce role hash": req4TxHash,
    },
    profileIdToUse
  );
};
