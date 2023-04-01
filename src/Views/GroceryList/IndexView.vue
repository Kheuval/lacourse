<template>
  <OrganismHeader />
  <MoleculeViewHeader title="Mes listes de course" />
  <MoleculeResourceList
    class="mt-4"
    :resourceList="groceryLists"
    liClass="relative"
    linkClass="bg-primary mb-8 text-center text-white text-2xl py-4 px-6 rounded-full cursor-pointer"
  />
</template>

<script lang="ts" setup>
import MoleculeResourceList from "@/Components/Molecules/MoleculeResourceList.vue";
import MoleculeViewHeader from "@/Components/Molecules/MoleculeViewHeader.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import type { DataProvider } from "@/Core/Config/DataProvider";
import { inject } from "vue";

const { groceryListProvider } = inject("dataProvider") as DataProvider;

const groceryLists = await groceryListProvider.getAllForUser();
</script>

<style lang="scss" scoped></style>
