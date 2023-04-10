import { useApiStore } from "@/Core/Services/Api/ApiStore";
import type { UserRepository } from "./UserRepositoryInterface";
import type { ApiRequest } from "@/Core/Services/Api/ApiInterface";
import type { Recipe } from "@/Domain/Recipe/RecipeInterface";

const RESOURCE_TYPE = "User";

export const databaseUserRepository: UserRepository = {
  findOneByIri: async (iri: string) => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "GET",
      accept: "application/ld+json",
      contentType: "application/json",
      body: null,
      cacheable: false,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content;
  },
  updateOneByIri: async (iri: string, data: object) => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "PATCH",
      accept: "application/ld+json",
      contentType: "application/merge-patch+json",
      body: JSON.stringify(data),
      cacheable: false,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content;
  },
  deleteOneByIri: async (iri: string) => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "DELETE",
      accept: "application/ld+json",
      contentType: "application/json",
      body: null,
      cacheable: false,
      resourceType: RESOURCE_TYPE,
    };

    await useFetch(init);
  },
  getFavorites: async (userIri: string): Promise<Recipe[]> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: `/api/users/${userIri.match(/\d+/)![0]}/favorites`,
      method: "GET",
      accept: "application/ld+json",
      contentType: "application/json",
      body: null,
      cacheable: false,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content["hydra:member"];
  },
};
