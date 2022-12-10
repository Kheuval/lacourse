import { useErrorStore } from "../Store/ErrorStore";
import type { Error } from "../ErrorInterface";

export class UsernameAlreadyInUseError implements Error {
  constructor() {
    this.throwError();
  }

  throwError = (): void => {
    const errorStore = useErrorStore();

    errorStore.setError({
      title: "Erreur",
      errorMessage: "Ce nom d'utilisateur est déjà utilisé",
    });
  };
}
