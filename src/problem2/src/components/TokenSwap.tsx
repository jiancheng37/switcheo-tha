import React, { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import TokenInput from "./TokenInput";
import ConfirmSwapModal from "./ConfirmSwap";
import SnackbarNotification from "./SnackbarNotification";
import SwapButton from "./SwapButton";

import { usePriceData } from "../hooks/usePriceData";
import { useWallet } from "../hooks/useWallet";
import { useTokenSwap } from "../hooks/useTokenSwap";
import { useNotifications } from "../hooks/useNotifications";

interface TokenSwapProps {
  connectButtonState: string;
  setConnectButtonState: React.Dispatch<React.SetStateAction<string>>;
}

const TokenSwap: React.FC<TokenSwapProps> = ({
  connectButtonState,
  setConnectButtonState,
}) => {
  const { prices, loading } = usePriceData();

  const { connecting, handleConnectWallet } = useWallet(setConnectButtonState);

  const {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    estimatedUSDAmount,
    balances,
    handleFromTokenChange,
    handleToTokenChange,
    handleFromAmountChange,
    handleToAmountChange,
    executeSwap,
    hasSufficientBalance,
  } = useTokenSwap(prices);

  const {
    acknowledgedOpen,
    successOpen,
    insufficientBalanceOpen,
    showNotification,
    closeNotification,
  } = useNotifications();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleSwapClick = () => {
    if (!hasSufficientBalance()) {
      showNotification("error");
      return;
    }
    setOpenModal(true);
  };

  const handleSwap = () => {
    showNotification("acknowledged");

    setTimeout(() => {
      executeSwap();
      showNotification("success");
    }, 3000);

    setOpenModal(false);
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", padding: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: "0 auto",
        backgroundColor: "transparent",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TokenInput
        label="From"
        selectedToken={fromToken}
        amount={fromAmount}
        onTokenChange={handleFromTokenChange}
        onAmountChange={handleFromAmountChange}
        estimatedUSDAmount={estimatedUSDAmount}
        balance={balances[fromToken.symbol]}
      />

      <TokenInput
        label="To"
        selectedToken={toToken}
        amount={toAmount}
        onTokenChange={handleToTokenChange}
        onAmountChange={handleToAmountChange}
        estimatedUSDAmount={estimatedUSDAmount}
        balance={balances[toToken.symbol]}
      />

      <SwapButton
        isConnected={connectButtonState === "Connected"}
        connecting={connecting}
        onConnect={handleConnectWallet}
        onSwap={handleSwapClick}
      />

      <ConfirmSwapModal
        open={openModal}
        fromToken={fromToken}
        toToken={toToken}
        fromAmount={fromAmount}
        toAmount={toAmount}
        onClose={() => setOpenModal(false)}
        onConfirm={handleSwap}
      />

      <SnackbarNotification
        open={acknowledgedOpen}
        message="Transfer acknowledged and processing..."
        onClose={() => closeNotification("acknowledged")}
      />
      <SnackbarNotification
        open={successOpen}
        message="Transfer successful!"
        onClose={() => closeNotification("success")}
      />
      <SnackbarNotification
        open={insufficientBalanceOpen}
        message="Insufficient balance!"
        onClose={() => closeNotification("error")}
      />
    </Box>
  );
};

export default TokenSwap;