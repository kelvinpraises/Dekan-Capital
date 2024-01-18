import { getDefaultConfig } from "connectkit";
import React from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains([sepolia], [publicProvider()]);

const { connectors } = getDefaultConfig({
  appName: "Dekan Capital",
  chains: chains,
  walletConnectProjectId: "00ed1a865e5bf256fcf17b7eab1e0ce0",
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default WagmiProvider;
