<template>
  <ul class="-mt-4">
    <li
      :class="liClass"
      v-for="(resource, index) in resourceList"
      :key="resource.id"
    >
      <AtomImage
        :src="imagesSrc[index] || ''"
        :alt="resource.name"
        class="rounded-3xl w-full aspect-[3/2] object-cover mt-4"
        v-if="withImage"
      />
      <AtomLink :to="getRoute(resource)" v-if="withImage">
        <div
          class="h-full w-full absolute top-0 rounded-3xl bg-black bg-opacity-50 flex items-center justify-center"
        >
          <span class="text-white text-3xl text-center">
            {{ resource.name }}
          </span>
        </div>
      </AtomLink>
      <AtomLink :to="getRoute(resource)" v-else>
        {{ resource.name }}
      </AtomLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { GroceryList } from "@/Domain/GroceryList/GroceryListInterface";
import { databaseMediaObjectRepository } from "@/Domain/MediaObject/Repository/DatabaseMediaObjectRepository";
import type { Recipe } from "@/Domain/Recipe/RecipeInterface";
import { ref, type Ref } from "vue";
import AtomImage from "../Atoms/AtomImage.vue";
import AtomLink from "../Atoms/AtomLink.vue";

const props = withDefaults(
  defineProps<{
    resourceList: Recipe[] | GroceryList[];
    withImage: boolean;
    liClass: string;
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
  if (isRecipe(resource)) {
    return "/recipe/show/" + resource.id.match(/\d+/)![0];
  } else if (isGroceryList(resource)) {
    return "/grocery-list/show/" + resource.id.match(/\d+/)![0];
  } else {
    return "";
  }
};

const imagesSrc: Ref<string[]> = ref([]);

if (props.withImage) {
  props.resourceList.forEach(async (resource) => {
    if (isRecipe(resource)) {
      imagesSrc.value.push(
        import.meta.env.APP_API_URL +
          (await databaseMediaObjectRepository.findOneByIri(resource.image))
      );
    }
  });
}
</script>

<style lang="scss" scoped></style>
