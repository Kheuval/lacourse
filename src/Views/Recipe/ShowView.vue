<template>
  <OrganismHeader />
  <MoleculeViewHeader class="mt-2" title="Les Burgers">
    <template #rescourceAction>
      <MoleculeResourceAction class="mt-4" :resource="resource2" />
    </template>
  </MoleculeViewHeader>
</template>

<script lang="ts" setup>
import MoleculeResourceAction from "@/Components/Molecules/MoleculeResourceAction.vue";
import MoleculeViewHeader from "@/Components/Molecules/MoleculeViewHeader.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import type { GroceryList } from "@/Domain/GroceryList/GroceryListInterface";
import type { Recipe } from "@/Domain/Recipe/RecipeInterface";
import { databaseRecipeRepository } from "@/Domain/Recipe/Repository/DatabaseRecipeRepository";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const resource = ref<Recipe | null>(null);

databaseRecipeRepository
  .findOneByIri("/recipes/" + route.params.id)
  .then((recipe) => (resource.value = recipe));

const resource2: GroceryList = {
  id: 0,
  name: "",
  isActive: false,
  listDetails: [],
};
</script>

<style lang="scss" scoped></style>
