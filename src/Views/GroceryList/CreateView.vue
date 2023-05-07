<template>
  <OrganismHeader viewHeaderTitle="Création de liste de course" />
  <main>
    <OrganismGroceryListForm class="mt-8" />
  </main>
</template>

<script lang="ts" setup>
import OrganismGroceryListForm from "@/Components/Organisms/OrganismGroceryListForm/OrganismGroceryListForm.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
</script>
