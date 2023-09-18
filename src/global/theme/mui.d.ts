import "@mui/material";

type CustomSingleColor = {
  blue100: string;
};

declare module "@mui/material/styles" {
  interface Palette extends CustomSingleColor {
    blue100: Palette["primary"];
  }

  interface PaletteOption extends CustomSingleColor {
    blue100: PaletteOption["primary"];
  }
}
