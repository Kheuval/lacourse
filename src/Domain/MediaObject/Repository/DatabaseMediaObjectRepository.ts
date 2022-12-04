import type { ApiRequest } from "@/Core/Services/Api/ApiRequestType";
import { useApiStore } from "@/Core/Services/Api/ApiStore";
import type { MediaObject } from "../MediaObjectInterface";
import type { MediaObjectRepository } from "./MediaObjectRepositoryInterface";

export const databaseMediaObjectRepository: MediaObjectRepository = {
  findOneByIri: async (iri: string): Promise<MediaObject | null> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "GET",
      contentType: "application/json",
      body: null,
    };

    return await (
      await useFetch(init, true)
    ).content;
  },
  create: async (mediaObject: FormData): Promise<MediaObject> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: "/media_objects",
      method: "POST",
      contentType: "multipart/form-data",
      body: mediaObject,
    };

    return await (
      await useFetch(init)
    ).content;
  },
};
