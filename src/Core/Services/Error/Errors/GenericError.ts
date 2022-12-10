import { useErrorStore } from "../Store/ErrorStore";
import type { Error } from "../ErrorInterface";

export class GenericError implements Error {
  constructor() {
    this.throwError();
  }

  throwError = (): void => {
    const errorStore = useErrorStore();

    errorStore.setError({
      title: "Erreur",
      errorMessage: "Une erreur est survenue, merci de rééssayer",
    });
  };
}
