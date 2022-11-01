<template>
  <MoleculeMenu :links="links" />
  <!-- <RouterView /> -->
</template>

<script setup lang="ts">
import MoleculeMenu from "./Components/Molecules/MoleculeMenu.vue";
import { databaseAuthService } from "./Core/Services/Auth/DatabaseAuthService";

const links = [
  {
    to: "/user/profile",
    content: "Mon profil",
  },
  {
    to: "/user/lists",
    content: "Mes listes de courses",
  },
  {
    to: "/user/recipes",
    content: "Mes recettes",
  },
  {
    to: "/user/favorites",
    content: "Mes favoris",
  },
  {
    to: "/",
    content: "Se déconnecter",
    click: () => databaseAuthService.logout(),
  },
];
</script>
<style lang="scss" scoped></style>
