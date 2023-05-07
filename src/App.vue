<template>
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
import AtomIcon from "./Components/Atoms/AtomIcon.vue";
import AtomText from "./Components/Atoms/AtomText.vue";
import AtomTitle from "./Components/Atoms/AtomTitle.vue";
import MoleculeDialog from "./Components/Molecules/MoleculeDialog.vue";
import MoleculeLoader from "./Components/Molecules/MoleculeLoader.vue";
import { useApiStore } from "./Core/Services/Api/ApiStore";
import { useErrorStore } from "./Core/Services/Error/Store/ErrorStore";

const { error } = storeToRefs(useErrorStore());
const { isFetching } = storeToRefs(useApiStore());
</script>
