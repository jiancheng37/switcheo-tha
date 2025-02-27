import React, { useState } from "react";
import { Box, Button, Typography, Avatar, FormControl, Input } from "@mui/material";
import TokenSelector from "./TokenSelector";
import { Token } from "../types";

interface TokenInputProps {
  label: string;
  selectedToken: Token;
  amount: string;
  onTokenChange: (token: Token) => void;
  onAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  estimatedUSDAmount?: string;
  balance: number;
}

const TokenInput: React.FC<TokenInputProps> = ({
  label,
  selectedToken,
  amount,
  onTokenChange,
  onAmountChange,
  estimatedUSDAmount,
  balance,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <Box
      sx={{
        margin: 1,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        padding: "60px 20px",
        borderRadius: 6,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Box display="flex" justifyContent="flex-start" alignItems="flex-start" sx={{ flex: 1 }}>
          <Typography sx={{ color: "#2c4c5c", fontSize: "2rem", fontWeight: "bold" }}>{label}</Typography>
        </Box>
        <Button
          onClick={() => setModalOpen(true)}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#10141F",
            padding: "10px 20px",
            borderRadius: 2,
            flex: 1,
          }}
        >
          <Avatar src={selectedToken.icon} sx={{ width: 24, height: 24, marginRight: 1 }} />
          <Typography sx={{ color: "#FFFFFF" }}>{selectedToken.symbol}</Typography>
        </Button>
        <Box sx={{ flex: 1 }} />
        <TokenSelector open={isModalOpen} onClose={() => setModalOpen(false)} onSelect={onTokenChange} />
      </Box>

      <Box flexDirection="column" display="flex" alignItems="center" justifyContent="center" sx={{ width: "100%" }}>
        <Box sx={{ marginTop: 1, width: "100%", display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="body2" sx={{ color: "#8b9c64", fontWeight: "bold" }}>
            Balance: {balance} {selectedToken.symbol}
          </Typography>
        </Box>
        <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
          <FormControl fullWidth sx={{ display: "flex" }}>
            <Input
              value={amount}
              onChange={onAmountChange}
              placeholder="0.0"
              type="number"
              disableUnderline
              sx={{
                backgroundColor: "transparent",
                color: "#E2FCA4",
                padding: 1,
                borderRadius: 1,
                outline: "none",
                fontSize: "3rem",
                fontWeight: "bold",
              }}
              inputProps={{
                style: { textAlign: "right" },
                inputMode: "decimal",
                pattern: "[0-9]*",
              }}
            />
          </FormControl>
        </Box>
        <Box sx={{ marginTop: 1, width: "100%", display: "flex", justifyContent: "flex-end" }}>
          {estimatedUSDAmount && (
            <Typography variant="body2" sx={{ color: "#2c4c5c" }}>
              ~${estimatedUSDAmount}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TokenInput;
