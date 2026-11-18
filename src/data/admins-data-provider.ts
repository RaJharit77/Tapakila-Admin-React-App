import {
    fetchUtils,
    GetListParams,
    GetOneParams,
    CreateParams,
    UpdateParams,
    DeleteParams,
    DeleteManyParams,
    RaRecord,
    Identifier,
    GetListResult,
    GetOneResult,
    CreateResult,
    UpdateResult,
    DeleteResult,
    DeleteManyResult
} from "react-admin";
import { API_URL } from "../api/api";

const url = `${API_URL}/api/admins`;

// ✅ Correction : Définition d'un type propre pour les options de fetch
interface RequestOptions {
    method?: string;
    body?: string;
    headers?: Headers;
}

const httpClient = (url: string, options: RequestOptions = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
    }
    return fetchUtils.fetchJson(url, options);
};

export const adminDataProvider = {
    getList: async <RecordType extends RaRecord = RaRecord>(
        _resource: string,
        _params: GetListParams
    ): Promise<GetListResult<RecordType>> => {
        void _params; // Ignoré volontairement (pas de pagination côté API pour l'instant)
        const { json } = await httpClient(url);
        return {
            data: json.map((item: RecordType & { admin_id: string }) => ({ ...item, id: item.admin_id })),
            total: json.length,
        };
    },

    getOne: async <RecordType extends RaRecord = RaRecord>(
        _resource: string,
        params: GetOneParams
    ): Promise<GetOneResult<RecordType>> => {
        const { json } = await httpClient(`${url}/${params.id}`);
        return { data: { ...json, id: json.admin_id } as RecordType };
    },

    create: async <RecordType extends Omit<RaRecord, "id"> = Omit<RaRecord, "id">>(
        _resource: string,
        params: CreateParams
    ): Promise<CreateResult<RecordType & { id: Identifier }>> => {
        const { json } = await httpClient(url, {
            method: 'POST',
            body: JSON.stringify(params.data),
        });
        return { data: { ...json, id: json.admin_id } as RecordType & { id: Identifier } };
    },

    update: async <RecordType extends RaRecord = RaRecord>(
        _resource: string,
        params: UpdateParams
    ): Promise<UpdateResult<RecordType>> => {
        const { json } = await httpClient(`${url}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        });
        return { data: { ...json, id: json.admin_id } as RecordType };
    },

    delete: async <RecordType extends RaRecord = RaRecord>(
        _resource: string,
        params: DeleteParams
    ): Promise<DeleteResult<RecordType>> => {
        const { json } = await httpClient(`${url}/${params.id}`, {
            method: 'DELETE',
        });
        return { data: { ...json, id: params.id } as RecordType };
    },

    deleteMany: async <RecordType extends RaRecord = RaRecord>(
        _resource: string,
        params: DeleteManyParams
    ): Promise<DeleteManyResult<RecordType>> => {
        const responses = await Promise.all(
            params.ids.map((id) => httpClient(`${url}/${id}`, { method: 'DELETE' }))
        );
        return { data: responses.map((res) => res.json.admin_id || res.json.id) as Identifier[] };
    },
};