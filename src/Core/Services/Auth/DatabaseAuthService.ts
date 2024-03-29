import { useApiStore } from "@/Core/Services/Api/ApiStore";
import { useUserStore } from "@/Domain/User/Store/UserStore";
import type { ApiRequest } from "@/Core/Services/Api/ApiInterface";
import { storeToRefs } from "pinia";
import type { AuthServiceInterface } from "@/Core/Services/Auth/AuthServiceInterface";
import { useJwtDecode } from "@/Core/Composables/useJwtDecode";
import { LoginError } from "../Error/Errors/LoginError";
import { EmailAlreadyInUseError } from "../Error/Errors/EmailAlreadyInUseError";
import { UsernameAlreadyInUseError } from "../Error/Errors/UsernameAlreadyInUseError";
import type { User } from "@/Domain/User/UserInterface";

const RESOURCE_TYPE = "AuthUser";

export const databaseAuthService: AuthServiceInterface = {
  login: async (username, password): Promise<void> => {
    const { useFetch } = useApiStore();
    const { isAuthenticated, currentUser } = storeToRefs(useUserStore());

    const init: ApiRequest = {
      url: "/login",
      method: "POST",
      accept: "application/ld+json",
      contentType: "application/json",
      body: JSON.stringify({
        username,
        password,
      }),
      expectResponseData: true,
      cacheable: false,
      resourceType: RESOURCE_TYPE,
    };

    await useFetch(init, true)
      .then((response) => {
        if (response.status === 401) {
          return Promise.reject(new LoginError());
        }
        isAuthenticated.value = true;
        currentUser.value = databaseAuthService.getUser(response.content.token);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  logout: (): void => {
    const { isAuthenticated, currentUser } = storeToRefs(useUserStore());

    useApiStore().invalidateToken();
    isAuthenticated.value = false;
    currentUser.value = null;
  },
  getUser: (token): User => {
    return useJwtDecode(token).user;
  },
  register: async (username, email, password): Promise<void> => {
    const { useFetch } = useApiStore();

    const init: ApiRequest = {
      url: "/api/users",
      method: "POST",
      accept: "application/ld+json",
      contentType: "application/json",
      body: JSON.stringify({
        email,
        username,
        password,
      }),
      cacheable: false,
      expectResponseData: true,
      resourceType: RESOURCE_TYPE,
    };

    await useFetch(init, true)
      .then((response) => {
        if (response.status === 422) {
          return Promise.reject(response);
        }
      })
      .catch((response) => {
        if (response.content["violations"][0].propertyPath === "email") {
          new EmailAlreadyInUseError();
        } else if (
          response.content["violations"][0].propertyPath === "username"
        ) {
          new UsernameAlreadyInUseError();
        }
      });
  },
};
