<template>
  <ul class="-mt-4">
    <li
      class="mb-4 bg-white text-primary py-2 px-4 rounded-lg text-center"
      v-for="resource in resourceList"
      :key="resource.id"
    >
      <AtomLink :to="getRoute(resource)">
        {{ resource.name }}
      </AtomLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { GroceryList } from "@/Domain/GroceryList/GroceryListInterface";
import type { Recipe } from "@/Domain/Recipe/RecipeInterface";
import AtomLink from "../Atoms/AtomLink.vue";

defineProps<{
  resourceList: Recipe[] | GroceryList[];
}>();

const isRecipe = (resource: Recipe | GroceryList): resource is Recipe =>
  resource.type === "Recipe";

const isGroceryList = (
  resource: Recipe | GroceryList
): resource is GroceryList => resource.type === "GroceryList";

const getRoute = (resource: Recipe | GroceryList) => {
  if (isRecipe(resource)) {
    return "/recipe/show/" + resource.id.match(/\d+/)![0];
  } else if (isGroceryList(resource)) {
    return "/grocery-list/show/" + resource.id.match(/\d+/)![0];
  } else {
    return "";
  }
};
</script>

<style lang="scss" scoped></style>
