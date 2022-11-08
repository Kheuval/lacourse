import type { ApiRequest } from "@/Core/Services/Api/ApiRequestType";
import type { ApiResponse } from "@/Core/Services/Api/ApiResponseType";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { ErrorType } from "../Error/AppErrorsEnum";
import { useErrorStore } from "../Error/Store/ErrorStore";

export const useApiStore = defineStore("api", () => {
  const token: Ref<string> = ref("");
  const publicUrl: string = import.meta.env.APP_PUBLIC_API_URL;
  const apiUrl: string = import.meta.env.APP_API_URL;
  const isFetching: Ref<boolean> = ref(false);

  const useFetch = async (
    init: ApiRequest,
    publicAccess: boolean = false
  ): Promise<ApiResponse> => {
    const { handleErrors } = useErrorStore();
    isFetching.value = true;

    const request = {
      url: (publicAccess ? publicUrl : apiUrl) + init.url,
      method: init.method,
      headers: {
        "Content-type": init.contentType,
        Authorization: publicAccess ? "" : `Bearer ${token.value}`,
      },
      body: init.body,
    };

    const response = await fetch(request.url, { ...request });

    isFetching.value = false;

    const data = await response.json();

    if (response.status === 401) {
      handleErrors({ errorType: ErrorType.unauthorizedError });
    } else if (response.status === 403) {
      handleErrors({ errorType: ErrorType.forbiddenError });
    } else if (response.status === 404) {
      handleErrors({ errorType: ErrorType.resourceNotFoundError });
    } else if (response.status === 422) {
      handleErrors({ errorType: ErrorType.unprocessableEntity });
    }

    if (data.token) {
      token.value = data.token;
    }

    return {
      status: response.status,
      content: init.method === "DELETE" ? null : data,
    };
  };

  const invalidateToken = () => (token.value = "");

  return { useFetch, isFetching, invalidateToken };
});
