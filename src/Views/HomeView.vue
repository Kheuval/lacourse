<template>
  <OrganismHeader :withViewHeader="false" />
  <AtomTitle tag="h1" class="text-center text-2xl mt-6">
    Bonjour
    <em class="text-secondary not-italic">{{ currentUser!.username }}</em
    >, voici quelques idées de recettes
  </AtomTitle>
  <OrganismSlider class="mt-8" :data="recipes" />
  <div class="flex flex-col items-center mt-6">
    <OrganismSearchDialog content="Rechercher une recette" />
    <span class="text-lg">ou</span>
    <AtomLink to="/user/grocery-lists">
      <AtomButton class="bg-secondary text-white px-6 py-3 rounded-full mt-2">
        Commencer une liste de courses
      </AtomButton>
    </AtomLink>
  </div>
</template>

<script lang="ts" setup>
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import AtomTitle from "@/Components/Atoms/AtomTitle.vue";
import { useUserStore } from "@/Domain/User/Store/UserStore";
import OrganismSearchDialog from "@/Components/Organisms/OrganismSearchDialog.vue";
import OrganismSlider from "@/Components/Organisms/OrganismSlider.vue";
import { inject } from "vue";
import AtomButton from "@/Components/Atoms/AtomButton.vue";
import type { DataProvider } from "@/Core/Config/DataProvider";
import AtomLink from "@/Components/Atoms/AtomLink.vue";

const { currentUser } = useUserStore();

const { recipeProvider } = inject("dataProvider") as DataProvider;

const recipes = await recipeProvider.getSample();
</script>
