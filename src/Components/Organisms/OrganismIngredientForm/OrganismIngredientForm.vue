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
      :styles="`w-4/5 ${type === 'groceryList' ? 'h-4/5' : 'h-3/5'}`"
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
        placeholder="Ingrédient"
        :validationRules="[notNullRule]"
        :defaultContent="form.ingredient.name"
        @update="
          (content) => {
            query(content);
            form.ingredient.name = content;
          }
        "
      >
        <Transition name="searchResults">
          <div
            class="bg-primary bg-opacity-90 text-white border-secondary border-b-2 border-l-2 border-r-2 rounded-b-xl py-2 px-4 w-5/6 absolute z-10 left-6 top-12"
            v-if="searchIngredients.length"
          >
            <div
              class="text-xl mt-2 cursor-pointer"
              v-for="ingredient in searchIngredients"
              :key="ingredient.id"
              @click="setIngredient(ingredient)"
            >
              {{ ingredient.name }}
            </div>
          </div>
        </Transition>
      </MoleculeInputLabel>
      <MoleculeInputLabel
        type="text"
        id="quantity"
        placeholder="Quantité"
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
        <AtomText class="text-xl mb-2">Comestible ?</AtomText>
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
      <MoleculeIconButton
        class="bg-red-500 py-2 px-4 rounded-full my-4"
        icon="fa-solid fa-trash-can"
        content="Supprimer"
        @click="removeIngredient"
      />
    </MoleculeDialog>
  </form>
  <MoleculeIngredientList
    v-if="type === 'recipe' && ingredientsList.length"
    :recipeIngredients="ingredientsList"
    :editable="true"
    @editIngredient="
      (index, recipeIngredient) => {
        key = index;
        queryText = recipeIngredient.ingredient.name;
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
import { inject, ref, watch } from "vue";
import type { IngredientOption } from "../../Atoms/AtomSelect/OptionInterface";
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
import { DataProviderKey } from "@/Core/Config/DataProviderInterface";
import type { Ingredient } from "@/Domain/Ingredient/IngredientInterface";

const { ingredientProvider } = inject(DataProviderKey)!;

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
        isEdible: false,
      },
      quantity: 0,
      unit: "u",
      isActive: true,
    }
  );
};

const showDialog = ref(false);
const ingredientsList = ref<IngredientForm[]>(props.ingredients || []);
const key = ref<number | undefined>();
const queryText = ref("");
const searchIngredients = ref<Ingredient[] | []>([]);

const form = ref<IngredientForm>(formInitialState());

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

watch(showDialog, (value) => {
  if (false === value) {
    searchIngredients.value = [];
  }
});

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

const query = (value: string) => {
  // Hack to wait for showDialog to change because the update event fires before the cancel event
  setTimeout(async () => {
    if (false === showDialog.value) {
      return;
    }

    if (!value || queryText.value === value) {
      if (!value) {
        searchIngredients.value = [];
      }
      return;
    }

    queryText.value = value;
    searchIngredients.value = await ingredientProvider.findByQuery(value);
  }, 400);
};

const setIngredient = (ingredient: Ingredient) => {
  form.value.ingredient.name = ingredient.name;
  form.value.ingredient.isEdible = ingredient.isEdible;

  emitter.emit("setInputContent", {
    id: "name",
    inputValue: ingredient.name,
  });

  searchIngredients.value = [];
};

const removeIngredient = () => {
  if (undefined === key.value) {
    return;
  }

  ingredientsList.value = ingredientsList.value.filter(
    (ingredient) => ingredient !== ingredientsList.value[key.value!]
  );
  showDialog.value = false;

  emits("addIngredient", ingredientsList.value);
};
</script>

<style lang="scss" scoped>
.searchResults-enter-active,
.searchResults-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.searchResults-enter-from,
.searchResults-leave-to {
  opacity: 0;
}
</style>
