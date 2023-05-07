<template>
  <OrganismHeader
    :withMenu="false"
    viewHeaderTitle="Réinitialisation de mot de passe"
  />
  <main>
    <AtomTitle v-if="!updatePassword" class="text-center text-xl mt-4" tag="h1">
      Entrez votre adresse email pour recevoir un lien de réinitialisation
    </AtomTitle>
    <AtomTitle v-else class="text-center text-xl mt-4" tag="h1">
      Entrez votre nouveau mot de passe
    </AtomTitle>
    <MoleculeInputLabel
      id="email"
      class="w-full mt-8"
      type="text"
      placeholder="Email"
      :defaultContent="email"
      :validationRules="[notNullRule, emailRule]"
      @update="(content) => (email = content)"
      v-if="!updatePassword"
    />
    <MoleculeInputLabel
      id="password1"
      class="w-full mt-8"
      type="password"
      placeholder="Mot de passe"
      :validationRules="[notNullRule]"
      @update="(content) => (password1 = content)"
      v-if="updatePassword"
    />
    <MoleculeInputLabel
      id="password2"
      class="w-full"
      type="password"
      placeholder="Répétez le mot de passe"
      :validationRules="[notNullRule]"
      @update="(content) => (password2 = content)"
      v-if="updatePassword"
    />
    <AtomButton
      class="uppercase bg-primary text-white rounded-xl px-6 py-2 mx-auto block"
      @click="updatePassword ? resetPassword() : requestNewPassword()"
    >
      Réinitialiser
    </AtomButton>
    <MoleculeDialog
      v-if="showDialog"
      @ok="showDialog = false"
      :dismissible="false"
      :buttons="{ ok: true, cancel: false }"
      styles="h-1/2 w-4/5"
    >
      <template #header>
        <AtomIcon icon="fa-solid fa-circle-exclamation" class="text-[3rem]" />
      </template>
      <AtomText class="text-center my-4" v-if="!updatePassword">
        Un email a été envoyé à {{ email }}, vous pourrez y trouver les
        instructions pour réinitialiser votre mot de passe
      </AtomText>
      <AtomText class="text-center my-4" v-else>
        Votre mot de passe a bien été réinitialisé
      </AtomText>
    </MoleculeDialog>
  </main>
</template>

<script lang="ts" setup>
import AtomButton from "@/Components/Atoms/AtomButton.vue";
import AtomTitle from "@/Components/Atoms/AtomTitle.vue";
import MoleculeInputLabel from "@/Components/Molecules/MoleculeInputLabel.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import type { DataProvider } from "@/Core/Config/DataProvider";
import { useEventBus } from "@/Core/Services/EventBus";
import { NotNullRule } from "@/Core/Services/Validation/Rules/NotNullRule";
import { EmailRule } from "@/Core/Services/Validation/Rules/EmailRule";
import { useUserStore } from "@/Domain/User/Store/UserStore";
import { inject, ref } from "vue";
import { useEmailRegex } from "@/Core/Composables/useEmailRegex";
import MoleculeDialog from "@/Components/Molecules/MoleculeDialog.vue";
import AtomText from "@/Components/Atoms/AtomText.vue";
import AtomIcon from "@/Components/Atoms/AtomIcon.vue";
import { useRoute, useRouter } from "vue-router";
import { UnprocessableEntityError } from "@/Core/Services/Error/Errors/UnprocessableEntityError";
import { PasswordsNotMatchingError } from "@/Core/Services/Error/Errors/PasswordsNotMatchingError";

const { userProvider } = inject("dataProvider") as DataProvider;

const notNullRule = new NotNullRule();
const emailRule = new EmailRule();

const { currentUser } = useUserStore();
const { emitter } = useEventBus();
const router = useRouter();
const route = useRoute();

const token = route.params.token as string;
const email = ref<string>(currentUser ? currentUser.email : "");
const password1 = ref<string>();
const password2 = ref<string>();
const showDialog = ref(false);
let updatePassword = false;

if (token) {
  updatePassword = true;
}

const requestNewPassword = async () => {
  emitter.emit("validate", "email");

  if (!email.value || !useEmailRegex(email.value)) {
    return;
  }

  await userProvider.requestNewPassword(email.value);

  showDialog.value = true;
};

const resetPassword = async () => {
  emitter.emit("validate", "password1");
  emitter.emit("validate", "password2");

  if (!password1.value || !password2.value) {
    new UnprocessableEntityError();
    return;
  }

  if (checkPasswords()) {
    await userProvider.resetPassword(password1.value, token);

    router.push("/");
  } else {
    new PasswordsNotMatchingError();
  }
};

const checkPasswords = (): boolean => {
  return password1.value === password2.value;
};
</script>
