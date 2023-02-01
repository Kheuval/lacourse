<template>
  <AtomButton
    class="uppercase bg-primary text-white rounded-xl px-6 py-2"
    @click="doSomething"
    >Do something</AtomButton
  >
  <!-- <Suspense>
    <RouterView />
  </Suspense> -->
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
import AtomButton from "./Components/Atoms/AtomButton.vue";
import AtomIcon from "./Components/Atoms/AtomIcon.vue";
import AtomText from "./Components/Atoms/AtomText.vue";
import AtomTitle from "./Components/Atoms/AtomTitle.vue";
import MoleculeDialog from "./Components/Molecules/MoleculeDialog.vue";
import MoleculeLoader from "./Components/Molecules/MoleculeLoader.vue";
import { useApiStore } from "./Core/Services/Api/ApiStore";
import { databaseAuthService } from "./Core/Services/Auth/DatabaseAuthService";
import { useErrorStore } from "./Core/Services/Error/Store/ErrorStore";
import type { Recipe } from "./Domain/Recipe/RecipeInterface";
import { databaseRecipeRepository } from "./Domain/Recipe/Repository/DatabaseRecipeRepository";
import { databaseUserRepository } from "./Domain/User/Repository/DatabaseUserRepository";
import { useUserStore } from "./Domain/User/Store/UserStore";

const { error } = storeToRefs(useErrorStore());
const { isFetching } = storeToRefs(useApiStore());
const { currentUser } = storeToRefs(useUserStore());

const doSomething = async () => {
  await databaseAuthService.login();
  // await databaseUserRepository.findOneByIri(currentUser.value!.id);
  await databaseRecipeRepository.getSample();

  // await databaseRecipeRepository.updateOneByIri("/api/recipes/5", body);
};
</script>
<style lang="scss" scoped></style>
