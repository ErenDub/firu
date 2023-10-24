import { Box, Typography } from "@mui/material";
import { useState } from "react";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import { useNavigate } from "react-router-dom";
export const BannerSliderItem = ({
  banner,
  title,
  titleEn,
  id,
}: {
  banner: string;
  title: string;
  titleEn: string;
  id: string;
}) => {
  const [showHover, setShowHover] = useState(false);
  const navigate = useNavigate();
  return (
    <Box
      width={{ lg: 384, md: 384, sm: 240, xs: 240 }}
      height={{ lg: 216, md: 216, sm: 135, xs: 135 }}
      onMouseOver={() => setShowHover(true)}
      onMouseLeave={() => setShowHover(false)}
      onClick={() => navigate(`/watch/${id}`)}
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        width={{ lg: 384, md: 384, sm: 240, xs: 240 }}
        height={{ lg: 216, md: 216, sm: 135, xs: 135 }}
        bgcolor="black"
        sx={{
          transition: "opacity 0.2s",
          opacity: showHover ? 0.5 : 0,
          position: "absolute",
          cursor: "pointer",
        }}
      />
      <Box
        sx={{
          transition: "opacity 0.2s, bottom 0.4s",
          opacity: showHover ? 1 : 0,
          position: "absolute",
          cursor: "pointer",
          p: 1,
          bottom: showHover ? 0 : -30,
          objectFit: "cover",
        }}
      >
        <Typography variant="h4">{title}</Typography>
        <Typography>{titleEn}</Typography>
      </Box>
      <Box
        sx={{
          transition: "opacity 0.2s, transform 0.4s",
          opacity: showHover ? 1 : 0,
          position: "absolute",
          cursor: "pointer",
          bottom: showHover ? 0 : -30,
          top: "50%",
          left: "50%",
          transform: `translate(-50%, ${showHover ? "-60%" : "-100%"})`,
          objectFit: "cover",
        }}
      >
        <PlayCircleOutlineRoundedIcon
          sx={{
            color: "text.primary",
            fontSize: 100,
          }}
        />
      </Box>
      <Box
        component="img"
        src={banner}
        sx={{
          width: { lg: 384, md: 384, sm: 240, xs: 240 },
          height: { lg: 216, md: 216, sm: 135, xs: 135 },
          objectFit: "cover",
        }}
      />
    </Box>
  );
};
