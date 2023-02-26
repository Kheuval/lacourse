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
      contentType: "application/ld+json",
      body: null,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content["hydra:member"];
  },
  getSample: async (): Promise<Recipe[]> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: "/api/recipes/sample",
      method: "GET",
      contentType: "application/ld+json",
      body: null,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content["hydra:member"];
  },
  findByQuery: async (query: string): Promise<Recipe[] | []> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: `/api/recipes?page=1&name=${query}`,
      method: "GET",
      contentType: "application/ld+json",
      body: null,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content["hydra:member"];
  },
  findOneByIri: async (iri: string): Promise<Recipe> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "GET",
      contentType: "application/ld+json",
      body: null,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content;
  },
  create: async (recipe: Recipe): Promise<Recipe> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: "/recipes",
      method: "POST",
      contentType: "application/ld+json",
      body: JSON.stringify(recipe),
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content;
  },
  updateOneByIri: async (iri: string, recipe: Recipe): Promise<Recipe> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "PATCH",
      contentType: "application/merge-patch+json",
      body: JSON.stringify(recipe),
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content;
  },
  deleteOneByIri: async (iri: string): Promise<void> => {
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
