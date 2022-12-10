import { useErrorStore } from "../Store/ErrorStore";
import type { Error } from "../ErrorInterface";

export class LoginError implements Error {
  constructor() {
    this.throwError();
  }

  throwError = (): void => {
    const errorStore = useErrorStore();

    errorStore.setError({
      title: "Erreur",
      errorMessage: "Identifiants incorrects",
    });
  };
}
