<template>
  <OrganismHeader viewHeaderTitle="Édition de recette" />
  <main>
    <OrganismRecipeForm :recipe="recipe" class="mt-6" />
  </main>
</template>

<script lang="ts" setup>
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import OrganismRecipeForm from "@/Components/Organisms/OrganismRecipeForm/OrganismRecipeForm.vue";
import { DataProviderKey } from "@/Core/Config/DataProviderInterface";
import { inject } from "vue";
import { useRoute } from "vue-router";

const { recipeProvider } = inject(DataProviderKey)!;

const { params } = useRoute();

const recipe = await recipeProvider.findOneByIri(`/api/recipes/${params.id}`);
</script>
