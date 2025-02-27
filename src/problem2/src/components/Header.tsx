import React from "react";
import { Typography, Button, Box } from "@mui/material";

const NAV_ITEMS = [
  { label: "Swap", isActive: true },
  { label: "Liquidity", isActive: false },
  { label: "Portfolio", isActive: false },
  { label: "Perpetuals", isActive: false }
];

interface HeaderProps {
  connectButtonState: string;
  setConnectButtonState: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ connectButtonState, setConnectButtonState }) => {
  const handleHeaderConnectClick = () => {
    if (connectButtonState === "Connected") {
      setConnectButtonState("Connect Wallet");
    } else {
      setConnectButtonState("Connecting...");
      setTimeout(() => {
        setConnectButtonState("Connected");
      }, 2000);
    }
  };

  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 4,
      backgroundColor: "transparent"
    },
    logoContainer: {
      flex: 1, 
      display: "flex", 
      justifyContent: "flex-start"
    },
    logo: {
      fontFamily: '"Objectivity Bold", sans-serif',
      letterSpacing: "2px",
      color: "#2c4c5c",
      fontSize: "1.3rem"
    },
    logoAccent: {
      color: "#E2FCA4"
    },
    navContainer: {
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      gap: 4, 
      flex: 1
    },
    navButton: {
      textTransform: "none",
      fontSize: "1.1rem"
    },
    activeNavButton: {
      color: "#E2FCA4",
      fontWeight: "bold"
    },
    inactiveNavButton: {
      color: "#2c4c5c"
    },
    connectButtonContainer: {
      flex: 1, 
      display: "flex", 
      justifyContent: "flex-end"
    },
    connectButton: {
      backgroundColor: "#E2FCA4",
      color: "#2c4c5c",
      fontWeight: "bold",
      fontSize: "1rem",
      textTransform: "none",
      borderRadius: "8px",
      paddingX: 3
    }
  };

  const renderNavButtons = () => {
    return NAV_ITEMS.map((item) => (
      <Button
        key={item.label}
        sx={{
          ...styles.navButton,
          ...(item.isActive ? styles.activeNavButton : styles.inactiveNavButton)
        }}
      >
        {item.label}
      </Button>
    ));
  };

  return (
    <Box sx={styles.header}>
      <Box sx={styles.logoContainer}>
        <Typography sx={styles.logo}>
          SWITCHEO
          <span style={styles.logoAccent}>SWAP</span>
        </Typography>
      </Box>

      <Box sx={styles.navContainer}>
        {renderNavButtons()}
      </Box>
      
      <Box sx={styles.connectButtonContainer}>
        <Button
          variant="contained"
          onClick={handleHeaderConnectClick}
          sx={styles.connectButton}
        >
          {connectButtonState}
        </Button>
      </Box>
    </Box>
  );
};

export default Header;