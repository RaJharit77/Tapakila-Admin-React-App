<<<<<<< HEAD
import { Card, CardContent, CardMedia, Typography, Box, Chip, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { ConfirmationNumber } from "@mui/icons-material";

interface Event {
    id: string;
    event_name?: string;
    event_date?: string;
    event_place?: string;
    event_image?: string;
    available_tickets: number;
}

interface EventCardProps {
    event: Event;
    isPastEvent?: boolean;
}

export const EventCard = ({event, isPastEvent = false }: EventCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/events/${event.id}/show`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
        >
            <Card 
                sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    opacity: isPastEvent ? 0.7 : 1,
                    backgroundColor: isPastEvent ? "#f5f5f5" : "#ffffff",
                    position: 'relative',
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: "hidden",
                    transition: "box-shadow 0.3s",
                    "&:hover": {
                        boxShadow: 6,
                    }
                }}
            >
                {isPastEvent && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            zIndex: 1,
                            letterSpacing: '0.5px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                    >
                        PASSÉ
                    </Box>
                )}
                <CardMedia
                    component="img"
                    height="200"
                    image={event?.event_image || '/images/events.jpg'}
                    alt={event?.event_name || 'Event image'}
                    sx={{
                        objectFit: "cover",
                        filter: isPastEvent ? 'grayscale(30%)' : 'none',
                        opacity: isPastEvent ? 0.8 : 1,
                    }}
                />
                <CardContent sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 1.5,
                    p: 2.5,
                    backgroundColor: isPastEvent ? '#f5f5f5' : '#ffffff'
                }}>
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{
                            fontWeight: "bold",
                            color: isPastEvent ? "#424242" : "#1b5e20",
                            fontSize: '1.1rem',
                            lineHeight: 1.2,
                            mb: 1
                        }}
                        noWrap
                    >
                        {event?.event_name || 'Sans titre'}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            color: isPastEvent ? '#616161' : '#424242'
                        }}
                    >
                        {event?.event_date ? new Date(event.event_date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }) : 'Date non définie'}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{
                            fontSize: '0.9rem',
                            color: isPastEvent ? '#616161' : '#424242'
                        }}
                        noWrap
                    >
                        {event?.event_place || 'Lieu non défini'}
                    </Typography>

                    <Box sx={{ mt: 'auto', pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip 
                            icon={<ConfirmationNumber sx={{ fontSize: '1rem' }} />}
                            label={`${event.available_tickets} billets`}
                            size="small"
                            color={event.available_tickets > 0 ? "success" : "error"}
                            sx={{
                                borderRadius: '16px',
                                height: '24px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                backgroundColor: event.available_tickets > 0 ? '#e8f5e9' : '#ffebee',
                                color: event.available_tickets > 0 ? '#2e7d32' : '#d32f2f',
                                '& .MuiChip-label': {
                                    color: 'inherit'
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleClick}
                            size="small"
                            sx={{
                                backgroundColor: isPastEvent ? "#757575" : "#2e7d32",
                                color: "#ffffff",
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                px: 2,
                                py: 0.75,
                                "&:hover": {
                                    backgroundColor: isPastEvent ? "#616161" : "#1b5e20",
                                },
                            }}
                        >
                            Voir les détails
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
=======
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";

export const EventCard = ({ event, isPastEvent = false }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <Card
        sx={{
          maxWidth: 300,
          margin: 2,
          boxShadow: 2,
          borderRadius: '12px',
          overflow: "hidden",
          transition: "all 0.3s",
          backgroundColor: 'transparent',
          position: 'relative',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          "&:hover": {
            boxShadow: 4,
          },
        }}
      >
        <CardMedia
          component="img"
          height="160"
          image={event.event_image}
          alt={event.event_name}
          sx={{
            objectFit: "cover",
            filter: isPastEvent ? 'grayscale(80%)' : 'none',
            opacity: isPastEvent ? 0.6 : 1,
          }}
        />

        <CardContent sx={{ padding: '16px !important' }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              color: isPastEvent ? "text.secondary" : "primary.main",
              textAlign: "center",
              mb: 2,
              fontSize: '1.1rem',
              lineHeight: 1.3,
              minHeight: '3.2em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {event.event_name}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => navigate(`/events/${event.id}/show`)} // Redirection directe
              sx={{
                borderColor: isPastEvent ? "text.secondary" : "primary.main",
                color: isPastEvent ? "text.secondary" : "primary.main",
                borderRadius: '20px',
                textTransform: "none",
                fontWeight: 500,
                px: 3,
                "&:hover": {
                  backgroundColor: isPastEvent ? 'rgba(0, 0, 0, 0.04)' : 'rgba(46, 125, 50, 0.08)',
                  borderColor: isPastEvent ? "text.secondary" : "primary.main",
                },
              }}
            >
              Voir détails
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
>>>>>>> 5f073d1e7f836e8a620c2c7751eb67dd12f4bcaa
};
