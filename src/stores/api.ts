import type { ApiRequest } from "@/typescript/types/ApiRequestType";
import type { ApiResponse } from "@/typescript/types/ApiResponse";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useApiStore = defineStore("api", () => {
  const token: Ref<string> = ref("");
  const publicUrl: string = import.meta.env.APP_PUBLIC_API_URL;
  const apiUrl: string = import.meta.env.APP_API_URL;
  const isFetching: Ref<boolean> = ref(false);

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
        Authorization: publicAccess ? "" : token.value,
      },
      body: init.body,
    };

    const response = await fetch(request.url, { ...request });

    isFetching.value = false;

    const data = await response.json();

    if (data.token) {
      token.value = data.token;
    }

    return {
      status: response.status,
      content: init.method === "DELETE" ? null : data,
    };
  };

  return { useFetch, isFetching, token };
});
