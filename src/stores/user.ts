import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { User } from "@/typescript/interfaces/UserInterface";

export const useUserStore = defineStore("user", () => {
  const currentUser: Ref<User | null> = ref(null);
  const isAuthenticated: Ref<boolean> = ref(false);
  const isLoggedOut: Ref<boolean> = ref(false);

  return { currentUser, isAuthenticated, isLoggedOut };
});
