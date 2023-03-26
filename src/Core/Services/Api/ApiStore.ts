import { useJwtDecode } from "@/Core/Composables/useJwtDecode";
import type { ApiRequest, ApiResponse } from "@/Core/Services/Api/ApiInterface";
import { useUserStore } from "@/Domain/User/Store/UserStore";
import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCacheManager } from "../Cache/CacheManager";
import { ExpiredTokenError } from "../Error/Errors/ExpiredTokenError";
import { ForbiddenError } from "../Error/Errors/ForbiddenError";
import { GenericError } from "../Error/Errors/GenericError";
import { ResourceNotFoundError } from "../Error/Errors/ResourceNotFoundError";
import { UnauthorizedError } from "../Error/Errors/UnauthorizedError";
import { UnprocessableEntityError } from "../Error/Errors/UnprocessableEntityError";
import { deserializeRecursively } from "../Serializer/ApiResponseSerializer";

export const useApiStore = defineStore("api", () => {
  const { isAuthenticated } = storeToRefs(useUserStore());
  const router = useRouter();
  const { writeInCache, getFromCache } = useCacheManager();

  const token = ref("");
  const apiUrl: string = import.meta.env.APP_API_URL;
  const isFetching = ref(false);

  const useFetch = async (
    init: ApiRequest,
    publicAccess: boolean = false
  ): Promise<ApiResponse> => {
    if (init.method === "GET") {
      const cachedData = getFromCache(init);
      if (null !== cachedData) {
        return cachedData;
      }
    }

    isFetching.value = true;

    const request: {
      url: string;
      method: string;
      headers: {
        "Content-type"?: string;
        Accept: string;
        Authorization: string;
      };
      body: BodyInit | null;
    } = {
      url: apiUrl + init.url,
      method: init.method,
      headers: {
        "Content-type": init.contentType,
        Accept: init.accept,
        Authorization: publicAccess ? "" : `Bearer ${token.value}`,
      },
      body: init.body,
    };

    if (!init.contentType) {
      delete request.headers["Content-type"];
    }

    const response = await fetch(request.url, { ...request }).catch(() => {
      isFetching.value = false;
      return Promise.reject(new GenericError());
    });

    isFetching.value = false;

    const data =
      init.method !== "DELETE" ? JSON.parse(await response.text()) : null;

    if (response.status === 401) {
      if (isAuthenticated.value && !checkTokenExpiration()) {
        router.push("/");
        new ExpiredTokenError();
      } else {
        new UnauthorizedError();
      }
    } else if (response.status === 403) {
      new ForbiddenError();
    } else if (response.status === 404) {
      new ResourceNotFoundError();
    } else if (response.status === 422) {
      new UnprocessableEntityError();
    }

    if (data && data.token) {
      token.value = data.token;
    }

    const apiResponse = {
      content:
        init.method !== "DELETE"
          ? deserializeRecursively((key: string) => key.replace("@", ""))(data)
          : null,
      status: response.status,
    };

    response.ok && writeInCache(init, apiResponse);

    return apiResponse;
  };

  const checkTokenExpiration = (): boolean => {
    if (!token.value) {
      return false;
    }

    const decodedToken = useJwtDecode(token.value);

    return decodedToken.exp * 1000 > Date.now();
  };

  const invalidateToken = () => (token.value = "");

  return { useFetch, isFetching, checkTokenExpiration, invalidateToken };
});
