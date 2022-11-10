<template>
  <Transition name="dialog">
    <div
      class="absolute p-3 top-1/4 left-[12.75%] flex flex-col justify-evenly items-center w-3/4 h-2/5 bg-primary mx-auto rounded-xl text-white z-10"
      v-if="show"
    >
      <AtomIcon icon="fa-solid fa-circle-exclamation" class="text-[3rem]" />
      <AtomTitle tag="h1" :content="title" class="text-3xl" />
      <AtomText :content="content" class="text-center" />

      <div class="flex justify-evenly w-full">
        <AtomButton
          class="bg-white text-primary uppercase text-xl rounded-2xl py-2 px-4"
          @click="onOk"
        >
          ok
        </AtomButton>
        <AtomButton
          v-if="!dismiss"
          class="bg-secondary text-white uppercase text-xl rounded-2xl py-2 px-4"
          @click="onCancel"
        >
          Annuler
        </AtomButton>
      </div>
    </div>
  </Transition>
  <AtomOverlay :show="show" @click="dismiss ? onCancel() : ''" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import AtomOverlay from "../Atoms/AtomOverlay.vue";
import AtomButton from "../Atoms/AtomButton.vue";
import AtomIcon from "../Atoms/AtomIcon.vue";
import AtomText from "../Atoms/AtomText.vue";
import AtomTitle from "../Atoms/AtomTitle.vue";

withDefaults(
  defineProps<{
    dismiss?: boolean;
    title: string;
    content: string;
  }>(),
  {
    dismiss: true,
  }
);

const emits = defineEmits(["ok", "cancel"]);

const show = ref(false);

const dismissDialog = () => {
  show.value = false;
};

const onOk = () => {
  dismissDialog();
  setTimeout(() => {
    emits("ok");
  }, 300);
};

const onCancel = () => {
  dismissDialog();
  setTimeout(() => {
    emits("cancel");
  }, 300);
};

onMounted(() => {
  show.value = true;
});
</script>

<style lang="scss" scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
</style>
