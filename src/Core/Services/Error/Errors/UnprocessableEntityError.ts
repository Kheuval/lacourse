import { useErrorStore } from "../Store/ErrorStore";
import type { Error } from "../ErrorInterface";

export class UnprocessableEntityError implements Error {
  constructor() {
    this.throwError();
  }

  throwError = (): void => {
    const errorStore = useErrorStore();

    errorStore.setError({
      title: "Erreur",
      errorMessage: "Certains champs sont manquants",
    });
  };
}
