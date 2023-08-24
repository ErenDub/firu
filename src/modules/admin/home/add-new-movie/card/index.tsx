import { Button, Stack, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
export const AddNewMovie = () => {
  return (
    <Button
      variant="text"
      sx={{
        bgcolor: "secondary.light",
        borderRadius: 1,
        p: 1,
        justifyContent: "space-between",
        alignItems: "center",
        maxHeight: "none",
        height: "auto",
        width: { lg: "49%", md: "100%", sm: "100%", xs: "100%" },
      }}
    >
      <Stack gap={1} justifyContent="start" alignItems="start">
        <Typography variant="h3">დამატება</Typography>
        <Typography>ფილმის ან სერიალის დამატება</Typography>
      </Stack>
      <AddRoundedIcon
        sx={{
          color: "text.primary",
        }}
      />
    </Button>
  );
};
