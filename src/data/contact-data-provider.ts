import {
  fetchUtils,
  GetListParams,
  GetOneParams,
  DeleteParams
} from "react-admin";
import { API_URL } from "../api/api";

const url = `${API_URL}/api/contact`;
const httpClient = fetchUtils.fetchJson;

type ContactMessage = {
  message_id: string | number;
  message_date: string;
  message_subject: string;
  message_content: string;
  user_id?: string;
  user?: unknown;
  [key: string]: unknown;
};

export const contactDataProvider = {
  getList: async (_resource: string, params: GetListParams) => {
    const page = params.pagination?.page || 1;
    const perPage = params.pagination?.perPage || 10;

    const { json } = await httpClient(url);

    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedData = json.slice(start, end);

    return {
      data: paginatedData.map((message: ContactMessage) => ({
        id: message.message_id,
        ...message,
      })),
      total: json.length,
    };
  },

  getOne: async (_resource: string, params: GetOneParams) => {
    const { json } = await httpClient(`${url}/${params.id}`);

    return {
      data: {
        id: json.message_id,
        ...json
      }
    };
  },

  delete: async (_resource: string, params: DeleteParams) => {
    const { json } = await httpClient(`${url}/${params.id}`, {
      method: "DELETE",
    });
    return { data: json };
  },
};
