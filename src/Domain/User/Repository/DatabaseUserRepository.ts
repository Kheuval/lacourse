import { useApiStore } from "@/Core/Services/Api/Store/ApiStore";
import type { UserRepository } from "./UserRepositoryInterface";
import type { ApiRequest } from "@/Core/Services/Api/ApiRequestType";

export const databaseUserRepository: UserRepository = {
  findOneByIri: async (iri: string) => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "GET",
      contentType: "application/json",
      body: null,
    };

    return await (
      await useFetch(init)
    ).content;
  },
  updateOneByIri: async (iri: string, data: object) => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "PATCH",
      contentType: "application/merge-patch+json",
      body: JSON.stringify(data),
    };

    return await (
      await useFetch(init)
    ).content;
  },
  deleteOneByIri: async (iri: string) => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "DELETE",
      contentType: "application/json",
      body: null,
    };

    await useFetch(init);
  },
};
