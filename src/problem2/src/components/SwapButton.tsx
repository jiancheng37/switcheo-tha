// components/SwapButton.tsx
import React from "react";
import { Button } from "@mui/material";

interface SwapButtonProps {
  isConnected: boolean;
  connecting: boolean;
  onConnect: () => void;
  onSwap: () => void;
}

const SwapButton: React.FC<SwapButtonProps> = ({
  isConnected,
  connecting,
  onConnect,
  onSwap,
}) => {
  const buttonStyle = {
    width: "95%",
    backgroundColor: "#E2FCA4",
    color: "#2c4c5c",
    fontWeight: "bold",
    fontSize: "1rem",
    textTransform: "none",
    borderRadius: "8px",
    marginTop: 2,
  };

  return (
    <Button
      variant="contained"
      sx={buttonStyle}
      onClick={isConnected ? onSwap : onConnect}
    >
      {!isConnected ? (connecting ? "Connecting..." : "Connect Wallet") : "Swap"}
    </Button>
  );
};

export default SwapButton;