import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#037AEB",
    },
    secondary: {
      main: "#FFFFFF",
    },
    success: {
      main: "#5E8B7E",
      light: "#8fd14f",
    },
    text: {
      primary: "#F9F9F9",
      secondary: "#1c1c1c",
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
    // fontFamily: "MarkGEO-regular",
  },
});

const { pxToRem } = muiTheme.typography;

muiTheme.typography = {
  ...muiTheme.typography,

  h1: {
    fontFamily: "MarkGEOCAPS-bold !important",
    fontSize: pxToRem(28),
    lineHeight: pxToRem(32),
    letterSpacing: "0.68px",
    color: "text.primary",
  },

  h2: {
    fontFamily: "MarkGEOCAPS-bold !important",
    fontSize: pxToRem(22),
    lineHeight: pxToRem(24),
    letterSpacing: "0.52px",
    color: "text.primary",
  },

  h3: {
    fontFamily: "MarkGEOCAPS-semiBold !important",
    fontSize: pxToRem(18),
    lineHeight: pxToRem(21),
    letterSpacing: "0.45px",
    color: "text.primary",
  },

  h4: {
    fontFamily: "MarkGEOCAPS-semiBold !important",
    fontSize: pxToRem(16),
    lineHeight: pxToRem(21),
    letterSpacing: "0.45px",
    color: "text.primary",
  },

  body1: {
    fontFamily: "MarkGEO-regular !important",
    fontSize: pxToRem(15),
    lineHeight: pxToRem(19),
    letterSpacing: "0.52px",
    color: "text.primary",
  },

  body2: {
    fontFamily: "MarkGEO-regular !important",
    fontSize: pxToRem(14),
    lineHeight: pxToRem(18),
    letterSpacing: "0.52px",
    color: "text.primary",
  },

  caption: {
    fontFamily: "MarkGEO-regular !important",
    display: "inline-block",
    fontSize: pxToRem(12),
    lineHeight: pxToRem(16),
    letterSpacing: "0.52px",
    color: "text.primary",
  },

  button: {
    fontFamily: "MarkGEOCAPS-medium",
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
  MuiAlertTitle: {
    defaultProps: {
      sx: {
        fontSize: 20,
        fontFamily: "MarkGEOCAPS-semiBold !important",
      },
    },
  },
  MuiDivider: {
    defaultProps: {
      sx: { borderBottomColor: "#dbdbdb" },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: "filled",
    },
  },
  MuiAlert: {
    defaultProps: {
      sx: { border: 0 },
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
          // color: "text.primary",
        },
      },
    },
    variants: [
      {
        props: { variant: "contained" },
        style: {
          minHeight: 45,
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
          // color: "#FFF",
        },
      },
      {
        props: { variant: "outlined" },
        style: {
          height: 45,
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
          height: 45,

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
      sx: { fontFamily: "MarkGEO-regular" },
    },
  },
  MuiTypography: {
    defaultProps: {
      color: "text.primary",
      fontFamily: "MarkGEO-regular",
    },
  },
  MuiTab: {
    defaultProps: {
      sx: { fontFamily: "MarkGEO-regular" },
    },
  },
  MuiTableHead: {
    defaultProps: {
      sx: { fontFamily: "MarkGEO-regular" },
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
