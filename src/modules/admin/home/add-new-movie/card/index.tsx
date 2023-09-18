import { Button, Stack, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";
export const AddNewMovie = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="text"
      sx={{
        bgcolor: "secondary.100",
        borderRadius: 1,
        p: 1,
        justifyContent: "space-between",
        alignItems: "center",
        maxHeight: "none",
        height: "auto",
        width: { lg: "49%", md: "100%", sm: "100%", xs: "100%" },
      }}
      onClick={() => navigate("/admin/add-movie")}
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
