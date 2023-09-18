import { Box } from "@mui/material";
import { Footer } from "global/footer/footer";
import { Header } from "global/header/header";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <Header />
      <Box minHeight="80vh">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};
export default Main;
