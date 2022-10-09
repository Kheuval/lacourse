import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { useFetch } from "@vueuse/core";
import { useApiStore } from "./api";
import type { User } from "@/typescript/interfaces/UserInterface";

export const useUserStore = defineStore("user", () => {
  const { baseUrl, apiUrl } = useApiStore();

  const token: Ref<string> = ref("");
  const currentUser: Ref<User | null> = ref(null);
  const isAuthenticated: Ref<boolean> = ref(false);
  const isLoggedOut: Ref<boolean> = ref(false);

  async function logIn(username: string, password: string): Promise<void> {
    const { isFetching, error, data } = await useFetch(baseUrl + "/login", {
      beforeFetch({ options }) {
        options.headers = {
          ...options.headers,
        };
      },
    })
      .post({
        username: username,
        password: password,
      })
      .json();

    token.value = data.value.token;
    isAuthenticated.value = true;
    currentUser.value = await getUser();
  }

  async function getUser(): Promise<User> {
    const { isFetching, error, data } = await useFetch(apiUrl + "/users/1", {
      beforeFetch({ options }) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.value}`,
        };
      },
    }).json();

    return data.value as User;
  }

  return { currentUser, isAuthenticated, isLoggedOut, logIn };
});
