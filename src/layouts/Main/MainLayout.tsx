import { Box } from "@mui/material";
import React from "react";
import { useAppStore } from "../../store/store";
import { useMustLoggedIn } from "../../utils/customhooks";
import BottomMenu from "./BottomMenu";
import LeftMenu from "./LeftMenu";
import { Outlet } from "react-router";

export default function MainLayout() {
  const isMobile = useAppStore((state) => state.isMobile);
  useMustLoggedIn();

  return (
    <Box>
      {isMobile ? <BottomMenu /> : <LeftMenu />}
      <Outlet />
    </Box>
  );
}
