import {
  ConnectKitProvider as _ConnectKitProvider,
  ConnectKitButton,
} from "connectkit";

const ConnectKitProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <_ConnectKitProvider>
      <ConnectKitButton />
      {children}
    </_ConnectKitProvider>
  );
};

export default ConnectKitProvider;
