<template>
  <OrganismHeader :withViewHeader="false" />
  <MoleculeViewHeader class="mt-2" :title="groceryList.name">
    <template #resourceAction>
      <AtomButton @click="toggleResourceActions">
        <AtomIcon icon="fa-solid fa-gear" class="text-2xl text-secondary" />
      </AtomButton>
      <MoleculeResourceAction
        v-if="showResourceActions"
        :resource="groceryList"
        @toggleListVisibility="(content) => (groceryList = content)"
      />
    </template>
  </MoleculeViewHeader>
  <main class="pb-10">
    <AtomOverlay :show="showResourceActions" @click="toggleResourceActions" />
    <MoleculeListIngredientList
      :groceryListId="groceryList.id"
      :listDetails="groceryList.listDetails"
      @listUpdated="(content) => (groceryList = content)"
    />
  </main>
</template>

<script lang="ts" setup>
import AtomButton from "@/Components/Atoms/AtomButton.vue";
import AtomIcon from "@/Components/Atoms/AtomIcon.vue";
import AtomOverlay from "@/Components/Atoms/AtomOverlay.vue";
import MoleculeListIngredientList from "@/Components/Molecules/MoleculeListIngredientList.vue";
import MoleculeResourceAction from "@/Components/Molecules/MoleculeResourceAction.vue";
import MoleculeViewHeader from "@/Components/Molecules/MoleculeViewHeader.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import { DataProviderKey } from "@/Core/Config/DataProviderInterface";
import type { GroceryList } from "@/Domain/GroceryList/GroceryListInterface";
import { inject, ref } from "vue";
import { useRoute } from "vue-router";

const { groceryListProvider } = inject(DataProviderKey)!;

const route = useRoute();

const groceryList = ref<GroceryList>(
  await groceryListProvider.findOneByIri(
    "/api/grocery_lists/" + route.params.id
  )
);

const showResourceActions = ref(false);

const toggleResourceActions = () =>
  (showResourceActions.value = !showResourceActions.value);
</script>
