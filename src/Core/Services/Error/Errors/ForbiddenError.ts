import { useErrorStore } from "../Store/ErrorStore";
import type { Error } from "../ErrorInterface";

export class ForbiddenError implements Error {
  constructor() {
    this.throwError();
  }

  throwError = (): void => {
    const errorStore = useErrorStore();

    errorStore.setError({
      title: "Erreur",
      errorMessage: "Vous n'avez pas le droit d'effectuer cette action",
    });
  };
}
