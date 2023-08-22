import { Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <>
      <Typography>Admin Header</Typography>
      <Outlet />
      <Typography>Admin Footer</Typography>
    </>
  );
};
export default Admin;
