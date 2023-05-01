<template>
  <ul class="mt-6 w-full">
    <li
      :class="`bg-primary mb-8 text-white text-2xl py-4 px-6 rounded-full cursor-pointer ${
        listDetail.isActive || 'bg-opacity-50'
      }`"
      v-for="(listDetail, index) in localListDetails"
      :key="index"
      @click="
        editable
          ? $emit('editIngredient', index, listDetail)
          : toggleListDetailVisibility(index)
      "
    >
      <div class="flex items-center">
        <AtomText
          :class="`flex-1 ${
            listDetail.ingredient.name.length > 15 && 'text-lg'
          }`"
        >
          {{ listDetail.ingredient.name }}
        </AtomText>
        <AtomText>
          {{ useQuantity(listDetail.quantity, listDetail.unit) }}
        </AtomText>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import AtomText from "@/Components/Atoms/AtomText.vue";
import { useQuantity } from "@/Core/Composables/useQuantity";
import type { DataProvider } from "@/Core/Config/DataProvider";
import type { ListDetail } from "@/Domain/ListDetail/ListDetailInterface";
import { inject, ref, type Ref } from "vue";
import type { IngredientForm } from "../Organisms/OrganismIngredientForm/IngredientFormInterface";

const { groceryListProvider } = inject("dataProvider") as DataProvider;

const emits = defineEmits(["listUpdated", "editIngredient"]);

const props = withDefaults(
  defineProps<{
    listDetails: ListDetail[] | IngredientForm[];
    groceryListId?: string;
    editable?: boolean;
  }>(),
  {
    groceryListId: "",
    editable: false,
  }
);

const sortListDetails = (listDetails: ListDetail[] | IngredientForm[]) => {
  listDetails.sort((a, b) =>
    a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1
  );
  return listDetails;
};

const localListDetails: Ref<ListDetail[] | IngredientForm[]> = ref(
  sortListDetails(props.listDetails)
);

const toggleListDetailVisibility = async (index: number) => {
  localListDetails.value[index].isActive =
    !localListDetails.value[index].isActive;

  const groceryList = await groceryListProvider.updateOneByIri(
    props.groceryListId!,
    {
      listDetails: localListDetails.value,
    }
  );

  localListDetails.value = sortListDetails(groceryList.listDetails);

  emits("listUpdated", groceryList);
};
</script>

<style lang="scss" scoped></style>
