<template>
  <ul class="-mt-4">
    <li
      class="mb-4 bg-white text-primary py-2 px-4 rounded-lg text-center"
      v-for="recipe in list"
      :key="recipe.id"
    >
      <AtomLink :to="recipe.name">
        {{ recipe.name }}
      </AtomLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { Recipe } from "@/Domain/Recipe/RecipeInterface";
import AtomLink from "../Atoms/AtomLink.vue";

defineProps<{
  list: Recipe[];
}>();
</script>

<style lang="scss" scoped></style>
