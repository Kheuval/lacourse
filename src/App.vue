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

const { error } = storeToRefs(useErrorStore());
const { isFetching } = storeToRefs(useApiStore());

const doSomething = async () => {
  await databaseAuthService.login();
  await databaseRecipeRepository.getSample();
  const body: Recipe = {
    name: "Gâteau rapide au citron",
    image: "/api/media_objects/15",
    servings: 8,
    totalTime: 35,
    preparationTime: 10,
    restTime: 0,
    cookingTime: 25,
    recipeIngredients: [
      {
        unit: "g",
        quantity: 125,
        ingredient: {
          name: "Farine",
        },
      },
      {
        unit: "u",
        quantity: 1,
        ingredient: {
          name: "Sachet de levure chimique",
        },
      },
      {
        unit: "cl",
        quantity: 10,
        ingredient: {
          name: "Huile",
        },
      },
      {
        unit: "u",
        quantity: 3,
        ingredient: {
          name: "Oeuf",
        },
      },
      {
        unit: "g",
        quantity: 220,
        ingredient: {
          name: "Sucre",
        },
      },
      {
        unit: "pincée",
        quantity: 1,
        ingredient: {
          name: "Sel",
        },
      },
      {
        unit: "u",
        quantity: 1,
        ingredient: {
          name: "Citron",
        },
      },
    ],
    user: {
      username: "kheuval",
    },
    steps: [
      {
        stepDescription:
          "Mélanger la farine, le sucre, la levure et le sel. Ajouter les œufs et l'huile. Mélanger rapidement jusqu'à obtention d'une pâte à peu près homogène.",
      },
      {
        stepDescription:
          "Avec une rappe ou un zesteur, récupérer le zeste du citron, à ajouter à la pâte.",
      },
      {
        stepDescription:
          "Presser le citron et verser le jus dans le mélange. Si possible, ajouter la pulpe (mais pas les pépins !).",
      },
      {
        stepDescription:
          "Mélanger jusqu'à obtention d'une pâte onctueuse et homogène.",
      },
      {
        stepDescription: "Beurrer un plat à gâteau et y verser la pâte.",
      },
      {
        stepDescription:
          "Cuire au four pendant 25 min environ à 200°C (thermostat 6-7).",
      },
    ],
  };

  // await databaseRecipeRepository.updateOneByIri("/api/recipes/5", body);
};
</script>
<style lang="scss" scoped></style>
