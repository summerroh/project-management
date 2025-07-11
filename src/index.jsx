import React from "react";
import ReactDOM from "react-dom/client";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SettingsProvider from "contexts/settingsContext";
import App from "./App";
import "nprogress/nprogress.css";
import "simplebar-react/dist/simplebar.min.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <I18nextProvider i18n={i18n}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </LocalizationProvider>
  </I18nextProvider>
);
