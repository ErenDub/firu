import { Box, Chip, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import { MainLayout } from "global/layouts/mainLayout";
import { getEditMovie } from "modules/admin/admin-fetch";
import { Banner } from "modules/full-movie/banner/banner";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GradeIcon from "@mui/icons-material/Grade";
import PreviewIcon from "@mui/icons-material/Preview";
import { MovieSeasons } from "modules/full-movie/seasons/movie-seasons";
import { useRef } from "react";
const FullMovie = () => {
  const { movieId } = useParams();
  const scrollEpisodesRef = useRef<null | HTMLElement>(null);
  const $getMovie = useQuery(`watch-${movieId}`, () =>
    getEditMovie({ movieId: movieId ?? "" })
  );
  return (
    <>
      {$getMovie.isLoading && (
        <Box>
          <Skeleton height="100vh" />
          <MainLayout>
            <Stack direction={{ md: "row", xs: "column" }} gap={2} mt={4}>
              <Skeleton height={400} width={300} />
              <Box width={1}>
                <Stack mb={1} gap={0.5}>
                  <Skeleton height={30} width={300} />
                  <Skeleton height={20} width={250} />
                </Stack>
                <Skeleton height={200} width="100%" />
              </Box>
            </Stack>
          </MainLayout>
        </Box>
      )}
      {$getMovie.data && (
        <Box>
          <Helmet key={$getMovie.data.title} title={$getMovie.data.title}>
            <meta name="keywords" content="My awesome website description." />
          </Helmet>
          <Banner
            age={$getMovie.data.age}
            categories={$getMovie.data.categories}
            country={$getMovie.data.country}
            directors={$getMovie.data.directors}
            episodesCount={$getMovie.data.episodesCount}
            logo={$getMovie.data.logo}
            seasonsCount={$getMovie.data.seasonsCount}
            studios={$getMovie.data.studios}
            year={$getMovie.data.year}
            banner={$getMovie.data.banner}
            lastSeasonEpCount={$getMovie.data.lastSeasonEpCount}
            duration={$getMovie.data.duration}
            trailer={$getMovie.data.trailer}
            scrollEpisodesRef={scrollEpisodesRef}
          />
          <MainLayout>
            <Stack direction={{ md: "row", xs: "column" }} gap={2}>
              <Box
                component="img"
                src={$getMovie.data.poster}
                width={{ md: 300, xs: 1 }}
              />
              <Box>
                <Stack mb={1} gap={0.5}>
                  <Typography variant="h1">{$getMovie.data.title}</Typography>
                  <Typography variant="h4">{$getMovie.data.titleEn}</Typography>
                </Stack>
                <Typography>{$getMovie.data.description}</Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  mt={2}
                  gap={2}
                  flexWrap="wrap"
                  sx={{ cursor: "default" }}
                >
                  <Tooltip title="კომენტარების რაოდენობა">
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      gap={1}
                      color="white"
                    >
                      <CommentIcon /> {$getMovie.data.commentsCount}
                    </Stack>
                  </Tooltip>
                  <Tooltip title="ნახვების რაოდენობა">
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      gap={1}
                      color="white"
                    >
                      <VisibilityIcon /> {$getMovie.data.viewsCount}
                    </Stack>
                  </Tooltip>
                  <Tooltip title="კვირის ნახვების რაოდენობა">
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      gap={1}
                      color="white"
                    >
                      <PreviewIcon /> {$getMovie.data.viewsCount}
                    </Stack>
                  </Tooltip>
                  <Tooltip title="imdb რეიტინგი">
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      gap={1}
                      color="white"
                    >
                      <GradeIcon /> {$getMovie.data.imdb}
                    </Stack>
                  </Tooltip>
                </Stack>

                <Stack
                  alignItems="center"
                  direction="row"
                  mt={2}
                  gap={1}
                  flexWrap="wrap"
                >
                  <Typography>თეგები: </Typography>
                  {$getMovie.data.tags.map((tag) => (
                    <Chip
                      key={tag}
                      sx={{
                        transition: "0.2s",
                        ":hover": {
                          color: "primary.light",
                          cursor: "pointer",
                        },
                      }}
                      label={tag}
                    />
                  ))}
                </Stack>
              </Box>
            </Stack>
            <MovieSeasons
              seasons={$getMovie.data.seasons}
              type={$getMovie.data.type}
              scrollEpisodesRef={scrollEpisodesRef}
            />
          </MainLayout>
        </Box>
      )}
    </>
  );
};
export default FullMovie;
