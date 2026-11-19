import { AppBar, Logout, UserMenu } from "react-admin";
import MyToolbar from "../../screen/MyToolbar";

export default function MyAppBar() {
  return (
    <AppBar
      toolbar={<MyToolbar />}
      sx={{
        background: "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8))",
        padding: "10px 20px",
        borderBottom: "2px solid #FFBA08",
        borderBottomRightRadius: "20px",
        borderBottomLeftRadius: "20px",
        "& .RaConfigurable-root": {
          display: "none",
        },
        "& .MuiSvgIcon-fontSizeMedium": {
          fontSize: "2rem",
          color: "#FFBA08",
        }
      }}
      userMenu={
        <UserMenu>
          <Logout />
        </UserMenu>
      }
    />
  );
}
