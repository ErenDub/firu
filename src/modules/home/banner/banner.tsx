import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
export const Banner = () => {
  return (
    <Box
      height={{ lg: "80vh", md: "80vh", sm: "100vh", xs: "100vh" }}
      sx={{
        position: "relative",
      }}
    >
      <ParallaxProvider>
        <ParallaxBanner
          layers={[
            {
              speed: -25,
              image:
                "https://images.hdqwalls.com/download/2020-the-mandalorian-yoda-j9-1920x1080.jpg",
            },
          ]}
          className="aspect-[2/1]"
          style={{ height: "100%" }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 100,
              left: { lg: 110, md: 110, sm: 10, xs: 10 },
              zIndex: 3,
              width: { lg: 800, md: 800, sm: "95%", xs: "95%" },
            }}
          >
            <Stack
              justifyContent={{
                lg: "start",
                md: "start",
                sm: "center",
                xs: "center",
              }}
              mb={{ lg: 5, md: 5, sm: 4, xs: 2 }}
              direction="row"
            >
              <Box
                component="img"
                src="https://pngimg.com/d/mandalorian_PNG9.png"
                height={{ lg: 100, md: 100, sm: "auto", xs: "auto" }}
                width={{ lg: "auto", md: "auto", sm: "100%", xs: "100%" }}
              />
            </Stack>

            <Typography>
              შორეული მომავალი… ჩვენი უკიდეგანო გალაქტიკის ათასობით პლანეტა
              გონიერი არსებებითაა დასახლებული, რომელთაგან ერთ-ერთი – ვარსკვლავი
              მანდალორას მკვიდრნი არიან. ადგილობრივი მოსახლეობა არა მხოლოდ
              ყველაზე რთულ პირობებში გადარჩენის უნარებით გამოირ...
            </Typography>
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              justifyContent={{
                lg: "start",
                md: "start",
                sm: "center",
                xs: "center",
              }}
              my={2}
            >
              <Chip label="PG-13 | 2020 | 103 წუთი" />

              <Typography>1 სეზონი | 6 სერია</Typography>
            </Stack>
            <Typography fontSize={12}>
              მძაფრ სიუჟეტიანი, თრილერი, ფანტასტიკა, სამეცნიერო ფანტასტიკა.
            </Typography>
            <Stack
              direction="row"
              gap={2}
              alignItems="center"
              justifyContent={{
                lg: "start",
                md: "start",
                sm: "center",
                xs: "center",
              }}
              mt={4}
            >
              <Button color="secondary" startIcon={<PlayArrowRoundedIcon />}>
                ყურება
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                startIcon={<OndemandVideoRoundedIcon />}
              >
                ტრეილერი
              </Button>
            </Stack>
          </Box>
        </ParallaxBanner>
      </ParallaxProvider>
      <Box
        sx={{
          background:
            "linear-gradient(0deg, rgba(26,29,41,1) 0%, rgba(26,29,41,1) 5%, rgba(26,29,41,0.2) 100%)",
          position: "absolute",
          top: 0,
          zIndex: 2,
          height: 1,
          width: 1,
        }}
      />
    </Box>
  );
};
