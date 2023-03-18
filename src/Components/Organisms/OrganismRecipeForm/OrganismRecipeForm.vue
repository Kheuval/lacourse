<template>
  <form @submit.prevent class="flex flex-col items-center">
    <MoleculeInputLabel
      id="recipe:name"
      type="text"
      placeholder="Donnez lui un titre... *"
      :validationRules="[notNullRule, lengthRule]"
      @update="(content) => (form.name = content)"
    >
      <AtomIcon
        icon="fa-solid fa-pen"
        class="absolute text-xl text-secondary ml-4 top-4 right-5 peer-focus:hidden"
      />
    </MoleculeInputLabel>
    <MoleculeImageUploader />
    <MoleculeInputLabel
      id="recipe:name"
      type="text"
      class="mt-8"
      placeholder="Le nombre de parts *"
      :validationRules="[notNullRule, numberRule]"
      :typeNumber="true"
      @update="(content) => (form.servings = content)"
    >
      <AtomIcon
        icon="fa-solid fa-pen"
        class="absolute text-xl text-secondary ml-4 top-4 right-5 peer-focus:hidden"
      />
    </MoleculeInputLabel>
    <AtomText class="-mt-2 mb-6">Les temps sont donnés en minutes</AtomText>
    <MoleculeInputLabel
      id="recipe:name"
      type="text"
      placeholder="Le temps de préparation *"
      :validationRules="[notNullRule, numberRule]"
      :typeNumber="true"
      @update="(content) => (form.preparationTime = content)"
    >
      <AtomIcon
        icon="fa-solid fa-pen"
        class="absolute text-xl text-secondary ml-4 top-4 right-5 peer-focus:hidden"
      />
    </MoleculeInputLabel>
    <MoleculeInputLabel
      id="recipe:name"
      type="text"
      placeholder="Le temps de cuisson *"
      :validationRules="[notNullRule, numberRule]"
      :typeNumber="true"
      @update="(content) => (form.cookingTime = content)"
    >
      <AtomIcon
        icon="fa-solid fa-pen"
        class="absolute text-xl text-secondary ml-4 top-4 right-5 peer-focus:hidden"
      />
    </MoleculeInputLabel>
    <MoleculeInputLabel
      id="recipe:name"
      type="text"
      placeholder="Le temps de repos *"
      :validationRules="[notNullRule, numberRule]"
      :typeNumber="true"
      @update="(content) => (form.restTime = content)"
    >
      <AtomIcon
        icon="fa-solid fa-pen"
        class="absolute text-xl text-secondary ml-4 top-4 right-5 peer-focus:hidden"
      />
    </MoleculeInputLabel>
    <OrganismIngredientForm
      @addIngredient="(content) => (form.recipeIngredients = content)"
    />
    <OrganismStepForm @addStep="(content) => (form.steps = content)" />
  </form>
</template>

<script lang="ts" setup>
import AtomIcon from "@/Components/Atoms/AtomIcon.vue";
import AtomText from "@/Components/Atoms/AtomText.vue";
import MoleculeImageUploader from "@/Components/Molecules/MoleculeImageUploader.vue";
import MoleculeInputLabel from "@/Components/Molecules/MoleculeInputLabel.vue";
import { LengthRule } from "@/Core/Services/Validation/Rules/LengthRule";
import { NotNullRule } from "@/Core/Services/Validation/Rules/NotNullRule";
import { NumberRule } from "@/Core/Services/Validation/Rules/NumberRule";
import { ref, type Ref } from "vue";
import OrganismIngredientForm from "../OrganismIngredientForm/OrganismIngredientForm.vue";
import OrganismStepForm from "../OrganismStepForm/OrganismStepForm.vue";
import type { RecipeForm } from "./RecipeFormInterface";

const notNullRule = new NotNullRule();
const lengthRule = new LengthRule({ maxLength: 50 });
const numberRule = new NumberRule();

const form: Ref<RecipeForm> = ref({
  name: "",
  image: "",
  servings: 0,
  totalTime: 0,
  preparationTime: 0,
  restTime: 0,
  cookingTime: 0,
  recipeIngredients: [],
  steps: [],
});
</script>

<style lang="scss" scoped></style>
