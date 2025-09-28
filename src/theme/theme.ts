import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    text: {
      primary: "#333f",
      secondary: "#333a",
      disabled: "#3337",
    },
    light: {
      light: "#f7f7f7",
      main: "#f2f2f2",
      dark: "#e7e7e7",
      contrastText: "#000",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: "#eee",
          padding: 12,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          backgroundColor: "#eee",
          justifyContent: "center",
          gap: 20,
        },
      },
    },
    MuiDialogContent: {
      defaultProps: {
        dividers: true,
      },
      styleOverrides: {
        root: {
          margin: 0,
          padding: 0,
        },
      },
    },
  },
  typography: {
    fontFamily: "Segoe UI",
  },
});

export default theme;
