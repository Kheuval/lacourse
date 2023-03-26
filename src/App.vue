<template>
  <AtomButton
    class="uppercase bg-primary text-white rounded-xl px-6 py-2"
    @click="doSomething"
  >
    Do something
  </AtomButton>
  <Suspense>
    <RouterView />
  </Suspense>
  <MoleculeLoader v-if="isFetching" />
  <MoleculeDialog v-if="error" @ok="error = null" @cancel="error = null">
    <template #header>
      <AtomIcon icon="fa-solid fa-circle-exclamation" class="text-[3rem]" />
      <AtomTitle tag="h1" class="text-3xl">{{ error.title }}</AtomTitle>
    </template>
    <AtomText class="text-center">
      {{ error.errorMessage }}
    </AtomText>
  </MoleculeDialog>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { inject } from "vue";
import { useRouter } from "vue-router";
import AtomButton from "./Components/Atoms/AtomButton.vue";
import AtomIcon from "./Components/Atoms/AtomIcon.vue";
import AtomText from "./Components/Atoms/AtomText.vue";
import AtomTitle from "./Components/Atoms/AtomTitle.vue";
import MoleculeDialog from "./Components/Molecules/MoleculeDialog.vue";
import MoleculeLoader from "./Components/Molecules/MoleculeLoader.vue";
import { useApiStore } from "./Core/Services/Api/ApiStore";
import type { DataProvider } from "@/Core/Config/DataProvider";
import { useErrorStore } from "./Core/Services/Error/Store/ErrorStore";

const { error } = storeToRefs(useErrorStore());
const { isFetching } = storeToRefs(useApiStore());

const { authProvider } = inject("dataProvider") as DataProvider;

const router = useRouter();

const doSomething = async () => {
  await authProvider.login();

  router.push("/recipes/edit/25");
};
</script>
<style lang="scss" scoped></style>
