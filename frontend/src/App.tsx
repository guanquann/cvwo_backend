import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Common/Navbar";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// import ScrollToTop from "./utils/scrollToTop";

import PublicRoute from "./components/Router/PublicRoute";
import PrivateRoute from "./components/Router/PrivateRoute";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material";
import { PaletteType } from "@material-ui/core";

import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const auth = useSelector((state: RootState) => state.authentication);

  const theme = createTheme({
    palette: {
      mode: useSelector((state: RootState) => state.theme.mode) as PaletteType,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <Navbar auth={auth.auth} />
        {auth.auth ? <PrivateRoute /> : <PublicRoute />}
      </BrowserRouter>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
