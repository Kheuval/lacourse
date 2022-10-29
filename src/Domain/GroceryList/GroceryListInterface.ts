import type { ListDetail } from "../ListDetail/ListDetailInterface";

export interface GroceryList {
  id: number;
  name: string;
  isActive: boolean;
  listDetails: ListDetail[];
}
