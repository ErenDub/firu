import { MainLayout } from "global/layouts/mainLayout";
import { Banner } from "modules/home/banner/banner";
import { BannerSlider } from "modules/sliders/banner-slider/banner-slider";
import { PosterSlider } from "modules/sliders/poster-slider/poster-slider";

const Home = () => {
  return (
    <>
      <Banner />
      <MainLayout>
        <PosterSlider />
        <BannerSlider />
      </MainLayout>
    </>
  );
};
export default Home;
