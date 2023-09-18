import { Box, Typography } from "@mui/material";
import { useState } from "react";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
export const PosterSliderItem = ({ img }: { img: string }) => {
  const [showHover, setShowHover] = useState(false);
  return (
    <Box
      width={{ lg: 240, md: 240, sm: 128, xs: 128 }}
      height={{ lg: 360, md: 360, sm: 192, xs: 192 }}
      onMouseOver={() => setShowHover(true)}
      onMouseLeave={() => setShowHover(false)}
      sx={{
        position: "relative",
      }}
    >
      <Box
        width={{ lg: 240, md: 240, sm: 128, xs: 128 }}
        height={{ lg: 360, md: 360, sm: 192, xs: 192 }}
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
          // opacity: showHover ? 1 : 0,
          position: "absolute",
          cursor: "pointer",
          p: 1,
          bottom: showHover ? 0 : -30,
          objectFit: "cover",
        }}
      >
        <Typography variant="h4">ფილმის სახელი</Typography>
        <Typography>Movie name</Typography>
      </Box>
      <Box
        sx={{
          transition: "opacity 0.2s, transform 0.4s",
          opacity: showHover ? 1 : 0,
          position: "absolute",
          cursor: "pointer",
          // bottom: showHover ? 0 : -30,
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
        src={img}
        loading="lazy"
        sx={{
          width: { lg: 240, md: 240, sm: 128, xs: 128 },
          height: { lg: 360, md: 360, sm: 192, xs: 192 },
          objectFit: "cover",
        }}
      />
    </Box>
  );
};
