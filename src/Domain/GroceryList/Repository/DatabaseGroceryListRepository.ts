import type { ApiRequest } from "@/Core/Services/Api/ApiInterface";
import { useApiStore } from "@/Core/Services/Api/ApiStore";
import type { GroceryList } from "../GroceryListInterface";
import type { GroceryListRepository } from "./GroceryListRepositoryInterface";

const RESOURCE_TYPE = "GroceryList";

export const databaseGroceryListRepository: GroceryListRepository = {
  findOneByIri: async (iri: string): Promise<GroceryList> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "GET",
      accept: "application/ld+json",
      contentType: "application/json",
      body: null,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content;
  },
  updateOneByIri: async (iri: string, data: object): Promise<GroceryList> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: iri,
      method: "PATCH",
      accept: "application/ld+json",
      contentType: "application/merge-patch+json",
      body: JSON.stringify(data),
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content;
  },
  getAllForUser: async (): Promise<GroceryList[]> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: "/api/grocery_lists",
      method: "GET",
      accept: "application/ld+json",
      contentType: "application/json",
      body: null,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content["hydra:member"];
  },
};
