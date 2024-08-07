import { Box, Switch } from "@mui/material";

import CardSideBar from "./CardSideBar";
import SideBarSkelton from "./SideBarSkelton";

import { useGetCatsQuery } from "../../redux/api/categorySlice";
import { useGetThreadsQuery } from "../../redux/api/postThreadsSlice";

import Theme from "../../interfaces/ThemeInterface";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/themeSlice";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const is_checked = useSelector((state: Theme) => state.theme.mode) === "dark";

  const { data: cats } = useGetCatsQuery();
  const { data: threads } = useGetThreadsQuery();

  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box>
        {threads ? (
          <>
            <CardSideBar title="Threads" threads={threads} />
            <CardSideBar title="Categories" cats={cats} />
            <Switch onChange={() => dispatch(toggleDarkMode())} checked={is_checked} />
          </>
        ) : (
          <>
            <SideBarSkelton />
            <SideBarSkelton />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
