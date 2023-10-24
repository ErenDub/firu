import { Box, Button, Chip, Skeleton, Stack, Typography } from "@mui/material";
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useQuery } from "react-query";
import { getTopWeek } from "../home-fetch";
import { MovieTrailerDialog } from "modules/full-movie/dialogs/movie-trailer-dialog";
import { useNavigate } from "react-router-dom";
export const Banner = () => {
  const $getTopWeek = useQuery("top-of-the-week-1", () =>
    getTopWeek({ limit: 1 })
  );
  const navigate = useNavigate();
  return (
    <Box
      height={{ lg: "80vh", md: "80vh", sm: "100vh", xs: "100vh" }}
      sx={{
        position: "relative",
      }}
    >
      <ParallaxProvider>
        {$getTopWeek.isLoading && <Skeleton height="80vh" />}
        {$getTopWeek.data &&
          $getTopWeek.data.movies.map((movie) => (
            <ParallaxBanner
              key={movie.id}
              layers={[
                {
                  speed: -25,
                  image: movie.banner,
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
                  mb={{ lg: 5, md: 5, sm: 4, xs: 2 }}
                  direction="row"
                >
                  <Box
                    component="img"
                    src={movie.logo}
                    height={{ lg: 100, md: 100, sm: "auto", xs: "auto" }}
                    width={{ lg: "auto", md: "auto", sm: "100%", xs: "100%" }}
                  />
                </Stack>

                <Typography>{movie.description}</Typography>
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
                >
                  <Chip
                    label={`${movie.age} | ${movie.year}  | ${movie.duration}`}
                  />

                  <Typography>
                    {movie.seasonsCount} სეზონი | {movie.lastSeasonEpCount}{" "}
                    სერია
                  </Typography>
                </Stack>
                <Typography fontSize={12}>
                  {movie.categories.map(
                    (category, index) =>
                      `${category}${
                        index === movie.categories.length - 1 ? "." : ", "
                      }`
                  )}
                </Typography>
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
                    onClick={() => navigate(`/watch/${movie.id}`)}
                  >
                    ყურება
                  </Button>

                  <MovieTrailerDialog trailer={movie.trailer} />
                </Stack>
              </Box>
            </ParallaxBanner>
          ))}
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
