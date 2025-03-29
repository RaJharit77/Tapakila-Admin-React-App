import {
  Avatar,
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { DateField, TextField } from "react-admin";

export default function MyProfil({record} : {record: any}) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 5,
        alignItems: "flex-start",
        padding: "20px 0",
      }}
    >
      <Stack alignItems="center">
        <Avatar
          src={record.user_image}
          aria-label="Profil"
          sx={{
            width: 80,
            height: 80,
            border: "3px solid #FFBA08",
            backgroundColor: "#0077FF",
            color: "white",
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: 2,
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body1"
            sx={{
              color: "#0077FF",
              fontFamily: "Poppins",
              fontSize: "0.8rem",
            }}
          >
            ID :
          </Typography>
          <TextField
            source="user_id"
            label={false}
            sx={{
              paddingLeft: "10px",
              fontFamily: "Poppins",
              fontSize: "1.1rem",
            }}
          />
        </Box>
      </Stack>
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          backgroundColor: "#FFBA08",
          width: "2px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1,
          paddingTop: "10px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body1"
            sx={{
              color: "#0077FF",
              fontFamily: "Poppins",
              fontSize: "0.8rem",
            }}
          >
            Nom :
          </Typography>
          <TextField
            source="user_name"
            label={false}
            sx={{
              paddingLeft: "10px",
              fontFamily: "Poppins",
              fontSize: "1.1rem",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body1"
            sx={{
              color: "#0077FF",
              fontFamily: "Poppins",
              fontSize: "0.8rem",
            }}
          >
            E-mail :
          </Typography>
          <TextField
            source="user_email"
            label={false}
            sx={{
              paddingLeft: "10px",
              fontFamily: "Poppins",
              fontSize: "1.1rem",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body1"
            sx={{
              color: "#0077FF",
              fontFamily: "Poppins",
              fontSize: "0.8rem",
            }}
          >
            Date de création:
          </Typography>
          <DateField
            source="user_first_login_date"
            locales="fr-FR"
            options={{
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric"
            }}
            sx={{
              paddingLeft: "10px",
              fontFamily: "Poppins",
              fontSize: "1.1rem",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
