<template>
  <OrganismHeader />
  <MoleculeViewHeader title="Recettes favorites" />
  <MoleculeResourceList
    class="mt-4"
    :resourceList="favorites"
    :withImage="true"
    liClass="relative"
  />
</template>

<script lang="ts" setup>
import MoleculeResourceList from "@/Components/Molecules/MoleculeResourceList.vue";
import MoleculeViewHeader from "@/Components/Molecules/MoleculeViewHeader.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import type { DataProvider } from "@/Core/Config/DataProvider";
import { useUserStore } from "@/Domain/User/Store/UserStore";
import { inject } from "vue";

const { userProvider } = inject("dataProvider") as DataProvider;

const { currentUser } = useUserStore();

const favorites = await userProvider.getFavorites(currentUser!.id);
</script>

<style lang="scss" scoped></style>
