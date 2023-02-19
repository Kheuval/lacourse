<template>
  <MoleculeIconButton
    buttonClass="flex items-center rounded-full px-6 py-3 bg-primary text-white mb-2"
    iconClass="text-xl text-white ml-4"
    icon="fa-solid fa-magnifying-glass"
    :content="content"
    @click="show = true"
  />
  <MoleculeDialog
    :buttons="{ ok: false, cancel: true }"
    styles="w-4/5"
    v-if="show"
    @cancel="
      show = false;
      recipes = [];
    "
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
    <MoleculeResourceList v-if="recipes.length" :resourceList="recipes" />
    <AtomSpinner v-if="isFetching" />
  </MoleculeDialog>
</template>

<script lang="ts" setup>
import AtomIcon from "@/Components/Atoms/AtomIcon.vue";
import { useApiStore } from "@/Core/Services/Api/ApiStore";
import type { Recipe } from "@/Domain/Recipe/RecipeInterface";
import { databaseRecipeRepository } from "@/Domain/Recipe/Repository/DatabaseRecipeRepository";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import AtomSpinner from "../Atoms/AtomSpinner.vue";
import MoleculeDialog from "../Molecules/MoleculeDialog.vue";
import MoleculeIconButton from "../Molecules/MoleculeIconButton.vue";
import MoleculeInputLabel from "../Molecules/MoleculeInputLabel.vue";
import MoleculeResourceList from "../Molecules/MoleculeResourceList.vue";

const { isFetching } = storeToRefs(useApiStore());

defineProps<{
  content: string;
}>();

const show = ref(false);
const queryText = ref("");
const recipes = ref<Recipe[] | []>([]);

const query = async (value: string) => {
  if (!value || (queryText.value === value && recipes.value.length > 0)) {
    if (!value) {
      recipes.value = [];
    }
    return;
  }

  queryText.value = value;
  recipes.value = await databaseRecipeRepository.findByQuery(value);
};
</script>
