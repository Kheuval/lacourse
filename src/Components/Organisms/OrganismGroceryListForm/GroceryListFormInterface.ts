import type { ListDetail } from "@/Domain/ListDetail/ListDetailInterface";

export interface GroceryListForm {
  name: string;
  isActive: boolean;
  listDetails: ListDetail[];
}
