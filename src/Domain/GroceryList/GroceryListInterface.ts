import type { ListDetail } from "../ListDetail/ListDetailInterface";

export interface GroceryList {
  id: string;
  name: string;
  isActive: boolean;
  listDetails: ListDetail[];
  type: string;
}
