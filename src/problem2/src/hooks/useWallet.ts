import { useState } from "react";

export const useWallet = (
  setConnectButtonState: React.Dispatch<React.SetStateAction<string>>
) => {
  const [connecting, setConnecting] = useState<boolean>(false);

  const handleConnectWallet = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnectButtonState("Connected");
    }, 2000);
  };

  return {
    connecting,
    handleConnectWallet,
  };
};