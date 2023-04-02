<template>
  <OrganismHeader />
  <OrganismGroceryListForm :groceryList="groceryList" class="mt-12" />
</template>

<script lang="ts" setup>
import OrganismGroceryListForm from "@/Components/Organisms/OrganismGroceryListForm/OrganismGroceryListForm.vue";
import OrganismHeader from "@/Components/Organisms/OrganismHeader.vue";
import type { DataProvider } from "@/Core/Config/DataProvider";
import { inject } from "vue";
import { useRoute } from "vue-router";

const { groceryListProvider } = inject("dataProvider") as DataProvider;

const { params } = useRoute();

const groceryList = await groceryListProvider.findOneByIri(
  `/api/grocery_lists/${params.id}`
);
</script>

<style lang="scss" scoped></style>
