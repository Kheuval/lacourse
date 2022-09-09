import type { ListDetail } from "./ListDetailInterface";

export interface GroceryList {
  id: number;
  name: string;
  isActive: boolean;
  listDetails: ListDetail[];
}
