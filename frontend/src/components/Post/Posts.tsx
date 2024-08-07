import { useParams, useSearchParams, Link as RouterLink } from "react-router-dom";
import { useState } from "react";

import CardPost from "./CardPost";
import CardPostSkelton from "../Card/CardPostSkelton";
import PostInterface from "../../interfaces/PostInterface";

import SearchIcon from "@mui/icons-material/Search";
import { Card, Container, InputBase, ToggleButton, ToggleButtonGroup, styled, alpha } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetPostsQuery } from "../../redux/api/apiSlice";
import { useGetThreadQuery } from "../../redux/api/postThreadsSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const Posts: React.FC = () => {
  const auth = useSelector((state: RootState) => state.authentication);

  const { post_thread } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sort_param = searchParams.get("sort") ? searchParams.get("sort") : "date";

  const [filteredData, setFilteredData] = useState<PostInterface[]>([]);

  const { data: baseData, isLoading: loadingBase } = useGetPostsQuery(sort_param, { skip: post_thread !== undefined });
  const { data: threadData, isLoading: loadingThread } = useGetThreadQuery(
    { threadId: post_thread as string, sort: sort_param },
    { skip: post_thread === undefined }
  );

  const filterPosts = (searchInput: string) => {
    if (baseData) {
      // TODO
      const delay = setTimeout(() => {
        setFilteredData(
          baseData.filter((x) => x.title?.toLowerCase().trim().includes(searchInput.toLowerCase().trim()))
        );
      }, 500);
      return () => clearTimeout(delay);
    }
  };

  const filterBySelection = (event: React.MouseEvent<HTMLElement>, action: string) => {
    setSearchParams(action);
  };

  return (
    <Container>
      <Card sx={{ mt: 2 }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => filterPosts(e.target.value)}
            fullWidth
          />
        </Search>
      </Card>

      <ToggleButtonGroup
        value={sort_param}
        onChange={filterBySelection}
        size="small"
        aria-label="filter button group"
        sx={{ mt: 2 }}
        exclusive
      >
        <ToggleButton value="date" aria-label="date" component={RouterLink} to={`?sort=date`}>
          Date
        </ToggleButton>
        <ToggleButton value="upvote" aria-label="upvote" component={RouterLink} to={`?sort=upvote`}>
          Upvotes
        </ToggleButton>
        <ToggleButton value="downvote" aria-label="downvote" component={RouterLink} to={`?sort=downvote`}>
          Downvotes
        </ToggleButton>
        <ToggleButton value="comment" aria-label="comment" component={RouterLink} to={`?sort=comment`}>
          Comments
        </ToggleButton>
      </ToggleButtonGroup>

      {(loadingBase || loadingThread) &&
        [1, 2, 3, 4].map((key) => {
          return <CardPostSkelton key={key} />;
        })}

      {baseData &&
        (filteredData.length !== 0 ? filteredData : baseData).map((x: PostInterface) => (
          <CardPost data={x} key={x.id} userID={auth.userID} />
        ))}

      {threadData &&
        (filteredData.length !== 0 ? filteredData : threadData).map((x: PostInterface) => (
          <CardPost data={x} key={x.id} userID={auth.userID} />
        ))}
    </Container>
  );
};

export default Posts;
