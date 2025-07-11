import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
// import RTL from "components/RTL";
import useSettings from "hooks/useSettings";
import { createCustomTheme } from "./theme";
import routes from "./routes";
import "./i18n";
import globalcss from "styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  const router = createBrowserRouter(routes());
  const { settings } = useSettings();
  const theme = createCustomTheme({
    theme: settings.theme,
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
  });
  return (
    <AuthProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
          <ToastContainer />
        </ThemeProvider>
      </StyledEngineProvider>
    </AuthProvider>
  );
};

export default App;
