import type { GroceryList } from "../GroceryListInterface";

export interface GroceryListRepository {
  findOneByIri(iri: string): Promise<GroceryList>;
  updateOneByIri(iri: string, data: object): Promise<GroceryList>;
}
