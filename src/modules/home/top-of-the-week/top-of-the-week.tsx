import React, { useCallback, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import { BannerSliderItem } from "modules/sliders/banner-slider/banner-slider-item";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useQuery } from "react-query";
import { getTopWeek } from "../home-fetch";
interface SwiperProps {
  spaceBetween: number;
  slidesPerView: number;
  navigation?: boolean;
  rewind?: boolean;
  pagination?: { dynamicBullets: boolean };
  onSwiper?: React.Dispatch<React.SetStateAction<SwiperClass | undefined>>;
  autoplay?: {
    delay: number;
    disableOnInteraction: boolean;
  };
  breakpoints?: Record<string, SwiperProps>;
  modules?: any;
}

export const TopOfTheWeek = () => {
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
    slidesPerView: 3.5,
    navigation: false,
    onSwiper: setSwiperRef,
    rewind: true,
    pagination: {
      dynamicBullets: false,
    },
    breakpoints: {
      // Define breakpoints here
      0: {
        slidesPerView: 1.5,
        spaceBetween: 30,
      },
      600: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },

      1300: {
        slidesPerView: 3.5,
        spaceBetween: 30,
      },
      1500: {
        slidesPerView: 3.5,
        spaceBetween: 30,
      },
    },

    modules: [],
  };
  const $getTopsWeek = useQuery("top-of-the-week", () =>
    getTopWeek({ limit: 15 })
  );
  return (
    <Box mb={10}>
      {$getTopsWeek.isLoading && <Skeleton height={250} />}
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
          კვირის ყველაზე ნახვადი
        </Typography>
        <Typography
          variant="h3"
          sx={{
            display: { md: "none", xs: "blcok" },
          }}
        >
          კვირის ყველაზე ნახვადი
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
      {$getTopsWeek.data && (
        <Swiper {...swiperParams} className="mySwiper">
          {$getTopsWeek.data.movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <BannerSliderItem
                banner={movie.banner}
                id={movie.id}
                title={movie.title}
                titleEn={movie.titleEn}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
};
