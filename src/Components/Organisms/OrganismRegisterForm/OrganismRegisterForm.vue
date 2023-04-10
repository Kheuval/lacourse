<template>
  <form @submit.prevent novalidate class="flex flex-col items-center">
    <MoleculeInputLabelVue
      id="username"
      type="text"
      placeholder="Identifiant"
      :validationRules="[notNullRule]"
      @update="(content) => (form.username = content)"
    />
    <MoleculeInputLabelVue
      id="email"
      type="email"
      placeholder="Adresse email"
      :validationRules="[notNullRule]"
      @update="(content) => (form.email = content)"
    />
    <MoleculeInputLabelVue
      id="password1"
      type="password"
      placeholder="Mot de passe"
      :validationRules="[notNullRule]"
      @update="(content) => (form.password1 = content)"
    />
    <MoleculeInputLabelVue
      id="password2"
      type="password"
      placeholder="Répétez le mot de passe"
      :validationRules="[notNullRule]"
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
import { inject, ref, type Ref } from "vue";
import type { RegisterForm } from "./RegisterFormInterface";
import { useEventBus } from "@/Core/Services/EventBus";
import { NotNullRule } from "@/Core/Services/Validation/Rules/NotNullRule";
import { UnprocessableEntityError } from "@/Core/Services/Error/Errors/UnprocessableEntityError";
import { PasswordsNotMatchingError } from "@/Core/Services/Error/Errors/PasswordsNotMatchingError";
import type { DataProvider } from "@/Core/Config/DataProvider";
import { useRouter } from "vue-router";

const { authProvider } = inject("dataProvider") as DataProvider;

const { emitter } = useEventBus();
const router = useRouter();

const notNullRule = new NotNullRule();

const form: Ref<RegisterForm> = ref({
  username: "",
  email: "",
  password1: "",
  password2: "",
});

const register = async () => {
  emitter.emit("validate", form.value);

  if (
    !form.value.username ||
    !form.value.email ||
    !form.value.password1 ||
    !form.value.password2
  ) {
    new UnprocessableEntityError();
    return;
  }

  if (checkPasswords()) {
    await authProvider.register(
      form.value.username,
      form.value.email,
      form.value.password1
    );

    await authProvider.login(form.value.username, form.value.password1);

    router.push("/user/home");
  } else {
    new PasswordsNotMatchingError();
  }
};

const checkPasswords = (): boolean => {
  return form.value.password1 === form.value.password2;
};
</script>

<style lang="scss" scoped></style>
