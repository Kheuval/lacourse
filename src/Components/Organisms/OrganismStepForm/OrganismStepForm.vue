<template>
  <form @submit.prevent novalidate class="mt-6">
    <MoleculeIconButton
      buttonClass="flex items-center rounded-full px-6 py-3 bg-primary text-white mb-2"
      iconClass="text-xl text-white ml-4"
      icon="fa-solid fa-pen"
      content="Ajouter une étape"
      @click="showDialog = true"
    />
    <MoleculeDialog
      v-if="showDialog"
      styles="w-4/5 h-4/5"
      :buttons="{ ok: true, cancel: true }"
      @ok="addOrEditStep"
      @cancel="
        form = formInitialState();
        showDialog = false;
      "
    >
      <MoleculeTextAreaLabel
        id="step:description"
        placeholder="Renseignez une étape pour votre recette"
        :defaultContent="form.stepDescription"
        @update="(content) => (form.stepDescription = content)"
      />
      <MoleculeIconButton
        class="bg-red-500 py-2 px-4 rounded-full mb-4"
        icon="fa-solid fa-trash-can"
        content="Supprimer"
        @click="removeStep"
      />
    </MoleculeDialog>
  </form>
  <MoleculeStepList
    v-if="steps.length"
    :steps="steps"
    :editable="true"
    @editStep="
      (index, step) => {
        key = index;
        form = formInitialState(step);
        showDialog = true;
      }
    "
  />
</template>

<script lang="ts" setup>
import MoleculeDialog from "@/Components/Molecules/MoleculeDialog.vue";
import MoleculeIconButton from "@/Components/Molecules/MoleculeIconButton.vue";
import MoleculeStepList from "@/Components/Molecules/MoleculeStepList.vue";
import MoleculeTextAreaLabel from "@/Components/Molecules/MoleculeTextAreaLabel.vue";
import type { Step } from "@/Domain/Step/StepInterface";
import { ref } from "vue";
import type { StepForm } from "./StepFormInterface";

const emits = defineEmits(["addStep"]);

const props = defineProps<{
  steps?: Step[];
}>();

const formInitialState = (stepForm?: StepForm) => {
  return (
    stepForm || {
      stepDescription: "",
    }
  );
};

const showDialog = ref(false);
const steps = ref<StepForm[]>(props.steps || []);
const key = ref<number | undefined>();

const form = ref<StepForm>(formInitialState());

const addOrEditStep = () => {
  if (!form.value.stepDescription) {
    return;
  }

  if (undefined !== key.value) {
    steps.value[key.value] = form.value;
    key.value = undefined;
  } else {
    steps.value.push(form.value);
  }

  emits("addStep", steps.value);

  form.value = formInitialState();
  showDialog.value = false;
};

const removeStep = () => {
  if (undefined === key.value) {
    return;
  }

  steps.value = steps.value.filter((step) => step !== steps.value[key.value!]);
  showDialog.value = false;

  emits("addStep", steps.value);
};
</script>
