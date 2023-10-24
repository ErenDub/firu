import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { MovieTrailerDialog } from "../dialogs/movie-trailer-dialog";
import { MutableRefObject } from "react";
export const Banner = ({
  logo,
  age,
  year,
  seasonsCount,
  episodesCount,
  categories,
  directors,
  studios,
  country,
  banner,
  lastSeasonEpCount,
  duration,
  trailer,
  scrollEpisodesRef,
}: {
  logo: string;
  age: string;
  year: number;
  seasonsCount: number;
  episodesCount: number;
  categories: Array<string>;
  directors: Array<string>;
  studios: Array<string>;
  country: string;
  banner: string;
  lastSeasonEpCount: string;
  duration: number;
  trailer: string;
  scrollEpisodesRef: MutableRefObject<HTMLElement | null>;
}) => {
  return (
    <Box
      height={{ lg: "100vh", md: "100vh", sm: "100vh", xs: "100vh" }}
      sx={{
        position: "relative",
      }}
    >
      <ParallaxProvider>
        <ParallaxBanner
          layers={[
            {
              speed: -25,
              image: banner,
            },
          ]}
          className="aspect-[2/1]"
          style={{ height: "100%" }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 100,
              left: { lg: 110, md: 110, sm: 10, xs: 10 },
              zIndex: 3,
              width: { lg: 800, md: 800, sm: "95%", xs: "95%" },
            }}
          >
            <Stack
              justifyContent={{
                lg: "start",
                md: "start",
                sm: "center",
                xs: "center",
              }}
              mb={{ lg: 2, md: 2, sm: 2, xs: 2 }}
              direction="row"
            >
              <Box
                component="img"
                src={logo}
                height={{ lg: 100, md: 100, sm: "auto", xs: "auto" }}
                width={{ lg: "auto", md: "auto", sm: "100%", xs: "100%" }}
              />
            </Stack>
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              justifyContent={{
                lg: "start",
                md: "start",
                sm: "center",
                xs: "center",
              }}
              my={2}
              flexWrap="wrap"
            >
              <Chip label={`${age} | ${year} | ${duration} წუთი`} />

              <Typography>
                {seasonsCount} სეზონი | {lastSeasonEpCount} სერია | სულ{" "}
                {episodesCount} სერია
              </Typography>
            </Stack>
            <Stack
              alignItems="center"
              direction="row"
              mt={1}
              gap={1}
              flexWrap="wrap"
            >
              <Typography>
                {categories.length > 1 ? " კატეგორიები: " : "კატეგორია: "}
              </Typography>
              {categories.map((category) => (
                <Chip
                  sx={{
                    transition: "0.2s",
                    ":hover": {
                      color: "primary.light",
                      cursor: "pointer",
                    },
                  }}
                  key={category}
                  label={category}
                />
              ))}
            </Stack>
            <Stack
              flexWrap="wrap"
              alignItems="center"
              direction="row"
              mt={1}
              gap={1}
            >
              <Typography>ქვეყანა: </Typography>
              <Chip
                label={country}
                sx={{
                  transition: "0.2s",
                  ":hover": {
                    color: "primary.light",
                    cursor: "pointer",
                  },
                }}
              />
            </Stack>
            <Stack
              flexWrap="wrap"
              alignItems="center"
              direction="row"
              mt={1}
              gap={1}
            >
              <Typography>
                {directors.length > 1 ? " რეჟისორები: " : "რეჟისორი: "}
              </Typography>
              {directors.map((director) => (
                <Chip
                  sx={{
                    transition: "0.2s",
                    ":hover": {
                      color: "primary.light",
                      cursor: "pointer",
                    },
                  }}
                  key={director}
                  label={director}
                />
              ))}
            </Stack>
            <Stack
              flexWrap="wrap"
              alignItems="center"
              direction="row"
              mt={1}
              gap={1}
            >
              <Typography>
                {studios.length > 1 ? " სტუდიები: " : "სტუდია: "}
              </Typography>
              {studios.map((studio) => (
                <Chip
                  sx={{
                    transition: "0.2s",
                    ":hover": {
                      color: "primary.light",
                      cursor: "pointer",
                    },
                  }}
                  key={studio}
                  label={studio}
                />
              ))}
            </Stack>
            <Stack
              direction="row"
              gap={2}
              alignItems="center"
              justifyContent={{
                lg: "start",
                md: "start",
                sm: "center",
                xs: "center",
              }}
              mt={4}
            >
              <Button
                color="secondary"
                startIcon={<PlayArrowRoundedIcon />}
                onClick={() => {
                  scrollEpisodesRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center",
                  });
                }}
              >
                ყურება
              </Button>
              <MovieTrailerDialog trailer={trailer} />
              <Button
                color="secondary"
                variant="outlined"
                sx={{
                  borderRadius: 5,
                  width: 43,
                  height: 43,
                  minWidth: 0,
                  minHeight: 0,
                }}
              >
                <AddRoundedIcon />
              </Button>
            </Stack>
          </Box>
        </ParallaxBanner>
      </ParallaxProvider>
      <Box
        sx={{
          background:
            "linear-gradient(0deg, rgba(26,29,41,1) 0%, rgba(26,29,41,1) 5%, rgba(26,29,41,0.2) 100%)",
          position: "absolute",
          top: 0,
          zIndex: 2,
          height: 1,
          width: 1,
        }}
      />
    </Box>
  );
};
