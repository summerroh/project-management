import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Import language JSON files
import kr from "./locales/kr/translation.json";
import jp from "./locales/jp/translation.json";
import en from "./locales/en/translation.json";

const resources = {
  kr: {
    translation: kr,
  },
  jp: {
    translation: jp,
  },
  en: {
    translation: en,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "kr", // default language
  fallbackLng: "kr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
