<template>
  <OrganismHeader viewHeaderTitle="Mes listes de course" />
  <main class="pb-10">
    <div class="text-center mt-4">
      <AtomText class="text-lg" v-if="!groceryLists.length">
        Vous n'avez pas encore de liste de course, vous pouvez en créer une
        grâce au bouton ci-dessous
      </AtomText>
      <AtomButton
        :class="`bg-secondary text-white px-6 py-3 rounded-full ${
          groceryLists.length ? 'mb-2' : 'mt-4'
        }`"
      >
        <AtomLink to="/grocery-lists/create"
          >Créer une liste de course</AtomLink
        >
      </AtomButton>
    </div>
    <MoleculeResourceList
      class="mt-4"
      :resourceList="groceryLists"
      liClass="relative"
      linkClass="bg-primary mb-8 text-center text-white text-2xl py-4 px-6 rounded-full cursor-pointer"
    />
  </main>
</template>

<script lang="ts" setup>
import AtomButton from "@/Components/Atoms/AtomButton.vue";
import AtomLink from "@/Components/Atoms/AtomLink.vue";
import AtomText from "@/Components/Atoms/AtomText.vue";
import MoleculeResourceList from "@/Components/Molecules/MoleculeResourceList.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import { DataProviderKey } from "@/Core/Config/DataProviderInterface";
import { inject } from "vue";

const { groceryListProvider } = inject(DataProviderKey)!;

const groceryLists = await groceryListProvider.getAllForUser();
</script>
