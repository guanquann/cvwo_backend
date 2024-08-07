import { Outlet } from "react-router-dom";

import { Stack } from "@mui/material";

import Sidebar from "../Sidebar/SideBar";

const Layout: React.FC = () => {
  return (
    <Stack direction="row">
      <Sidebar />
      <Outlet />
    </Stack>
  );
};

export default Layout;
