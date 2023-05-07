<template>
  <OrganismHeader viewHeaderTitle="Recettes favorites" />
  <main>
    <MoleculeResourceList
      class="mt-4"
      :resourceList="favorites"
      :withImage="true"
      liClass="relative"
    />
  </main>
</template>

<script lang="ts" setup>
import MoleculeResourceList from "@/Components/Molecules/MoleculeResourceList.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import type { DataProvider } from "@/Core/Config/DataProvider";
import { useUserStore } from "@/Domain/User/Store/UserStore";
import { inject } from "vue";

const { userProvider } = inject("dataProvider") as DataProvider;

const { currentUser } = useUserStore();

const favorites = await userProvider.getFavorites(currentUser!.id);
</script>
