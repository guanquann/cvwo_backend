import { toast } from "react-toastify";
import { Card } from "@mui/material";
import PostInterface from "../../interfaces/PostInterface";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import CardPostFooter from "../Card/CardPostFooter";
import { useNavigate } from "react-router-dom";

import { useAddNewVoteMutation, useDeletePostMutation } from "../../redux/api/apiSlice";

interface Props {
  data: PostInterface;
  key: number;
  userID: number | null;
}

const CardPost: React.FC<Props> = ({ data, userID }) => {
  const navigate = useNavigate();

  const preventAutoRedirect = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const [addNewVote] = useAddNewVoteMutation();
  const [deletePost] = useDeletePostMutation();

  const upvote = () => {
    addNewVote({ id: data.id, is_upvoted: true });
  };

  const downvote = () => {
    addNewVote({ id: data.id, is_upvoted: false });
  };

  const del = () => {
    deletePost(data.id).then(() => navigate("/"));
    toast.success("Deleted comment sucessfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <Card
      sx={{
        mt: 2,
        mb: 2,
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => navigate(`/post/${data.id}`)}
    >
      <CardHeader data={data} preventAutoRedirect={preventAutoRedirect} />
      <CardBody data={data} preventAutoRedirect={preventAutoRedirect} />
      <CardPostFooter
        data={data}
        userID={userID}
        upvote={upvote}
        downvote={downvote}
        del={del}
        preventAutoRedirect={preventAutoRedirect}
      />
    </Card>
  );
};

export default CardPost;
