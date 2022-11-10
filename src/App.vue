<template>
  <OrganismRegisterForm />
  <MoleculeLoader :show="isFetching" />
  <MoleculeDialog
    :title="error.title"
    :content="error.errorMessage"
    @ok="error = null"
    @cancel="error = null"
    v-if="error"
  />
  <!-- <RouterView /> -->
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import MoleculeDialog from "./Components/Molecules/MoleculeDialog.vue";
import MoleculeLoader from "./Components/Molecules/MoleculeLoader.vue";
import OrganismRegisterForm from "./Components/Organisms/OrganismRegisterForm/OrganismRegisterForm.vue";
import { useApiStore } from "./Core/Services/Api/ApiStore";
import { useErrorStore } from "./Core/Services/Error/Store/ErrorStore";

const { error } = storeToRefs(useErrorStore());
const { isFetching } = storeToRefs(useApiStore());
</script>
<style lang="scss" scoped></style>
