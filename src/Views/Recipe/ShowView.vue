<template>
  <OrganismHeader />
  <MoleculeViewHeader class="mt-2" title="Les Burgers">
    <template #resourceAction v-if="isOwner">
      <MoleculeResourceAction :resource="resource!" />
    </template>
  </MoleculeViewHeader>
</template>

<script lang="ts" setup>
import MoleculeResourceAction from "@/Components/Molecules/MoleculeResourceAction.vue";
import MoleculeViewHeader from "@/Components/Molecules/MoleculeViewHeader.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import { databaseRecipeRepository } from "@/Domain/Recipe/Repository/DatabaseRecipeRepository";
import { useUserStore } from "@/Domain/User/Store/UserStore";
import { useRoute } from "vue-router";

const route = useRoute();

const { currentUser } = useUserStore();

const resource = await databaseRecipeRepository.findOneByIri(
  "/api/recipes/" + route.params.id
);

const isOwner = currentUser?.username === resource?.user.username;
</script>

<style lang="scss" scoped></style>
