<template>
  <div
    class="absolute right-3 z-30 bg-primary rounded-xl py-2 px-3 flex flex-col"
  >
    <AtomLink to="toto">
      <AtomIcon icon="fa-solid fa-pen" class="text-4xl text-white mb-2" />
    </AtomLink>
    <AtomButton class="text-4xl text-white" @click="show = true">
      <AtomIcon icon="fa-solid fa-circle-xmark" />
    </AtomButton>
    <MoleculeDialog
      :buttons="{ ok: true, cancel: true }"
      styles="min-h-[50%]"
      v-if="show"
      @ok="deleteResource"
      @cancel="show = false"
    >
      <template #header>
        <AtomIcon icon="fa-solid fa-circle-exclamation" class="text-[3rem]" />
        <AtomTitle tag="h1" class="text-3xl">Attention !</AtomTitle>
      </template>
      <AtomText class="text-center">
        {{ confirmText }}
      </AtomText>
    </MoleculeDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import AtomButton from "../Atoms/AtomButton.vue";
import AtomIcon from "../Atoms/AtomIcon.vue";
import AtomLink from "../Atoms/AtomLink.vue";
import MoleculeDialog from "./MoleculeDialog.vue";
import AtomTitle from "../Atoms/AtomTitle.vue";
import AtomText from "../Atoms/AtomText.vue";
import { databaseRecipeRepository } from "@/Domain/Recipe/Repository/DatabaseRecipeRepository";
import type { Recipe } from "@/Domain/Recipe/RecipeInterface";
import type { GroceryList } from "@/Domain/GroceryList/GroceryListInterface";

const props = defineProps<{
  resource: Recipe | GroceryList;
}>();

const show = ref(false);

const confirmText = computed(() => {
  let resource;

  if (isRecipe(props.resource)) {
    resource = "recette";
  } else if (isGroceryList(props.resource)) {
    resource = "liste";
  }

  return `Voulez-vous vraiment supprimer cette ${resource} ?`;
});

const isRecipe = (resource: Recipe | GroceryList): resource is Recipe =>
  resource.type === "Recipe";

const isGroceryList = (
  resource: Recipe | GroceryList
): resource is GroceryList => resource.type === "GroceryList";

const deleteResource = () => {
  if (isRecipe(props.resource)) {
    // À tester
    databaseRecipeRepository.deleteOneByIri("/recipes/" + props.resource.id);
  } else if (isGroceryList(props.resource)) {
    console.log("isGroceryList");
  }

  show.value = false;
};
</script>

<style lang="scss" scoped></style>
