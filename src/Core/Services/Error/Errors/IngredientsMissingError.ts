import { useErrorStore } from "../Store/ErrorStore";
import type { Error } from "../ErrorInterface";

export class IngredientsMissingError implements Error {
  constructor() {
    this.throwError();
  }

  throwError = (): void => {
    const errorStore = useErrorStore();

    errorStore.setError({
      title: "Erreur",
      errorMessage: "La recette doit comporter au moins un ingrédient",
    });
  };
}
