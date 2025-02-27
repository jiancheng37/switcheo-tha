import { Box } from "@mui/material";
import Header from "./components/Header";
import TokenSwap from "./components/TokenSwap";
import { useState } from "react";

function App() {
  const [connectButtonState, setConnectButtonState] = useState<string>("Connect Wallet");


  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box flexShrink={0}>
        <Header connectButtonState={connectButtonState} setConnectButtonState={setConnectButtonState}/>
      </Box>
      
      <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center">
        <TokenSwap connectButtonState={connectButtonState} setConnectButtonState={setConnectButtonState}/>
      </Box>
    </Box>
  );
}

export default App;
