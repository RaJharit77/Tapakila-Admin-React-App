import { List, useListContext, TopToolbar, CreateButton, Pagination } from "react-admin";
import { Grid, Typography, Box, Alert } from "@mui/material";
import { EventCard } from "./EventCard";

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

export const EventList = () => {
  return (
    <List actions={<ListActions />} sort={{ field: 'event_date', order: 'DESC' }} perPage={25}>
      <EventListContent />
    </List>
  );
};

const EventListContent = () => {
  const { data = [], isLoading, error } = useListContext();

  if (isLoading) return <Box p={4}><Typography>Chargement...</Typography></Box>;
  if (error) return <Alert severity="error">Erreur : {error.message}</Alert>;

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
        <Typography variant="body1" sx={{ mb: 3 }}>Aucun événement à venir.</Typography>
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

      <Pagination rowsPerPageOptions={[10, 25, 50]} />
    </Box>
  );
};