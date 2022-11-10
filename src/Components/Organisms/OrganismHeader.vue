<template>
  <header
    class="flex items-center justify-between"
    :class="home ? 'flex-col' : ''"
  >
    <AtomLink to="/">
      <AtomImage
        src="./images/logo.svg"
        alt="logo"
        :class="home ? 'w-24' : 'w-16'"
      />
    </AtomLink>
    <AtomLink to="/">
      <AtomTitleVue
        tag="h1"
        content="La Course"
        class="text-center text-secondary text-3xl font-exo mt-2"
      />
    </AtomLink>
    <MoleculeMenu :links="links" v-if="!home" />
  </header>
</template>

<script lang="ts" setup>
import AtomImage from "../Atoms/AtomImage.vue";
import AtomLink from "../Atoms/AtomLink.vue";
import AtomTitleVue from "../Atoms/AtomTitle.vue";
import MoleculeMenu from "../Molecules/MoleculeMenu/MoleculeMenu.vue";
import { databaseAuthService } from "@/Core/Services/Auth/DatabaseAuthService";

withDefaults(
  defineProps<{
    home?: boolean;
  }>(),
  {
    home: false,
  }
);

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
