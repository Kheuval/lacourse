import type { ApiRequest } from "@/Core/Services/Api/ApiRequestType";
import { useApiStore } from "@/Core/Services/Api/ApiStore";
import type { Recipe } from "../RecipeInterface";
import type { RecipeRepository } from "./RecipeRepositoryInterface";

export const databaseRecipeRepository: RecipeRepository = {
  getSample: async (): Promise<Recipe[] | null> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: "/recipes/sample",
      method: "GET",
      contentType: "application/json",
      body: null,
    };

    return await (
      await useFetch(init)
    ).content;
  },
  findOneByIri: async (iri: string): Promise<Recipe | null> => {
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
  create: async (recipe: Recipe): Promise<Recipe> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: "/recipes",
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify(recipe),
    };

    return await (
      await useFetch(init)
    ).content;
  },
  updateOneByIri: async (iri: string, recipe: Recipe): Promise<Recipe> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "PATCH",
      contentType: "application/merge-patch+json",
      body: JSON.stringify(recipe),
    };

    return await (
      await useFetch(init)
    ).content;
  },
  deleteOneByIri: async (iri: string): Promise<void> => {
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
