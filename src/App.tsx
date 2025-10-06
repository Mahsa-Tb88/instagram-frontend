/* eslint-disable react-hooks/exhaustive-deps */
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { useAppStore } from "./store/store";
import { useEffect } from "react";
import theme from "./theme/theme";
import { Outlet } from "react-router";
import Initializer from "./layouts/Initializer/Initializer";
import ConfirmDialog from "./components/Dialogs/ConfirmDialog";
import ViewPostDialog from "./components/Dialogs/ViewPostDialog/ViewPostDialog";

function App() {
  const isInitialized = useAppStore((state) => state.initialized);
  const setIsMobile = useAppStore((state) => state.setIsMobile);
  const isMobile = useMediaQuery("(max-width:899px)");

  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isInitialized ? <Outlet /> : <Initializer />}
      <ConfirmDialog />
      <ViewPostDialog />
    </ThemeProvider>
  );
}

export default App;
