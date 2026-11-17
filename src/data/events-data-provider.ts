import { 
    fetchUtils, 
    GetListParams, 
    GetOneParams, 
    GetManyParams, 
    GetManyReferenceParams, 
    CreateParams, 
    UpdateParams, 
    UpdateManyParams, 
    DeleteParams, 
    DeleteManyParams 
} from "react-admin";
import queryString from "query-string";
import { API_URL } from "../api/api";

export interface Event {
    event_id: string;
    event_name: string;
    event_date: string;
    event_place: string;
    event_category: string;
    event_description: string;
    event_image?: string;
    event_organizer?: string;
    event_status: string;
    available_tickets?: number;
    total_tickets?: number;
    event_tickets_limit_by_user_by_type?: number;
}

export interface TicketStats {
    vipCount: number;
    standardCount: number;
    earlyBirdCount: number;
    total: number;
    ticketsNumber: number;
}

export interface GetTicketsParams {
    eventId: string;
    status?: string;
}

export interface GetPaginatedTicketsParams {
    eventId: string;
    page: number;
    perPage: number;
    typeFilter?: string;
    statusFilter?: string;
}

export enum TicketType {
    VIP = "VIP",
    STANDARD = "STANDARD",
    EARLY_BIRD = "EARLY_BIRD"
}

export interface CreateTicketsParams { 
    ticketNumber: number; 
    idEvent: string; 
    ticket_type: TicketType; 
    ticketPrice: number; 
}

export interface DeleteTicketsParams { 
    ticketNumber: number; 
    event_id: string; 
    ticket_type?: TicketType; 
}

const apiUrl = `${API_URL}/api/events`;
const ticketsApiUrl = `${API_URL}/api/tickets`;
const httpClient = fetchUtils.fetchJson;

interface ApiError {
    status?: number;
    message?: string;
    body?: {
        error?: string;
        message?: string;
        [key: string]: unknown;
    };
}

const handleApiError = (error: unknown): never => {
    console.error('API Error:', error);
    const apiError = error as ApiError;

    if (apiError.status === 401 || apiError.status === 403) {
        localStorage.removeItem('token');
        throw new Error("Votre session a expiré. Veuillez vous reconnecter.");
    }

    const errorMessage = apiError.body?.error || apiError.body?.message || apiError.message || 'Erreur de communication avec le serveur';
    throw new Error(errorMessage);
};

const eventsDataProvider = {
    getTicketsForEvent: async (params: GetTicketsParams): Promise<number> => {
        try {
            const query = { idEvent: params.eventId, ...(params.status && { status: params.status }) };
            const { json: tickets } = await httpClient(`${ticketsApiUrl}?${queryString.stringify(query)}`);
            return tickets.tickets?.length || 0;
        } catch (error) {
            console.error('Error fetching tickets:', error);
            return 0;
        }
    },

    getPaginatedTickets: async (params: GetPaginatedTicketsParams) => {
        try {
            const { eventId, page, perPage, typeFilter, statusFilter } = params;
            const queryParams = new URLSearchParams({
                idEvent: eventId, 
                page: page.toString(), 
                pageSize: perPage.toString(),
                ...(typeFilter && { type: typeFilter }),
                ...(statusFilter && { status: statusFilter })
            });
            const { json } = await httpClient(`${ticketsApiUrl}?${queryParams}`);
            return { data: json.tickets || [], total: json.total || 0 };
        } catch (error) {
            console.error('Error fetching paginated tickets:', error);
            return { data: [], total: 0 };
        }
    },

    getTotalTicketsForEvent: async (eventId: string): Promise<number> => {
        try {
            const { json: tickets } = await httpClient(`${ticketsApiUrl}?idEvent=${eventId}`);
            return tickets.tickets?.length || 0;
        } catch (error) {
            return 0;
        }
    },

    processEventData: async (event: Event) => {
        const availableTickets = await eventsDataProvider.getTicketsForEvent({ eventId: event.event_id, status: 'AVAILABLE' });
        const totalTickets = await eventsDataProvider.getTotalTicketsForEvent(event.event_id);
        return { 
            id: event.event_id, 
            ...event, 
            available_tickets: availableTickets, 
            total_tickets: totalTickets 
        };
    },

    getList: async (_resource: string, params: GetListParams) => {
        try {
            const { json } = await httpClient(`${apiUrl}?${queryString.stringify(params.filter)}`);
            const processedEvents = await Promise.all(json.map(eventsDataProvider.processEventData));
            return { data: processedEvents, total: json.length };
        } catch (error) {
            handleApiError(error);
        }
    },

    getOne: async (_resource: string, params: GetOneParams) => {
        try {
            const { json } = await httpClient(`${apiUrl}/${params.id}`);
            return { data: await eventsDataProvider.processEventData(json) };
        } catch (error) {
            handleApiError(error);
        }
    },

    getMany: async (_resource: string, params: GetManyParams) => {
        try {
            const { json } = await httpClient(`${apiUrl}?${queryString.stringify({ id: params.ids })}`);
            const processedEvents = await Promise.all(json.map(eventsDataProvider.processEventData));
            return { data: processedEvents };
        } catch (error) {
            handleApiError(error);
        }
    },

    getManyReference: async (_resource: string, params: GetManyReferenceParams) => {
        try {
            const query = { ...params.filter, [params.target]: params.id };
            const { json } = await httpClient(`${apiUrl}?${queryString.stringify(query)}`);
            const processedEvents = await Promise.all(json.map(eventsDataProvider.processEventData));
            return { data: processedEvents, total: json.length };
        } catch (error) {
            handleApiError(error);
        }
    },

    create: async (_resource: string, params: CreateParams) => {
        try {
            const eventDate = new Date(params.data.event_date);
            if (isNaN(eventDate.getTime())) throw new Error("La date saisie est invalide");

            const eventData = {
                event_name: params.data.event_name,
                event_date: eventDate.toISOString(),
                event_place: params.data.event_place,
                event_category: params.data.event_category,
                event_description: params.data.event_description,
                event_image: params.data.event_image,
                event_organizer: params.data.event_organizer,
                event_status: params.data.event_status || 'DRAFT',
                event_tickets_limit_by_user_by_type: params.data.event_tickets_limit_by_user_by_type,
                admin_id: "A001",
                event_creation_date: new Date().toISOString()
            };

            const { json } = await httpClient(`${apiUrl}`, { method: 'POST', body: JSON.stringify(eventData) });
            return { data: await eventsDataProvider.processEventData(json) };
        } catch (error) {
            handleApiError(error);
        }
    },

    update: async (_resource: string, params: UpdateParams) => {
        try {
            const updateData = {
                event_name: params.data.event_name,
                event_date: params.data.event_date,
                event_place: params.data.event_place,
                event_category: params.data.event_category,
                event_description: params.data.event_description,
                event_image: params.data.event_image,
                event_organizer: params.data.event_organizer,
                event_status: params.data.event_status,
                event_tickets_limit_by_user_by_type: params.data.event_tickets_limit_by_user_by_type
            };

            const { json } = await httpClient(`${apiUrl}/${params.id}`, { method: 'PUT', body: JSON.stringify(updateData) });
            if (!json || !json.event_id) throw new Error('Réponse invalide du serveur');
            return { data: await eventsDataProvider.processEventData(json) };
        } catch (error) {
            handleApiError(error);
        }
    },

    updateMany: async (_resource: string, params: UpdateManyParams) => {
        try {
            const responses = await Promise.all(
                params.ids.map(id => httpClient(`${apiUrl}/${id}`, { method: 'PUT', body: JSON.stringify(params.data) }))
            );
            return { data: responses.map(response => response.json.event_id) };
        } catch (error) {
            handleApiError(error);
        }
    },

    delete: async (_resource: string, params: DeleteParams) => {
        try {
            const { json } = await httpClient(`${apiUrl}/${params.id}`, { method: 'DELETE' });
            return { data: json };
        } catch (error) {
            handleApiError(error);
        }
    },

    deleteMany: async (_resource: string, params: DeleteManyParams) => {
        try {
            const responses = await Promise.all(
                params.ids.map(id => httpClient(`${apiUrl}/${id}`, { method: 'DELETE' }))
            );
            return { data: responses.map(response => response.json.event_id) };
        } catch (error) {
            handleApiError(error);
        }
    },

    createTickets: async (params: CreateTicketsParams) => {
        try {
            const { json } = await httpClient(`${ticketsApiUrl}`, {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(params),
            });
            return json;
        } catch (error) {
            handleApiError(error);
        }
    },

    deleteTickets: async (params: DeleteTicketsParams) => {
        try {
            const queryParams = new URLSearchParams({
                ticketNumber: params.ticketNumber.toString(),
                event_id: params.event_id,
                ...(params.ticket_type && { ticket_type: params.ticket_type })
            });
            const { json } = await httpClient(`${ticketsApiUrl}?${queryParams}`, { method: 'DELETE' });
            return json;
        } catch (error) {
            handleApiError(error);
        }
    },
};

export { eventsDataProvider };