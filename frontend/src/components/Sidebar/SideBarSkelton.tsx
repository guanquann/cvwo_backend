import { Paper, Skeleton } from "@mui/material";

const SideBarSkelton: React.FC = () => {
  return (
    <>
      <Skeleton height={40} />
      <Skeleton
        variant="rectangular"
        height={120}
        sx={{
          mt: 0,
          mb: 2,
        }}
        component={Paper}
      />
    </>
  );
};

export default SideBarSkelton;
