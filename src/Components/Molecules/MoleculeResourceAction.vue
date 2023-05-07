<template>
  <div
    class="absolute right-3 z-30 bg-primary rounded-xl py-2 px-3 flex flex-col"
  >
    <AtomLink :to="editLink">
      <AtomIcon icon="fa-solid fa-pen" class="text-4xl text-white" />
    </AtomLink>
    <AtomButton class="text-4xl text-white mt-2" @click="show = true">
      <AtomIcon icon="fa-solid fa-circle-xmark" />
    </AtomButton>
    <AtomButton
      v-if="isGroceryList(resource)"
      class="text-4xl text-white mt-2"
      @click="toggleListVisibility"
    >
      <AtomIcon
        :icon="`fa-solid ${resource.isActive ? 'fa-eye' : 'fa-eye-slash'}`"
      />
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
import { inject, ref, computed } from "vue";
import AtomButton from "../Atoms/AtomButton.vue";
import AtomIcon from "../Atoms/AtomIcon.vue";
import AtomLink from "../Atoms/AtomLink.vue";
import MoleculeDialog from "./MoleculeDialog.vue";
import AtomTitle from "../Atoms/AtomTitle.vue";
import AtomText from "../Atoms/AtomText.vue";
import type { Recipe } from "@/Domain/Recipe/RecipeInterface";
import type { GroceryList } from "@/Domain/GroceryList/GroceryListInterface";
import { DataProviderKey } from "@/Core/Config/DataProviderInterface";
import { useRouter } from "vue-router";

const { groceryListProvider, recipeProvider } = inject(DataProviderKey)!;

const router = useRouter();

const emits = defineEmits(["toggleListVisibility"]);

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

const deleteResource = async () => {
  if (isRecipe(props.resource)) {
    await recipeProvider.deleteOneByIri(props.resource.id);
    router.push("/user/recipes");
  } else if (isGroceryList(props.resource)) {
    await groceryListProvider.deleteOneByIri(props.resource.id);
    router.push("/user/grocery-lists");
  }

  show.value = false;
};

let editLink = "";

if (isRecipe(props.resource)) {
  editLink = `/recipes/edit/${props.resource.id.match(/\d+/)![0]}`;
} else if (isGroceryList(props.resource)) {
  editLink = `/grocery-lists/edit/${props.resource.id.match(/\d+/)![0]}`;
}

const toggleListVisibility = async () => {
  const groceryList = await groceryListProvider.updateOneByIri(
    props.resource.id,
    {
      isActive: !(props.resource as GroceryList).isActive,
    }
  );

  emits("toggleListVisibility", groceryList);
};
</script>
