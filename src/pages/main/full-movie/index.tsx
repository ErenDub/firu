import { Box, Chip, Skeleton, Stack, Typography } from "@mui/material";
import { MainLayout } from "global/layouts/mainLayout";
import { getEditMovie } from "modules/admin/admin-fetch";
import { Banner } from "modules/full-movie/banner/banner";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const FullMovie = () => {
  const { movieId } = useParams();
  const $getEditMovie = useQuery(`watch-${movieId}`, () =>
    getEditMovie({ movieId: movieId ?? "" })
  );
  return (
    <>
      {$getEditMovie.isLoading && (
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
      {$getEditMovie.data && (
        <Box>
          <Helmet
            key={$getEditMovie.data.title}
            title={$getEditMovie.data.title}
          >
            <meta name="keywords" content="My awesome website description." />
          </Helmet>
          <Banner
            age={$getEditMovie.data.age}
            categories={$getEditMovie.data.categories}
            country={$getEditMovie.data.country}
            directors={$getEditMovie.data.directors}
            episodesCount={$getEditMovie.data.episodesCount}
            logo={$getEditMovie.data.logo}
            seasonsCount={$getEditMovie.data.seasonsCount}
            studios={$getEditMovie.data.studios}
            year={$getEditMovie.data.year}
            banner={$getEditMovie.data.banner}
            lastSeasonEpCount={$getEditMovie.data.lastSeasonEpCount}
            duration={$getEditMovie.data.duration}
          />
          <MainLayout>
            <Stack direction={{ md: "row", xs: "column" }} gap={2}>
              <Box
                component="img"
                src={$getEditMovie.data.poster}
                width={{ md: 300, xs: 1 }}
              />
              <Box>
                <Stack mb={1} gap={0.5}>
                  <Typography variant="h1">
                    {$getEditMovie.data.title}
                  </Typography>
                  <Typography variant="h4">
                    {$getEditMovie.data.titleEn}
                  </Typography>
                </Stack>
                <Typography>{$getEditMovie.data.description}</Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  mt={2}
                  gap={1}
                  flexWrap="wrap"
                >
                  <Typography>თეგები: </Typography>
                  {$getEditMovie.data.tags.map((tag) => (
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
            <Typography>Full movie page</Typography>
          </MainLayout>
        </Box>
      )}
    </>
  );
};
export default FullMovie;
