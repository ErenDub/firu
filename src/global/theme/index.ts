import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#414bb2",
    },
    secondary: {
      main: "#EB455F",
    },
    success: {
      main: "#5E8B7E",
      light: "#8fd14f",
    },
    text: {
      primary: "#222831",
      secondary: "#DFD3C3",
      disabled: "#DDDDDD",
    },
    background: {
      default: "#FAF7F0",
    },
    divider: "#EDEEF2",
    error: {
      main: "#992f2f",
    },
    info: {
      main: "#1F68FA",
    },
    warning: {
      main: "#FBA930",
    },
  },

  components: {
    MuiPaper: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#F4F4F4",
        },
      },
    },
  },

  typography: {
    fontFamily: "Roboto",
  },
});

const { pxToRem, fontFamily } = muiTheme.typography;

muiTheme.typography = {
  ...muiTheme.typography,

  h1: {
    fontFamily: "Roboto",
    fontSize: pxToRem(24),
    lineHeight: pxToRem(32),
    fontWeight: 600,
    letterSpacing: "0.68px",
  },

  h2: {
    fontFamily: "Roboto",
    fontSize: pxToRem(18),
    lineHeight: pxToRem(24),
    fontWeight: 600,
    letterSpacing: "0.52px",
  },

  h3: {
    fontFamily: "Roboto",
    fontSize: pxToRem(16),
    lineHeight: pxToRem(21),
    fontWeight: 600,
    letterSpacing: "0.45px",
  },

  h4: {
    fontFamily: "Roboto",
    fontSize: pxToRem(14),
    lineHeight: pxToRem(21),
    fontWeight: 600,
    letterSpacing: "0.45px",
  },

  body1: {
    fontFamily,
    fontSize: pxToRem(15),
    lineHeight: pxToRem(19),
    fontWeight: 400,
    letterSpacing: "0.52px",
  },

  body2: {
    fontFamily,
    fontSize: pxToRem(14),
    lineHeight: pxToRem(18),
    fontWeight: 400,
    letterSpacing: "0.52px",
  },

  caption: {
    fontFamily,
    display: "inline-block",
    fontSize: pxToRem(12),
    lineHeight: pxToRem(16),
    fontWeight: 400,
    letterSpacing: "0.52px",
  },

  button: {
    fontFamily: "Roboto",
  },
};

muiTheme.components = {
  ...muiTheme.components,
  MuiSkeleton: {
    defaultProps: {
      variant: "rounded",
      sx: { my: 0, py: 0, m: 0, p: 0 },
      width: "100%",
    },
  },
  MuiChip: {
    defaultProps: {
      sx: {
        borderRadius: 0,
        py: 3,
        px: 5,
        width: { lg: "auto", md: "auto", sm: "100%", xs: "100%" },
      },
      color: "primary",
    },
  },
  MuiDivider: {
    defaultProps: {
      sx: { borderBottomColor: "#dbdbdb" },
    },
  },
  MuiButton: {
    defaultProps: {
      variant: "contained",
      color: "primary",
      disableElevation: true,
      sx: {
        "&.Mui-disabled": {
          opacity: 0.5,
          color: "text.primary",
        },
      },
    },
    variants: [
      {
        props: { variant: "contained" },
        style: {
          minHeight: 38,
          boxShadow:
            "0px 1px 3px -1px rgba(0, 0, 0, 0.3), 0px 2px 5px -1px rgba(50, 50, 93, 0.25)",
          "&:hover": {
            boxShadow:
              "0px 2px 3px -1px rgba(0, 0, 0, 0.3), 0px 3px 6px -1px rgba(50, 50, 93, 0.25)",
          },
          "&:focus": {
            boxShadow:
              "0px 2px 3px -1px rgba(0, 0, 0, 0.3), 0px 3px 6px -1px rgba(50, 50, 93, 0.25)",
          },
          color: "#FFF",
        },
      },
      {
        props: { variant: "outlined" },
        style: {
          height: 38,
          boxShadow:
            "0px 1px 3px -1px rgba(0, 0, 0, 0.15), 0px 2px 5px -1px rgba(50, 50, 93, 0.12)",
          "&:hover": {
            boxShadow:
              "0px 2px 3px -1px rgba(0, 0, 0, 0.15), 0px 3px 4px -1px rgba(50, 50, 93, 0.12)",
          },
          "&:focus": {
            boxShadow:
              "0px 2px 3px -1px rgba(0, 0, 0, 0.15), 0px 3px 4px -1px rgba(50, 50, 93, 0.12)",
          },
        },
      },
      {
        props: { variant: "text" },
        style: {
          height: 38,

          "&:hover": {
            boxShadow:
              "0px 2px 3px -1px rgba(0, 0, 0, 0.15), 0px 3px 4px -1px rgba(50, 50, 93, 0.12)",
          },
          "&:focus": {
            boxShadow:
              "0px 2px 3px -1px rgba(0, 0, 0, 0.15), 0px 3px 4px -1px rgba(50, 50, 93, 0.12)",
          },
        },
      },
    ],
  },

  MuiInputBase: {
    defaultProps: {
      sx: { fontFamily: "Roboto" },
    },
  },

  MuiTab: {
    defaultProps: {
      sx: { fontFamily: "Roboto" },
    },
  },
  MuiTableHead: {
    defaultProps: {
      sx: { fontFamily: "Roboto" },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: muiTheme.palette.text.primary,
      },
    },
  },
};
