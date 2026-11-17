import { EmailRounded, Login, PasswordRounded } from "@mui/icons-material";
import { Box, Card, CircularProgress, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState, type FormEvent } from "react";
import { useLogin, useNotify } from "react-admin";
import { LoginStyle } from "../style/LoginStyle";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login({ email, password });
    } catch (error) {
      notify("Erreur d'authentification", { type: "warning" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={LoginStyle}>
      <Card>
        <form onSubmit={handleSubmit}>
          <h1 style={{ marginBottom: "0.5rem", color: " #0077FF" }}>
            Se <span style={{color: " #FFBA08"}}>connecter</span>
          </h1>
          <p style={{ color: " #fff", marginBottom: "1.5rem" }}>
            Veuillez entrer votre email et votre mot de passe
          </p>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EmailRounded sx={{ color: "action.active", mr: 1 }} />
            <TextField
              id="input-with-sx"
              label="Email"
              type="email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottom: "2px solid #fff",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid #0077FF",
                },
                "& .MuiInputLabel-root": {
                  color: "#fff",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: " #0077FF",
                },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PasswordRounded sx={{ color: "action.active", mr: 1 }} />
            <TextField
              id="input-with-sx"
              label="Mot de passe"
              type="password"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottom: "2px solid #fff",
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "2px solid #FFBA08",
                },
                "& .MuiInputLabel-root": {
                  color: "#fff",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: " #FFBA08",
                },
              }}
            />
          </Box>
          <Button
            fullWidth
            startIcon={<Login />}
            variant="contained"
            type="submit"
            sx={{
              marginTop: "1rem",
              color: " #fff",
              backgroundColor: " #0077FF",
              "&:hover": {
                backgroundColor: " #FFBA08",
                color: " #fff",
              },
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "connecter"
            )}
          </Button>
        </form>
      </Card>
    </Box>
  );
};
