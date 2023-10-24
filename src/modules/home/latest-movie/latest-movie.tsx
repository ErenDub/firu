import React, { useCallback, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import { PosterSliderItem } from "modules/sliders/poster-slider/poster-slider-item";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useQuery } from "react-query";
import { getLatest } from "../home-fetch";
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

export const LatestMovie = () => {
  const $getLatestMovies = useQuery(`latest-movie`, () =>
    getLatest({ limit: 15, type: "ფილმი" })
  );

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
      {$getLatestMovies.isLoading && <Skeleton height={400} />}

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
          ბოლოს დამატებული ფილმები
        </Typography>
        <Typography
          variant="h3"
          sx={{
            display: { md: "none", xs: "blcok" },
          }}
        >
          ბოლოს დამატებული ფილმები
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
        {$getLatestMovies.data &&
          $getLatestMovies.data.movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <PosterSliderItem
                poster={movie.poster}
                title={movie.title}
                titleEn={movie.titleEn}
                id={movie.id}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};
