<template>
  <MoleculeIconButton
    buttonClass="block mt-4 mx-auto px-8 py-4 rounded-full border-2 border-secondary text-primary text-xl focus:outline-none"
    iconClass="text-secondary text-2xl"
    icon="fa-solid fa-cart-shopping"
    content="Ajouter à la liste"
    @click="showDialog = true"
  />
  <MoleculeDialog
    v-if="showDialog"
    styles="h-3/6"
    :buttons="{ ok: false, cancel: true }"
    @cancel="
      showDialog = false;
      showListInput = false;
    "
  >
    <MoleculeSelectLabel
      class="w-full"
      id="lists"
      placeholder="Mes listes"
      name="lists"
      :options="options"
      v-if="options.length"
      @change="(content) => addIngredientsToList(content)"
    />
    <AtomButton
      class="block bg-white my-6 mx-auto px-8 py-4 rounded-full text-primary text-xl focus:outline-none"
      v-if="!showListInput"
      @click="showListInput = true"
    >
      Créer une liste
    </AtomButton>
    <MoleculeInputLabel
      class="mt-10"
      type="text"
      id="name"
      placeholder="Nom de la liste"
      :validationRules="[notNullRule]"
      v-if="showListInput"
      @update="(content) => (listName = content)"
    />
    <AtomButton
      class="mb-4 bg-white mx-auto px-4 py-2 rounded-full text-primary text-lg focus:outline-none"
      v-if="showListInput"
      @click="addIngredientsToList"
    >
      Créer
    </AtomButton>
  </MoleculeDialog>
</template>

<script lang="ts" setup>
import type { RecipeIngredient } from "@/Domain/RecipeIngredient/RecipeIngredientInterface";
import MoleculeIconButton from "../Molecules/MoleculeIconButton.vue";
import { inject, ref } from "vue";
import MoleculeDialog from "../Molecules/MoleculeDialog.vue";
import MoleculeSelectLabel from "../Molecules/MoleculeSelectLabel.vue";
import type { ListOption } from "../Atoms/AtomSelect/OptionInterface";
import { DataProviderKey } from "@/Core/Config/DataProviderInterface";
import AtomButton from "../Atoms/AtomButton.vue";
import MoleculeInputLabel from "../Molecules/MoleculeInputLabel.vue";
import { NotNullRule } from "@/Core/Services/Validation/Rules/NotNullRule";
import type { GroceryList } from "@/Domain/GroceryList/GroceryListInterface";
import { useEventBus } from "@/Core/Services/EventBus";

const { groceryListProvider } = inject(DataProviderKey)!;

const notNullRule = new NotNullRule();
const { emitter } = useEventBus();

const props = defineProps<{
  recipeIngredients: RecipeIngredient[];
}>();

const showDialog = ref<boolean>(false);
const showListInput = ref<boolean>(false);
const listName = ref<string>("");

const fetchOptions = async () => {
  return (await groceryListProvider.getAllForUser()).map((groceryList) => {
    return { text: groceryList.name, value: groceryList.id };
  });
};

const options = ref<ListOption[]>(await fetchOptions());

const createList = async () => {
  const form = {
    isActive: true,
    name: listName.value,
    listDetails: [],
  };

  emitter.emit("validate", form);

  if (!listName.value) {
    return null;
  }

  const newList = await groceryListProvider.create(form);

  options.value = await fetchOptions();

  return newList;
};

const addIngredientsToList = async (groceryListIri?: string) => {
  let groceryList: GroceryList | null;

  if (undefined !== groceryListIri) {
    groceryList = await groceryListProvider.findOneByIri(groceryListIri);
  } else {
    groceryList = await createList();
  }

  if (null === groceryList) {
    return;
  }

  let recipeListDetails = props.recipeIngredients.map((recipeIngredient) => {
    return {
      id: "",
      unit: recipeIngredient.unit,
      quantity: recipeIngredient.quantity,
      isActive: true,
      groceryList,
      ingredient: recipeIngredient.ingredient,
      type: "ListDetail",
    };
  });

  for (const [index, listDetail] of groceryList.listDetails.entries()) {
    for (const recipeListDetail of recipeListDetails) {
      const listIngredient = listDetail.ingredient;
      const recipeIngredient = recipeListDetail.ingredient;

      if (
        listIngredient.name === recipeIngredient.name &&
        listDetail.unit === recipeListDetail.unit
      ) {
        groceryList.listDetails[index].quantity += recipeListDetail.quantity;
        recipeListDetails = recipeListDetails.filter(
          (item) => item !== recipeListDetail
        );
      }
    }
  }

  await groceryListProvider.updateOneByIri(groceryList.id, {
    listDetails: [...groceryList.listDetails, ...recipeListDetails],
  });

  showDialog.value = showListInput.value = false;
};
</script>
