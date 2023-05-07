<template>
  <header>
    <div
      class="flex items-center justify-between"
      :class="!withMenu && 'flex-col'"
    >
      <AtomLink to="/">
        <AtomImage
          :src="logoUrl"
          alt="logo"
          :class="!withMenu ? 'w-24' : 'w-16'"
        />
      </AtomLink>
      <AtomLink to="/">
        <AtomTitle
          tag="h1"
          class="text-center text-secondary text-3xl font-exo mt-2"
          >La Course</AtomTitle
        >
      </AtomLink>
      <MoleculeMenu v-once :links="links" v-if="withMenu" />
    </div>
    <MoleculeViewHeader :title="viewHeaderTitle" v-if="withViewHeader" />
  </header>
</template>

<script lang="ts" setup>
import AtomImage from "../Atoms/AtomImage.vue";
import AtomLink from "../Atoms/AtomLink.vue";
import AtomTitle from "../Atoms/AtomTitle.vue";
import MoleculeMenu from "../Molecules/MoleculeMenu/MoleculeMenu.vue";
import logoUrl from "@/assets/images/logo.svg";
import { inject } from "vue";
import type { DataProvider } from "@/Core/Config/DataProvider";
import MoleculeViewHeader from "../Molecules/MoleculeViewHeader.vue";

const { authProvider } = inject("dataProvider") as DataProvider;

withDefaults(
  defineProps<{
    withMenu?: boolean;
    withViewHeader?: boolean;
    viewHeaderTitle?: string;
  }>(),
  {
    withMenu: true,
    withViewHeader: true,
    viewHeaderTitle: "",
  }
);

const links = [
  {
    to: "/recipes",
    content: "Liste des recettes",
  },
  {
    to: "/user/profile",
    content: "Mon profil",
  },
  {
    to: "/user/grocery-lists",
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
    click: () => authProvider.logout(),
  },
];
</script>
