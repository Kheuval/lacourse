import type { ApiRequest, ApiResponse } from "@/Core/Services/Api/ApiInterface";
import { defineStore } from "pinia";
import { ref } from "vue";
import { ForbiddenError } from "../Error/Errors/ForbiddenError";
import { GenericError } from "../Error/Errors/GenericError";
import { ResourceNotFoundError } from "../Error/Errors/ResourceNotFoundError";
import { UnauthorizedError } from "../Error/Errors/UnauthorizedError";
import { UnprocessableEntityError } from "../Error/Errors/UnprocessableEntityError";

export const useApiStore = defineStore("api", () => {
  const token = ref("");
  const publicUrl: string = import.meta.env.APP_PUBLIC_API_URL;
  const apiUrl: string = import.meta.env.APP_API_URL;
  const isFetching = ref(false);

  const useFetch = async (
    init: ApiRequest,
    publicAccess: boolean = false
  ): Promise<ApiResponse> => {
    isFetching.value = true;

    const request = {
      url: (publicAccess ? publicUrl : apiUrl) + init.url,
      method: init.method,
      headers: {
        "Content-type": init.contentType,
        Accept: "application/json",
        Authorization: publicAccess ? "" : `Bearer ${token.value}`,
      },
      body: init.body,
    };

    const response = await fetch(request.url, { ...request }).catch(() => {
      isFetching.value = false;
      return Promise.reject(new GenericError());
    });

    isFetching.value = false;

    const data = await response!.json();

    if (response!.status === 401) {
      new UnauthorizedError();
    } else if (response!.status === 403) {
      new ForbiddenError();
    } else if (response!.status === 404) {
      new ResourceNotFoundError();
    } else if (response!.status === 422) {
      new UnprocessableEntityError();
    }

    if (data.token) {
      token.value = data.token;
    }

    return {
      status: response!.status,
      content: init.method === "DELETE" ? null : data,
    };
  };

  const invalidateToken = () => (token.value = "");

  return { useFetch, isFetching, invalidateToken };
});
