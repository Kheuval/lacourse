<template>
  <OrganismHeader />
  <AtomTitle tag="h1" class="text-center text-2xl mt-8">
    Bonjour
    <em class="text-secondary not-italic">{{ currentUser!.username }}</em
    >, voici quelques idées de recettes
  </AtomTitle>
  <OrganismSlider class="mt-8" :data="recipes" />
</template>

<script lang="ts" setup>
import type { Recipe } from "@/Domain/Recipe/RecipeInterface";
import { databaseRecipeRepository } from "@/Domain/Recipe/Repository/DatabaseRecipeRepository";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import AtomTitle from "@/Components/Atoms/AtomTitle.vue";
import { useUserStore } from "@/Domain/User/Store/UserStore";
import OrganismSlider from "@/Components/Organisms/OrganismSlider.vue";
import { ref } from "vue";

const { currentUser } = useUserStore();

const recipes = ref<Recipe[] | null>(null);

databaseRecipeRepository.getSample().then((data) => (recipes.value = data));
</script>
