import { fetchUtils } from "react-admin";
import { API_URL } from "../api/api";

const url = `${API_URL}/api/contact`;
const httpClient = fetchUtils.fetchJson;

type ContactMessage = {
  message_id: string | number;
  [key: string]: unknown;
};

export const contactDataProvider = {
  getList: async (params = { pagination: { page: 1, perPage: 10 }, sort: { field: "id", order: "ASC" }, filter: {} }) => {
    const { pagination } = params;

    if (!pagination) {
        console.error("Pagination is undefined");
        return { data: [], total: 0 };
    }

    const { page, perPage } = pagination;

    
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



  getOne: async (params: { id: string | number }) => {
    const { json } = await httpClient(`${url}/${params.id}`);

    return {
      data: json.map((message: ContactMessage) => ({
        id: message.message_id,
        ...message,
      })),
      total: json.length,
    };
  },

  delete: async (params: { id: string | number }) => {
    const { json } = await httpClient(`${url}/${params.id}`, {
      method: "DELETE",
    });
    return { data: json };
  },
};
