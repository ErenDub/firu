import { Box, Stack, Typography } from "@mui/material";
import logo from "../images/firu-logo-lg.png";
export const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <Stack bgcolor="#090B13" alignItems="center" py={5} gap={2}>
      <Box component="img" width={{ md: 130, xs: 100 }} src={logo} />
      <Typography>
        Firu.ge {date === 2023 ? date : `2023 - ${date}`} ©
      </Typography>
    </Stack>
  );
};
