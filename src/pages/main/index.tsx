import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <Typography>Header</Typography>
      <Outlet />
      <Typography>Footer</Typography>
    </>
  );
};
export default Main;
