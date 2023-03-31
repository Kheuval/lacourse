<template>
  <OrganismHeader />
  <MoleculeViewHeaderVue :title="title" />
  <div class="text-center mt-4" v-if="forUser">
    <AtomText class="text-lg" v-if="!recipes.length">
      Vous n'avez pas encore de recette, vous pouvez en créer une grâce au
      bouton ci-dessous
    </AtomText>
    <AtomButton
      :class="`bg-secondary text-white px-6 py-3 rounded-full ${
        recipes.length ? 'mb-2' : 'mt-4'
      }`"
    >
      <AtomLink to="/recipes/create">Créer une recette</AtomLink>
    </AtomButton>
  </div>
  <MoleculeResourceList
    class="mt-4"
    :resourceList="recipes"
    :withImage="true"
    liClass="relative"
  />
</template>

<script lang="ts" setup>
import AtomButton from "@/Components/Atoms/AtomButton.vue";
import AtomLink from "@/Components/Atoms/AtomLink.vue";
import AtomText from "@/Components/Atoms/AtomText.vue";
import MoleculeResourceList from "@/Components/Molecules/MoleculeResourceList.vue";
import MoleculeViewHeaderVue from "@/Components/Molecules/MoleculeViewHeader.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import type { DataProvider } from "@/Core/Config/DataProvider";
import { useUserStore } from "@/Domain/User/Store/UserStore";
import { inject, ref, watch } from "vue";
import { useRoute } from "vue-router";

const { recipeProvider } = inject("dataProvider") as DataProvider;

const { currentUser } = useUserStore();

const route = useRoute();

const title = ref(route.meta.forUser ? "Mes recettes" : "Toutes les recettes");
const forUser = ref(route.meta.forUser);
const recipes = ref(
  route.meta.forUser
    ? await recipeProvider.getAllForUser(currentUser!.id)
    : await recipeProvider.getAll()
);

watch(
  () => route.meta,
  async (newValue, oldValue) => {
    if (newValue.forUser !== oldValue?.forUser) {
      title.value = newValue.forUser ? "Mes recettes" : "Toutes les recettes";
      forUser.value = newValue.forUser;
      recipes.value = newValue.forUser
        ? await recipeProvider.getAllForUser(currentUser!.id)
        : await recipeProvider.getAll();
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped></style>
