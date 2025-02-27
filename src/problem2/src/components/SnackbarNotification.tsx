import React from "react";
import { Snackbar, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface SnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const SnackbarNotification: React.FC<SnackbarProps> = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      message={message}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{
        "& .MuiSnackbarContent-root": {
          backgroundColor: "#2c4c5c",
          fontSize: "1.25rem",
          fontWeight: "bold",
          padding: "16px 32px",
        },
      }}
      action={
        <Button size="small" onClick={onClose}>
          <CloseIcon />
        </Button>
      }
    />
  );
};

export default SnackbarNotification;
