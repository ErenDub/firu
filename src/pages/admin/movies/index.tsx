import { Stack } from "@mui/material";
import { AddNewMovie } from "modules/admin/home/add-new-movie/card";
import { MovieCard } from "modules/admin/home/movie-card/movie-card";

const Home = () => {
  const movies = [
    {
      title: "ფლეში",
      titleEn: "The flash",
    },
    {
      title: "დემონების მკვეთი ხმალი",
      titleEn: "Demon Slayer",
    },
    {
      title: "ადამიანი ობობა",
      titleEn: "Spider-man",
    },
  ];
  return (
    <>
      <Stack gap={1} direction="row" flexWrap="wrap">
        <AddNewMovie />
        {movies.map((movie) => (
          <MovieCard
            key={movie.title}
            title={movie.title}
            titleEn={movie.titleEn}
          />
        ))}
      </Stack>
    </>
  );
};
export default Home;
