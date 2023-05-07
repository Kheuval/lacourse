<template>
  <form @submit.prevent novalidate class="flex flex-col items-center">
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
import { DataProviderKey } from "@/Core/Config/DataProviderInterface";
import { NotNullRule } from "@/Core/Services/Validation/Rules/NotNullRule";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import type { LoginForm } from "./LoginFormInterface";

const { authProvider } = inject(DataProviderKey)!;

const router = useRouter();

const notNullRule = new NotNullRule();

const form = ref<LoginForm>({
  login: "",
  password: "",
});

const login = () => {
  authProvider
    .login(form.value.login, form.value.password)
    .then(() => router.push("/user/home"));
};
</script>
