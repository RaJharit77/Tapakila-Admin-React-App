import { EmailRounded, Login, PasswordRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Card, CircularProgress, TextField, IconButton, InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import { useState, type FormEvent } from "react";
import { useLogin, useNotify } from "react-admin";
import { LoginStyle } from "../style/LoginStyle";

// ✅ Interface pour typer l'erreur de manière sûre
interface AuthError {
  body?: { error?: string; message?: string };
  message?: string;
}

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login({ email, password });
    } catch (error: unknown) {
      // ✅ Extraction sécurisée du message d'erreur
      const err = error as AuthError;
      const errorMessage =
        err?.body?.error ||
        err?.body?.message ||
        err?.message ||
        "Erreur de connexion. Vérifiez vos identifiants.";

      notify(errorMessage, { type: "error", autoHideDuration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={LoginStyle}>
      <Card sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <h1 style={{ marginBottom: "0.5rem", color: "#0077FF", fontSize: '2rem', fontWeight: 'bold' }}>
            Se <span style={{ color: "#FFBA08" }}>connecter</span>
          </h1>
          <p style={{ color: "#fff", marginBottom: "2rem" }}>
            Veuillez entrer vos identifiants administrateur.
          </p>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <EmailRounded sx={{ color: "action.active", mr: 1 }} />
            <TextField
              label="Email"
              type="email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              sx={{
                "& .MuiInput-underline:before": { borderBottom: "2px solid #fff" },
                "& .MuiInput-underline:after": { borderBottom: "2px solid #0077FF" },
                "& .MuiInputLabel-root": { color: "#fff" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#0077FF" },
                "& .MuiInputBase-input": { color: "#fff" },
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <PasswordRounded sx={{ color: "action.active", mr: 1 }} />
            <TextField
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              sx={{
                "& .MuiInput-underline:before": { borderBottom: "2px solid #fff" },
                "& .MuiInput-underline:after": { borderBottom: "2px solid #FFBA08" },
                "& .MuiInputLabel-root": { color: "#fff" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#FFBA08" },
                "& .MuiInputBase-input": { color: "#fff" },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "#fff", "&:hover": { color: "#FFBA08" } }}
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
              mt: 3, color: "#fff", backgroundColor: "#0077FF",
              "&:hover": { backgroundColor: "#FFBA08", color: "#fff" },
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Se connecter"}
          </Button>
        </form>
      </Card>
    </Box>
  );
};