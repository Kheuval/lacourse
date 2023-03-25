<template>
  <form @submit.prevent class="flex flex-col items-center">
    <MoleculeInputLabel
      id="name"
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
    <MoleculeImageUploader
      @imageUploaded="(uploadedImage) => (image = uploadedImage)"
    />
    <MoleculeInputLabel
      id="servings"
      type="text"
      class="mt-8"
      placeholder="Le nombre de parts *"
      :validationRules="[notNullRule, numberRule]"
      :typeNumber="true"
      @update="(content) => (form.servings = parseInt(content))"
    >
      <AtomIcon
        icon="fa-solid fa-pen"
        class="absolute text-xl text-secondary ml-4 top-4 right-5 peer-focus:hidden"
      />
    </MoleculeInputLabel>
    <AtomText class="-mt-2 mb-6">Les temps sont donnés en minutes</AtomText>
    <MoleculeInputLabel
      id="preparationTime"
      type="text"
      placeholder="Le temps de préparation *"
      :validationRules="[numberRule]"
      :typeNumber="true"
      @update="(content) => (form.preparationTime = parseInt(content))"
    >
      <AtomIcon
        icon="fa-solid fa-pen"
        class="absolute text-xl text-secondary ml-4 top-4 right-5 peer-focus:hidden"
      />
    </MoleculeInputLabel>
    <MoleculeInputLabel
      id="cookingTime"
      type="text"
      placeholder="Le temps de cuisson *"
      :validationRules="[numberRule]"
      :typeNumber="true"
      @update="(content) => (form.cookingTime = parseInt(content))"
    >
      <AtomIcon
        icon="fa-solid fa-pen"
        class="absolute text-xl text-secondary ml-4 top-4 right-5 peer-focus:hidden"
      />
    </MoleculeInputLabel>
    <MoleculeInputLabel
      id="restTime"
      type="text"
      placeholder="Le temps de repos *"
      :validationRules="[numberRule]"
      :typeNumber="true"
      @update="(content) => (form.restTime = parseInt(content))"
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
    <MoleculeIconButton
      buttonClass="flex items-center rounded-full px-6 py-3 bg-secondary text-white my-6"
      iconClass="text-xl text-white ml-4"
      content="Enregistrer"
      icon="fa-solid fa-floppy-disk"
      @click="createRecipe"
    />
  </form>
</template>

<script lang="ts" setup>
import AtomIcon from "@/Components/Atoms/AtomIcon.vue";
import AtomText from "@/Components/Atoms/AtomText.vue";
import MoleculeIconButton from "@/Components/Molecules/MoleculeIconButton.vue";
import MoleculeImageUploader from "@/Components/Molecules/MoleculeImageUploader.vue";
import MoleculeInputLabel from "@/Components/Molecules/MoleculeInputLabel.vue";
import { UnprocessableEntityError } from "@/Core/Services/Error/Errors/UnprocessableEntityError";
import { IngredientsMissingError } from "@/Core/Services/Error/Errors/IngredientsMissingError";
import { StepsMissingError } from "@/Core/Services/Error/Errors/StepsMissingError";
import { useEventBus } from "@/Core/Services/EventBus";
import { LengthRule } from "@/Core/Services/Validation/Rules/LengthRule";
import { NotNullRule } from "@/Core/Services/Validation/Rules/NotNullRule";
import { NumberRule } from "@/Core/Services/Validation/Rules/NumberRule";
import { ref, type Ref } from "vue";
import OrganismIngredientForm from "../OrganismIngredientForm/OrganismIngredientForm.vue";
import OrganismStepForm from "../OrganismStepForm/OrganismStepForm.vue";
import type { RecipeForm } from "./RecipeFormInterface";
import { databaseMediaObjectRepository } from "@/Domain/MediaObject/Repository/DatabaseMediaObjectRepository";
import { databaseRecipeRepository } from "@/Domain/Recipe/Repository/DatabaseRecipeRepository";
import { useRouter } from "vue-router";

const notNullRule = new NotNullRule();
const lengthRule = new LengthRule({ maxLength: 50 });
const numberRule = new NumberRule();

const { emitter } = useEventBus();
const router = useRouter();

const form: Ref<RecipeForm> = ref({
  name: "",
  servings: 0,
  totalTime: 0,
  preparationTime: 0,
  restTime: 0,
  cookingTime: 0,
  recipeIngredients: [],
  steps: [],
});

const image: Ref<File | undefined> = ref();

const createRecipe = async () => {
  emitter.emit("validate", form.value);

  if (
    !form.value.name ||
    !form.value.servings ||
    undefined === form.value.preparationTime ||
    undefined === form.value.restTime ||
    undefined === form.value.cookingTime
  ) {
    new UnprocessableEntityError();
    return;
  }

  if (!form.value.recipeIngredients.length) {
    new IngredientsMissingError();
    return;
  }

  if (!form.value.steps.length) {
    new StepsMissingError();
    return;
  }

  form.value.totalTime =
    form.value.preparationTime + form.value.restTime + form.value.cookingTime;

  if (image.value) {
    const formData = new FormData();
    formData.append("file", image.value);
    const uploadedImage = await databaseMediaObjectRepository.create(formData);
    form.value.image = uploadedImage.id;
  }

  await databaseRecipeRepository.create(form.value);

  router.push("/user/recipes");
};
</script>

<style lang="scss" scoped></style>
