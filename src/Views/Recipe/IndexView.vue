<template>
  <OrganismHeader />
  <MoleculeViewHeaderVue title="Toutes les recettes" />
  <MoleculeResourceList
    class="mt-4"
    :resourceList="recipes"
    :withImage="true"
    liClass="relative"
  />
</template>

<script lang="ts" setup>
import MoleculeResourceList from "@/Components/Molecules/MoleculeResourceList.vue";
import MoleculeViewHeaderVue from "@/Components/Molecules/MoleculeViewHeader.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import { databaseRecipeRepository } from "@/Domain/Recipe/Repository/DatabaseRecipeRepository";

const recipes = await databaseRecipeRepository.getAll();
</script>

<style lang="scss" scoped></style>
