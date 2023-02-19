<template>
  <div>
    <AtomTitle class="mt-6 text-2xl text-center" tag="h2">
      Ingrédients :
    </AtomTitle>
    <div class="grid grid-cols-3 gap-2 rounded-xl p-4">
      <div
        class="relative flex border-2 border-gray-400 rounded-md text-center after:pb-[100%]"
        v-for="recipeIngredient in recipeIngredients"
        :key="recipeIngredient.id"
      >
        <div class="absolute flex flex-col justify-evenly w-full h-full p-2">
          <AtomText class="text-sm break-words">
            {{ recipeIngredient.ingredient.name }}
          </AtomText>
          <AtomText class="text-sm text-secondary">
            {{ quantity(recipeIngredient) }}
          </AtomText>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RecipeIngredient } from "@/Domain/RecipeIngredient/RecipeIngredientInterface";
import AtomText from "../Atoms/AtomText.vue";
import AtomTitle from "../Atoms/AtomTitle.vue";

defineProps<{
  recipeIngredients: RecipeIngredient[] | null;
}>();

const quantity = (recipeIngredient: RecipeIngredient) => {
  return `${recipeIngredient.quantity} ${
    recipeIngredient.unit === "u" ? "" : recipeIngredient.unit
  }`;
};
</script>

<style lang="scss" scoped></style>
