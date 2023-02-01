import { useApiStore } from "@/Core/Services/Api/ApiStore";
import type { UserRepository } from "./UserRepositoryInterface";
import type { ApiRequest } from "@/Core/Services/Api/ApiInterface";

const RESOURCE_TYPE = "User";

export const databaseUserRepository: UserRepository = {
  findOneByIri: async (iri: string) => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "GET",
      contentType: "application/ld+json",
      body: null,
      resourceType: RESOURCE_TYPE,
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
      resourceType: RESOURCE_TYPE,
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
      resourceType: RESOURCE_TYPE,
    };

    await useFetch(init);
  },
};
