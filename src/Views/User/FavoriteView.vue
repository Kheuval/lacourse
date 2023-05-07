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
import { DataProviderKey } from "@/Core/Config/DataProviderInterface";
import { useUserStore } from "@/Domain/User/Store/UserStore";
import { inject } from "vue";

const { userProvider } = inject(DataProviderKey)!;

const { currentUser } = useUserStore();

const favorites = await userProvider.getFavorites(currentUser!.id);
</script>
