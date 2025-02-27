// data/tokenData.ts
import { Token } from "../types";

export const tokenList: Token[] = [
  { name: "Ethereum", symbol: "ETH", address: "0xC3b58...fB09", icon: "/icons/ETH.svg" },
  { name: "USDC", symbol: "USDC", address: "0xA0b8...eB48", icon: "/icons/USDC.svg" },
  { name: "Wrapped Bitcoin", symbol: "WBTC", address: "0x2260...C599", icon: "/icons/WBTC.svg" },
  { name: "Zilliqa", symbol: "ZIL", address: "0x05f4...a1e7", icon: "/icons/ZIL.svg" },
  { name: "Blur", symbol: "BLUR", address: "0x1234...5678", icon: "/icons/BLUR.svg" },
  { name: "Terra", symbol: "LUNA", address: "0x1234...0976", icon: "/icons/LUNA.svg" },
];

export const initialBalances: Record<string, number> = {
  ETH: 10,
  USDC: 1000,
  WBTC: 5,
  ZIL: 10000,
  BLUR: 5000,
  LUNA: 100,
};