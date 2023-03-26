<template>
  <form @submit.prevent class="flex flex-col items-center">
    <MoleculeInputLabel
      id="login"
      type="text"
      placeholder="Identifiant"
      :validationRules="[notNullRule]"
      @update="(content) => (form.login = content)"
    />
    <MoleculeInputLabel
      id="password"
      type="password"
      placeholder="Mot de passe"
      :validationRules="[notNullRule]"
      @update="(content) => (form.password = content)"
    />
    <AtomButton
      class="uppercase bg-primary text-white rounded-xl px-6 py-2"
      @click="login"
    >
      Connexion
    </AtomButton>
  </form>
</template>

<script lang="ts" setup>
import AtomButton from "@/Components/Atoms/AtomButton.vue";
import MoleculeInputLabel from "@/Components/Molecules/MoleculeInputLabel.vue";
import type { DataProvider } from "@/Core/Config/DataProvider";
import { NotNullRule } from "@/Core/Services/Validation/Rules/NotNullRule";
import { inject, ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import type { LoginForm } from "./LoginFormInterface";

const { authProvider } = inject("dataProvider") as DataProvider;

const router = useRouter();

const notNullRule = new NotNullRule();

const form: Ref<LoginForm> = ref({
  login: "",
  password: "",
});

const login = () => {
  authProvider
    .login(form.value.login, form.value.password)
    .then(() => router.push("/user/home"));
};
</script>

<style lang="scss" scoped></style>
