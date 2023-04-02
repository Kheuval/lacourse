<template>
  <OrganismHeader />
  <MoleculeViewHeader class="mt-2" :title="groceryList.name">
    <template #resourceAction>
      <AtomButton @click="toggleResourceActions">
        <AtomIcon icon="fa-solid fa-gear" class="text-2xl text-secondary" />
      </AtomButton>
      <MoleculeResourceAction
        v-if="showResourceActions"
        :resource="groceryList"
        @toggleResourceVisibility="toggleListVisibility"
      />
    </template>
  </MoleculeViewHeader>
  <AtomOverlay :show="showResourceActions" @click="toggleResourceActions" />
  <MoleculeListIngredientList
    :groceryListId="groceryList.id"
    :listDetails="groceryList.listDetails"
    @listUpdated="(content) => (groceryList = content)"
  />
</template>

<script lang="ts" setup>
import AtomButton from "@/Components/Atoms/AtomButton.vue";
import AtomIcon from "@/Components/Atoms/AtomIcon.vue";
import AtomOverlay from "@/Components/Atoms/AtomOverlay.vue";
import MoleculeListIngredientList from "@/Components/Molecules/MoleculeListIngredientList.vue";
import MoleculeResourceAction from "@/Components/Molecules/MoleculeResourceAction.vue";
import MoleculeViewHeader from "@/Components/Molecules/MoleculeViewHeader.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import type { DataProvider } from "@/Core/Config/DataProvider";
import type { GroceryList } from "@/Domain/GroceryList/GroceryListInterface";
import { inject, ref, type Ref } from "vue";
import { useRoute } from "vue-router";

const { groceryListProvider } = inject("dataProvider") as DataProvider;

const route = useRoute();

const groceryList: Ref<GroceryList> = ref(
  await groceryListProvider.findOneByIri(
    "/api/grocery_lists/" + route.params.id
  )
);

const showResourceActions = ref(false);

const toggleResourceActions = () =>
  (showResourceActions.value = !showResourceActions.value);

const toggleListVisibility = async () => {
  groceryList.value = await groceryListProvider.updateOneByIri(
    groceryList.value.id,
    { isActive: !groceryList.value.isActive }
  );
};
</script>

<style lang="scss" scoped></style>
