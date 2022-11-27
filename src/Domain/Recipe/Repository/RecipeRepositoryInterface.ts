import type { Recipe } from "../RecipeInterface";

export interface RecipeRepository {
  getSample(): Promise<Recipe[] | null>;
  findOneByIri(iri: string): Promise<Recipe | null>;
  create(recipe: Recipe): Promise<Recipe>;
  updateOneByIri(iri: string, recipe: Recipe): Promise<Recipe>;
  deleteOneByIri(iri: string): Promise<void>;
}
