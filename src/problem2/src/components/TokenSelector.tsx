import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Token {
  name: string;
  symbol: string;
  address: string;
  icon: string;
}

interface TokenSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
}

const tokenList: Token[] = [
  { name: "Ethereum", symbol: "ETH", address: "0xC3b58...fB09", icon: "/icons/ETH.svg" },
  { name: "USDC", symbol: "USDC", address: "0xA0b8...eB48", icon: "/icons/USDC.svg" },
  { name: "Wrapped Bitcoin", symbol: "WBTC", address: "0x2260...C599", icon: "/icons/WBTC.svg" },
  { name: "Zilliqa", symbol: "ZIL", address: "0x05f4...a1e7", icon: "/icons/ZIL.svg" },
  { name: "Blur", symbol: "BLUR", address: "0x1234...5678", icon: "/icons/BLUR.svg" },
  { name: "Terra", symbol: "LUNA", address: "0x1234...0976", icon: "/icons/LUNA.svg" },
];

const TokenSelector: React.FC<TokenSelectorProps> = ({ open, onClose, onSelect}) => {
  const [search, setSearch] = useState<string>("");

  const filteredTokens = tokenList.filter(
    (token) =>
      token.name.toLowerCase().includes(search.toLowerCase()) ||
      token.symbol.toLowerCase().includes(search.toLowerCase()) ||
      token.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", fontWeight: 'bold', alignItems: "center", backgroundColor: "#E2FCA4"}}>
        Select A Token
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{backgroundColor: "#E2FCA4"}}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search tokens"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            marginBottom: 2,
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#444444",
              },
              "&:hover fieldset": {
                borderColor: "#444444",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#444444",
              },
            },
          }}
        />

        <List>
          {filteredTokens.map((token) => (
            <ListItem button key={token.address} onClick={() => { onSelect(token); onClose(); }}>
              <ListItemAvatar>
                <Avatar src={token.icon} />
              </ListItemAvatar>
              <ListItemText
                primary={token.name}
                secondary={`${token.symbol}  ${token.address.slice(0, 6)}...${token.address.slice(-4)}`}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default TokenSelector;
