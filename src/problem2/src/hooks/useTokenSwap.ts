import { useState } from "react";
import { Token } from "../types";
import { tokenList, initialBalances } from "../data/tokenData";

export const useTokenSwap = (prices: Record<string, number>) => {
  const [fromToken, setFromToken] = useState<Token>(tokenList[0]);
  const [toToken, setToToken] = useState<Token>(tokenList[1]);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [estimatedUSDAmount, setEstimatedUSDAmount] = useState<string>("");
  const [balances, setBalances] = useState<Record<string, number>>(initialBalances);

  const handleFromTokenChange = (token: Token) => {
    setFromToken(token);
    resetAmounts();
  };

  const handleToTokenChange = (token: Token) => {
    setToToken(token);
    resetAmounts();
  };

  const resetAmounts = () => {
    setToAmount("");
    setFromAmount("");
    setEstimatedUSDAmount("0");
  };

  const calculateToAmount = (amount: string, from: Token, to: Token): string => {
    if (!prices[from.symbol] || !prices[to.symbol]) return "0";

    const fromPrice = prices[from.symbol];
    const toPrice = prices[to.symbol];
    const amountNumber = parseFloat(amount) || 0;

    const estimatedToValue = (amountNumber * fromPrice) / toPrice;
    return estimatedToValue.toFixed(4);
  };

  const calculateFromAmount = (amount: string, to: Token, from: Token): string => {
    if (!prices[from.symbol] || !prices[to.symbol]) return "0";

    const fromPrice = prices[from.symbol];
    const toPrice = prices[to.symbol];
    const amountNumber = parseFloat(amount) || 0;

    const estimatedFromValue = (amountNumber * toPrice) / fromPrice;
    return estimatedFromValue.toFixed(4);
  };
  
  const handleFromAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = event.target.value;
    setFromAmount(newAmount);
    
    if (newAmount === "" || parseFloat(newAmount) === 0) {
      resetAmounts();
    } else {
      const calculatedToAmount = calculateToAmount(newAmount, fromToken, toToken);
      setToAmount(calculatedToAmount);
      setEstimatedUSDAmount((parseFloat(newAmount) * (prices[fromToken.symbol] || 0)).toFixed(2));
    }
  };

  const handleToAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = event.target.value;
    setToAmount(newAmount);
    
    if (newAmount === "" || parseFloat(newAmount) === 0) {
      resetAmounts();
    } else {
      const calculatedFromAmount = calculateFromAmount(newAmount, toToken, fromToken);
      setFromAmount(calculatedFromAmount);
      setEstimatedUSDAmount((parseFloat(newAmount) * (prices[toToken.symbol] || 0)).toFixed(2));
    }
  };

  const executeSwap = () => {
    const fromTokenSymbol = fromToken.symbol;
    const toTokenSymbol = toToken.symbol;
    const fromAmountNum = parseFloat(fromAmount);
    const toAmountNum = parseFloat(toAmount);

    setBalances({
      ...balances,
      [fromTokenSymbol]: balances[fromTokenSymbol] - fromAmountNum,
      [toTokenSymbol]: balances[toTokenSymbol] + toAmountNum,
    });

    resetAmounts();
  };

  const hasSufficientBalance = (): boolean => {
    const fromTokenSymbol = fromToken.symbol;
    return parseFloat(fromAmount) <= balances[fromTokenSymbol];
  };

  return {
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
  };
};