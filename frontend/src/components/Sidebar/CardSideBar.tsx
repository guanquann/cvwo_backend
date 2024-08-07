import { Link as RouterLink } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { Chip, Paper, Typography } from "@mui/material";

import CategoryInterface from "../../interfaces/CategoryInterface";
import ThreadInterface from "../../interfaces/ThreadInterface";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

interface Props {
  title: string;
  cats?: CategoryInterface[];
  threads?: ThreadInterface[];
}

const CardSideBar: React.FC<Props> = ({ title, cats, threads }) => {
  return (
    <>
      <Typography>{title}</Typography>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "left",
          flexWrap: "wrap",
          listStyle: "none",
          p: 0.5,
          mt: 0,
          mb: 2,
        }}
        component="ul"
      >
        {threads ? (
          <>
            <ListItem>
              <Chip color="secondary" label="All" component={RouterLink} to="/" clickable />
            </ListItem>
            {threads.map((data) => {
              return (
                <ListItem key={data.id}>
                  <Chip
                    color="secondary"
                    label={data.title}
                    component={RouterLink}
                    to={`/thread/${data.id}`}
                    clickable
                  />
                </ListItem>
              );
            })}
          </>
        ) : (
          <>
            <ListItem>
              <Chip color="primary" label="All" component={RouterLink} to="/" clickable />
            </ListItem>
            {cats?.map((data) => {
              return (
                <ListItem key={data.id}>
                  <Chip color="primary" label={data.cat} component={RouterLink} to={`/thread/${data.id}`} clickable />
                </ListItem>
              );
            })}
          </>
        )}
      </Paper>
    </>
  );
};

export default CardSideBar;
