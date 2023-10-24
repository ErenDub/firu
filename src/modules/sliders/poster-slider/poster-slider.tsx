import React, { useCallback, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import { PosterSliderItem } from "./poster-slider-item";
import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
interface SwiperProps {
  spaceBetween: number;
  slidesPerView: number;
  navigation?: boolean;
  rewind?: boolean;
  lazy?: boolean;
  pagination?: { dynamicBullets: boolean };
  onSwiper?: React.Dispatch<React.SetStateAction<SwiperClass | undefined>>;
  autoplay?: {
    delay: number;
    disableOnInteraction: boolean;
  };
  breakpoints?: Record<string, SwiperProps>;
  modules?: any;
}

export const PosterSlider = () => {
  const arr = [
    "https://m.media-amazon.com/images/M/MV5BN2M5YWFjN2YtYzU2YS00NzBlLTgwZWUtYWQzNWFhNDkyYjg3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UY2500_.jpg",
    "https://i.ebayimg.com/images/g/CwEAAOSwv4xf5cdv/s-l1200.jpg",
    "https://m.media-amazon.com/images/I/71Lvqoov42L.jpg",
    "https://i0.wp.com/batman-news.com/wp-content/uploads/2023/04/The-Flash-Movie-Poster-01.jpeg?fit=1638%2C2048&quality=80&strip=info&ssl=1",
    "https://m.media-amazon.com/images/I/81-jM17HvRL.jpg",
    "https://m.media-amazon.com/images/M/MV5BN2M5YWFjN2YtYzU2YS00NzBlLTgwZWUtYWQzNWFhNDkyYjg3XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UY2500_.jpg",
    "https://i.ebayimg.com/images/g/CwEAAOSwv4xf5cdv/s-l1200.jpg",
    "https://m.media-amazon.com/images/I/71Lvqoov42L.jpg",
    "https://i0.wp.com/batman-news.com/wp-content/uploads/2023/04/The-Flash-Movie-Poster-01.jpeg?fit=1638%2C2048&quality=80&strip=info&ssl=1",
    "https://m.media-amazon.com/images/I/81-jM17HvRL.jpg",
  ];
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const handleLeftClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slidePrev();
  }, [swiperRef]);
  const handleRightClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slideNext();
  }, [swiperRef]);
  const swiperParams: SwiperProps = {
    spaceBetween: 30,
    slidesPerView: 5.5,
    navigation: false,
    onSwiper: setSwiperRef,
    rewind: true,
    lazy: true,
    pagination: {
      dynamicBullets: false,
    },
    breakpoints: {
      // Define breakpoints here
      0: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
      600: {
        slidesPerView: 3.5,
        spaceBetween: 30,
      },

      1300: {
        slidesPerView: 4.5,
        spaceBetween: 30,
      },
      1500: {
        slidesPerView: 5.5,
        spaceBetween: 30,
      },
    },

    modules: [],
  };
  return (
    <Box mb={10}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          variant="h2"
          sx={{
            display: { md: "block", xs: "none" },
          }}
        >
          პოსტერის სალიდერი
        </Typography>
        <Typography
          variant="h3"
          sx={{
            display: { md: "none", xs: "blcok" },
          }}
        >
          პოსტერის სალიდერი
        </Typography>
        <Stack direction="row" gap={2}>
          <Button
            color="secondary"
            variant="outlined"
            sx={{
              borderRadius: 5,
              width: { md: 40, xs: 35 },
              height: { md: 40, xs: 35 },
              minWidth: 0,
              minHeight: 0,
            }}
            onClick={() => handleLeftClick()}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            sx={{
              borderRadius: 5,
              width: { md: 40, xs: 35 },
              height: { md: 40, xs: 35 },
              minWidth: 0,
              minHeight: 0,
            }}
            onClick={() => handleRightClick()}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </Button>
        </Stack>
      </Stack>
      <Swiper {...swiperParams} className="mySwiper">
        {/* {arr.map((movie) => (
          <SwiperSlide key={movie}>
            <PosterSliderItem img={movie} />
          </SwiperSlide>
        ))} */}
      </Swiper>
    </Box>
  );
};
