import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "@/Domain/User/UserInterface";

export const useUserStore = defineStore("user", () => {
  const currentUser = ref<User | null>(null);
  const isAuthenticated = ref<boolean>(false);

  return { currentUser, isAuthenticated };
});
