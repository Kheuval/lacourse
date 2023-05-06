import type { ApiRequest } from "@/Core/Services/Api/ApiInterface";
import { useApiStore } from "@/Core/Services/Api/ApiStore";
import type { Recipe } from "../RecipeInterface";
import type { RecipeRepository } from "./RecipeRepositoryInterface";

const RESOURCE_TYPE = "Recipe";

export const databaseRecipeRepository: RecipeRepository = {
  getAll: async (): Promise<Recipe[]> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: "/api/recipes",
      method: "GET",
      accept: "application/ld+json",
      contentType: "application/json",
      body: null,
      cacheable: true,
      expectResponseData: true,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content["hydra:member"];
  },
  getAllForUser: async (userIri: string): Promise<Recipe[]> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: `/api/recipes?user=${userIri.match(/\d+/)![0]}`,
      method: "GET",
      accept: "application/ld+json",
      contentType: "application/json",
      body: null,
      cacheable: true,
      expectResponseData: true,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content["hydra:member"];
  },
  getSample: async (): Promise<Recipe[]> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: "/api/recipes/sample",
      method: "GET",
      accept: "application/ld+json",
      contentType: "application/json",
      body: null,
      cacheable: true,
      expectResponseData: true,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content["hydra:member"];
  },
  findByQuery: async (query: string): Promise<Recipe[] | []> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: `/api/recipes?name=${query}`,
      method: "GET",
      accept: "application/ld+json",
      contentType: "application/json",
      body: null,
      cacheable: true,
      expectResponseData: true,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content["hydra:member"];
  },
  findOneByIri: async (iri: string): Promise<Recipe> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "GET",
      accept: "application/ld+json",
      contentType: "application/json",
      body: null,
      cacheable: true,
      expectResponseData: true,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content;
  },
  create: async (recipe: Recipe): Promise<Recipe> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: "/api/recipes",
      method: "POST",
      accept: "application/ld+json",
      contentType: "application/json",
      body: JSON.stringify(recipe),
      cacheable: false,
      expectResponseData: true,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content;
  },
  updateOneByIri: async (iri: string, recipe: Recipe): Promise<Recipe> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "PATCH",
      accept: "application/ld+json",
      contentType: "application/merge-patch+json",
      body: JSON.stringify(recipe),
      cacheable: false,
      expectResponseData: true,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content;
  },
  deleteOneByIri: async (iri: string): Promise<void> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "DELETE",
      accept: "application/ld+json",
      contentType: "application/json",
      body: null,
      cacheable: false,
      expectResponseData: false,
      resourceType: RESOURCE_TYPE,
    };

    await useFetch(init);
  },
};
