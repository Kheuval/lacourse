import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/typescript/interfaces/UserInterface";

export const useUserStore = defineStore("user", () => {
  const token: Ref<string> = ref("");
  const currentUser: Ref<User | null> = ref(null);
  const isAuthenticated: Ref<boolean> = ref(false);
  const isLoggedOut: Ref<boolean> = ref(false);

  return { token, currentUser, isAuthenticated, isLoggedOut };
});
