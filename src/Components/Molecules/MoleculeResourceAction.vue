<template>
  <div class="flex items-center justify-evenly">
    <AtomLink to="toto">
      <AtomIcon icon="fa-solid fa-pen" class="text-2xl text-secondary" />
    </AtomLink>
    <AtomButton class="text-3xl text-secondary" @click="show = true">
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
        Voulez-vous vraiment supprimer cette recette ?
      </AtomText>
    </MoleculeDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import AtomButton from "../Atoms/AtomButton.vue";
import AtomIcon from "../Atoms/AtomIcon.vue";
import AtomLink from "../Atoms/AtomLink.vue";
import MoleculeDialog from "./MoleculeDialog.vue";
import AtomTitle from "../Atoms/AtomTitle.vue";
import AtomText from "../Atoms/AtomText.vue";
// import { databaseRecipeRepository } from "@/Domain/Recipe/Repository/DatabaseRecipeRepository";
import type { Recipe } from "@/Domain/Recipe/RecipeInterface";
import type { GroceryList } from "@/Domain/GroceryList/GroceryListInterface";

const props = defineProps<{
  resource: Recipe | GroceryList;
}>();

const show = ref(false);

const isRecipe = (resource: Recipe | GroceryList): resource is Recipe =>
  resource.type === "recipe";

const deleteResource = () => {
  if (isRecipe(props.resource)) {
    console.log("isRecipe");

    // databaseRecipeRepository.deleteOneByIri("/recipes/" + props.resource.id);
  } else {
    console.log("isGroceryList");
  }
  show.value = false;
};
</script>

<style lang="scss" scoped></style>
