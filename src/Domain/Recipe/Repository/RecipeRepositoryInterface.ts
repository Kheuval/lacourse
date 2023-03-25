import type { RecipeForm } from "@/Components/Organisms/OrganismRecipeForm/RecipeFormInterface";
import type { Recipe } from "../RecipeInterface";

export interface RecipeRepository {
  getAll(): Promise<Recipe[]>;
  getAllForUser(userIri: string): Promise<Recipe[]>;
  getSample(): Promise<Recipe[]>;
  findByQuery(query: string): Promise<Recipe[] | []>;
  findOneByIri(iri: string): Promise<Recipe>;
  create(recipe: RecipeForm): Promise<Recipe>;
  updateOneByIri(iri: string, recipe: RecipeForm): Promise<Recipe>;
  deleteOneByIri(iri: string): Promise<void>;
}
