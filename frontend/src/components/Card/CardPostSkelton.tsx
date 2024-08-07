import { Card, Skeleton } from "@mui/material";

interface Props {
  key: number;
}

const CardPostSkelton: React.FC<Props> = () => {
  return (
    <Skeleton
      variant="rectangular"
      height={210}
      sx={{
        mt: 2,
        mb: 2,
      }}
      component={Card}
    />
  );
};

export default CardPostSkelton;
