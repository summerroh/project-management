import { alpha } from "@mui/material/styles";
const primaryMain = "#73AFD9";
export const primary = {
  light: "#E5F3FD",
  main: primaryMain,
  100: alpha(primaryMain, 0.1),
  200: alpha(primaryMain, 0.2),
  300: alpha(primaryMain, 0.3),
  400: alpha(primaryMain, 0.4),
  white: "#ffffff",
  red: "#E95050",
  lightRed: "#FAF0F0",
  purple: "#A798FF",
  purple200: "#5313BB",
  yellow: "#FF9777",
  yellow200: "#FCD819",
  yellow300: "#EF9123",
  lightYellow: "#FFF3B4",
  orange: "#E59B44",
  orange200: "#DC6A00",
  orange300: "#BC5A00",
  grey: "#A5A5A5",
  grey2: "#636469",
  grey300: "#5C5E64",
  grey400: "#B5B7C0",
  grey500: "#737373",
  grey600: "#9D9D9D",
  grey700: "#F6F6F6",
  grey800: "#F9F9F9",
  grey900: "#808187",
  lightBlue: "#CAE0F0",
  lightBlue2: "#EDF6FE",
  lightBlue3: "#F0F5FA",
  lightBlue4: "#E3ECF5",
  lightBlue5: "#F3F7FF",
  lightGrey: "#BED1E1",
  lightGrey200: "#F3F3F3",
  lightGrey300: "#F5F5F5",
  lightBlueBackground: "#F9FAFD",
  darkBlue: "#4455A1",
  darkBlueHover: "#003C7E",
  dark: "#151515",
  disabled: "#DBDBDB",
  naver: "#21CB01",
  lightViolet: "#ECEBFE",
  darkViolet: "#501EC3",
  violet: "#464EB4",
  violet200: "#F0EFFF",
  violet300: "#E9E8FD",
  green: "#00621B",
  green200: "#49733E",
  lightGreen: "#F1FAF0",
  border: "#E1E1E1",
};
export const gradient = {
  purpletoblue: "linear-gradient(to right, #B187FF , #5C92D2)",
  bluetopurple: "linear-gradient(to right, #96DCEF , #AFA2EC)",
  purpletobluetobottom: "linear-gradient(to bottom, #B187FF , #5C92D2)",
  purple: "linear-gradient(to right, #5255D3, #9183D7)",
  orangetoyellow: "linear-gradient(to right, #D2865C, #F4DC87)",
  yellowtopink: "linear-gradient(to right, #FFC5B8, #B977ED)",
  redtopurple: "linear-gradient(to right, #C40365, #5E1265)",
  lightpurpletopurple: "linear-gradient(to right, #B187F4, #5F52EF)",
  greentoblue: "linear-gradient(to right, #08F0AF, #5C92D2)",
};
const secondaryMain = "#23C657";
export const secondary = {
  light: "#E3F0FF",
  main: secondaryMain,
  dark: "#011E3D",
  100: alpha(secondaryMain, 0.08),
  200: alpha(secondaryMain, 0.2),
  300: alpha(secondaryMain, 0.3),
  400: alpha(secondaryMain, 0.4),
};
export const info = {
  light: "#F4F4FF",
  main: "#8C8DFF",
  dark: "#0C53B7",
};
export const success = {
  light: "#EAFBF4",
  main: "#27CE88",
  dark: "#229A16",
};
export const warning = {
  light: "#FFFAF2",
  main: "#FFC675",
  dark: "#B78103",
};
export const error = {
  light: "#FFEBF1",
  main: "#FF316F",
  dark: "#B72136",
}; // For light theme

export const greyLight = {
  50: "#f9f9f9",
  100: "#eff3f5",
  200: "#D3E6F3",
  300: "#B1C9DC",
  400: "#808187",
  500: "#5F748D",
  600: "#455A79",
  700: "#2F4365",
  800: "#1E2E51",
  900: "#121F43",
}; // For dark theme

export const greyDark = {
  900: "#E9F3F9",
  800: "#D3E6F3",
  700: "#B1C9DC",
  600: "#808187",
  500: "#5F748D",
  400: "#455A79",
  300: "#2F4365",
  200: "#1E2E51",
  100: "#121F43",
  50: "#111111",
}; // For Light theme

export const darkBlue = "#024EA2";

export const borderColor = "#E1E1E1";

export const white = "#FFFFFF";

export const textLight = {
  primary: greyLight[900],
  // secondary: greyLight[500],
  secondary: "#636469",
  disabled: "#DBDBDB",
}; // For Dark theme

export const textDark = {
  primary: "#ffffff",
  secondary: greyDark[600],
  disabled: "#DBDBDB",
}; // For Light theme

export const actionLight = {
  activatedOpacity: 0.12,
  active: alpha(greyLight[900], 0.54),
  disabled: "#DBDBDB",
  disabledBackground: alpha(greyLight[900], 0.12),
  disabledOpacity: 0.38,
  focus: alpha(greyLight[900], 0.12),
  focusOpacity: 0.12,
  hover: alpha(greyLight[900], 0.04),
  hoverOpacity: 0.04,
  selected: greyLight[100],
  selectedOpacity: 0.08,
}; // Common colors

const palette = {
  info,
  error,
  primary,
  success,
  warning,
  secondary,
  darkBlue,
  borderColor,
  gradient,
};
export const lightPalette = {
  ...palette,
  mode: "light",
  grey: greyLight,
  text: textLight,
  action: actionLight,
  divider: "#E1E1E1",
  darkBlue: darkBlue,
  background: {
    default: "#F3F3F3",
    paper: "#ffffff",
  },
};
export const darkPalette = {
  ...palette,
  mode: "dark",
  grey: greyDark,
  text: textDark,
  background: {
    default: "#171c24",
    paper: "#222b36",
  },
};
