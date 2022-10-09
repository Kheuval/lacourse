<template>
  <input type="text" v-model="username" />
  <input type="password" v-model="password" />
  <button @click="authenticate()">click</button>

  <h1>User : {{ name }}</h1>

  <!-- <RouterView /> -->
</template>

<script setup lang="ts">
import { useUserStore } from "./stores/user";
import { ref, type Ref } from "vue";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { currentUser } = storeToRefs(userStore);

const username: Ref<string> = ref("");
const password: Ref<string> = ref("");
const name: Ref<string> = ref("");

const authenticate = async (): Promise<void> => {
  await userStore.logIn(username.value, password.value);

  name.value = currentUser.value.username;
};
</script>

<style scoped></style>
