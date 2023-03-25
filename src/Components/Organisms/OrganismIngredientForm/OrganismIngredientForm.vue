<template>
  <form @submit.prevent novalidate>
    <MoleculeIconButton
      buttonClass="flex items-center rounded-full px-6 py-3 bg-primary text-white mb-2"
      iconClass="text-xl text-white ml-4"
      icon="fa-solid fa-pen"
      content="Ajouter un ingrédient"
      @click="showDialog = true"
    />
    <MoleculeDialog
      v-if="showDialog"
      styles="w-3/4 h-3/5"
      :buttons="{ ok: true, cancel: true }"
      @ok="addOrEditIngredient"
      @cancel="
        form = formInitialState();
        showDialog = false;
      "
    >
      <MoleculeInputLabel
        type="text"
        id="name"
        placeholder="Entrez le nom d'un ingrédient"
        :validationRules="[notNullRule]"
        :defaultContent="form.ingredient.name"
        @update="(content) => (form.ingredient.name = content)"
      />
      <MoleculeInputLabel
        type="text"
        id="quantity"
        placeholder="Sa quantité"
        :typeNumber="true"
        :validationRules="[notNullRule, numberRule]"
        :defaultContent="form.quantity"
        @update="(content) => (form.quantity = parseInt(content))"
      />
      <MoleculeSelectLabel
        id="unit"
        placeholder="Une unité"
        name="unit"
        :options="options"
        :defaultValue="form.unit"
        @change="(content) => (form.unit = content)"
      />
    </MoleculeDialog>
  </form>
  <MoleculeIngredientList
    v-if="recipeIngredients.length"
    :recipeIngredients="recipeIngredients"
    :editable="true"
    @editIngredient="
      (index, recipeIngredient) => {
        key = index;
        form = formInitialState(recipeIngredient);
        showDialog = true;
      }
    "
  />
</template>

<script lang="ts" setup>
// import { useEventBus } from "@/Core/Services/EventBus";
import { NotNullRule } from "@/Core/Services/Validation/Rules/NotNullRule";
import { NumberRule } from "@/Core/Services/Validation/Rules/NumberRule";
import type { RecipeIngredient } from "@/Domain/RecipeIngredient/RecipeIngredientInterface";
import { ref, type Ref } from "vue";
import type { IngredientOption } from "../../Atoms/AtomSelect/IngredientOptionInterface";
import MoleculeDialog from "../../Molecules/MoleculeDialog.vue";
import MoleculeIconButton from "../../Molecules/MoleculeIconButton.vue";
import MoleculeIngredientList from "../../Molecules/MoleculeIngredientList.vue";
import MoleculeInputLabel from "../../Molecules/MoleculeInputLabel.vue";
import MoleculeSelectLabel from "../../Molecules/MoleculeSelectLabel.vue";
import type { IngredientForm } from "./IngredientFormInterface";

const notNullRule = new NotNullRule();
const numberRule = new NumberRule();

// const { emitter } = useEventBus();

const emits = defineEmits(["addIngredient"]);

const props = defineProps<{
  ingredients?: RecipeIngredient[];
}>();

const formInitialState = (ingredientForm?: IngredientForm) => {
  return (
    ingredientForm || {
      ingredient: {
        name: "",
      },
      quantity: 0,
      unit: "u",
    }
  );
};

const showDialog = ref(false);
const recipeIngredients: Ref<IngredientForm[]> = ref(props.ingredients || []);
const key: Ref<number | undefined> = ref();

const form: Ref<IngredientForm> = ref(formInitialState());

const options: IngredientOption[] = [
  {
    text: "pièce",
    value: "u",
    defaultSelected: true,
  },
  {
    text: "pincée",
    value: "pincée",
    defaultSelected: false,
  },
  {
    text: "grammes (g)",
    value: "g",
    defaultSelected: false,
  },
  {
    text: "kilogrammes (kg)",
    value: "kg",
    defaultSelected: false,
  },
  {
    text: "litres (l)",
    value: "l",
    defaultSelected: false,
  },
  {
    text: "millilitres (ml)",
    value: "ml",
    defaultSelected: false,
  },
  {
    text: "centilitres (cl)",
    value: "cl",
    defaultSelected: false,
  },
  {
    text: "c. à café (CaC)",
    value: "CaC",
    defaultSelected: false,
  },
  {
    text: "c. à soupe (CaS)",
    value: "CaS",
    defaultSelected: false,
  },
];

const addOrEditIngredient = () => {
  // emitter.emit("validate", form.value);
  if (!form.value.ingredient.name || !form.value.quantity) {
    return;
  }

  if (undefined !== key.value) {
    recipeIngredients.value[key.value] = form.value;
    key.value = undefined;
  } else {
    recipeIngredients.value.push(form.value);
  }

  emits("addIngredient", recipeIngredients.value);

  form.value = formInitialState();
  showDialog.value = false;
};
</script>

<style lang="scss" scoped></style>
