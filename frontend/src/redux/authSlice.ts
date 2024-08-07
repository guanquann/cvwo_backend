import { createSlice } from "@reduxjs/toolkit";

const getUserID = (token: string) => {
  return Number(JSON.parse(window.atob(token.split(".")[1]))["user_id"]);
};

// useEffect(() => {
//     if (auth) {
//       SendRequest("GET", "users", {}, auth).then((data) => {
//         if (data.errors) {
//           window.localStorage.removeItem("authData");
//           setAuth("");
//           setUserID(null);
//         }
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [auth]);

const initialState = {
  auth: window.localStorage.getItem("authData") || "",
  userID: window.localStorage.getItem("authData") !== null ? getUserID(window.localStorage.getItem("authData")!) : null,
};

export const authSlice = createSlice({
  name: "authMode",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const token = action.payload;
      window.localStorage.setItem("authData", token);
      state.auth = token;
      state.userID = getUserID(window.localStorage.getItem("authData")!);
    },

    removeAuth: (state) => {
      window.localStorage.removeItem("authData");
      state.auth = "";
      state.userID = null;
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
