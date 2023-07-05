import { create } from "zustand";

type SnackbarType = "success" | "error" | "warning";

interface SnackbarState {
  alert: {
    open: boolean;
    type: SnackbarType;
    message: string;
  };
  showAlert: (type: SnackbarType, message: string) => void;
  closeAlert: () => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  alert: {
    open: false,
    type: "success",
    message: "",
  },
  getAlertState: () => {},
  showAlert: (type, message) => {
    set(() => ({
      alert: {
        open: true,
        type,
        message,
      },
    }));
  },
  closeAlert: () => {
    set(() => ({
      alert: {
        open: false,
        type: "success",
        message: "",
      },
    }));
  },
}));
