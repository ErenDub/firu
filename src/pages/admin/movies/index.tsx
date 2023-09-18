import { Box, Stack } from "@mui/material";
import { GlobalPagination } from "global/pagination/pagination";
import { getMovies } from "modules/admin/admin-fetch";
import { AddNewMovie } from "modules/admin/home/add-new-movie/card";
import { MovieCard } from "modules/admin/home/movie-card/movie-card";
import { useState } from "react";
import { useQuery } from "react-query";

const Home = () => {
  const [page, setPage] = useState(1);
  const $movies = useQuery(`admin-movies-${page}`, () => getMovies({ page }));
  return (
    <>
      {$movies.data && (
        <Box>
          <Stack gap={1} direction="row" flexWrap="wrap">
            <AddNewMovie />
            {$movies.data.movies.map((movie) => (
              <MovieCard
                key={movie.title}
                title={movie.title}
                titleEn={movie.titleEn}
                id={movie.id}
              />
            ))}
          </Stack>
          <GlobalPagination
            page={page}
            setPage={setPage}
            pages={Math.ceil($movies.data.total / 10)}
          />
        </Box>
      )}
    </>
  );
};
export default Home;
