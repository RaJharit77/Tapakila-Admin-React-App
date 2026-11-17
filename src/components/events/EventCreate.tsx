import { Create, SimpleForm, TextInput, DateTimeInput, required, NumberInput, useNotify, useRedirect } from 'react-admin';
import { Box } from '@mui/material';
import CloudinaryUpload from './ImageInput';

export const EventCreate = () => {
    const notify = useNotify();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('Événement créé avec succès !', { type: 'success' });
        redirect('list');
    };

    const onError = (error: Error) => {
        notify(`Erreur lors de la création : ${error.message}`, { type: 'error' });
    };

    return (
        <Create mutationOptions={{ onSuccess, onError }}>
            <SimpleForm>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2,
                    p: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 1
                }}>
                    <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' } }}>
                        <TextInput source="event_name" label="Nom de l'événement" validate={[required()]} fullWidth />
                    </Box>

                    <DateTimeInput source="event_date" label="Date et heure" validate={[required()]} fullWidth />
                    <TextInput source="event_place" label="Lieu" validate={[required()]} fullWidth />
                    <TextInput source="event_category" label="Catégorie" validate={[required()]} fullWidth />
                    <TextInput source="event_organizer" label="Organisateur" fullWidth />

                    <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 3' } }}>
                        <CloudinaryUpload source="event_image" />
                    </Box>

                    <NumberInput source="event_tickets_limit_by_user_by_type" label="Billets par utilisateur par type" fullWidth />

                    <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' } }}>
                        <TextInput source="event_description" label="Description" validate={[required()]} multiline rows={4} fullWidth />
                    </Box>

                    <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' } }}>
                        <TextInput source="additional_info" label="Informations supplémentaires" multiline rows={3} fullWidth />
                    </Box>
                </Box>
            </SimpleForm>
        </Create>
    );
};