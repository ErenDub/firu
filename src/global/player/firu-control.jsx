// @ts-ignore
// @ts-ignore
import React, { useState } from "react";
import {
  Slider,
  IconButton,
  Box,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  CircularProgress,
  Chip,
} from "@mui/material";
import Forward10Icon from "@mui/icons-material/Forward10";
import Replay5Icon from "@mui/icons-material/Replay5";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import SettingsIcon from "@mui/icons-material/Settings";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Grow from "@mui/material/Grow";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
export const Control = ({
  // @ts-ignore
  controlRef,
  // @ts-ignore
  onPlayPause,
  // @ts-ignore
  playing,
  // @ts-ignore
  onRewind,
  // @ts-ignore
  onForward,
  // @ts-ignore
  played,
  // @ts-ignore
  onSeek,
  // @ts-ignore
  onSeekMouseUp,
  // @ts-ignore
  volume,
  // @ts-ignore
  onVolumeChangeHandler,
  // @ts-ignore
  onVolumeSeekUp,
  // @ts-ignore
  mute,
  // @ts-ignore
  onMute,
  // @ts-ignore
  duration,
  // @ts-ignore
  currentTime,
  // @ts-ignore
  onFullScreen,
  // @ts-ignore
  isFullscreen,
  // @ts-ignore
  settings,
  // @ts-ignore
  setSettings,
  // @ts-ignore
  setVideo,
  // @ts-ignore
  mouseMoveHandler,
  // @ts-ignore
  onBuffer,
  // @ts-ignore
  onPlaybackRateChange,
  // @ts-ignore
  mouseTimeChange,
  // @ts-ignore
  sliderTimerOffset,
  // @ts-ignore
  sliderTime,
  // @ts-ignore
  url,
  // @ts-ignore
  sliderRef,
  // @ts-ignore
  title,
  // @ts-ignore
  movieId,
  // @ts-ignore
  languages,
}) => {
  const [ShowSliderTime, setShowSliderTime] = useState(false);
  const [languageIndex, setLanguageIndex] = useState(0);
  const [resolutionIndex, setResolutionIndex] = useState(0);
  const navigate = useNavigate();
  // @ts-ignore
  const onLanguageChange = (index) => {
    setLanguageIndex(index);
    setVideo(languages[index].resulotions[0].url);
  };
  // @ts-ignore
  const onResolutionChange = (index) => {
    setResolutionIndex(index);
    setVideo(languages[languageIndex].resulotions[index].url);
  };
  return (
    <>
      <Stack
        justifyContent="space-between"
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.6)",
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: 1,
          transition: "0.5s",
        }}
        ref={controlRef}
        onMouseMove={mouseMoveHandler}
      >
        <Stack
          gap={1}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          p={2}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosIcon />}
            color="secondary"
            onClick={() => navigate(`/watch/${movieId}`)}
          >
            უკან
          </Button>
          <Typography fontSize={22}>{title}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="center">
          {onBuffer ? (
            <CircularProgress color="primary" />
          ) : (
            <>
              <Box onClick={onRewind}>
                <IconButton color="primary">
                  <Replay5Icon fontSize="large" />
                </IconButton>
              </Box>

              <Box onClick={onPlayPause}>
                {playing ? (
                  <IconButton color="primary">
                    <PauseIcon fontSize="large" />
                  </IconButton>
                ) : (
                  <IconButton color="primary">
                    <PlayArrowIcon fontSize="large" />
                  </IconButton>
                )}
              </Box>

              <Box onClick={onForward}>
                <IconButton color="primary">
                  <Forward10Icon fontSize="large" />
                </IconButton>
              </Box>
            </>
          )}
        </Stack>
        <Box>
          <Box
            px={2}
            sx={{
              position: "relative",
            }}
            onMouseOver={() => setShowSliderTime(true)}
            onMouseLeave={() => setShowSliderTime(false)}
          >
            <Grow in={ShowSliderTime}>
              <Stack
                justifyContent="center"
                alignItems="center"
                gap={1}
                sx={{
                  position: "absolute",
                  zIndex: 200,
                  left: sliderTimerOffset - 45,
                  bottom: 30,
                  width: 100,
                }}
              >
                <ReactPlayer
                  url={url}
                  ref={sliderRef}
                  className="player"
                  height="70px"
                  muted={true}
                />
                <Chip color="primary" label={sliderTime} />
              </Stack>
            </Grow>

            <Slider
              // @ts-ignore
              color="primary"
              min={0}
              max={100}
              value={played * 100}
              onChange={onSeek}
              onChangeCommitted={onSeekMouseUp}
              onMouseMove={mouseTimeChange}
            />
          </Box>
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Box>
                <IconButton color="primary" onClick={onPlayPause}>
                  {playing ? (
                    <PauseIcon fontSize="medium" />
                  ) : (
                    <PlayArrowIcon fontSize="medium" />
                  )}
                </IconButton>
              </Box>
              <Box>
                <IconButton color="primary">
                  <SkipNextIcon fontSize="medium" />
                </IconButton>
              </Box>
              <Box onClick={onMute}>
                {mute ? (
                  <IconButton color="primary">
                    <VolumeOffIcon fontSize="medium" />
                  </IconButton>
                ) : (
                  <IconButton color="primary">
                    <VolumeUpIcon fontSize="medium" />
                  </IconButton>
                )}
              </Box>
              <Box width={100}>
                <Slider
                  // className={`${classes.volumeSlider}`}
                  // @ts-ignore
                  color="primary"
                  onChange={onVolumeChangeHandler}
                  value={volume * 100}
                  onChangeCommitted={onVolumeSeekUp}
                />
              </Box>
              <Box pl={1}>
                <Typography color="primary">
                  {currentTime} : {duration}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Box position="relative">
                <Grow in={settings}>
                  <Stack
                    sx={{
                      position: "absolute",
                      top: -350,
                      left: -280,
                      bgcolor: "rgba(0,0,0,0.6)",
                      width: 300,
                      height: 300,
                      overflowY: "scroll",
                      p: 1,
                    }}
                  >
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>ხარისხი</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          {languages[languageIndex].resolutions.map(
                            (
                              // @ts-ignore
                              resolution,
                              // @ts-ignore
                              index
                            ) => (
                              <Grid item key={resolution.id}>
                                <Button
                                  color="primary"
                                  variant={
                                    resolutionIndex === index
                                      ? "contained"
                                      : "outlined"
                                  }
                                  size="small"
                                  fullWidth
                                  onClick={() => onResolutionChange(index)}
                                >
                                  {resolution.resolution}
                                </Button>
                              </Grid>
                            )
                          )}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>გახმოვანება</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          {languages.map(
                            (
                              // @ts-ignore
                              language,
                              // @ts-ignore
                              index
                            ) => (
                              <Grid item key={language.id}>
                                <Button
                                  color="primary"
                                  variant={
                                    languageIndex === index
                                      ? "contained"
                                      : "outlined"
                                  }
                                  size="small"
                                  fullWidth
                                  onClick={() => onLanguageChange(index)}
                                >
                                  {language.language}
                                </Button>
                              </Grid>
                            )
                          )}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography>სიჩქარე</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          <Grid item>
                            <Button
                              color="primary"
                              variant="outlined"
                              size="small"
                              fullWidth
                              onClick={() => onPlaybackRateChange(0.5)}
                            >
                              0.5
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              color="primary"
                              variant="outlined"
                              size="small"
                              fullWidth
                              onClick={() => onPlaybackRateChange(1.0)}
                            >
                              1
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              color="primary"
                              variant="outlined"
                              size="small"
                              fullWidth
                              onClick={() => onPlaybackRateChange(1.5)}
                            >
                              1.5
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              color="primary"
                              variant="outlined"
                              size="small"
                              fullWidth
                              onClick={() => onPlaybackRateChange(2.0)}
                            >
                              2
                            </Button>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Stack>
                </Grow>
                <IconButton
                  color="primary"
                  // @ts-ignore
                  onClick={() => setSettings((prev) => !prev)}
                >
                  <SettingsIcon fontSize="medium" />
                </IconButton>
              </Box>
              <Box>
                <IconButton color="primary" onClick={onFullScreen}>
                  {isFullscreen ? (
                    <FullscreenExitIcon fontSize="medium" />
                  ) : (
                    <FullscreenIcon fontSize="medium" />
                  )}
                </IconButton>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
