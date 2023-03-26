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
  <div class="mt-6">
    <div
      :class="`bg-primary mb-8 text-white text-2xl py-4 px-6 rounded-full cursor-pointer ${
        listDetail.isActive || 'bg-opacity-50'
      }`"
      v-for="(listDetail, index) in groceryList.listDetails"
      :key="index"
      @click="toggleListDetailVisibility(index)"
    >
      <div class="flex">
        <AtomText
          :class="`flex-1 ${
            listDetail.ingredient.name.length > 15 ? 'text-lg' : ''
          }`"
        >
          {{ listDetail.ingredient.name }}
        </AtomText>
        <AtomText>
          {{ useQuantity(listDetail.quantity, listDetail.unit) }}
        </AtomText>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AtomButton from "@/Components/Atoms/AtomButton.vue";
import AtomIcon from "@/Components/Atoms/AtomIcon.vue";
import AtomOverlay from "@/Components/Atoms/AtomOverlay.vue";
import AtomText from "@/Components/Atoms/AtomText.vue";
import MoleculeResourceAction from "@/Components/Molecules/MoleculeResourceAction.vue";
import MoleculeViewHeader from "@/Components/Molecules/MoleculeViewHeader.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import { useQuantity } from "@/Core/Composables/useQuantity";
import type { DataProvider } from "@/Core/Config/DataProvider";
import type { GroceryList } from "@/Domain/GroceryList/GroceryListInterface";
import { inject, ref, type Ref } from "vue";
import { useRoute } from "vue-router";

const { groceryListProvider } = inject("dataProvider") as DataProvider;

const route = useRoute();

const sortListDetails = (groceryList: GroceryList): GroceryList => {
  groceryList.listDetails.sort((a, b) =>
    a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1
  );
  return groceryList;
};

const groceryList: Ref<GroceryList> = ref(
  sortListDetails(
    await groceryListProvider.findOneByIri(
      "/api/grocery_lists/" + route.params.id
    )
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

const toggleListDetailVisibility = async (index: number) => {
  const listDetails = groceryList.value.listDetails;

  listDetails[index].isActive = !listDetails[index].isActive;

  groceryList.value = sortListDetails(
    await groceryListProvider.updateOneByIri(groceryList.value.id, {
      listDetails,
    })
  );
};
</script>

<style lang="scss" scoped></style>
