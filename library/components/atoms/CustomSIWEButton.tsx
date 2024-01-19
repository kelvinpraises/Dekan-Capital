"use client";
import { createUser } from "@/library/backendAPI";
import { useStore } from "@/library/store/useStore";
import { useModal, useSIWE } from "connectkit";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

export type SIWESession = {
  name?: string;
  avatarURL?: string;
  address: string;
  chainId: number;
};

const CustomSIWEButton = () => {
  const [isClient, setIsClient] = useState(false);

  const { setOpen } = useModal();
  const { isConnected } = useAccount();
  const setAppActive = useStore((store) => store.setAppActive);
  const setUserName = useStore((store) => store.setUserName);
  const setUserAddress = useStore((store) => store.setUserAddress);
  const setUserAvatarURL = useStore((store) => store.setUserAvatarURL);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isReady, isRejected, isLoading, isSignedIn, signOut, signIn } =
    useSIWE({
      onSignIn: (session?: SIWESession) => {
        if (!session) return;
        const { name, avatarURL, address } = session;

        if (!name || !avatarURL) {
          const name = prompt("please enter your name:") || "";
          const avatarURL =
            prompt("Please enter the url to your avatar:") || "";
          createUser({ name, avatarURL }, () => {
            setUserName(name);
            setUserAvatarURL(avatarURL);
          });
        }

        setUserName(name || "");
        setUserAddress(address);
        setUserAvatarURL(avatarURL || "");
        setAppActive(true);
      },
      onSignOut: () => {
        setAppActive(false);
      },
    });

  const handleSignIn = async () => {
    await signIn()?.then((session?: SIWESession) => {
      // Do something when signed in
    });
  };

  const handleSignOut = async () => {
    await signOut()?.then(() => {
      // Do something when signed out
    });
  };

  /** Wallet is connected and signed in */
  if (isSignedIn && isClient) {
    return (
      <>
        <div onClick={() => setOpen(true)}>
          <div>Address: {data?.address}</div>
          <div>ChainId: {data?.chainId}</div>
        </div>
        <button onClick={handleSignOut}>Sign Out</button>
      </>
    );
  }

  /** Wallet is connected, but not signed in */
  if (isConnected && isClient) {
    return (
      <>
        <button onClick={handleSignIn} disabled={isLoading}>
          {isRejected // User Rejected
            ? "Try Again"
            : isLoading // Waiting for signing request
            ? "Awaiting request..."
            : // Waiting for interaction
              "Sign In"}
        </button>
      </>
    );
  }

  /** A wallet needs to be connected first */
  return (
    <>
      <button onClick={() => setOpen(true)}>Connect Wallet</button>
    </>
  );
};

export default CustomSIWEButton;
