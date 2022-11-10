<template>
  <form @submit.prevent class="flex flex-col items-center">
    <MoleculeInputLabel
      id="login"
      type="text"
      placeholder="Identifiant"
      :validationRules="[rules.notNull]"
      @update="(content) => (form.login = content)"
    />
    <MoleculeInputLabel
      id="password"
      type="password"
      placeholder="Mot de passe"
      :validationRules="[rules.notNull]"
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
import { databaseAuthService } from "@/Core/Services/Auth/DatabaseAuthService";
import { useRuleStore } from "@/Core/Services/Validation/RuleStore";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import type { LoginForm } from "./LoginFormInterface";

const rules = useRuleStore();
const router = useRouter();

const form: LoginForm = reactive({
  login: "",
  password: "",
});

const login = () => {
  databaseAuthService
    .login(form.login, form.password)
    .then(() => router.push("/"));
};
</script>

<style lang="scss" scoped></style>
