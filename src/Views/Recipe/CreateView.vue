<template>
  <OrganismHeader />
  <MoleculeViewHeader title="Création de recette" />
  <OrganismRecipeForm class="mt-6" />
</template>

<script lang="ts" setup>
import MoleculeViewHeader from "@/Components/Molecules/MoleculeViewHeader.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import OrganismRecipeForm from "@/Components/Organisms/OrganismRecipeForm/OrganismRecipeForm.vue";
</script>

<style lang="scss" scoped></style>
