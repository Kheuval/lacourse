import type { ApiRequest } from "@/Core/Services/Api/ApiInterface";
import { useApiStore } from "@/Core/Services/Api/ApiStore";
import type { GroceryList } from "../GroceryListInterface";
import type { GroceryListRepository } from "./GroceryListRepositoryInterface";
import type { GroceryListForm } from "@/Components/Organisms/OrganismGroceryListForm/GroceryListFormInterface";

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
      cacheable: true,
      expectResponseData: true,
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
      cacheable: false,
      expectResponseData: true,
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
      cacheable: true,
      expectResponseData: true,
      resourceType: RESOURCE_TYPE,
    };

    return (await useFetch(init)).content["hydra:member"];
  },
  create: async (groceryList: GroceryListForm): Promise<GroceryList> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: "/api/grocery_lists",
      method: "POST",
      accept: "application/ld+json",
      contentType: "application/json",
      body: JSON.stringify(groceryList),
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
