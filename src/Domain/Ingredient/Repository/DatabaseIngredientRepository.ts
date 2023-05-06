import { useApiStore } from "@/Core/Services/Api/ApiStore";
import type { Ingredient } from "../IngredientInterface";
import type { IngredientRepository } from "./IngredientRepositoryInterface";
import type { ApiRequest } from "@/Core/Services/Api/ApiInterface";

const RESOURCE_TYPE = "Ingredient";

export const databaseIngredientRepository: IngredientRepository = {
  findByQuery: async (query: string): Promise<Ingredient[] | []> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: `/api/ingredients?name=${query}`,
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
};
