const DVMDDContract = {
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_allo",
          type: "address",
        },
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "ALLOCATION_ACTIVE",
      type: "error",
    },
    {
      inputs: [],
      name: "ALLOCATION_NOT_ACTIVE",
      type: "error",
    },
    {
      inputs: [],
      name: "ALLOCATION_NOT_ENDED",
      type: "error",
    },
    {
      inputs: [],
      name: "ALREADY_INITIALIZED",
      type: "error",
    },
    {
      inputs: [],
      name: "AMOUNT_MISMATCH",
      type: "error",
    },
    {
      inputs: [],
      name: "ANCHOR_ERROR",
      type: "error",
    },
    {
      inputs: [],
      name: "ARRAY_MISMATCH",
      type: "error",
    },
    {
      inputs: [],
      name: "INVALID",
      type: "error",
    },
    {
      inputs: [],
      name: "INVALID_ADDRESS",
      type: "error",
    },
    {
      inputs: [],
      name: "INVALID_FEE",
      type: "error",
    },
    {
      inputs: [],
      name: "INVALID_METADATA",
      type: "error",
    },
    {
      inputs: [],
      name: "INVALID_REGISTRATION",
      type: "error",
    },
    {
      inputs: [],
      name: "IS_APPROVED_STRATEGY",
      type: "error",
    },
    {
      inputs: [],
      name: "MISMATCH",
      type: "error",
    },
    {
      inputs: [],
      name: "NONCE_NOT_AVAILABLE",
      type: "error",
    },
    {
      inputs: [],
      name: "NOT_APPROVED_STRATEGY",
      type: "error",
    },
    {
      inputs: [],
      name: "NOT_ENOUGH_FUNDS",
      type: "error",
    },
    {
      inputs: [],
      name: "NOT_INITIALIZED",
      type: "error",
    },
    {
      inputs: [],
      name: "NOT_PENDING_OWNER",
      type: "error",
    },
    {
      inputs: [],
      name: "POOL_ACTIVE",
      type: "error",
    },
    {
      inputs: [],
      name: "POOL_INACTIVE",
      type: "error",
    },
    {
      inputs: [],
      name: "RECIPIENT_ALREADY_ACCEPTED",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipientId",
          type: "address",
        },
      ],
      name: "RECIPIENT_ERROR",
      type: "error",
    },
    {
      inputs: [],
      name: "RECIPIENT_NOT_ACCEPTED",
      type: "error",
    },
    {
      inputs: [],
      name: "REGISTRATION_NOT_ACTIVE",
      type: "error",
    },
    {
      inputs: [],
      name: "UNAUTHORIZED",
      type: "error",
    },
    {
      inputs: [],
      name: "ZERO_ADDRESS",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "recipientId",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "Allocated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "BatchAllocationSuccessful",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "BatchPayoutSuccessful",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "int128",
          name: "realBalanceDelta",
          type: "int128",
        },
      ],
      name: "BatchSetStreamSuccessful",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "recipientId",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "recipientAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "Distributed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bytes32",
          name: "merkleRoot",
          type: "bytes32",
        },
        {
          components: [
            {
              internalType: "uint256",
              name: "protocol",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "pointer",
              type: "string",
            },
          ],
          indexed: false,
          internalType: "struct Metadata",
          name: "metadata",
          type: "tuple",
        },
      ],
      name: "DistributionUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "grantee",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "recipientId",
          type: "address",
        },
      ],
      name: "FundsDistributed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "poolId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "Initialized",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bool",
          name: "active",
          type: "bool",
        },
      ],
      name: "PoolActive",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "rowIndex",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "fullRow",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "RecipientStatusUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "recipientId",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "Registered",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint64",
          name: "registrationStartTime",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "uint64",
          name: "registrationEndTime",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "uint64",
          name: "allocationStartTime",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "uint64",
          name: "allocationEndTime",
          type: "uint64",
        },
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "TimestampsUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "recipientId",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint8",
          name: "status",
          type: "uint8",
        },
      ],
      name: "UpdatedRegistration",
      type: "event",
    },
    {
      inputs: [],
      name: "NATIVE",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes",
        },
        {
          internalType: "address",
          name: "_sender",
          type: "address",
        },
      ],
      name: "allocate",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "allocationEndTime",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "allocationStartTime",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "allowedTokens",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint128",
          name: "tokensToSend_",
          type: "uint128",
        },
        {
          internalType: "uint32",
          name: "duration_",
          type: "uint32",
        },
      ],
      name: "calculateFlowRate",
      outputs: [
        {
          internalType: "uint160",
          name: "",
          type: "uint160",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "caller",
      outputs: [
        {
          internalType: "contract Caller",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_recipientIds",
          type: "address[]",
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes",
        },
        {
          internalType: "address",
          name: "_sender",
          type: "address",
        },
      ],
      name: "distribute",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "distributionMetadata",
      outputs: [
        {
          internalType: "uint256",
          name: "protocol",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "pointer",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "distributionStarted",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "drips",
      outputs: [
        {
          internalType: "contract Drips",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "driver",
      outputs: [
        {
          internalType: "contract AddressDriver",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "erc20",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllo",
      outputs: [
        {
          internalType: "contract IAllo",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_recipientIds",
          type: "address[]",
        },
        {
          internalType: "bytes[]",
          name: "_data",
          type: "bytes[]",
        },
      ],
      name: "getPayouts",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "recipientAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          internalType: "struct IStrategy.PayoutSummary[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getPoolAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getPoolId",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_recipientId",
          type: "address",
        },
      ],
      name: "getRecipient",
      outputs: [
        {
          components: [
            {
              internalType: "bool",
              name: "useRegistryAnchor",
              type: "bool",
            },
            {
              internalType: "address",
              name: "recipientAddress",
              type: "address",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "protocol",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "pointer",
                  type: "string",
                },
              ],
              internalType: "struct Metadata",
              name: "metadata",
              type: "tuple",
            },
          ],
          internalType:
            "struct DonationVotingMerkleDistributionBaseStrategy.Recipient",
          name: "recipient",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_recipientId",
          type: "address",
        },
      ],
      name: "getRecipientStatus",
      outputs: [
        {
          internalType: "enum IStrategy.Status",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getStrategyId",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_index",
          type: "uint256",
        },
      ],
      name: "hasBeenDistributed",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "increasePoolAmount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_poolId",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes",
        },
      ],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "isDistributionSet",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "isPoolActive",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_allocator",
          type: "address",
        },
      ],
      name: "isValidAllocator",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "merkleRoot",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "metadataRequired",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes[]",
          name: "data",
          type: "bytes[]",
        },
      ],
      name: "multicall",
      outputs: [
        {
          internalType: "bytes[]",
          name: "results",
          type: "bytes[]",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "recipientToStatusIndexes",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "recipientsCounter",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes",
        },
        {
          internalType: "address",
          name: "_sender",
          type: "address",
        },
      ],
      name: "registerRecipient",
      outputs: [
        {
          internalType: "address",
          name: "recipientId",
          type: "address",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "registrationEndTime",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "registrationStartTime",
      outputs: [
        {
          internalType: "uint64",
          name: "",
          type: "uint64",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "index",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "statusRow",
              type: "uint256",
            },
          ],
          internalType:
            "struct DonationVotingMerkleDistributionBaseStrategy.ApplicationStatus[]",
          name: "statuses",
          type: "tuple[]",
        },
      ],
      name: "reviewRecipients",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "statusesBitMap",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "stream",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalPayoutAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_merkleRoot",
          type: "bytes32",
        },
        {
          components: [
            {
              internalType: "uint256",
              name: "protocol",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "pointer",
              type: "string",
            },
          ],
          internalType: "struct Metadata",
          name: "_distributionMetadata",
          type: "tuple",
        },
      ],
      name: "updateDistribution",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint64",
          name: "_registrationStartTime",
          type: "uint64",
        },
        {
          internalType: "uint64",
          name: "_registrationEndTime",
          type: "uint64",
        },
        {
          internalType: "uint64",
          name: "_allocationStartTime",
          type: "uint64",
        },
        {
          internalType: "uint64",
          name: "_allocationEndTime",
          type: "uint64",
        },
      ],
      name: "updatePoolTimestamps",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "useRegistryAnchor",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ],
  bytecode: `0x60c060405234801562000010575f80fd5b50604051620042fa380380620042fa8339810160408190526200003391620000bb565b6001600160a01b03821660805260405182908290829082906200005b90829060200162000190565b60408051601f19818403018152919052805160209091012060a05250620001c4945050505050565b634e487b7160e01b5f52604160045260245ffd5b5f5b83811015620000b357818101518382015260200162000099565b50505f910152565b5f8060408385031215620000cd575f80fd5b82516001600160a01b0381168114620000e4575f80fd5b60208401519092506001600160401b038082111562000101575f80fd5b818501915085601f83011262000115575f80fd5b8151818111156200012a576200012a62000083565b604051601f8201601f19908116603f0116810190838211818310171562000155576200015562000083565b816040528281528860208487010111156200016e575f80fd5b6200018183602083016020880162000097565b80955050505050509250929050565b602081525f8251806020840152620001b081604085016020870162000097565b601f01601f19169190910160400192915050565b60805160a0516140ea620002105f395f6103c901525f81816102c40152818161098701528181611040015281816112a101528181611a2801528181611c4601526121f601526140ea5ff3fe60806040526004361061024c575f3560e01c806373af345311610134578063d864089f116100b3578063eb11af9311610078578063eb11af9314610732578063edd146cc1461075e578063ef2920fc1461077d578063f5b0dfb714610790578063f6f25891146107af578063fc9c8d39146107da575f80fd5b8063d864089f14610696578063df868ed3146106b5578063dff7d2c7146106c9578063e744092e146106ef578063e7efcfc21461071d575f80fd5b8063a0cf0aea116100f9578063a0cf0aea146105d3578063ac9650d8146105fa578063b2b878d014610626578063cb0e85a614610652578063d2e17f5914610670575f80fd5b806373af34531461053b578063785e9e861461055a5780637c435d291461057957806395355b3b146105985780639af5c09d146105ad575f80fd5b806342fda9c7116101cb5780635708973911610190578063570897391461047657806359a3977b1461048f5780635f1b55f3146104b157806362812a39146104d05780636ecc5d62146104fc5780636f2a67911461051b575f80fd5b806342fda9c7146103bb5780634533d678146103ed578063465831cd146104245780634ab4ba42146104435780634d31d08714610457575f80fd5b80632bbe0cae116102115780632bbe0cae1461034a5780632d52eff21461035d5780632e1a7d4d146103735780632eb4a7ab1461039257806338fff2d0146103a7575f80fd5b806301fc1c64146102575780630a6f0ee91461029557806315cc481e146102b65780632143e92f146102fc578063217550881461031b575f80fd5b3661025357005b5f80fd5b348015610262575f80fd5b50610282610271366004612b5f565b600c6020525f908152604090205481565b6040519081526020015b60405180910390f35b3480156102a0575f80fd5b506102b46102af366004612d80565b6107f9565b005b3480156102c1575f80fd5b507f00000000000000000000000000000000000000000000000000000000000000005b6040516001600160a01b03909116815260200161028c565b348015610307575f80fd5b506102b4610316366004612e06565b610819565b348015610326575f80fd5b5060055461033a9062010000900460ff1681565b604051901515815260200161028c565b6102e4610358366004612e5f565b6108fc565b348015610368575f80fd5b50600a54151561033a565b34801561037e575f80fd5b506102b461038d366004612ead565b610920565b34801561039d575f80fd5b50610282600a5481565b3480156103b2575f80fd5b50600154610282565b3480156103c6575f80fd5b507f0000000000000000000000000000000000000000000000000000000000000000610282565b3480156103f8575f80fd5b5060065461040c906001600160401b031681565b6040516001600160401b03909116815260200161028c565b34801561042f575f80fd5b506102b461043e366004612ec4565b610a4a565b34801561044e575f80fd5b50600254610282565b348015610462575f80fd5b5061033a610471366004612b5f565b610b01565b348015610481575f80fd5b5060055461033a9060ff1681565b34801561049a575f80fd5b506104a3610b09565b60405161028c929190612fbf565b3480156104bc575f80fd5b5061033a6104cb366004612ead565b610b9e565b3480156104db575f80fd5b506104ef6104ea366004612b5f565b610ba8565b60405161028c9190612fd7565b348015610507575f80fd5b506013546102e4906001600160a01b031681565b348015610526575f80fd5b5060135461033a90600160a01b900460ff1681565b348015610546575f80fd5b506102b4610555366004613024565b610bb9565b348015610565575f80fd5b506010546102e4906001600160a01b031681565b348015610584575f80fd5b506011546102e4906001600160a01b031681565b3480156105a3575f80fd5b5061028260085481565b3480156105b8575f80fd5b5060055461040c90630100000090046001600160401b031681565b3480156105de575f80fd5b506102e473eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee81565b348015610605575f80fd5b506106196106143660046130b7565b610c5b565b60405161028c9190613125565b348015610631575f80fd5b50610645610640366004613187565b610d42565b60405161028c9190613253565b34801561065d575f80fd5b5060055461033a90610100900460ff1681565b34801561067b575f80fd5b5060055461040c90600160981b90046001600160401b031681565b3480156106a1575f80fd5b506102e46106b03660046132bb565b610e3d565b3480156106c0575f80fd5b5061033a610f72565b3480156106d4575f80fd5b5060055461040c90600160581b90046001600160401b031681565b3480156106fa575f80fd5b5061033a610709366004612b5f565b600e6020525f908152604090205460ff1681565b348015610728575f80fd5b5061028260075481565b34801561073d575f80fd5b5061075161074c366004612b5f565b610f80565b60405161028c9190613306565b348015610769575f80fd5b506102b461077836600461332c565b610f8a565b6102b461078b366004612e5f565b610fee565b34801561079b575f80fd5b506102b46107aa366004612ead565b61100c565b3480156107ba575f80fd5b506102826107c9366004612ead565b600b6020525f908152604090205481565b3480156107e5575f80fd5b506012546102e4906001600160a01b031681565b610801611035565b610809611080565b6108148383836110a2565b505050565b3361082381611277565b61082f85858585611327565b600580546301000000600160981b03191663010000006001600160401b03888116820267ffffffffffffffff60581b191692909217600160581b88841681029190911767ffffffffffffffff60981b1916600160981b888516810291909117948590556006805467ffffffffffffffff19168886169081179091556040517fcb0fb7a7b87db2f472ee8977444cfdbc51993ce660aca27a5969a724fae6dcf3966108ed9695810486169594810485169493900490921691339061336f565b60405180910390a15050505050565b5f610905611035565b61090d611080565b61091783836113c1565b90505b92915050565b3361092a81611277565b600654610943906001600160401b031662278d006133be565b6001600160401b0316421161096b57604051637fcce2a960e01b815260040160405180910390fd5b60015460405163068bcd8d60e01b81525f916001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169163068bcd8d916109be9160040190815260200190565b5f60405180830381865afa1580156109d8573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526109ff919081019061347e565b9050600254831115610a2457604051637fcce2a960e01b815260040160405180910390fd5b8260025f828254610a35919061352c565b909155505060408101516108149033856116e5565b610a5261171f565b33610a5c81611277565b5f5b8251811015610814575f838281518110610a7a57610a7a61353f565b60200260200101515f015190505f848381518110610a9a57610a9a61353f565b6020908102919091018101518101515f848152600b83526040908190208290558051828152339381019390935290925083917f941884a9a55191a7401466aaf8a0d2b7c8b082055a5a2b345b83c73940172ac4910160405180910390a25050600101610a5e565b5f600161091a565b6003805460048054919291610b1d90613553565b80601f0160208091040260200160405190810160405280929190818152602001828054610b4990613553565b8015610b945780601f10610b6b57610100808354040283529160200191610b94565b820191905f5260205f20905b815481529060010190602001808311610b7757829003601f168201915b5050505050905082565b5f61091a8261176f565b610bb0612b08565b61091a826117ad565b610bc16118a3565b33610bcb81611277565b60055462010000900460ff1615610bf557604051637fcce2a960e01b815260040160405180910390fd5b600a839055815160039081556020830151839190600490610c1690826135cf565b509050507fdc7180ca4affc84269428ed20ef950e745126f11691b010c4a7d49458421008f600a546003604051610c4e92919061368a565b60405180910390a1505050565b6060816001600160401b03811115610c7557610c75612b7a565b604051908082528060200260200182016040528015610ca857816020015b6060815260200190600190039081610c935790505b5090505f5b82811015610d3b57610d1630858584818110610ccb57610ccb61353f565b9050602002810190610cdd919061372f565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f920191909152506118cf92505050565b828281518110610d2857610d2861353f565b6020908102919091010152600101610cad565b5092915050565b81518151606091908114610d6957604051633da4c02b60e11b815260040160405180910390fd5b5f816001600160401b03811115610d8257610d82612b7a565b604051908082528060200260200182016040528015610dc657816020015b604080518082019091525f8082526020820152815260200190600190039081610da05790505b5090505f5b82811015610e3457610e0f868281518110610de857610de861353f565b6020026020010151868381518110610e0257610e0261353f565b60200260200101516118f4565b828281518110610e2157610e2161353f565b6020908102919091010152600101610dcb565b50949350505050565b5f8063ffffffff8316610e5485633b9aca00613778565b610e5e91906137b7565b6001600160801b0316905060115f9054906101000a90046001600160a01b03166001600160a01b031663c82051dd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610eb9573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610edd91906137dc565b6001600160a01b0316816001600160a01b031610156109175760115f9054906101000a90046001600160a01b03166001600160a01b031663c82051dd6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610f46573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190610f6a91906137dc565b91505061091a565b5f610f7b6119ab565b905090565b5f61091a826119f2565b610f92611035565b5f81806020019051810190610fa79190613876565b9050610fb38382611a10565b610fbd8382611bff565b7f91efa3d50feccde0d0d202f8ae5c41ca0b2be614cebcb2bd2f4b019396e6568a8383604051610c4e929190612fbf565b610ff6611035565b610ffe611080565b6110088282611e86565b5050565b611014611035565b8060025f828254611025919061398e565b9091555061103290508181565b50565b336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461107e5760405163075fd2b160e01b815260040160405180910390fd5b565b6001545f0361107e57604051630f68fe6360e21b815260040160405180910390fd5b806110ac81611277565b60055462010000900460ff166110ce576005805462ff00001916620100001790555b601354600160a01b900460ff16156111ec576060805f805f80888060200190518101906110fb9190613b07565b949a509298509096509450925090505f6111158685611f27565b601354601054604051636ef2aa6360e11b81529293505f926001600160a01b039283169263dde554c69261115a929116908c908b9088908b908b903090600401613c63565b6020604051808303815f875af1158015611176573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061119a9190613cc9565b604051600f82900b81529091506001600160a01b038b16907f3701b4f70eb2cd5c342b79a3d54ffe5872bb7de314e3ba3ef6de34ed8a8733739060200160405180910390a25050505050505050611271565b5f838060200190518101906112019190613ce2565b80519091505f5b8181101561123a576112328382815181106112255761122561353f565b602002602001015161218f565b600101611208565b506040516001600160a01b038516907f7ec3272052827f7b50d9e84f98172cbb80c112df1e377c5b97ea77f1812db8d9905f90a250505b50505050565b6001546040516329e40d4b60e01b815260048101919091526001600160a01b0382811660248301527f000000000000000000000000000000000000000000000000000000000000000016906329e40d4b90604401602060405180830381865afa1580156112e6573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061130a9190613d26565b6110325760405163075fd2b160e01b815260040160405180910390fd5b836001600160401b031642118061134f5750826001600160401b0316846001600160401b0316115b8061136b5750816001600160401b0316846001600160401b0316115b806113875750806001600160401b0316826001600160401b0316115b806113a35750806001600160401b0316836001600160401b0316115b1561127157604051637fcce2a960e01b815260040160405180910390fd5b5f6113ca61171f565b5f805f6113e960405180604001604052805f8152602001606081525090565b60055460ff161561143b57868060200190518101906114089190613d3f565b9196509350905061141985876122f6565b6114365760405163075fd2b160e01b815260040160405180910390fd5b6114a5565b8680602001905181019061144f9190613d3f565b6001600160a01b03821615159650919450925090508361146f5785611471565b815b9450838015611487575061148585876122f6565b155b156114a55760405163075fd2b160e01b815260040160405180910390fd5b600554610100900460ff1680156114c8575060208101515115806114c857508051155b156114e65760405163c19e07c560e01b815260040160405180910390fd5b6001600160a01b03831661151d5760405163f4a513b960e01b81526001600160a01b03861660048201526024015b60405180910390fd5b6001600160a01b038086165f908152600f60209081526040909120805492861661010002610100600160a81b031990931692909217825582516001830190815590830151839190600284019061157390826135cf565b505060055460ff169050611587578461158a565b60015b815460ff19169015151781555f6115a0876123e7565b905060ff8116611658576008546001600160a01b0388165f908152600c60205260409020556115d48760015b60ff16612401565b5f896008546040516020016115ea929190613d9e565b6040516020818303038152906040529050876001600160a01b03167fa197306e3dd5494a61a695381aa809a53b8e377a685e84e404a85d5a8da6cc62828b604051611636929190613dbf565b60405180910390a260088054905f61164d83613de8565b9190505550506116d9565b60011960ff8216016116745761166f8760016115cc565b61168b565b60021960ff82160161168b5761168b8760046115cc565b866001600160a01b03167fcec1da3f7f0b8a344dd1025d06e2ddd48b14880395997ad97cbdb439acc761d48a8a6116c18b6123e7565b6040516116d093929190613e00565b60405180910390a25b50505050505092915050565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed196001600160a01b03841601611714576108148282612431565b61081483838361244a565b6005544263010000009091046001600160401b031611806117515750600554600160581b90046001600160401b031642115b1561107e57604051635b04f6ad60e11b815260040160405180910390fd5b5f8061177d61010084613e35565b90505f61178c61010085613e48565b5f928352600d602052604090922054600190921b9182169091149392505050565b6117b5612b08565b6001600160a01b038083165f908152600f60209081526040918290208251606081018452815460ff81161515825261010090049094168483015282518084018452600182018054825260028301805493958701949293919284019161181990613553565b80601f016020809104026020016040519081016040528092919081815260200182805461184590613553565b80156118905780601f1061186757610100808354040283529160200191611890565b820191905f5260205f20905b81548152906001019060200180831161187357829003601f168201915b5050509190925250505090525092915050565b6006546001600160401b031642101561107e57604051634543ced160e11b815260040160405180910390fd5b6060610917838360405180606001604052806027815260200161408e6027913961248a565b604080518082019091525f80825260208201525f8280602001905181019061191c9190613e5b565b805160208201516040830151606084015193945091929091905f61193f846117ad565b60200151905061195285858386866124fe565b15611982576040518060400160405280826001600160a01b0316815260200184815250965050505050505061091a565b604080518082019091526001600160a01b0390911681525f602082015298975050505050505050565b6005545f904263010000009091046001600160401b0316118015906119e25750600554600160581b90046001600160401b03164211155b156119ed5750600190565b505f90565b5f6119fc826123e7565b60ff16600681111561091a5761091a6132f2565b60405163068bcd8d60e01b8152600481018390525f907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063068bcd8d906024015f60405180830381865afa158015611a74573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f19168201604052611a9b919081019061347e565b60408101519091506001600160a01b031673eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee148015611acf575081604001515b15611aed57604051637fcce2a960e01b815260040160405180910390fd5b60e0820151601180546001600160a01b039283166001600160a01b0319918216179091556101008401516012805491841691909216179055610120830151601380546040808701511515600160a01b026001600160a81b0319909216938516939093171790558201511673eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1461081457604081810151601080546001600160a01b0319166001600160a01b03928316908117909155601354925163095ea7b360e01b81529290911660048301525f1960248301529063095ea7b3906044016020604051808303815f875af1158015611bdb573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906112719190613d26565b611c08826125a3565b80516005805460208085015161ffff1990921693151561ff001916939093176101009115159190910217905560408051635ab1bd5360e01b815290517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031692635ab1bd5392600480820193918290030181865afa158015611c93573d5f803e3d5ffd5b505050506040513d601f19601f82011682018060405250810190611cb791906137dc565b600980546001600160a01b0319166001600160a01b0392909216919091179055606081015160058054608084015160a08501516301000000600160981b031990921663010000006001600160401b03958616810267ffffffffffffffff60581b191691909117600160581b92861683021767ffffffffffffffff60981b1916600160981b9386168402179384905560c08601516006805467ffffffffffffffff19169187169182179055611d7b959185048216949283048216939092041690611327565b6005546006546040517fcb0fb7a7b87db2f472ee8977444cfdbc51993ce660aca27a5969a724fae6dcf392611ddb926001600160401b0363010000008304811693600160581b8404821693600160981b900482169290911690339061336f565b60405180910390a1610140810151515f819003611e27575f8052600e6020527fe710864318d4a32f37d6ce54cb3fadbef648dd12d8dbdf53973564d56b7f881c805460ff191660011790555b5f5b81811015611271576001600e5f8561014001518481518110611e4d57611e4d61353f565b6020908102919091018101516001600160a01b031682528101919091526040015f20805460ff1916911515919091179055600101611e29565b611e8e6125f1565b5f82806020019051810190611ea39190613e8c565b80519091505f5b818160ff161015611eed57611edb838260ff1681518110611ecd57611ecd61353f565b602002602001015185612639565b80611ee581613f54565b915050611eaa565b506040516001600160a01b038416907faf2aeb2d4fe57415a1bbc0422472fa1bd4ff48b36feb2e7d2d3ce40085558985905f90a250505050565b81516060905f816001600160401b03811115611f4557611f45612b7a565b604051908082528060200260200182016040528015611f8957816020015b604080518082019091525f8082526020820152815260200190600190039081611f635790505b5090505f5b82811015610e34575f868281518110611fa957611fa961353f565b60200260200101515f015190505f878381518110611fc957611fc961353f565b60200260200101516020015190505f888481518110611fea57611fea61353f565b60200260200101516040015190505f89858151811061200b5761200b61353f565b602090810291909101810151606001516001600160a01b038086165f908152600f90935260409092205490925061010090041661204b85858386866124fe565b1561215a576120598561287b565b8260025f82825461206a919061352c565b9091555050601354604051630a30a04f60e21b81526001600160a01b038381166004830152909116906328c2813c90602401602060405180830381865afa1580156120b7573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906120db9190613f72565b8787815181106120ed576120ed61353f565b6020908102919091010151526121335f612107858d610e3d565b63ffffffff8d166001600160a01b0390911660a09290921b63ffffffff60a01b169190911760401b1790565b8787815181106121455761214561353f565b6020026020010151602001818152505061217e565b60405163f4a513b960e01b81526001600160a01b0385166004820152602401611514565b505060019093019250611f8e915050565b805160208083015160408085015160608601516001600160a01b038085165f908152600f9096529290942054929390929091610100909104166121d585858386866124fe565b1561215a5760015460405163068bcd8d60e01b81525f916001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169163068bcd8d9161222d9160040190815260200190565b5f60405180830381865afa158015612247573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f1916820160405261226e919081019061347e565b90506122798661287b565b8360025f82825461228a919061352c565b9091555050604081015161229f9083866116e5565b60408082015181518681526001600160a01b038581166020830152808916939216917fa6b66f665010d2f7435f110111aaa34b56564074f66081bef606d996fc8caa6f910160405180910390a3505b505050505050565b60095460405163dd93da4360e01b81526001600160a01b0384811660048301525f92839291169063dd93da43906024015f60405180830381865afa158015612340573d5f803e3d5ffd5b505050506040513d5f823e601f3d908101601f191682016040526123679190810190613f89565b6009548151604051635e8a791560e01b815260048101919091526001600160a01b038681166024830152929350911690635e8a791590604401602060405180830381865afa1580156123bb573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906123df9190613d26565b949350505050565b5f805f6123f3846128b6565b600f911c1695945050505050565b5f805f61240d856128b6565b5f928352600b602052604090922095811b600f90911b199091161790935550505050565b5f805f8084865af16110085763b12d13eb5f526004601cfd5b816014528060345263a9059cbb60601b5f5260205f604460105f875af13d1560015f51141716612481576390b8ec185f526004601cfd5b5f603452505050565b60605f80856001600160a01b0316856040516124a69190614049565b5f60405180830381855af49150503d805f81146124de576040519150601f19603f3d011682016040523d82523d5f602084013e6124e3565b606091505b50915091506124f486838387612917565b9695505050505050565b5f6125088661176f565b1561251457505f61259a565b60408051602081018890526001600160a01b03808816928201929092529085166060820152608081018490525f9060a00160408051601f198184030181528282528051602091820120908301520160405160208183030381529060405280519060200120905061258783600a548361298f565b612594575f91505061259a565b60019150505b95945050505050565b6125ab611035565b600154156125cc5760405163439a74c960e01b815260040160405180910390fd5b805f036125ec57604051637fcce2a960e01b815260040160405180910390fd5b600155565b60055442600160981b9091046001600160401b0316118061261c57506006546001600160401b031642115b1561107e5760405162b828c960e81b815260040160405180910390fd5b8151602083015160408401516002612650846123e7565b60ff166006811115612664576126646132f2565b6006811115612675576126756132f2565b1461269e5760405163f4a513b960e01b81526001600160a01b0384166004820152602401611514565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed196001600160a01b038216016126dc57604051637fcce2a960e01b815260040160405180910390fd5b6001600160a01b0381165f908152600e602052604090205460ff1615801561272e57505f8052600e6020527fe710864318d4a32f37d6ce54cb3fadbef648dd12d8dbdf53973564d56b7f881c5460ff16155b1561274c57604051637fcce2a960e01b815260040160405180910390fd5b5f3411801561277857506001600160a01b03811673eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee14155b806127aa57506001600160a01b03811673eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1480156127aa5750813414155b156127c857604051637fcce2a960e01b815260040160405180910390fd5b604080516060810182526001600160a01b0380871682528581165f908152600f6020908152908490205461010090049091169082015290810183905261280f9082906129a4565b1561287457826001600160a01b03167f463ffc2cf8b1596445c417388ed30e53eb67cf6668cb2be7f0addf8a78c8441b83838760405161286b939291909283526001600160a01b03918216602084015216604082015260600190565b60405180910390a25b5050505050565b5f61288861010083613e35565b90505f61289761010084613e48565b5f928352600d60205260409092208054600190931b9092179091555050565b6001600160a01b0381165f908152600c602052604080822054829182919082906128e09083613e35565b90505f6128ee604084613e48565b6128f9906004614064565b5f838152600b60205260409020549298909750919550909350505050565b606083156129855782515f0361297e576001600160a01b0385163b61297e5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401611514565b50816123df565b6123df8383612a21565b5f8261299b8584612a4b565b14949350505050565b60408101515f9073eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeed196001600160a01b03851601612a0457803410156129f1576040516374c5672b60e01b815260040160405180910390fd5b6129ff836020015182612431565b612a17565b612a1784845f0151856020015184612a8d565b5060019392505050565b815115612a315781518083602001fd5b8060405162461bcd60e51b8152600401611514919061407b565b5f81815b8451811015612a8557612a7b82868381518110612a6e57612a6e61353f565b6020026020010151612adc565b9150600101612a4f565b509392505050565b60405181606052826040528360601b602c526323b872dd60601b600c5260205f6064601c5f895af13d1560015f51141716612acf57637939f4245f526004601cfd5b5f60605260405250505050565b5f818310612af6575f828152602084905260409020610917565b5f838152602083905260409020610917565b60405180606001604052805f151581526020015f6001600160a01b03168152602001612b4660405180604001604052805f8152602001606081525090565b905290565b6001600160a01b0381168114611032575f80fd5b5f60208284031215612b6f575f80fd5b813561091781612b4b565b634e487b7160e01b5f52604160045260245ffd5b604080519081016001600160401b0381118282101715612bb057612bb0612b7a565b60405290565b60405160c081016001600160401b0381118282101715612bb057612bb0612b7a565b60405161016081016001600160401b0381118282101715612bb057612bb0612b7a565b604051608081016001600160401b0381118282101715612bb057612bb0612b7a565b604051606081016001600160401b0381118282101715612bb057612bb0612b7a565b604051601f8201601f191681016001600160401b0381118282101715612c6757612c67612b7a565b604052919050565b5f6001600160401b03821115612c8757612c87612b7a565b5060051b60200190565b5f82601f830112612ca0575f80fd5b81356020612cb5612cb083612c6f565b612c3f565b8083825260208201915060208460051b870101935086841115612cd6575f80fd5b602086015b84811015612cfb578035612cee81612b4b565b8352918301918301612cdb565b509695505050505050565b5f6001600160401b03821115612d1e57612d1e612b7a565b50601f01601f191660200190565b5f612d39612cb084612d06565b9050828152838383011115612d4c575f80fd5b828260208301375f602084830101529392505050565b5f82601f830112612d71575f80fd5b61091783833560208501612d2c565b5f805f60608486031215612d92575f80fd5b83356001600160401b0380821115612da8575f80fd5b612db487838801612c91565b94506020860135915080821115612dc9575f80fd5b50612dd686828701612d62565b9250506040840135612de781612b4b565b809150509250925092565b6001600160401b0381168114611032575f80fd5b5f805f8060808587031215612e19575f80fd5b8435612e2481612df2565b93506020850135612e3481612df2565b92506040850135612e4481612df2565b91506060850135612e5481612df2565b939692955090935050565b5f8060408385031215612e70575f80fd5b82356001600160401b03811115612e85575f80fd5b612e9185828601612d62565b9250506020830135612ea281612b4b565b809150509250929050565b5f60208284031215612ebd575f80fd5b5035919050565b5f6020808385031215612ed5575f80fd5b82356001600160401b03811115612eea575f80fd5b8301601f81018513612efa575f80fd5b8035612f08612cb082612c6f565b81815260069190911b82018301908381019087831115612f26575f80fd5b928401925b82841015612f675760408489031215612f42575f80fd5b612f4a612b8e565b843581528585013586820152825260409093019290840190612f2b565b979650505050505050565b5f5b83811015612f8c578181015183820152602001612f74565b50505f910152565b5f8151808452612fab816020860160208601612f72565b601f01601f19169290920160200192915050565b828152604060208201525f6123df6040830184612f94565b6020815281511515602082015260018060a01b0360208301511660408201525f60408301516060808401528051608084015260208101519050604060a08401526123df60c0840182612f94565b5f8060408385031215613035575f80fd5b8235915060208301356001600160401b0380821115613052575f80fd5b9084019060408287031215613065575f80fd5b61306d612b8e565b82358152602083013582811115613082575f80fd5b80840193505086601f840112613096575f80fd5b6130a587843560208601612d2c565b60208201528093505050509250929050565b5f80602083850312156130c8575f80fd5b82356001600160401b03808211156130de575f80fd5b818501915085601f8301126130f1575f80fd5b8135818111156130ff575f80fd5b8660208260051b8501011115613113575f80fd5b60209290920196919550909350505050565b5f60208083016020845280855180835260408601915060408160051b8701019250602087015f5b8281101561317a57603f19888603018452613168858351612f94565b9450928501929085019060010161314c565b5092979650505050505050565b5f8060408385031215613198575f80fd5b82356001600160401b03808211156131ae575f80fd5b6131ba86838701612c91565b93506020915081850135818111156131d0575f80fd5b8501601f810187136131e0575f80fd5b80356131ee612cb082612c6f565b81815260059190911b8201840190848101908983111561320c575f80fd5b8584015b8381101561324257803586811115613226575f80fd5b6132348c8983890101612d62565b845250918601918601613210565b508096505050505050509250929050565b602080825282518282018190525f919060409081850190868401855b8281101561329d57815180516001600160a01b0316855286015186850152928401929085019060010161326f565b5091979650505050505050565b63ffffffff81168114611032575f80fd5b5f80604083850312156132cc575f80fd5b82356001600160801b03811681146132e2575f80fd5b91506020830135612ea2816132aa565b634e487b7160e01b5f52602160045260245ffd5b602081016007831061332657634e487b7160e01b5f52602160045260245ffd5b91905290565b5f806040838503121561333d575f80fd5b8235915060208301356001600160401b03811115613359575f80fd5b61336585828601612d62565b9150509250929050565b6001600160401b0395861681529385166020850152918416604084015290921660608201526001600160a01b03909116608082015260a00190565b634e487b7160e01b5f52601160045260245ffd5b6001600160401b03818116838216019080821115610d3b57610d3b6133aa565b80516133e981612b4b565b919050565b5f82601f8301126133fd575f80fd5b815161340b612cb082612d06565b81815284602083860101111561341f575f80fd5b6123df826020830160208701612f72565b5f60408284031215613440575f80fd5b613448612b8e565b90508151815260208201516001600160401b03811115613466575f80fd5b613472848285016133ee565b60208301525092915050565b5f6020828403121561348e575f80fd5b81516001600160401b03808211156134a4575f80fd5b9083019060c082860312156134b7575f80fd5b6134bf612bb6565b8251815260208301516134d181612b4b565b602082015260408301516134e481612b4b565b60408201526060830151828111156134fa575f80fd5b61350687828601613430565b6060830152506080830151608082015260a083015160a082015280935050505092915050565b8181038181111561091a5761091a6133aa565b634e487b7160e01b5f52603260045260245ffd5b600181811c9082168061356757607f821691505b60208210810361358557634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111561081457805f5260205f20601f840160051c810160208510156135b05750805b601f840160051c820191505b81811015612874575f81556001016135bc565b81516001600160401b038111156135e8576135e8612b7a565b6135fc816135f68454613553565b8461358b565b602080601f83116001811461362f575f84156136185750858301515b5f19600386901b1c1916600185901b1785556122ee565b5f85815260208120601f198616915b8281101561365d5788860151825594840194600190910190840161363e565b508582101561367a57878501515f19600388901b60f8161c191681555b5050505050600190811b01905550565b8281525f602060406020840152835460408401526001808501604060608601525f81546136b681613553565b80608089015260a0600183165f81146136d657600181146136f25761371f565b60ff19841660a08b015260a083151560051b8b0101945061371f565b855f5260205f205f5b848110156137165781548c82018501529088019089016136fb565b8b0160a0019550505b50929a9950505050505050505050565b5f808335601e19843603018112613744575f80fd5b8301803591506001600160401b0382111561375d575f80fd5b602001915036819003821315613771575f80fd5b9250929050565b6001600160801b0381811683821602808216919082811461379b5761379b6133aa565b505092915050565b634e487b7160e01b5f52601260045260245ffd5b5f6001600160801b03808416806137d0576137d06137a3565b92169190910492915050565b5f602082840312156137ec575f80fd5b815161091781612b4b565b805180151581146133e9575f80fd5b80516133e981612df2565b5f82601f830112613820575f80fd5b81516020613830612cb083612c6f565b8083825260208201915060208460051b870101935086841115613851575f80fd5b602086015b84811015612cfb57805161386981612b4b565b8352918301918301613856565b5f60208284031215613886575f80fd5b81516001600160401b038082111561389c575f80fd5b9083019061016082860312156138b0575f80fd5b6138b8612bd8565b6138c1836137f7565b81526138cf602084016137f7565b60208201526138e0604084016137f7565b60408201526138f160608401613806565b606082015261390260808401613806565b608082015261391360a08401613806565b60a082015261392460c08401613806565b60c082015261393560e084016133de565b60e08201526101006139488185016133de565b9082015261012061395a8482016133de565b908201526101408381015183811115613971575f80fd5b61397d88828701613811565b918301919091525095945050505050565b8082018082111561091a5761091a6133aa565b5f608082840312156139b1575f80fd5b6139b9612bfb565b9050815181526020808301516139ce81612b4b565b828201526040838101519083015260608301516001600160401b038111156139f4575f80fd5b8301601f81018513613a04575f80fd5b8051613a12612cb082612c6f565b81815260059190911b82018301908381019087831115613a30575f80fd5b928401925b82841015613a4e57835182529284019290840190613a35565b6060860152509295945050505050565b5f613a6b612cb084612c6f565b8381529050602080820190600585901b840186811115613a89575f80fd5b845b81811015613ac25780516001600160401b03811115613aa8575f80fd5b613ab4898289016139a1565b855250928201928201613a8b565b505050509392505050565b5f82601f830112613adc575f80fd5b61091783835160208501613a5e565b8051600f81900b81146133e9575f80fd5b80516133e9816132aa565b5f805f805f8060c08789031215613b1c575f80fd5b86516001600160401b0380821115613b32575f80fd5b818901915089601f830112613b45575f80fd5b81516020613b55612cb083612c6f565b82815260069290921b8401810191818101908d841115613b73575f80fd5b948201945b83861015613bb4576040868f031215613b8f575f80fd5b613b97612b8e565b865181528387015184820152825260409095019490820190613b78565b918c0151919a50909350505080821115613bcc575f80fd5b50613bd989828a01613acd565b955050613be860408801613aeb565b9350613bf660608801613afc565b9250613c0460808801613afc565b9150613c1260a08801613afc565b90509295509295509295565b5f815180845260208085019450602084015f5b83811015613c58578151805188528301518388015260409096019590820190600101613c31565b509495945050505050565b5f60018060a01b03808a16835260e06020840152613c8460e084018a613c1e565b88600f0b60408501528381036060850152613c9f8189613c1e565b63ffffffff97881660808601529590961660a08401529290921660c0909101525095945050505050565b5f60208284031215613cd9575f80fd5b61091782613aeb565b5f60208284031215613cf2575f80fd5b81516001600160401b03811115613d07575f80fd5b8201601f81018413613d17575f80fd5b6123df84825160208401613a5e565b5f60208284031215613d36575f80fd5b610917826137f7565b5f805f60608486031215613d51575f80fd5b8351613d5c81612b4b565b6020850151909350613d6d81612b4b565b60408501519092506001600160401b03811115613d88575f80fd5b613d9486828701613430565b9150509250925092565b604081525f613db06040830185612f94565b90508260208301529392505050565b604081525f613dd16040830185612f94565b905060018060a01b03831660208301529392505050565b5f60018201613df957613df96133aa565b5060010190565b606081525f613e126060830186612f94565b6001600160a01b039490941660208301525060ff91909116604090910152919050565b5f82613e4357613e436137a3565b500490565b5f82613e5657613e566137a3565b500690565b5f60208284031215613e6b575f80fd5b81516001600160401b03811115613e80575f80fd5b6123df848285016139a1565b5f6020808385031215613e9d575f80fd5b82516001600160401b03811115613eb2575f80fd5b8301601f81018513613ec2575f80fd5b8051613ed0612cb082612c6f565b81815260609182028301840191848201919088841115613eee575f80fd5b938501935b83851015613f485780858a031215613f09575f80fd5b613f11612c1d565b8551613f1c81612b4b565b81528587015187820152604080870151613f3581612b4b565b9082015283529384019391850191613ef3565b50979650505050505050565b5f60ff821660ff8103613f6957613f696133aa565b60010192915050565b5f60208284031215613f82575f80fd5b5051919050565b5f60208284031215613f99575f80fd5b81516001600160401b0380821115613faf575f80fd5b9083019060c08286031215613fc2575f80fd5b613fca612bb6565b8251815260208301516020820152604083015182811115613fe9575f80fd5b613ff5878286016133ee565b60408301525060608301518281111561400c575f80fd5b61401887828601613430565b60608301525061402a608084016133de565b608082015261403b60a084016133de565b60a082015295945050505050565b5f825161405a818460208701612f72565b9190910192915050565b808202811582820484141761091a5761091a6133aa565b602081525f6109176020830184612f9456fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220a990e16ea3e8a696f46cd70da7b910ced8303e756713e910819b24e9496fb98564736f6c63430008160033`,
} as const;

export default DVMDDContract;
