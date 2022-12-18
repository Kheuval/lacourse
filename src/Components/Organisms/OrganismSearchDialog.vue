<template>
  <AtomButton
    class="flex items-center rounded-full px-6 py-3 bg-primary text-white mb-2"
    @click="show = true"
  >
    {{ content }}
    <AtomIcon
      class="text-xl text-white ml-4"
      icon="fa-solid fa-magnifying-glass"
    />
  </AtomButton>
  <MoleculeDialog
    :buttons="{ ok: false, cancel: true }"
    styles="w-4/5 h-4/5"
    v-if="show"
    @cancel="show = false"
  >
    <MoleculeInputLabel
      id="recipeSearch"
      type="text"
      placeholder="Rechercher une recette"
      @update="query"
    >
      <AtomIcon
        class="absolute text-xl text-secondary ml-4 top-4 right-5 peer-focus:hidden"
        icon="fa-solid fa-magnifying-glass"
      />
    </MoleculeInputLabel>
  </MoleculeDialog>
</template>

<script lang="ts" setup>
import AtomButton from "@/Components/Atoms/AtomButton.vue";
import AtomIcon from "@/Components/Atoms/AtomIcon.vue";
import { ref } from "vue";
import MoleculeDialog from "../Molecules/MoleculeDialog.vue";
import MoleculeInputLabel from "../Molecules/MoleculeInputLabel.vue";

defineProps<{
  content: string;
}>();

const show = ref(false);

const query = (value) => {
  
};
</script>
