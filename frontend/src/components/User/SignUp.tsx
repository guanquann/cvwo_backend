import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";

import ImagePreview from "../Common/ImagePreview";

import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/authSlice";
import { useAddUserMutation } from "../../redux/api/usersSlice";
import { useAddNewTokenMutation } from "../../redux/api/authSlice";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [addNewUser] = useAddUserMutation();
  const [addNewToken] = useAddNewTokenMutation();

  const [selectedFile, setSelectedFile] = useState<Blob>();
  const [preview, setPreview] = useState<string>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirm_password") as string;

    if (password !== confirmPassword) {
      toast.error("Password does not match!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (password.length <= 6) {
      toast.error("Password is too short!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      data.delete("confirm_password");

      try {
        await addNewUser(data).unwrap();
        const token = await addNewToken({ email, password }).unwrap();
        dispatch(setAuth(token.token));
        toast.success("Account created successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        navigate("/", { replace: true });
      } catch {
        toast.error("Username / Email already taken!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
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
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <ImagePreview
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            preview={preview}
            setPreview={setPreview}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            type="text"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm_password"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
