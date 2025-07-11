import React from "react";
import { Box } from "@mui/material";
import { useAuth } from "contexts/AuthContext";
import { User } from "lucide-react";

export default function PlaceholderAvatar({ source }) {
  const { user, isLoggedIn } = useAuth();

  console.log("PlaceholderAvatar: src: ", source);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        backgroundColor: "#E1E1E1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#808080",
        fontSize: "16px",
      }}
    >
      {source ? (
        <img
          src={source}
          alt={`avatar`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      ) : (
        <User size={24} color="#808080" />
      )}
    </Box>
  );
}
