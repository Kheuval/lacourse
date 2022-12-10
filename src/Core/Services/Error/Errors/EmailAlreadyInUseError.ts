import { useErrorStore } from "../Store/ErrorStore";
import type { Error } from "../ErrorInterface";

export class EmailAlreadyInUseError implements Error {
  constructor() {
    this.throwError();
  }

  throwError = (): void => {
    const errorStore = useErrorStore();

    errorStore.setError({
      title: "Erreur",
      errorMessage: "Cet email est déjà utilisé",
    });
  };
}
