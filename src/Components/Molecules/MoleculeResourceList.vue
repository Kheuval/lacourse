<template>
  <ul class="-mt-4">
    <AtomLink
      v-for="(resource, index) in resourceList"
      :key="resource.id"
      :to="getRoute(resource)"
    >
      <li :class="liClass">
        <AtomImage
          :src="imagesSrc[index] || ''"
          :alt="resource.name"
          class="rounded-3xl w-full aspect-[3/2] object-cover mt-4"
          v-if="withImage"
        />
        <div
          class="h-full w-full absolute top-0 rounded-3xl bg-black bg-opacity-50 flex items-center justify-center"
          v-if="withImage"
        >
          <span class="text-white text-3xl text-center">
            {{ resource.name }}
          </span>
        </div>
        <div
          :class="linkClass ? linkClass + getLinkClass(resource) : ''"
          v-else
        >
          {{ resource.name }}
        </div>
      </li>
    </AtomLink>
  </ul>
</template>

<script lang="ts" setup>
import type { DataProvider } from "@/Core/Config/DataProvider";
import type { GroceryList } from "@/Domain/GroceryList/GroceryListInterface";
import type { Recipe } from "@/Domain/Recipe/RecipeInterface";
import { inject, ref } from "vue";
import AtomImage from "../Atoms/AtomImage.vue";
import AtomLink from "../Atoms/AtomLink.vue";

const { mediaObjectProvider } = inject("dataProvider") as DataProvider;

const props = withDefaults(
  defineProps<{
    resourceList: Recipe[] | GroceryList[];
    withImage?: boolean;
    liClass?: string;
    linkClass?: string;
  }>(),
  {
    withImage: false,
    liClass: "mb-4 bg-white text-primary py-2 px-4 rounded-lg text-center",
  }
);

const isRecipe = (resource: Recipe | GroceryList): resource is Recipe =>
  resource.type === "Recipe";

const isGroceryList = (
  resource: Recipe | GroceryList
): resource is GroceryList => resource.type === "GroceryList";

const getRoute = (resource: Recipe | GroceryList) => {
  const resourceId = resource.id.match(/\d+/)![0];

  if (isRecipe(resource)) {
    return "/recipes/show/" + resourceId;
  } else if (isGroceryList(resource)) {
    return "/grocery-lists/show/" + resourceId;
  } else {
    return "";
  }
};

const getLinkClass = (resource: Recipe | GroceryList) => {
  if (isGroceryList(resource) && !resource.isActive) {
    return " bg-opacity-50";
  }
};

const imagesSrc = ref<string[]>([]);

if (props.withImage) {
  props.resourceList.forEach(async (resource) => {
    if (isRecipe(resource)) {
      imagesSrc.value.push(
        import.meta.env.APP_API_URL +
          (await mediaObjectProvider.findOneByIri(resource.image))
      );
    }
  });
}
</script>

<style lang="scss" scoped></style>
