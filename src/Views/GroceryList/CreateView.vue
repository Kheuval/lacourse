<template>
  <OrganismHeader />
  <MoleculeViewHeader title="Création de liste de course" />
  <OrganismGroceryListForm class="mt-8" />
</template>

<script lang="ts" setup>
import MoleculeViewHeader from "@/Components/Molecules/MoleculeViewHeader.vue";
import OrganismGroceryListForm from "@/Components/Organisms/OrganismGroceryListForm/OrganismGroceryListForm.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
</script>

<style lang="scss" scoped></style>
