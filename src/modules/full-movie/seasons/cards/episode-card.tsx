import { Box, Stack, Typography } from "@mui/material";
import { TEpisode } from "modules/admin/admin-type";
import { useNavigate } from "react-router-dom";

export const EpisodeCard = ({
  episode,
  index,
}: {
  episode: TEpisode;
  index: number;
}) => {
  const navigate = useNavigate();
  return (
    <Stack
      borderRadius={2}
      width={220}
      bgcolor="secondary.100"
      sx={{
        position: "relative",
        transition: "transform 0.2s",
        cursor: "pointer",
        ":hover": {
          transform: "scale(1.1)",
        },
      }}
      onClick={() => navigate(`${episode.id}`)}
    >
      <Box
        component="img"
        src={episode.poster}
        width={220}
        height={128}
        borderRadius="inherit"
        sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
      />
      <Typography
        sx={{
          position: "absolute",
          top: 5,
          left: 5,
          textShadow: " 0px 0px 7px rgba(0, 0, 0, 1)",
          fontSize: 12,
        }}
      >
        {episode.duration} წუთი
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          textShadow: " 0px 0px 7px rgba(0, 0, 0, 1)",
          fontSize: 30,
          opacity: 0.7,
        }}
      >
        {index + 1}
      </Typography>
      <Typography p={1} fontSize={14}>
        {episode.title}
      </Typography>
    </Stack>
  );
};
