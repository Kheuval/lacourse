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
import type { DataProvider } from "@/Core/Config/DataProvider";
import { inject } from "vue";

const { recipeProvider } = inject("dataProvider") as DataProvider;

const recipes = await recipeProvider.getAll();
</script>

<style lang="scss" scoped></style>
