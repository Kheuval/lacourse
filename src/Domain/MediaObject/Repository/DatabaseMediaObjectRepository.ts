import type { ApiRequest } from "@/Core/Services/Api/ApiInterface";
import { useApiStore } from "@/Core/Services/Api/ApiStore";
import type { MediaObject } from "../MediaObjectInterface";
import type { MediaObjectRepository } from "./MediaObjectRepositoryInterface";

const RESOURCE_TYPE = "MediaObject";

export const databaseMediaObjectRepository: MediaObjectRepository = {
  findOneByIri: async (iri: string): Promise<MediaObject | null> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "GET",
      accept: "application/ld+json",
      contentType: "application/json",
      body: null,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content["contentUrl"];
  },
  create: async (mediaObject: FormData): Promise<MediaObject> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: "/api/media_objects",
      method: "POST",
      accept: "application/ld+json",
      contentType: "",
      body: mediaObject,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content;
  },
};
