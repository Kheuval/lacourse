import { useApiStore } from "@/Core/Services/Api/Store/ApiStore";
import { useUserStore } from "@/Domain/User/Store/UserStore";
import { useErrorStore } from "@/Core/Services/Error/Store/ErrorStore";
import type { User } from "@/Domain/User/UserInterface";
import type { ApiRequest } from "@/Core/Services/Api/ApiRequestType";
import { ErrorType } from "@/Core/Services/Error/AppErrorsEnum";
import { storeToRefs } from "pinia";
import type { AuthServiceInterface } from "@/Core/Services/Auth/AuthServiceInterface";
import { useJwtDecode } from "@/Core/Composables/useJwtDecode";

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
