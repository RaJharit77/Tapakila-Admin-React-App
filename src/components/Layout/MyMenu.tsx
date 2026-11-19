import { Event, Message, People, AdminPanelSettings } from "@mui/icons-material";
import { Menu } from "react-admin";
import { useLocation } from "react-router-dom";
import React from "react";

const CustomMenuItem = ({
  to,
  primaryText,
  leftIcon
}: {
  to: string;
  primaryText: string;
  leftIcon: React.ReactNode;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <Menu.Item
      to={to}
      primaryText={primaryText}
      leftIcon={leftIcon}
      sx={{
        background: isActive ? "#FFBA08" : "#0077FF",
        color: isActive ? "#14213D" : "#ffffff",       
        margin: "10px 0",
        fontWeight: "bold",
        border: isActive ? "2px solid #FFBA08" : "2px solid #0077FF",
        borderRadius: "10px",
        padding: "10px 10px",
        fontFamily: "Poppins",
        transition: "all 0.3s ease",

        "& .MuiListItemIcon-root": {
          color: isActive ? "#14213D" : "#ffffff",     
        },

        "&:hover": {
          background: isActive ? "#FFBA08" : "#005ce6", 
          color: isActive ? "#14213D" : "#ffffff",
          "& .MuiListItemIcon-root": {
            color: isActive ? "#14213D" : "#ffffff",
          },
        },
      }}
    />
  );
};

export const MyMenu = () => (
  <Menu
    sx={{
      "& .MuiList-root": {
        position: "fixed",
      },
    }}
  >
    <CustomMenuItem to="/users" primaryText="Utilisateur" leftIcon={<People />} />
    <CustomMenuItem to="/events" primaryText="Événement" leftIcon={<Event />} />
    <CustomMenuItem to="/contact" primaryText="Message" leftIcon={<Message />} />
    <CustomMenuItem to="/admins" primaryText="Administrateurs" leftIcon={<AdminPanelSettings />} />
  </Menu>
);
