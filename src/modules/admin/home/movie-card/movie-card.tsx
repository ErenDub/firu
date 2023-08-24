import { Button, Stack, Typography } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
export const MovieCard = ({
  title,
  titleEn,
}: {
  title: string;
  titleEn: string;
}) => {
  return (
    <Button
      variant="text"
      sx={{
        bgcolor: "secondary.dark",
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
