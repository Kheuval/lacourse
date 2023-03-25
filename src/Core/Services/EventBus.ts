import type { IngredientForm } from "@/Components/Organisms/OrganismIngredientForm/IngredientFormInterface";
import type { RecipeForm } from "@/Components/Organisms/OrganismRecipeForm/RecipeFormInterface";
import type { RegisterForm } from "@/Components/Organisms/OrganismRegisterForm/RegisterFormInterface";
import mitt from "mitt";
import { defineStore } from "pinia";

type Events = {
  validate: RegisterForm | IngredientForm | RecipeForm;
};

export const useEventBus = defineStore("event", () => {
  const emitter = mitt<Events>();

  return { emitter };
});
