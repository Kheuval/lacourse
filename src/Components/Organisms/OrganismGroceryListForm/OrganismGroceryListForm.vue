<template>
  <form @submit.prevent novalidate class="flex flex-col items-center">
    <MoleculeInputLabel
      id="name"
      type="text"
      placeholder="Donnez lui un titre... *"
      :defaultContent="form.name"
      :validationRules="[notNullRule, lengthRule]"
      @update="(content) => (form.name = content)"
    >
      <AtomIcon
        icon="fa-solid fa-pen"
        class="absolute text-xl text-secondary ml-4 top-4 right-5 peer-focus:hidden"
      />
    </MoleculeInputLabel>
    <OrganismIngredientForm
      type="groceryList"
      :ingredients="form.listDetails"
      @addIngredient="(content) => (form.listDetails = content)"
    />
    <MoleculeIconButton
      buttonClass="flex items-center rounded-full px-6 py-3 bg-secondary text-white my-6"
      iconClass="text-xl text-white ml-4"
      content="Enregistrer"
      icon="fa-solid fa-floppy-disk"
      @click="createOrEditGroceryList"
    />
  </form>
</template>

<script lang="ts" setup>
import MoleculeInputLabel from "@/Components/Molecules/MoleculeInputLabel.vue";
import { useEventBus } from "@/Core/Services/EventBus";
import { LengthRule } from "@/Core/Services/Validation/Rules/LengthRule";
import { NotNullRule } from "@/Core/Services/Validation/Rules/NotNullRule";
import type { GroceryList } from "@/Domain/GroceryList/GroceryListInterface";
import { useRouter } from "vue-router";
import type { GroceryListForm } from "./GroceryListFormInterface";
import { inject, ref } from "vue";
import OrganismIngredientForm from "../OrganismIngredientForm/OrganismIngredientForm.vue";
import AtomIcon from "@/Components/Atoms/AtomIcon.vue";
import MoleculeIconButton from "@/Components/Molecules/MoleculeIconButton.vue";
import { UnprocessableEntityError } from "@/Core/Services/Error/Errors/UnprocessableEntityError";
import { IngredientsMissingError } from "@/Core/Services/Error/Errors/IngredientsMissingError";
import type { DataProvider } from "@/Core/Config/DataProvider";

const { groceryListProvider } = inject("dataProvider") as DataProvider;

const notNullRule = new NotNullRule();
const lengthRule = new LengthRule({ maxLength: 50 });

const { emitter } = useEventBus();
const router = useRouter();

const props = defineProps<{
  groceryList?: GroceryList;
}>();

const formInitialState = (groceryList?: GroceryList): GroceryListForm => {
  return {
    name: groceryList ? groceryList.name : "",
    isActive: groceryList ? groceryList.isActive : true,
    listDetails: groceryList ? groceryList.listDetails : [],
  };
};

const form = ref<GroceryListForm>(formInitialState(props.groceryList));

const createOrEditGroceryList = async () => {
  emitter.emit("validate", form.value);

  if (!form.value.name) {
    new UnprocessableEntityError();
    return;
  }

  if (!form.value.listDetails.length) {
    new IngredientsMissingError();
    return;
  }

  if (props.groceryList) {
    await groceryListProvider.updateOneByIri(props.groceryList.id, form.value);
  } else {
    await groceryListProvider.create(form.value);
  }

  router.push("/user/grocery-lists");
};
</script>

<style lang="scss" scoped></style>
