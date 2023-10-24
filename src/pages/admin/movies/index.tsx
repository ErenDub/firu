import { Box, Button, ButtonGroup, Stack, TextField } from "@mui/material";
import { GlobalPagination } from "global/pagination/pagination";
import useDebounce from "lib/hooks/use-debounce/use-debounce";
import { AddNewMovie } from "modules/admin/home/add-new-movie/card";
import { MovieCard } from "modules/admin/home/movie-card/movie-card";
import { getSearch } from "modules/home/home-fetch";
import { useState } from "react";
import { useQuery } from "react-query";
const types = [
  {
    label: "ყველა",
    value: "",
  },
  {
    label: "ფილმი",
    value: "ფილმი",
  },
  {
    label: "სერიალი",
    value: "სერიალი",
  },
  {
    label: "ანიმე",
    value: "ანიმე",
  },
];
const Home = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [choosedType, setChoosedType] = useState(types[0].value);
  const debouncedSearch = useDebounce<string>(search, 500);
  const $movies = useQuery(
    `search-${page}-${debouncedSearch}-${choosedType}`,
    () => getSearch({ page, search: debouncedSearch, type: choosedType })
  );
  return (
    <>
      <Stack
        mb={5}
        direction={{ md: "row", xs: "column" }}
        alignItems="center"
        justifyContent="cebter"
        gap={2}
      >
        <TextField
          label="ძებნა"
          type="text"
          value={search}
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
        />
        <ButtonGroup>
          {types.map((type) => (
            <Button
              key={type.label}
              onClick={() => setChoosedType(type.value)}
              size="medium"
              variant={type.value === choosedType ? "contained" : "outlined"}
            >
              {type.label}
            </Button>
          ))}
        </ButtonGroup>
      </Stack>
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
