import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  styled,
  IconButton,
  useTheme,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { Info, Settings, X, Bell } from "lucide-react";
import { format } from "date-fns";
import { H5, H6, H8, Tiny } from "components/Typography";
import FlexBox from "./flexbox/FlexBox";

// 알람 데이터
const notifications = [
  {
    id: 1,
    type: "Notice",
    title: "System Maintenance Notice",
    content:
      "From July 1, 2023, 2:00 AM to 4:00 AM, there will be a system maintenance.",
    date: new Date(2023, 6, 30, 15, 0),
  },
  {
    id: 2,
    type: "Notice",
    title: "New Feature Update",
    content: "A new analysis tool has been added to the dashboard. Check it out now!",
    date: new Date(2023, 6, 29, 10, 30),
  },
];

const NotificationWindow = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  right: 0,
  width: "400px",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  marginTop: "12px",
  zIndex: 1300,
  transformOrigin: "top right",
  [theme.breakpoints.down("md")]: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    maxWidth: "100%",
    width: "100%",
    height: "100%",
    margin: 0,
    borderRadius: 0,
    transformOrigin: "unset",
  },
}));

const NotificationTab = styled(Tab)(({ theme }) => ({
  minWidth: "auto",
  padding: "8px 20px",
  fontSize: 14,
  color: theme.palette.primary.grey,
  "&.Mui-selected": {
    color: theme.palette.primary.darkBlue,
  },
}));

const NotificationItem = styled(Box)(({ theme }) => ({
  padding: "20px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

const NotificationPill = styled(Box)(({ theme }) => ({
  display: "inline-block",
  padding: "2px 8px",
  borderRadius: "12px",
  backgroundColor: theme.palette.primary.lightRed,
  color: theme.palette.primary.red,
  fontSize: "0.75rem",
  marginRight: "8px",
  whiteSpace: "nowrap",
}));

const SpecialNotification = styled(Box)(({ theme }) => ({
  padding: "20px",
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.primary.lightBlue3,
  border: `1px solid ${theme.palette.primary.main}`,
  position: "relative",
  borderRadius: "10px",
}));

const AlarmWindow = ({ onClose, isExiting }) => {
  const theme = useTheme();
  const [notificationTab, setNotificationTab] = useState(0);
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [showSpecialNotification, setShowSpecialNotification] = useState(true);

  const handleNotificationTabChange = (event, newValue) => {
    setNotificationTab(newValue);
  };

  return (
    <NotificationWindow
      sx={{
        animation: isExiting
          ? isMobileOrTablet
            ? "slideOut 0.3s ease-out"
            : "scaleOut 0.2s ease-out"
          : isMobileOrTablet
          ? "slideIn 0.3s ease-out"
          : "scaleIn 0.2s ease-out",
        "@keyframes slideIn": {
          from: {
            transform: "translateX(100%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        "@keyframes slideOut": {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(100%)",
          },
        },
        "@keyframes scaleIn": {
          from: {
            opacity: 0,
            transform: "scale(0.95)",
          },
          to: {
            opacity: 1,
            transform: "scale(1)",
          },
        },
        "@keyframes scaleOut": {
          from: {
            opacity: 1,
            transform: "scale(1)",
          },
          to: {
            opacity: 0,
            transform: "scale(0.95)",
          },
        },
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <H5>Notification</H5>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!isMobileOrTablet && (
            <>
              <Tiny
                sx={{ color: theme.palette.primary.grey, cursor: "pointer" }}
              >
                Mark all as read
              </Tiny>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ my: 0.5, mx: 1 }}
              />
            </>
          )}
          <IconButton size="small">
            <Settings size={16} color={theme.palette.primary.grey} />
          </IconButton>
          {isMobileOrTablet && (
            <IconButton size="small" onClick={onClose} sx={{ ml: 1 }}>
              <X size={20} color={theme.palette.primary.grey} />
            </IconButton>
          )}
        </Box>
      </Box>
      <Tabs
        value={notificationTab}
        onChange={handleNotificationTabChange}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          "& .MuiTabs-indicator": {
            backgroundColor: "primary.darkBlue",
          },
        }}
      >
        <NotificationTab label="All" />
        <NotificationTab label="Notice" />
        <NotificationTab label="Service" />
      </Tabs>
      <Box sx={{ padding: "20px", maxHeight: "400px", overflowY: "auto" }}>
        {showSpecialNotification && (
          <SpecialNotification>
            <IconButton
              size="small"
              onClick={() => setShowSpecialNotification(false)}
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
              }}
            >
              <X size={20} color={theme.palette.primary.grey} />
            </IconButton>

            <FlexBox>
              <Box
                mr={1}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "20px",
                  height: "20px",
                  background: theme.palette.primary.lightBlue,
                  borderRadius: "50%",
                }}
              >
                <Tiny
                  sx={{ fontWeight: 600, color: theme.palette.primary.dark }}
                >
                  !
                </Tiny>
              </Box>
              
              <H6 sx={{ fontWeight: 600, mb: 1 }}>
              Customer Support Center Operating Hours Change
              </H6>
            </FlexBox>
            <H6 sx={{ color: "text.secondary" }}>
            From July, the operating hours of the customer support center will change from 9:00 AM to 6:00 PM.
            </H6>
          </SpecialNotification>
        )}
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem key={notification.id}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <NotificationPill>{notification.type}</NotificationPill>
                  <H6 sx={{ fontWeight: 600 }}>{notification.title}</H6>
                </Box>
                <Tiny sx={{ color: theme.palette.primary.grey400 }}>
                  {format(notification.date, "yyyy.MM.dd")}
                </Tiny>
              </Box>
              <H6 sx={{ color: "text.secondary" }}>{notification.content}</H6>
            </NotificationItem>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
            }}
          >
            <Bell size={48} color={theme.palette.primary.grey400} />
            <H6 sx={{ color: theme.palette.primary.grey400, mt: 2 }}>
                No new notifications
            </H6>
          </Box>
        )}
      </Box>
    </NotificationWindow>
  );
};

export default AlarmWindow;
