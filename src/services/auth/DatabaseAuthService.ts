import { useApiStore } from "@/stores/api";
import { useUserStore } from "@/stores/user";
import { useErrorStore } from "@/stores/error";
import type { User } from "@/typescript/interfaces/UserInterface";
import type { ApiRequest } from "@/typescript/types/ApiRequestType";
import { ErrorType } from "@/typescript/enums/AppErrorsEnum";
import { storeToRefs } from "pinia";
import type { AuthServiceInterface } from "@/services/auth/AuthServiceInterface";
import { useJwtDecode } from "@/composables/useJwtDecode";

export const databaseAuthService: AuthServiceInterface = {
  login: async (username, password): Promise<void> => {
    const { useFetch } = useApiStore();
    const { isAuthenticated, currentUser, isLoggedOut } = storeToRefs(
      useUserStore()
    );
    const { handleErrors } = useErrorStore();

    const init: ApiRequest = {
      url: "/login",
      method: "POST",
      contentType: "application/json",
      body: JSON.stringify({
        username,
        password,
      }),
    };

    await useFetch(init, true)
      .then((response) => {
        if (response.status > 200) {
          return Promise.reject();
        }
        isAuthenticated.value = true;
        isLoggedOut.value = false;
        currentUser.value = databaseAuthService.getUser(response.content.token);
      })
      .catch(() => {
        handleErrors({
          errorType: ErrorType.loginError,
        });
      });
  },
  logout: (): void => {
    const { isAuthenticated, currentUser, isLoggedOut } = storeToRefs(
      useUserStore()
    );

    isAuthenticated.value = false;
    isLoggedOut.value = true;
    currentUser.value = null;
  },
  getUser: (token): User => {
    return useJwtDecode(token).user;
  },
};
