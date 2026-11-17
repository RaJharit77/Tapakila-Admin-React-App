import {
    Show,
    useRecordContext,
    EditButton,
    TopToolbar,
    useNotify,
    useRefresh,
    TabbedShowLayout,
    DateField,
    TextField,
    Datagrid,
    NumberField,
    Pagination,
    ListPaginationContext
} from 'react-admin';
import {
    Box,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField as MuiTextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button as MuiButton,
    Paper,
    Grid,
    Container,
    Chip // ✅ Ajout de Chip pour le statut personnalisé
} from '@mui/material';
import { useState } from 'react';
import { eventsDataProvider, TicketType } from '../../data/events-data-provider';
import ConfirmationNumber from '@mui/icons-material/ConfirmationNumber';
import { LocationOn, CalendarToday, Person, Category } from "@mui/icons-material";

const EventActions = () => (
    <TopToolbar>
        <EditButton />
    </TopToolbar>
);

interface Ticket {
    ticket_id: string;
    ticket_type: TicketType;
    ticket_price: number;
    ticket_status: 'AVAILABLE' | 'SOLD' | 'RESERVED';
    ticket_creation_date: string;
    user_id?: string;
}

const TicketRatioField = () => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body1">
                {record.available_tickets} / {record.total_tickets} billets disponibles
            </Typography>
        </Box>
    );
};

// ✅ Composant personnalisé pour afficher le statut avec la bonne couleur
const StatusChip = () => {
    const record = useRecordContext();
    if (!record) return null;

    let color = '#9e9e9e';
    if (record.ticket_status === 'SOLD') color = '#4caf50';
    if (record.ticket_status === 'AVAILABLE') color = '#2196f3';
    if (record.ticket_status === 'RESERVED') color = '#ff9800';

    return <Chip label={record.ticket_status} sx={{ backgroundColor: color, color: '#fff' }} size="small" />;
};

const TicketsTab = () => {
    const record = useRecordContext();
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [typeFilter, setTypeFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');

    // ✅ Sécurité si record est undefined
    if (!record) return null;

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const filteredTickets = record.tickets?.filter((ticket: Ticket) => {
        const matchesType = !typeFilter || ticket.ticket_type === typeFilter;
        const matchesStatus = !statusFilter || ticket.ticket_status === statusFilter;
        return matchesType && matchesStatus;
    }) || [];

    const paginatedTickets = filteredTickets.slice(startIndex, endIndex);
    const totalTickets = filteredTickets.length;

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Billets ({totalTickets})
            </Typography>

            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Type de ticket</InputLabel>
                    <Select
                        value={typeFilter}
                        onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
                        label="Type de ticket"
                    >
                        <MenuItem value="">Tous les types</MenuItem>
                        <MenuItem value={TicketType.STANDARD}>Standard</MenuItem>
                        <MenuItem value={TicketType.VIP}>VIP</MenuItem>
                        <MenuItem value={TicketType.EARLY_BIRD}>Early Bird</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Statut</InputLabel>
                    <Select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                        label="Statut"
                    >
                        <MenuItem value="">Tous les statuts</MenuItem>
                        <MenuItem value="AVAILABLE">Disponible</MenuItem>
                        <MenuItem value="SOLD">Vendu</MenuItem>
                        <MenuItem value="RESERVED">Réservé</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <ListPaginationContext.Provider value={{
                page,
                perPage,
                setPage,
                setPerPage,
                total: totalTickets,
                isPending: false,
                resource: 'tickets'
            }}>
                <Box>
                    <Datagrid
                        bulkActionButtons={false}
                        data={paginatedTickets}
                        rowClick={false}
                    >
                        <TextField source="ticket_id" label="ID" />
                        <TextField source="ticket_type" label="Type" />
                        <NumberField
                            source="ticket_price"
                            label="Prix (Ar)"
                            options={{ style: 'currency', currency: 'MGA' }}
                        />
                        {/* ✅ Utilisation du composant StatusChip corrigé */}
                        <StatusChip />
                        <DateField
                            source="ticket_creation_date"
                            label="Date création"
                            showTime
                            locales="fr-FR"
                        />
                        <TextField source="user_id" label="Acheté par" />
                    </Datagrid>

                    <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
                </Box>
            </ListPaginationContext.Provider>

            {(!record.tickets || record.tickets.length === 0) && (
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Aucun billet disponible pour cet événement
                </Typography>
            )}
        </Box>
    );
};

interface CreateTicketDialogProps {
    open: boolean;
    onClose: () => void;
    eventId: string;
    onSuccess: () => void;
}

const CreateTicketDialog = ({ open, onClose, eventId, onSuccess }: CreateTicketDialogProps) => {
    const [ticketNumber, setTicketNumber] = useState('');
    const [ticketType, setTicketType] = useState<TicketType>(TicketType.STANDARD);
    const [ticketPrice, setTicketPrice] = useState('');
    const notify = useNotify();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!ticketNumber || parseInt(ticketNumber) <= 0) {
            notify('Le nombre de tickets doit être supérieur à 0', { type: 'error' });
            return;
        }

        if (!ticketPrice || parseFloat(ticketPrice) < 0) {
            notify('Le prix doit être valide', { type: 'error' });
            return;
        }

        try {
            if (!eventId) {
                notify('L\'ID de l\'événement est obligatoire', { type: 'error' });
                return;
            }
            const params = {
                ticketNumber: parseInt(ticketNumber, 10),
                idEvent: eventId,
                ticket_type: ticketType,
                ticketPrice: parseFloat(ticketPrice)
            };

            await eventsDataProvider.createTickets(params);
            notify('Tickets créés avec succès', { type: 'success' });
            onSuccess();
            onClose();
            setTicketNumber('');
            setTicketType(TicketType.STANDARD);
            setTicketPrice('');
        } catch (error) {
            console.error('Error creating tickets:', error);
            notify((error as Error).message, { type: 'error' });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Créer des tickets</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <MuiTextField
                        label="Nombre de tickets"
                        type="number"
                        value={ticketNumber}
                        onChange={(e) => setTicketNumber(e.target.value)}
                        required
                        fullWidth
                        inputProps={{ min: 1 }}
                        error={ticketNumber !== '' && parseInt(ticketNumber) <= 0}
                        helperText={ticketNumber !== '' && parseInt(ticketNumber) <= 0 ? "Le nombre doit être supérieur à 0" : ""}
                    />
                    <FormControl fullWidth required>
                        <InputLabel>Type de ticket</InputLabel>
                        <Select
                            value={ticketType}
                            onChange={(e) => setTicketType(e.target.value as TicketType)}
                            label="Type de ticket"
                        >
                            <MenuItem value={TicketType.STANDARD}>Standard</MenuItem>
                            <MenuItem value={TicketType.VIP}>VIP</MenuItem>
                            <MenuItem value={TicketType.EARLY_BIRD}>Early Bird</MenuItem>
                        </Select>
                    </FormControl>
                    <MuiTextField
                        label="Prix du ticket"
                        type="number"
                        value={ticketPrice}
                        onChange={(e) => setTicketPrice(e.target.value)}
                        required
                        fullWidth
                        inputProps={{ min: 0, step: "0.01" }}
                        error={ticketPrice !== '' && parseFloat(ticketPrice) < 0}
                        helperText={ticketPrice !== '' && parseFloat(ticketPrice) < 0 ? "Le prix ne peut pas être négatif" : ""}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <MuiButton onClick={onClose}>Annuler</MuiButton>
                <MuiButton
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={!ticketNumber || !ticketPrice || parseInt(ticketNumber) <= 0 || parseFloat(ticketPrice) < 0}
                >
                    Créer
                </MuiButton>
            </DialogActions>
        </Dialog>
    );
};

interface DeleteTicketDialogProps {
    open: boolean;
    onClose: () => void;
    eventId: string;
    onSuccess: () => void;
}

const DeleteTicketDialog = ({ open, onClose, eventId, onSuccess }: DeleteTicketDialogProps) => {
    const [ticketNumber, setTicketNumber] = useState('');
    const [ticketType, setTicketType] = useState<TicketType | ''>('');
    const notify = useNotify();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!ticketNumber || parseInt(ticketNumber) <= 0) {
            notify('Le nombre de tickets doit être supérieur à 0', { type: 'error' });
            return;
        }

        try {
            const params = {
                ticketNumber: parseInt(ticketNumber, 10),
                event_id: eventId,
                ...(ticketType && { ticket_type: ticketType as TicketType })
            };

            // ✅ Correction : Suppression de "const result =", car non utilisé
            await eventsDataProvider.deleteTickets(params);
            notify('Tickets supprimés avec succès', { type: 'success' });
            onSuccess();
            onClose();
            setTicketNumber('');
            setTicketType('');
        } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            console.error('Error deleting tickets:', error);
            notify(error.message || 'Erreur lors de la suppression des tickets', { type: 'error' });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Supprimer des tickets</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <MuiTextField
                        label="Nombre de tickets"
                        type="number"
                        value={ticketNumber}
                        onChange={(e) => setTicketNumber(e.target.value)}
                        required
                        fullWidth
                        inputProps={{ min: 1 }}
                        error={ticketNumber !== '' && parseInt(ticketNumber) <= 0}
                        helperText={ticketNumber !== '' && parseInt(ticketNumber) <= 0 ? "Le nombre doit être supérieur à 0" : ""}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Type de ticket (optionnel)</InputLabel>
                        <Select
                            value={ticketType}
                            onChange={(e) => setTicketType(e.target.value as TicketType | '')}
                            label="Type de ticket (optionnel)"
                        >
                            <MenuItem value="">Tous les types</MenuItem>
                            <MenuItem value={TicketType.STANDARD}>Standard</MenuItem>
                            <MenuItem value={TicketType.VIP}>VIP</MenuItem>
                            <MenuItem value={TicketType.EARLY_BIRD}>Early Bird</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <MuiButton onClick={onClose}>Annuler</MuiButton>
                <MuiButton
                    onClick={handleSubmit}
                    variant="contained"
                    color="error"
                    disabled={!ticketNumber || parseInt(ticketNumber) <= 0}
                >
                    Supprimer
                </MuiButton>
            </DialogActions>
        </Dialog>
    );
};

const EventContent = () => {
    const record = useRecordContext();
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const refresh = useRefresh();

    if (!record) return null;

    const isPastEvent = new Date(record.event_date) < new Date();

    const formattedDate = record.event_date ? new Date(record.event_date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }) : '';

    return (
        <TabbedShowLayout sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
            <TabbedShowLayout.Tab label="Détails" path="">
                <Container maxWidth="lg">
                    <Paper elevation={3} sx={{ p: 3, my: 2 }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6} sx={{ height: '100%' }}>
                                <Box sx={{
                                    position: 'sticky',
                                    top: 16,
                                    height: '100%',
                                    minHeight: 600,
                                    overflow: 'hidden',
                                    borderRadius: 2
                                }}>
                                    <img
                                        src={record.event_image || '/placeholder-image.jpg'}
                                        alt={record.event_name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography variant="h4" gutterBottom>
                                    {record.event_name}
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <CalendarToday sx={{ color: 'primary.main' }} />
                                        <Box>
                                            <Typography variant="subtitle2" color="textSecondary">Date</Typography>
                                            <Typography>{formattedDate}</Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <LocationOn sx={{ color: 'primary.main' }} />
                                        <Box>
                                            <Typography variant="subtitle2" color="textSecondary">Lieu</Typography>
                                            <Typography>{record.event_place}</Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Category sx={{ color: 'primary.main' }} />
                                        <Box>
                                            <Typography variant="subtitle2" color="textSecondary">Catégorie</Typography>
                                            <Typography>{record.event_category}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Person sx={{ color: 'primary.main' }} />
                                        <Typography variant="subtitle2" color="textSecondary">Limite par utilisateur</Typography>
                                        <TextField
                                            source="event_tickets_limit_by_user_by_type"
                                            label="Nombre de billets par utilisateur par type"
                                            sx={{ minWidth: '200px' }}
                                        />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Person sx={{ color: 'primary.main' }} />
                                        <Box>
                                            <Typography variant="subtitle2" color="textSecondary">Organisateur</Typography>
                                            <Typography>{record.event_organizer}</Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                        <ConfirmationNumber sx={{ color: 'primary.main', mt: 0.5 }} />
                                        <Box>
                                            <Typography variant="subtitle2" color="textSecondary">Billets</Typography>
                                            <TicketRatioField />

                                            <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
                                                <MuiButton
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => setCreateDialogOpen(true)}
                                                    disabled={isPastEvent}
                                                >
                                                    Créer des tickets
                                                </MuiButton>
                                                <MuiButton
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => setDeleteDialogOpen(true)}
                                                    disabled={isPastEvent}
                                                >
                                                    Supprimer des tickets
                                                </MuiButton>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box sx={{ mt: 3 }}>
                                        <Typography variant="h6" gutterBottom>Description</Typography>
                                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                                            {record.event_description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>

                    <CreateTicketDialog
                        open={createDialogOpen}
                        onClose={() => setCreateDialogOpen(false)}
                        eventId={record.event_id}
                        onSuccess={refresh}
                    />
                    <DeleteTicketDialog
                        open={deleteDialogOpen}
                        onClose={() => setDeleteDialogOpen(false)}
                        eventId={record.event_id}
                        onSuccess={refresh}
                    />
                </Container>
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Tickets" path="tickets">
                <TicketsTab />
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    );
};

export const EventShow = () => (
    <Show actions={<EventActions />}>
        <EventContent />
    </Show>
);