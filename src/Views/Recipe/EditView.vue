<template>
  <OrganismHeader />
  <MoleculeViewHeader title="Édition de recette" />
  <OrganismRecipeForm :recipe="recipe" class="mt-6" />
</template>

<script lang="ts" setup>
import MoleculeViewHeader from "@/Components/Molecules/MoleculeViewHeader.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import OrganismRecipeForm from "@/Components/Organisms/OrganismRecipeForm/OrganismRecipeForm.vue";
import { databaseRecipeRepository } from "@/Domain/Recipe/Repository/DatabaseRecipeRepository";
import { useRoute } from "vue-router";

const { params } = useRoute();

const recipe = await databaseRecipeRepository.findOneByIri(
  `/api/recipes/${params.id}`
);
</script>

<style lang="scss" scoped></style>
