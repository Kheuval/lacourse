import type { GroceryListForm } from "@/Components/Organisms/OrganismGroceryListForm/GroceryListFormInterface";
import type { GroceryList } from "../GroceryListInterface";

export interface GroceryListRepository {
  findOneByIri(iri: string): Promise<GroceryList>;
  updateOneByIri(iri: string, data: object): Promise<GroceryList>;
  getAllForUser(): Promise<GroceryList[]>;
  create(groceryList: GroceryListForm): Promise<GroceryList>;
}
