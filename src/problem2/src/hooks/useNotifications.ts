import { useState } from "react";

export type NotificationType = "acknowledged" | "success" | "error";

export const useNotifications = () => {
  const [acknowledgedOpen, setAcknowledgedOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [insufficientBalanceOpen, setInsufficientBalanceOpen] = useState(false);

  const showNotification = (type: NotificationType) => {
    switch (type) {
      case "acknowledged":
        setAcknowledgedOpen(true);
        break;
      case "success":
        setSuccessOpen(true);
        break;
      case "error":
        setInsufficientBalanceOpen(true);
        break;
    }
  };

  const closeNotification = (type: NotificationType) => {
    switch (type) {
      case "acknowledged":
        setAcknowledgedOpen(false);
        break;
      case "success":
        setSuccessOpen(false);
        break;
      case "error":
        setInsufficientBalanceOpen(false);
        break;
    }
  };

  return {
    acknowledgedOpen,
    successOpen,
    insufficientBalanceOpen,
    showNotification,
    closeNotification,
  };
};