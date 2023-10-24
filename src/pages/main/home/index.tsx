import { MainLayout } from "global/layouts/mainLayout";
import { Banner } from "modules/home/banner/banner";
import { LatestAnime } from "modules/home/latest-anime/latest-anime";
import { LatestMovie } from "modules/home/latest-movie/latest-movie";
import { LatestTvShows } from "modules/home/latest-tv-shows/latest-tv-shows";
import { TopOfTheWeek } from "modules/home/top-of-the-week/top-of-the-week";

const Home = () => {
  return (
    <>
      <Banner />
      <MainLayout>
        <TopOfTheWeek />
        <LatestTvShows />
        <LatestAnime />
        <LatestMovie />
      </MainLayout>
    </>
  );
};
export default Home;
