import type { PaletteColorOptions } from "@mui/material";

declare global {
  var SERVER_URL: string;
  var API_BASE_URL: string;
}

declare module "@mui/material" {
  interface PaletteOptions {
    light?: PaletteColorOptions;
  }

  interface ListItemButtonOwnProps {
    to?: string;
  }
}

export {};
