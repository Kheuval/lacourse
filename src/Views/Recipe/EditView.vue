<template>
  <OrganismHeader viewHeaderTitle="Édition de recette" />
  <main>
    <OrganismRecipeForm :recipe="recipe" class="mt-6" />
  </main>
</template>

<script lang="ts" setup>
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import OrganismRecipeForm from "@/Components/Organisms/OrganismRecipeForm/OrganismRecipeForm.vue";
import type { DataProvider } from "@/Core/Config/DataProvider";
import { inject } from "vue";
import { useRoute } from "vue-router";

const { recipeProvider } = inject("dataProvider") as DataProvider;

const { params } = useRoute();

const recipe = await recipeProvider.findOneByIri(`/api/recipes/${params.id}`);
</script>
