import { Button, Stack, Typography } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useNavigate } from "react-router-dom";
export const MovieCard = ({
  title,
  titleEn,
  id,
}: {
  title: string;
  titleEn: string;
  id: string;
}) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="text"
      onClick={() => navigate(`/admin/edit-movie/${id}`)}
      sx={{
        bgcolor: "secondary.500",
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
        <Typography variant="h3">{title} </Typography>
        <Typography>{titleEn}</Typography>
      </Stack>
      <ArrowForwardIosRoundedIcon
        sx={{
          color: "text.primary",
        }}
      />
    </Button>
  );
};
