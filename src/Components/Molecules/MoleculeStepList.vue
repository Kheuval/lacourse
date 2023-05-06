<template>
  <div class="mb-10 w-full">
    <AtomTitle class="mt-6 text-2xl text-center" tag="h2">Étapes :</AtomTitle>
    <div
      class="mt-4"
      v-for="(step, index) in steps"
      :key="index"
      @click="editable && $emit('editStep', index, step)"
    >
      <AtomTitle class="text-secondary" tag="h3">
        Étape {{ index + 1 }} :
      </AtomTitle>
      <AtomText>
        {{ step.stepDescription }}
      </AtomText>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Step } from "@/Domain/Step/StepInterface";
import AtomText from "../Atoms/AtomText.vue";
import AtomTitle from "../Atoms/AtomTitle.vue";
import type { StepForm } from "../Organisms/OrganismStepForm/StepFormInterface";

defineEmits(["editStep"]);

withDefaults(
  defineProps<{
    steps: Step[] | StepForm[] | null;
    editable?: boolean;
  }>(),
  {
    editable: false,
  }
);
</script>
