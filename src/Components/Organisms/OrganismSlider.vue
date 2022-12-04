<template>
  <div
    class="snap-x snap-mandatory flex overflow-x-auto rounded-3xl scrollbar-hide bg-black"
  >
    <MoleculeSlide
      v-for="recipe in recipes"
      :key="recipe.id"
      :imageIri="recipe.image"
      :alt="recipe.name"
      class="snap-center"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Recipe } from "@/Domain/Recipe/RecipeInterface";
import { databaseRecipeRepository } from "@/Domain/Recipe/Repository/DatabaseRecipeRepository";
import { ref } from "vue";
import MoleculeSlide from "../Molecules/MoleculeSlide.vue";

const recipes = ref<Recipe[] | null>(null);

databaseRecipeRepository.getSample().then((data) => (recipes.value = data));
</script>

<style lang="scss" scoped></style>
