<template>
  <form @submit.prevent>
    <MoleculeInputLabelVue
      id="username"
      type="text"
      placeholder="Identifiant"
      :validationRules="[rules.notNull]"
      @update="(content) => (form.username = content)"
    />
    <MoleculeInputLabelVue
      id="email"
      type="email"
      placeholder="Adresse email"
      :validationRules="[rules.notNull]"
      @update="(content) => (form.email = content)"
    />
    <MoleculeInputLabelVue
      id="password1"
      type="password"
      placeholder="Mot de passe"
      :validationRules="[rules.notNull]"
      @update="(content) => (form.password1 = content)"
    />
    <MoleculeInputLabelVue
      id="password2"
      type="password"
      placeholder="Répétez le mot de passe"
      :validationRules="[rules.notNull]"
      @update="(content) => (form.password2 = content)"
    />
    <AtomButtonVue @click="checkPasswords">Créer un compte</AtomButtonVue>
  </form>
</template>

<script lang="ts" setup>
import AtomButtonVue from "../../Atoms/AtomButton.vue";
import MoleculeInputLabelVue from "../../Molecules/MoleculeInputLabel.vue";
import { useRuleStore } from "@/Core/Services/Validation/RuleStore";
import { reactive } from "vue";
import type { RegisterForm } from "./RegisterFormInterface";

const rules = useRuleStore();

const form: RegisterForm = reactive({
  username: "",
  email: "",
  password1: "",
  password2: "",
});

const checkPasswords = () => {
  if (form.password1 !== form.password2) {
    console.log("heehee");
  }
};
</script>

<style lang="scss" scoped></style>
