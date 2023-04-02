export interface IngredientForm {
  ingredient: {
    name: string;
    isEdible?: boolean;
  };
  quantity: number;
  unit: string;
  isActive?: boolean;
}
