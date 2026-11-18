import { Event, Message, People, AdminPanelSettings } from "@mui/icons-material";
import { Menu } from "react-admin";

export const MyMenu = () => (
  <Menu
    sx={{
      "& .MuiList-root": {
        position: "fixed",
      },
      "& .MuiMenuItem-root": {
        "&:hover": {
          color: "#0077FF",
          "& .MuiListItemIcon-root": {
            color: "#0077FF",
          },
        },
      },
    }}
  >
    <Menu.Item
      to="/users"
      primaryText="Utilisateur"
      sx={{
        background: "#0077FF",
        margin: "20px 0",
        fontWeight: "bold",
        border: "2px solid #0077FF",
        borderRadius: "10px",
        padding: "10px 10px",
        fontFamily: "Poppins",
      }}
      leftIcon={<People />}
    />
    <Menu.Item
      to="/events"
      primaryText="Evenement"
      sx={{
        background: "#0077FF",
        margin: "10px 0",
        fontWeight: "bold",
        border: "2px solid #0077FF",
        borderRadius: "10px",
        padding: "10px 10px",
        fontFamily: "Poppins",
      }}
      leftIcon={<Event />}
    />
    <Menu.Item
      to="/contact"
      primaryText="Message"
      sx={{
        background: "#0077FF",
        margin: "20px 0",
        fontWeight: "bold",
        border: "2px solid #0077FF",
        borderRadius: "10px",
        padding: "10px 10px",
        fontFamily: "Poppins",
      }}
      leftIcon={<Message />}
    />
    <Menu.Item
      to="/admins"
      primaryText="Administrateurs"
      sx={{
        background: "#0077FF",
        margin: "20px 0",
        fontWeight: "bold",
        border: "2px solid #0077FF",
        borderRadius: "10px",
        padding: "10px 10px",
        fontFamily: "Poppins",
      }}
      leftIcon={<AdminPanelSettings />}
    />
  </Menu>
);
