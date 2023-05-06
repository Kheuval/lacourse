import type { GroceryListForm } from "@/Components/Organisms/OrganismGroceryListForm/GroceryListFormInterface";
import type { IngredientForm } from "@/Components/Organisms/OrganismIngredientForm/IngredientFormInterface";
import type { RecipeForm } from "@/Components/Organisms/OrganismRecipeForm/RecipeFormInterface";
import type { RegisterForm } from "@/Components/Organisms/OrganismRegisterForm/RegisterFormInterface";
import mitt from "mitt";
import { defineStore } from "pinia";

type Events = {
  validate:
    | RegisterForm
    | IngredientForm
    | RecipeForm
    | GroceryListForm
    | string;
  setInputContent: { id: string; inputValue: string };
};

export const useEventBus = defineStore("event", () => {
  const emitter = mitt<Events>();

  return { emitter };
});
