import React, { useMemo } from "react";
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Button, 
  Box, 
  Typography, 
  Divider,
  useMediaQuery,
  useTheme,
  Avatar,
  Paper
} from "@mui/material";
import { Token } from "../types";

interface SwapSummaryProps {
  label: string;
  token: Token;
  amount: string;
}

const TokenAmountDisplay: React.FC<SwapSummaryProps> = ({ label, token, amount }) => (
  <Box sx={{ marginBottom: 2 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
      {label}
    </Typography>
    <Paper 
      elevation={0}
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        p: 1.5, 
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 2
      }}
    >
      <Avatar 
        src={token.icon} 
        alt={token.symbol} 
        sx={{ width: 32, height: 32, mr: 1.5 }}
      />
      <Box>
        <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1.1rem", lineHeight: 1 }}>
          {amount} {token.symbol}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {token.name}
        </Typography>
      </Box>
    </Paper>
  </Box>
);

interface ConfirmSwapModalProps {
  open: boolean;
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  onClose: () => void;
  onConfirm: () => void;
  slippageTolerance?: number;
}

const ConfirmSwapModal: React.FC<ConfirmSwapModalProps> = ({
  open,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  onClose,
  onConfirm,
  slippageTolerance = 0.5,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { fee, minReceived } = useMemo(() => {
    const feeRate = 0.0025;
    const feeAmount = parseFloat(fromAmount) * feeRate;
    const slippageAmount = parseFloat(toAmount) * (slippageTolerance / 100);
    const minimumReceived = (parseFloat(toAmount) - slippageAmount).toFixed(4);
    
    return {
      fee: feeAmount.toFixed(4),
      minReceived: minimumReceived
    };
  }, [fromAmount, toAmount, slippageTolerance]);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 2,
          overflow: "hidden"
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          fontWeight: "bold", 
          fontSize: "1.25rem", 
          textAlign: "center", 
          backgroundColor: "#E2FCA4",
          py: 2
        }}
      >
        Confirm Your Swap
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: "#E2FCA4", px: 3, py: 2 }}>
        <Box sx={{ position: "relative" }}>
          <TokenAmountDisplay 
            label="You're giving" 
            token={fromToken} 
            amount={fromAmount} 
          />
          
          <Box 
            sx={{ 
              position: "absolute", 
              left: "50%", 
              top: "50%", 
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              backgroundColor: "#E2FCA4",
              borderRadius: "50%",
              p: 0.5
            }}
          >
          </Box>

          <TokenAmountDisplay 
            label="You're getting" 
            token={toToken} 
            amount={toAmount} 
          />

          <Paper 
            elevation={0}
            sx={{ 
              backgroundColor: "rgba(255, 255, 255, 0.5)", 
              p: 2, 
              borderRadius: 2,
              mt: 1
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Exchange Rate</Typography>
              <Typography variant="body2">
                1 {fromToken.symbol} ≈ {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(4)} {toToken.symbol}
              </Typography>
            </Box>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Network Fee</Typography>
              <Typography variant="body2">{fee} {fromToken.symbol} (0.25%)</Typography>
            </Box>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Slippage Tolerance</Typography>
              <Typography variant="body2">{slippageTolerance}%</Typography>
            </Box>
            
            <Divider sx={{ my: 1.5 }} />
            
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2" fontWeight="bold">Minimum Received</Typography>
              <Typography variant="body2" fontWeight="bold">
                {minReceived} {toToken.symbol}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions 
        sx={{ 
          justifyContent: "space-between", 
          backgroundColor: "#E2FCA4",
          px: 3,
          py: 2
        }}
      >
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ 
            borderColor: "#2c4c5c",
            color: "#2c4c5c",
            px: 3,
            "&:hover": {
              borderColor: "#2c4c5c",
              backgroundColor: "rgba(44, 76, 92, 0.1)",
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained"
          sx={{ 
            backgroundColor: "#2c4c5c",
            color: "white",
            px: 3,
            "&:hover": {
              backgroundColor: "#1e3a48",
            }
          }}
        >
          Confirm Swap
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmSwapModal;