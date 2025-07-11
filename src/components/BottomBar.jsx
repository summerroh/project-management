import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Small } from "./Typography";
import { useTheme } from "@mui/material";

const menuItems = [
  {
    icon: "/static/sidemenu/find.png",
    selectedIcon: "/static/sidemenu/find-selected.png",
    title: "지원금 찾기",
  },
  {
    icon: "/static/sidemenu/coin.png",
    selectedIcon: "/static/sidemenu/coin-selected.png",
    title: "저금리 대출",
  },
  {
    icon: "/static/sidemenu/home.png",
    selectedIcon: "/static/sidemenu/home-selected.png",
    title: "홈페이지",
  },
  {
    icon: "/static/sidemenu/contents.png",
    selectedIcon: "/static/sidemenu/contents-selected.png",
    title: "사업 지식",
  },
  {
    icon: "/static/sidemenu/more.png",
    selectedIcon: "/static/sidemenu/more-selected.png",
    title: "더보기",
  },
];

export default function BottomBar({ setShowKaKaoLoginModal }) {
  const theme = useTheme();
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleMenuItemClick = (index) => {
    setSelectedMenuItem(index);
    setShowKaKaoLoginModal(true);
  };

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "#fff",
        top: "auto",
        bottom: 0,
        borderTopRightRadius: "24px",
        borderTopLeftRadius: "24px",
      }}
    >
      <Toolbar sx={{ padding: 0, paddingBottom: "4px" }}>
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="flex-end"
          width="100%"
        >
          {menuItems.map((item, index) => (
            <Box
              key={index}
              onClick={() => handleMenuItemClick(index)}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <IconButton sx={{ paddingBottom: "20px" }}>
                <img
                  src={
                    selectedMenuItem === index ? item.selectedIcon : item.icon
                  }
                  alt={item.title}
                  style={{ height: "25px" }}
                />
              </IconButton>
              <Small
                color={
                  selectedMenuItem === index
                    ? "#5313BB"
                    : theme.palette.primary.dark
                }
                sx={{ fontSize: "11px", position: "absolute", bottom: 4.5 }}
              >
                {item.title}
              </Small>
            </Box>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
