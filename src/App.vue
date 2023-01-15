<template>
  <AtomButton
    class="uppercase bg-primary text-white rounded-xl px-6 py-2"
    @click="doSomething"
    >Do something
  </AtomButton>
  <!-- <RouterView /> -->
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
import { databaseMediaObjectRepository } from "./Domain/MediaObject/Repository/DatabaseMediaObjectRepository";
import type { Recipe } from "./Domain/Recipe/RecipeInterface";
import { databaseRecipeRepository } from "./Domain/Recipe/Repository/DatabaseRecipeRepository";

const { error } = storeToRefs(useErrorStore());
const { isFetching } = storeToRefs(useApiStore());

const doSomething = async () => {
  await databaseAuthService.login("kheuval", "password");
  // databaseAuthService.register("toto", "toto@bobo.com", "password");
  // const recipe = await databaseMediaObjectRepository.findOneByIri(
  //   "/api/media_objects/1"
  // );
  // console.log(recipe["contentUrl"]);
  // console.log(await databaseRecipeRepository.getSample());
  // console.log(await databaseRecipeRepository.findByQuery("bur"));
  console.log(await databaseRecipeRepository.findOneByIri("/api/recipes/1"));
};
</script>
<style lang="scss" scoped></style>
