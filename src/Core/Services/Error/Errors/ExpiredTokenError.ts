import { useErrorStore } from "../Store/ErrorStore";
import type { Error } from "../ErrorInterface";

export class ExpiredTokenError implements Error {
  constructor() {
    this.throwError();
  }

  throwError = (): void => {
    const errorStore = useErrorStore();

    errorStore.setError({
      title: "Erreur",
      errorMessage: "La session a expiré, merci de vous reconnecter",
    });
  };
}
