import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import { MainLayout } from "global/layouts/mainLayout";
import { GlobalPagination } from "global/pagination/pagination";
import useDebounce from "lib/hooks/use-debounce/use-debounce";
import { getSearch } from "modules/home/home-fetch";
import { BannerSliderItem } from "modules/sliders/banner-slider/banner-slider-item";
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
const Search = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [choosedType, setChoosedType] = useState(types[0].value);
  const debouncedSearch = useDebounce<string>(search, 500);
  const $search = useQuery(
    `search-${page}-${debouncedSearch}-${choosedType}`,
    () => getSearch({ page, search: debouncedSearch, type: choosedType })
  );
  return (
    <MainLayout>
      <Stack
        mt={15}
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
      {$search.isLoading && (
        <Box mt={4}>
          <Skeleton height={200} />
        </Box>
      )}
      {$search.data && (
        <Box mt={4}>
          <Grid container spacing={5} justifyContent="center">
            {$search.data.movies.map((movie) => (
              <Grid key={movie.id} item lg={4}>
                <BannerSliderItem
                  banner={movie.banner}
                  title={movie.title}
                  titleEn={movie.titleEn}
                  id={movie.id}
                />
              </Grid>
            ))}
          </Grid>
          <GlobalPagination
            page={page}
            setPage={setPage}
            pages={Math.ceil($search.data.total / 10)}
          />
        </Box>
      )}
    </MainLayout>
  );
};
export default Search;
