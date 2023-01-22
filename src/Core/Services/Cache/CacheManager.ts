import type { ApiRequest } from "../Api/ApiInterface";

export const useCacheManager = () => {
  const storage = window.localStorage;

  const writeInCache = (request: ApiRequest, data: any) => {
    if (request.method !== "GET") {
      invalidateCache(request);
    } else {
      if (data.content.type === request.resourceType) {
        const key = `${request.resourceType}:${data.content.id}`;
        storage.setItem(key, JSON.stringify(data));
      } else {
        const key = `${request.resourceType}:${request.url}`;
        storage.setItem(key, JSON.stringify(data));
        data.content["hydra:member"].forEach((item: any) => {
          const key = `${item.type}:${item.id}`;
          storage.setItem(key, JSON.stringify(item));
        });
      }
    }
  };

  const getFromCache = (request: ApiRequest): any | null => {
    const key = `${request.resourceType}:${request.url}`;
    const data = storage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  const invalidateCache = (request: ApiRequest) => {
    const key = `${request.resourceType}:${request.url}`;

    Object.keys(storage)
      .filter((x) => !x.match(/\d+/))
      .forEach(
        (x) => x.startsWith(request.resourceType) && storage.removeItem(x)
      );

    storage.removeItem(key);
  };

  return { writeInCache, getFromCache, invalidateCache };
};