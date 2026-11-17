import {
  fetchUtils,
  GetListParams,
  GetOneParams,
  GetManyParams,
  GetManyReferenceParams,
  UpdateParams,
  UpdateManyParams,
  CreateParams,
  DeleteParams,
  DeleteManyParams,
  RaRecord,
  Identifier,
  GetListResult,
  GetOneResult,
  GetManyResult,
  GetManyReferenceResult,
  UpdateResult,
  UpdateManyResult,
  CreateResult,
  DeleteResult,
  DeleteManyResult
} from "react-admin";
import queryString from "query-string";
import { API_URL } from "../api/api";

const getUrl = (resource: string) => `${API_URL}/api/${resource}`;
const httpClient = fetchUtils.fetchJson;

type UserJson = RaRecord & { user_id: string | number };

export const userDataProvider = {
  getList: async <RecordType extends RaRecord = RaRecord>(
    _resource: string,
    _params: GetListParams
  ): Promise<GetListResult<RecordType>> => {
    void _params;

    const { json } = await httpClient(getUrl(_resource));

    return {
      data: json.map((user: UserJson) => ({ ...user, id: user.user_id })) as RecordType[],
      total: json.length,
    };
  },

  getOne: async <RecordType extends RaRecord = RaRecord>(
    _resource: string,
    params: GetOneParams
  ): Promise<GetOneResult<RecordType>> => {
    const { json } = await httpClient(`${getUrl(_resource)}/${params.id}`);
    return { data: { id: json.user_id, ...json } as RecordType };
  },

  getMany: async <RecordType extends RaRecord = RaRecord>(
    _resource: string,
    params: GetManyParams
  ): Promise<GetManyResult<RecordType>> => {
    const { json } = await httpClient(`${getUrl(_resource)}?${queryString.stringify({ id: params.ids })}`);
    return { data: json.map((user: UserJson) => ({ ...user, id: user.user_id })) as RecordType[] };
  },

  getManyReference: async <RecordType extends RaRecord = RaRecord>(
    _resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<RecordType>> => {
    const query = { ...params.filter, [params.target]: params.id };
    const { json } = await httpClient(`${getUrl(_resource)}?${queryString.stringify(query)}`);
    return {
      data: json.map((user: UserJson) => ({ ...user, id: user.user_id })) as RecordType[],
      total: json.length,
    };
  },

  update: async <RecordType extends RaRecord = RaRecord>(
    _resource: string,
    params: UpdateParams
  ): Promise<UpdateResult<RecordType>> => {
    const { json } = await httpClient(`${getUrl(_resource)}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return { data: { id: json.user_id, ...json } as RecordType };
  },

  updateMany: async <RecordType extends RaRecord = RaRecord>(
    _resource: string,
    params: UpdateManyParams
  ): Promise<UpdateManyResult<RecordType>> => {
    const responses = await Promise.all(
      params.ids.map(id => httpClient(`${getUrl(_resource)}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      }))
    );
    return { data: responses.map(response => response.json.user_id) as Identifier[] };
  },

  create: async <RecordType extends Omit<RaRecord, "id"> = RaRecord>(
    _resource: string,
    params: CreateParams
  ): Promise<CreateResult<RecordType & { id: Identifier }>> => {
    const { json } = await httpClient(getUrl(_resource), {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return { data: { id: json.user_id, ...json } as RecordType & { id: Identifier } };
  },

  delete: async <RecordType extends RaRecord = RaRecord>(
    _resource: string,
    params: DeleteParams
  ): Promise<DeleteResult<RecordType>> => {
    const { json } = await httpClient(`${getUrl(_resource)}/${params.id}`, { method: 'DELETE' });
    return { data: { id: json.user_id, ...json } as RecordType };
  },

  deleteMany: async <RecordType extends RaRecord = RaRecord>(
    _resource: string,
    params: DeleteManyParams
  ): Promise<DeleteManyResult<RecordType>> => {
    const responses = await Promise.all(
      params.ids.map(id => httpClient(`${getUrl(_resource)}/${id}`, { method: 'DELETE' }))
    );
    return { data: responses.map(response => response.json.user_id) as Identifier[] };
  },
};