import { userDataProvider } from "./users-data-provider.ts";
import { eventsDataProvider } from "./events-data-provider.ts";

const compositeDataProvider = {
  getList: async (resource: any, params: any) => {
    if (resource === "users") {
      return userDataProvider.getList(resource, params);
    } else if (resource === "events") {
      return eventsDataProvider.getList(resource, params);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  getOne: async (resource: any, params: any) => {
    if (resource === "users") {
      return userDataProvider.getOne(resource, params);
    } else if (resource === "events") {
      return eventsDataProvider.getOne(resource, params);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  getMany: async (resource: any, params: any) => {
    if (resource === "users") {
      return userDataProvider.getMany(resource, params);
    } else if (resource === "events") {
      return eventsDataProvider.getMany(resource, params);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  create: async (resource: any, params: any) => {
    if (resource === "users") {
      return userDataProvider.create(resource, params);
    } else if (resource === "events") {
      return eventsDataProvider.create(resource, params);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  update: async (resource: any, params: any) => {
    if (resource === "users") {
      return userDataProvider.update(resource, params);
    } else if (resource === "events") {
      return eventsDataProvider.update(resource, params);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },

  delete: async (resource: any, params: any) => {
    if (resource === "users") {
      return userDataProvider.delete(resource, params);
    } else if (resource === "events") {
      return eventsDataProvider.delete(resource, params);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },
};

export { compositeDataProvider };
