import ReactPlayer from "react-player";
import { Box } from "@mui/material";
import { Control } from "./firu-control";
import { useEffect, useRef, useState } from "react";
import screenfull from "screenfull";
import { formatTime } from "./format";
// @ts-ignore
export const FiruPlayer = ({ episode, movieId }) => {
  console.log(episode);
  const [videoState, setVideoState] = useState({
    playing: false,
    muted: false,
    volume: 0.8,
    played: 0,
    seeking: false,
    Buffer: true,
    playbackRate: 1.0,
  });
  const [video, setVideo] = useState(episode.languages[0].resolutions[0].url);
  const [settings, setSettings] = useState(false);

  // @ts-ignore
  const { playbackRate, playing, muted, volume, played, seeking, buffer } =
    videoState;
  const controlRef = useRef(null);
  const videoPlayerRef = useRef(null);
  const sliderRef = useRef(null);

  const currentTime = videoPlayerRef.current
    ? // @ts-ignore
      videoPlayerRef.current.getCurrentTime()
    : "00:00";
  const duration = videoPlayerRef.current
    ? // @ts-ignore
      videoPlayerRef.current.getDuration()
    : "00:00";

  const targetElement = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sliderTimerOffset, setSliderTimerOffset] = useState(0);
  const [sliderTime, setSliderTime] = useState(0);
  // @ts-ignore
  const mouseTimeChange = (e) => {
    let offsetX = e.clientX;
    // @ts-ignore
    let width = controlRef.current.clientWidth - 13;
    setSliderTimerOffset(offsetX);
    let percent = (offsetX / width) * duration;
    // @ts-ignore
    setSliderTime(formatTime(percent));
    // @ts-ignore
    sliderRef.current.seekTo(percent);
  };
  const handleFullscreenToggle = () => {
    if (screenfull.isEnabled) {
      // @ts-ignore
      screenfull.toggle(targetElement.current);
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(screenfull.isFullscreen);
  };

  // Attach event listener for fullscreenchange event
  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on("change", handleFullscreenChange);
    }

    // Clean up the event listener
    return () => {
      if (screenfull.isEnabled) {
        screenfull.off("change", handleFullscreenChange);
      }
    };
  }, []);

  const formatCurrentTime = formatTime(currentTime);

  const formatDuration = formatTime(duration);

  const playPauseHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing });
    setSettings(false);
  };
  const rewindHandler = () => {
    //Rewinds the video player reducing 5

    // @ts-ignore
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
  };
  const fastFowardHandler = () => {
    //FastFowards the video player by adding 10
    // @ts-ignore
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
  };
  const [showControl, setShowControl] = useState(0);
  // @ts-ignore
  const progressHandler = (state) => {
    if (showControl >= 5) {
      // @ts-ignore
      controlRef.current.style.opacity = "0";
      // @ts-ignore
      targetElement.current.style.cursor = "none";
      setSettings(false);
    } else {
      setShowControl((prev) => (prev += 1));
    }
    played !== 0 &&
      localStorage.setItem(
        "რაღაც ფილმი",
        currentTime !== "00:00" && currentTime
      );
    if (!seeking) {
      setVideoState({ ...videoState, ...state });
    }
  };

  // @ts-ignore
  // @ts-ignore
  const seekHandler = (e, value) => {
    setVideoState({ ...videoState, played: parseFloat(value) / 100 });
  };

  // @ts-ignore
  // @ts-ignore
  const seekMouseUpHandler = (e, value) => {
    setVideoState({ ...videoState, seeking: false });
    // @ts-ignore
    videoPlayerRef.current.seekTo(value / 100);
  };

  // @ts-ignore
  // @ts-ignore
  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;
    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
    });
  };

  // @ts-ignore
  // @ts-ignore
  const volumeSeekUpHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100;
    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    });
  };
  const muteHandler = () => {
    //Mutes the video player
    setVideoState({ ...videoState, muted: !videoState.muted });
  };

  // @ts-ignore
  // @ts-ignore
  const mouseMoveHandler = (e) => {
    // @ts-ignore
    controlRef.current.style.opacity = "1";
    // @ts-ignore
    targetElement.current.style.cursor = "default";
    setShowControl(0);
  };

  const bufferStartHandler = () => {
    console.log("Bufering.......");
    // @ts-ignore
    setVideoState({ ...videoState, buffer: true });
  };

  const bufferEndHandler = () => {
    console.log("buffering stoped ,,,,,,play");
    // @ts-ignore
    setVideoState({ ...videoState, buffer: false });
  };
  // @ts-ignore
  const handleChangePlayback = (value) => {
    setVideoState({ ...videoState, playbackRate: value });
  };

  // @ts-ignore
  const handleKeyDown = (event) => {
    switch (event.key) {
      case " ":
        console.log("shemovida");
        event.preventDefault();
        setVideoState((prev) => ({ ...prev, playing: !prev.playing }));
        setSettings(false);
        break;
      case "ArrowLeft":
        event.preventDefault();
        // @ts-ignore
        videoPlayerRef.current.seekTo(
          // @ts-ignore
          videoPlayerRef.current.getCurrentTime() - 5
        );
        break;
      case "ArrowRight":
        event.preventDefault();
        // @ts-ignore
        videoPlayerRef.current.seekTo(
          // @ts-ignore
          videoPlayerRef.current.getCurrentTime() + 10
        );
        break;

      case "f":
        event.preventDefault();
        handleFullscreenToggle();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          // width: { lg: 720, md: 720, sm: 720, xs: 720 },
          // height: { lg: 405, md: 405, sm: 405, xs: 405 },
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            bgcolor: "black",
            position: "absolute",
            width: 1,
            zIndex: -1,
            height: "100vh",
          }}
        />
        <Box ref={targetElement}>
          <ReactPlayer
            ref={videoPlayerRef}
            url={video}
            playing={playing}
            onStart={() => {
              const seekToTime = localStorage.getItem("რაღაც ფილმი")
                ? // @ts-ignore
                  parseInt(localStorage.getItem("რაღაც ფილმი"), 10)
                : 0;
              // @ts-ignore
              videoPlayerRef.current.seekTo(
                videoPlayerRef.current &&
                  // @ts-ignore
                  videoPlayerRef.current.getCurrentTime() + seekToTime
              );
            }}
            className="player"
            width="100%"
            height="100vh"
            volume={volume}
            muted={muted}
            onProgress={progressHandler}
            onBuffer={bufferStartHandler}
            onBufferEnd={bufferEndHandler}
            playbackRate={playbackRate}
          />
          <Control
            controlRef={controlRef}
            onPlayPause={playPauseHandler}
            playing={playing}
            onRewind={rewindHandler}
            onForward={fastFowardHandler}
            played={played}
            onSeek={seekHandler}
            onSeekMouseUp={seekMouseUpHandler}
            volume={volume}
            onVolumeChangeHandler={volumeChangeHandler}
            onVolumeSeekUp={volumeSeekUpHandler}
            mute={muted}
            onMute={muteHandler}
            duration={formatDuration}
            currentTime={formatCurrentTime}
            onFullScreen={handleFullscreenToggle}
            isFullscreen={isFullscreen}
            settings={settings}
            setSettings={setSettings}
            setVideo={setVideo}
            mouseMoveHandler={mouseMoveHandler}
            onBuffer={buffer}
            onPlaybackRateChange={handleChangePlayback}
            mouseTimeChange={mouseTimeChange}
            sliderTimerOffset={sliderTimerOffset}
            sliderTime={sliderTime}
            url={video}
            sliderRef={sliderRef}
            title={episode.title}
            movieId={movieId}
            languages={episode.languages}
          />
        </Box>
      </Box>
      {/* {buffer && <p>Loading</p>} */}
    </Box>
  );
};
