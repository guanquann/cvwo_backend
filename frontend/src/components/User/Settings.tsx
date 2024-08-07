import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

import ImagePreview from "../Common/ImagePreview";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetUserQuery } from "../../redux/api/usersSlice";
import { useEditUserMutation } from "../../redux/api/usersSlice";
import { useAddNewTokenMutation } from "../../redux/api/authSlice";

const Settings: React.FC = () => {
  const [editUser] = useEditUserMutation();
  const [addNewToken] = useAddNewTokenMutation();

  const auth = useSelector((state: RootState) => state.authentication);

  const [selectedFile, setSelectedFile] = useState<Blob>();
  const [preview, setPreview] = useState<string>();

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const { data: user } = useGetUserQuery(auth.userID!);

  useEffect(() => {
    if (user !== undefined) {
      setEmail(user.email);
      setUsername(user.username);
      setPreview(user.avatar || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      editUser({ email, username, user_id: auth.userID });
    } catch {
      toast.error("Username / Email already taken!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Password does not match!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (newPassword.length <= 6 && newPassword !== "") {
      toast.error("Password is too short!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else if (newPassword !== "") {
      try {
        await addNewToken({ email, password }).unwrap();
        editUser({ password: newPassword, user_id: auth.userID });
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } catch {
        toast.error("Current password is incorrect!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }

    toast.success("Updated Profile!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

    // image
    // if (selectedFile) {
    //   // const data = new FormData();
    //   // data.append("avatar", selectedFile);
    //   // data.append("id", String(auth.userID));
    //   // data.append("user_id", String(auth.userID));
    //   const data = new FormData(e.currentTarget);
    //   editUser(data);
    // }
  };

  // Adapted from: https://github.com/mui/material-ui/blob/v5.11.0/docs/data/material/getting-started/templates/sign-in/SignIn.tsx
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <ImagePreview
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            preview={preview}
            setPreview={setPreview}
          />

          <Typography component="h1" variant="h5" textAlign={"center"}>
            Change Username
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Typography component="h1" variant="h5" textAlign={"center"}>
            Change Email
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Typography component="h1" variant="h5" textAlign={"center"}>
            Change Password
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            name="old_password"
            autoComplete="new-password"
            label="Current Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="new_password"
            autoComplete="new-password"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm_new_password"
            autoComplete="new-password"
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Settings;
