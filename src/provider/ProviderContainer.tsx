
import ReduxProvider from "./ReduxProvider";
import { ThemeProvider } from "./theme-provider";

const ProviderContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {" "}
      <ReduxProvider>
          {children}
      </ReduxProvider>
    </ThemeProvider>
  );
};

export default ProviderContainer;
