<template>
  <div
    class="snap-x snap-mandatory flex overflow-x-auto rounded-3xl scrollbar-hide bg-black scroll-smooth"
    ref="container"
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
import { onMounted, ref } from "vue";
import MoleculeSlide from "../Molecules/MoleculeSlide.vue";

const recipes = ref<Recipe[] | null>(null);

databaseRecipeRepository.getSample().then((data) => (recipes.value = data));

const container = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const slideWidth = container.value!.clientWidth;

  setInterval(() => {
    if (
      container.value!.scrollLeft ===
      slideWidth * (recipes.value!.length - 1)
    ) {
      container.value!.scrollLeft = 0;
    } else {
      container.value!.scrollLeft += slideWidth;
    }
  }, 3000);
});
</script>

<style lang="scss" scoped></style>
