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
      :styles="`w-3/4 ${type === 'groceryList' ? 'h-4/5' : 'h-3/5'}`"
      :buttons="{ ok: true, cancel: true }"
      :prevent="() => validateForm(form)"
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
      <div class="text-center" v-if="type === 'groceryList'">
        <AtomText class="text-xl mb-2">Commestible ?</AtomText>
        <div class="flex gap-4 justify-center">
          <AtomRadio
            class="flex gap-2 text-2xl"
            :value="true"
            id="edible"
            name="isEdible"
            :checked="form.ingredient.isEdible"
            label="Oui"
            @update="(value) => (form.ingredient.isEdible = value)"
          />
          <AtomRadio
            class="flex gap-2 text-2xl"
            :value="false"
            id="notEdible"
            name="isEdible"
            :checked="!form.ingredient.isEdible"
            label="Non"
            @update="(value) => (form.ingredient.isEdible = value)"
          />
        </div>
      </div>
    </MoleculeDialog>
  </form>
  <MoleculeIngredientList
    v-if="type === 'recipe' && ingredientsList.length"
    :recipeIngredients="ingredientsList"
    :editable="true"
    @editIngredient="
      (index, recipeIngredient) => {
        key = index;
        form = formInitialState(recipeIngredient);
        showDialog = true;
      }
    "
  />
  <MoleculeListIngredientList
    v-if="type === 'groceryList' && ingredientsList.length"
    :listDetails="ingredientsList"
    :editable="true"
    @editIngredient="
      (index, listDetail) => {
        key = index;
        form = formInitialState(listDetail);
        showDialog = true;
      }
    "
  />
</template>

<script lang="ts" setup>
import { useEventBus } from "@/Core/Services/EventBus";
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
import type { ListDetail } from "@/Domain/ListDetail/ListDetailInterface";
import MoleculeListIngredientList from "@/Components/Molecules/MoleculeListIngredientList.vue";
import AtomRadio from "@/Components/Atoms/AtomRadio.vue";
import AtomText from "@/Components/Atoms/AtomText.vue";

const notNullRule = new NotNullRule();
const numberRule = new NumberRule();

const { emitter } = useEventBus();

const emits = defineEmits(["addIngredient"]);

const props = defineProps<{
  type: "recipe" | "groceryList";
  ingredients?: RecipeIngredient[] | ListDetail[];
}>();

const formInitialState = (ingredientForm?: IngredientForm) => {
  return (
    ingredientForm || {
      ingredient: {
        name: "",
        isEdible: true,
      },
      quantity: 0,
      unit: "u",
      isActive: true,
    }
  );
};

const showDialog = ref(false);
const ingredientsList: Ref<IngredientForm[]> = ref(props.ingredients || []);
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

const validateForm = (form: IngredientForm): boolean => {
  emitter.emit("validate", form);
  return !!form.ingredient.name && !!form.quantity;
};

const addOrEditIngredient = () => {
  if (!validateForm(form.value)) {
    return;
  }

  if (props.type === "recipe") {
    delete form.value.isActive;
  }

  if (undefined !== key.value) {
    ingredientsList.value[key.value] = form.value;
    key.value = undefined;
  } else {
    ingredientsList.value.push(form.value);
  }

  emits("addIngredient", ingredientsList.value);

  form.value = formInitialState();
  showDialog.value = false;
};
</script>

<style lang="scss" scoped></style>
