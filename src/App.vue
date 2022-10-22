<template>
  <input type="text" v-model="username" />
  <input type="password" v-model="password" />
  <button @click="authenticate()">click</button>

  <h1>User : {{ name }}</h1>
  <h1>Fetching : {{ isFetching }}</h1>
  <h1>Error : {{ error }}</h1>

  <!-- <RouterView /> -->
</template>

<script setup lang="ts">
import { useUserStore } from "./stores/user";
import { ref, type Ref } from "vue";
import { storeToRefs } from "pinia";
import { useApiStore } from "./stores/api";
import { useErrorStore } from "./stores/error";
import { databaseAuthService } from "./services/auth/DatabaseAuthService";

const userStore = useUserStore();
const apiStore = useApiStore();
const errorStore = useErrorStore();

const { currentUser } = storeToRefs(userStore);
const { isFetching } = storeToRefs(apiStore);
const { error } = storeToRefs(errorStore);

const username: Ref<string> = ref("");
const password: Ref<string> = ref("");
const name: Ref<string | undefined> = ref("");

const authenticate = async (): Promise<void> => {
  await databaseAuthService.login(username.value, password.value);

  name.value = currentUser.value?.username;
};
</script>

<style scoped></style>
