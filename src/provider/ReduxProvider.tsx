"use client";
import { store } from "@/redux/store/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import AuthProvider from "./AuthProvider";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Toaster position="top-center" richColors={true} />
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};

export default ReduxProvider;
