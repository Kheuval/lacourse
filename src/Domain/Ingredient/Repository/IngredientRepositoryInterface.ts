import type { Ingredient } from "../IngredientInterface";

export interface IngredientRepository {
  findByQuery(query: string): Promise<Ingredient[] | []>;
}
