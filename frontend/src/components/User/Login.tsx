import { toast } from "react-toastify";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";

import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/authSlice";
import { useAddNewTokenMutation } from "../../redux/api/authSlice";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [addNewToken] = useAddNewTokenMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      const token = await addNewToken({
        email: data.get("email") as string,
        password: data.get("password") as string,
      }).unwrap();
      dispatch(setAuth(token.token));
      toast.success("Welcome back!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } catch {
      toast.error("Wrong email/password!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  // Adapted from: https://github.com/mui/material-ui/blob/v5.11.0/docs/data/material/getting-started/templates/sign-in/SignIn.tsx
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
