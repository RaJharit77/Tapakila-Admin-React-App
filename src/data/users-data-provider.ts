import { fetchUtils } from "react-admin";
import { API_URL } from "../api/api";

const url = `${API_URL}/api/users`;
const httpClient = fetchUtils.fetchJson;


export const userDataProvider = {
  getList: async (params: any) => {

    const { json } = await httpClient(`${url}`);

    return {
      data: json.map((user: any) => ({ id: user.user_id, ...user })),
      total: json.lenght,
    };
  },

  getOne: async (params: any) => {
    const { json } = await httpClient(`${url}/${params.id}`);
    return { data: { id: json.event_id, ...json } };
  },

};

