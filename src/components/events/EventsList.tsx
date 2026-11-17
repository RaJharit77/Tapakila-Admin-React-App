import { List, useListContext, TopToolbar, CreateButton } from "react-admin";
import { Grid, Typography, Box, Alert } from "@mui/material";
import { EventCard } from "./EventCard";

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

export const EventList = () => {
  return (
    <List
      actions={<ListActions />}
      sort={{ field: 'event_date', order: 'DESC' }}
      perPage={25}
    >
      <EventListContent />
    </List>
  );
};

const EventListContent = () => {
  // ✅ Récupération de l'erreur
  const { data = [], isLoading, error } = useListContext();

  if (isLoading) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <Typography>Chargement des événements en cours...</Typography>
      </Box>
    );
  }

  // ✅ Affichage propre si le serveur renvoie une erreur (500, 401, etc.)
  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Impossible de charger les événements : {error.message}
        </Alert>
      </Box>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = data.filter(event => new Date(event.event_date) >= today);
  const pastEvents = data.filter(event => new Date(event.event_date) < today);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, color: '#2e7d32', fontWeight: 'bold' }}>
        Événements à venir ({upcomingEvents.length})
      </Typography>

      {upcomingEvents.length > 0 ? (
        <Grid container spacing={2}>
          {upcomingEvents.map((event) => (
            <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ mb: 3 }}>
          Aucun événement à venir pour le moment.
        </Typography>
      )}

      {pastEvents.length > 0 && (
        <>
          <Typography variant="h5" sx={{ mt: 4, mb: 3, color: '#757575', fontWeight: 'bold' }}>
            Événements passés ({pastEvents.length})
          </Typography>
          <Grid container spacing={2}>
            {pastEvents.map((event) => (
              <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
                <EventCard event={event} isPastEvent />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};