<template>
  <form @submit.prevent class="text-center">
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
    <AtomButtonVue
      class="uppercase bg-primary text-white rounded-xl px-6 py-2"
      @click="register"
      >Créer un compte</AtomButtonVue
    >
  </form>
</template>

<script lang="ts" setup>
import AtomButtonVue from "../../Atoms/AtomButton.vue";
import MoleculeInputLabelVue from "../../Molecules/MoleculeInputLabel.vue";
import { useRuleStore } from "@/Core/Services/Validation/RuleStore";
import { reactive } from "vue";
import type { RegisterForm } from "./RegisterFormInterface";
import { databaseAuthService } from "@/Core/Services/Auth/DatabaseAuthService";
import { useErrorStore } from "@/Core/Services/Error/Store/ErrorStore";
import { ErrorType } from "@/Core/Services/Error/AppErrorsEnum";
import { useEventBus } from "@/Core/Services/EventBus";

const rules = useRuleStore();
const { handleErrors } = useErrorStore();
const eventBus = useEventBus();

const form: RegisterForm = reactive({
  username: "",
  email: "",
  password1: "",
  password2: "",
});

const register = () => {
  eventBus.emit("validate", form);

  if (!form.username || !form.email || !form.password1 || !form.password2) {
    handleErrors({ errorType: ErrorType.unprocessableEntity });
    return;
  }

  checkPasswords()
    ? databaseAuthService.register(form.username, form.email, form.password1)
    : handleErrors({ errorType: ErrorType.passwordsNotMatching });
};

const checkPasswords = (): boolean => {
  return form.password1 === form.password2;
};
</script>

<style lang="scss" scoped></style>
