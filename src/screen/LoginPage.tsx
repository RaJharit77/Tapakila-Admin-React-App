import {
  EmailRounded,
  Login,
  PasswordRounded,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import {
  Box,
  Card,
  CircularProgress,
  TextField,
  IconButton,
  InputAdornment
} from "@mui/material";
import Button from "@mui/material/Button";
import { useState, type FormEvent } from "react";
import { useLogin, useNotify } from "react-admin";
import { LoginStyle } from "../style/LoginStyle";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 Nouvel état pour afficher/masquer
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

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Empêche le focus de quitter le champ
  };

  return (
    <Box sx={LoginStyle}>
      <Card>
        <form onSubmit={handleSubmit}>
          <h1 style={{ marginBottom: "0.5rem", color: " #0077FF" }}>
            Se <span style={{ color: " #FFBA08" }}>connecter</span>
          </h1>
          <p style={{ color: " #fff", marginBottom: "1.5rem" }}>
            Veuillez entrer votre email et votre mot de passe
          </p>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <EmailRounded sx={{ color: "action.active", mr: 1 }} />
            <TextField
              id="input-with-sx"
              label="Email"
              type="email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
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
                "& .MuiInputBase-input": {
                  color: "#fff", // Assure que le texte tapé est blanc
                },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PasswordRounded sx={{ color: "action.active", mr: 1 }} />
            <TextField
              id="input-with-sx"
              label="Mot de passe"
              type={showPassword ? "text" : "password"} // 👈 Type dynamique
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
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
                "& .MuiInputBase-input": {
                  color: "#fff", // Assure que le texte tapé est blanc
                },
              }}
              InputProps={{ // 👈 Ajout de l'icône à la fin du champ
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{
                        color: "#fff",
                        "&:hover": { color: "#FFBA08" }
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Button
            fullWidth
            startIcon={<Login />}
            variant="contained"
            type="submit"
            sx={{
              marginTop: "1.5rem",
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
              "Se connecter"
            )}
          </Button>
        </form>
      </Card>
    </Box>
  );
};