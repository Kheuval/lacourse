<template>
  <OrganismHeader />
  <MoleculeViewHeaderVue title="Mes recettes" />
  <div class="text-center mt-4">
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
import { databaseRecipeRepository } from "@/Domain/Recipe/Repository/DatabaseRecipeRepository";
import { useUserStore } from "@/Domain/User/Store/UserStore";

const { currentUser } = useUserStore();

const recipes = await databaseRecipeRepository.getAllForUser(currentUser!.id);
</script>

<style lang="scss" scoped></style>
