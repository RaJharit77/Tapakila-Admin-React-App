import {
  DataProvider,
  GetListResult,
  GetOneResult,
  GetManyResult,
  GetManyReferenceResult,
  UpdateResult,
  UpdateManyResult,
  CreateResult,
  DeleteResult,
  DeleteManyResult,
  RaRecord,
  Identifier,
  GetListParams,
  GetOneParams,
  GetManyParams,
  GetManyReferenceParams,
  UpdateParams,
  UpdateManyParams,
  CreateParams,
  DeleteParams,
  DeleteManyParams
} from 'react-admin';
import { eventsDataProvider } from "./events-data-provider";
import { userDataProvider } from "./users-data-provider";
import { contactDataProvider } from "./contact-data-provider";
import { adminDataProvider } from "./admins-data-provider";

interface Event extends RaRecord {
  available_tickets: number;
  total_tickets: number;
  event_id: string;
  event_name: string;
  event_date: string;
  event_place: string;
  event_category: string;
  event_description: string;
  event_image?: string;
  event_organizer?: string;
  event_status: string;
}

interface User extends RaRecord {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface GetTicketsParams {
  eventId: string;
  status?: string;
}

interface CustomDataProvider extends DataProvider {
  getTicketsForEvent: (resource: string, params: GetTicketsParams) => Promise<number>;
}

const compositeDataProvider: CustomDataProvider = {
  getList: async <RecordType extends RaRecord = RaRecord>(
    resource: string,
    params: GetListParams
  ): Promise<GetListResult<RecordType>> => {
    if (resource === "events") {
      return await eventsDataProvider.getList(resource, params) as GetListResult<RecordType>;
    }
    if (resource === "users") {
      return await userDataProvider.getList(resource, params) as GetListResult<RecordType>;
    }
    if (resource === "admins") {
      return await adminDataProvider.getList(resource, params) as GetListResult<RecordType>;
    }
    if (resource === "contact") {
      // ✅ Correction : Remplacement de `any` par `unknown as DataProvider`
      return await (contactDataProvider as unknown as DataProvider).getList(resource, params) as GetListResult<RecordType>;
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  getOne: async <RecordType extends RaRecord = RaRecord>(
    resource: string,
    params: GetOneParams
  ): Promise<GetOneResult<RecordType>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.getOne(resource, params);
    } else if (resource === "users") {
      result = await userDataProvider.getOne(resource, params);
    } else if (resource === "admins") {
      result = await adminDataProvider.getOne(resource, params);
    } else if (resource === "contact") {
      result = await (contactDataProvider as unknown as DataProvider).getOne(resource, params);
    } else {
      throw new Error(`Unknown resource: ${resource}`);
    }
    if (!result) throw new Error(`Record not found`);
    return result as GetOneResult<RecordType>;
  },

  getMany: async <RecordType extends RaRecord = RaRecord>(
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult<RecordType>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.getMany(resource, params);
    } else if (resource === "users") {
      result = await userDataProvider.getMany(resource, params);
    } else if (resource === "admins") {
      const results = await Promise.all(params.ids.map(id => adminDataProvider.getOne(resource, { id })));
      result = { data: results.map(r => r.data) };
    } else {
      throw new Error(`Unknown resource: ${resource}`);
    }
    return (result as GetManyResult<RecordType>) || { data: [] };
  },

  getManyReference: async <RecordType extends RaRecord = RaRecord>(
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<RecordType>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.getManyReference(resource, params);
    } else if (resource === "users") {
      result = await userDataProvider.getManyReference(resource, params);
    } else {
      throw new Error(`Unknown resource: ${resource}`);
    }
    return (result as GetManyReferenceResult<RecordType>) || { data: [], total: 0 };
  },

  update: async <RecordType extends RaRecord = RaRecord>(
    resource: string,
    params: UpdateParams
  ): Promise<UpdateResult<RecordType>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.update(resource, params);
    } else if (resource === "users") {
      result = await userDataProvider.update(resource, params);
    } else if (resource === "admins") {
      result = await adminDataProvider.update(resource, params);
    } else {
      throw new Error(`Unknown resource: ${resource}`);
    }
    if (!result) throw new Error(`Update failed`);
    return result as UpdateResult<RecordType>;
  },

  updateMany: async <RecordType extends RaRecord = RaRecord>(
    resource: string,
    params: UpdateManyParams
  ): Promise<UpdateManyResult<RecordType>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.updateMany(resource, params);
    } else if (resource === "users") {
      result = await userDataProvider.updateMany(resource, params);
    } else {
      throw new Error(`Unknown resource: ${resource}`);
    }
    return (result as UpdateManyResult<RecordType>) || { data: [] };
  },

  create: async <RecordType extends Omit<RaRecord, "id"> = Omit<RaRecord, "id">>(
    resource: string,
    params: CreateParams
  ): Promise<CreateResult<RecordType & { id: Identifier }>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.create(resource, params);
    } else if (resource === "users") {
      result = await userDataProvider.create(resource, params);
    } else if (resource === "admins") {
      result = await adminDataProvider.create(resource, params);
    } else {
      throw new Error(`Unknown resource: ${resource}`);
    }
    if (!result) throw new Error(`Create failed`);
    return result as CreateResult<RecordType & { id: Identifier }>;
  },

  delete: async <RecordType extends RaRecord = RaRecord>(
    resource: string,
    params: DeleteParams
  ): Promise<DeleteResult<RecordType>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.delete(resource, params);
    } else if (resource === "users") {
      result = await userDataProvider.delete(resource, params);
    } else if (resource === "admins") {
      result = await adminDataProvider.delete(resource, params);
    } else if (resource === "contact") {
      // ✅ Correction : Remplacement de `any` par `unknown as DataProvider`
      result = await (contactDataProvider as unknown as DataProvider).delete(resource, params);
    } else {
      throw new Error(`Unknown resource: ${resource}`);
    }
    if (!result) throw new Error(`Delete failed`);
    return result as DeleteResult<RecordType>;
  },

  deleteMany: async <RecordType extends RaRecord = RaRecord>(
    resource: string,
    params: DeleteManyParams
  ): Promise<DeleteManyResult<RecordType>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.deleteMany(resource, params);
    } else if (resource === "users") {
      result = await userDataProvider.deleteMany(resource, params);
    } else if (resource === "admins") {
      result = await adminDataProvider.deleteMany(resource, params);
    } else {
      throw new Error(`Unknown resource: ${resource}`);
    }
    return (result as DeleteManyResult<RecordType>) || { data: [] };
  },

  getTicketsForEvent: async (resource: string, params: GetTicketsParams): Promise<number> => {
    if (resource === "events") {
      return eventsDataProvider.getTicketsForEvent(params);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },
};

export { compositeDataProvider };
export type { Event, User };