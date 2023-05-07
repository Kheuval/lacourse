<template>
  <OrganismHeader viewHeaderTitle="Création de recette" />
  <main>
    <OrganismRecipeForm class="mt-6" />
  </main>
</template>

<script lang="ts" setup>
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import OrganismRecipeForm from "@/Components/Organisms/OrganismRecipeForm/OrganismRecipeForm.vue";
</script>
