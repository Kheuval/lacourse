<template>
  <div class="w-full">
    <AtomTitle class="mt-6 text-2xl text-center" tag="h2">
      Ingrédients :
    </AtomTitle>
    <div class="grid grid-cols-3 gap-2 rounded-xl p-4">
      <div
        :class="`flex border-2 border-gray-400 rounded-md text-center after:pb-[100%] ${
          editable && 'cursor-pointer'
        }`"
        v-for="(recipeIngredient, index) in recipeIngredients"
        :key="recipeIngredient.ingredient.name"
        @click="editable && $emit('editIngredient', index, recipeIngredient)"
      >
        <div class="flex flex-col justify-evenly w-full h-full p-2">
          <AtomText class="text-sm break-words">
            {{ recipeIngredient.ingredient.name }}
          </AtomText>
          <AtomText class="text-sm text-secondary">
            {{ useQuantity(recipeIngredient.quantity, recipeIngredient.unit) }}
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
import type { IngredientForm } from "../Organisms/OrganismIngredientForm/IngredientFormInterface";
import { useQuantity } from "@/Core/Composables/useQuantity";

defineEmits(["editIngredient"]);

withDefaults(
  defineProps<{
    recipeIngredients: RecipeIngredient[] | IngredientForm[] | null;
    editable?: boolean;
  }>(),
  {
    editable: false,
  }
);
</script>
