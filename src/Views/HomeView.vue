<template>
  <OrganismHeader />
  <AtomTitle tag="h1" class="text-center text-2xl mt-6">
    Bonjour
    <em class="text-secondary not-italic">{{ currentUser!.username }}</em
    >, voici quelques idées de recettes
  </AtomTitle>
  <OrganismSlider class="mt-8" :data="recipes" />
  <div class="relative flex flex-col items-center mt-6">
    <OrganismSearchDialog />
    <span class="text-lg">ou</span>
    <AtomButton class="bg-secondary text-white px-6 py-3 rounded-full mt-2">
      Commencer une liste de courses
    </AtomButton>
  </div>
</template>

<script lang="ts" setup>
import type { Recipe } from "@/Domain/Recipe/RecipeInterface";
import { databaseRecipeRepository } from "@/Domain/Recipe/Repository/DatabaseRecipeRepository";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import AtomTitle from "@/Components/Atoms/AtomTitle.vue";
import { useUserStore } from "@/Domain/User/Store/UserStore";
import OrganismSearchDialog from "@/Components/Organisms/OrganismSearchDialog.vue";
import OrganismSlider from "@/Components/Organisms/OrganismSlider.vue";
import { ref } from "vue";
import AtomButton from "@/Components/Atoms/AtomButton.vue";

const { currentUser } = useUserStore();

const recipes = ref<Recipe[] | null>(null);

databaseRecipeRepository.getSample().then((data) => (recipes.value = data));
</script>
