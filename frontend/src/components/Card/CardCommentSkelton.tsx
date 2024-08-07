import { Card, Skeleton } from "@mui/material";

interface Props {
  key: number;
}

const CardCommentSkelton: React.FC<Props> = () => {
  return (
    <Skeleton
      variant="rectangular"
      height={130}
      sx={{
        mt: 2,
        mb: 2,
        ml: 3,
      }}
      component={Card}
    />
  );
};

export default CardCommentSkelton;
