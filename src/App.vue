<template>
  <input type="text" v-model="username" />
  <input type="password" v-model="password" />
  <button @click="authenticate()">click</button>
  <button @click="deleteUser()">delete</button>

  <h1>User : {{ name }}</h1>
  <h1>Fetching : {{ isFetching }}</h1>
  <h1>Error : {{ error }}</h1>

  <!-- <RouterView /> -->
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useErrorStore } from "@/Core/Services/Error/Store/ErrorStore";
import { useApiStore } from "./Core/Services/Api/Store/ApiStore";
import { databaseAuthService } from "./Core/Services/Auth/DatabaseAuthService";
import { databaseUserRepository } from "./Domain/User/Repository/DatabaseUserRepository";
import { ref, type Ref } from "vue";

const { error } = storeToRefs(useErrorStore());
const { isFetching } = storeToRefs(useApiStore());

const username: Ref<string> = ref("");
const password: Ref<string> = ref("");
const authenticate = async () => {
  await databaseAuthService.login(username.value, password.value);
};

const name: Ref<string | undefined> = ref("");
const deleteUser = async () => {
  await databaseUserRepository.deleteOneByIri("/users/2");
};
</script>

<style scoped></style>
