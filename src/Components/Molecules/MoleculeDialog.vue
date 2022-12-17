<template>
  <Transition name="dialog">
    <div
      class="absolute p-3 left-[12.75%] flex flex-col justify-evenly items-center bg-primary mx-auto rounded-xl text-white z-50"
      :class="styles"
      v-if="show"
      ref="dialog"
    >
      <slot name="header"></slot>
      <slot></slot>

      <div class="flex justify-evenly w-full">
        <AtomButton
          class="bg-white text-primary uppercase text-xl rounded-2xl py-2 px-4"
          v-if="buttons.ok"
          @click="onOk"
        >
          Ok
        </AtomButton>
        <AtomButton
          class="bg-secondary text-white uppercase text-xl rounded-2xl py-2 px-4"
          v-if="buttons.cancel"
          @click="onCancel"
        >
          Annuler
        </AtomButton>
      </div>
    </div>
  </Transition>
  <AtomOverlay :show="show" @click="dismissible ? onCancel() : ''" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import AtomOverlay from "../Atoms/AtomOverlay.vue";
import AtomButton from "../Atoms/AtomButton.vue";

withDefaults(
  defineProps<{
    dismissible?: boolean;
    styles?: string;
    buttons?: { ok: boolean; cancel: boolean };
  }>(),
  {
    dismissible: true,
    styles: "w-3/4 h-2/5",
    buttons: () => {
      return { ok: true, cancel: false };
    },
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

const dialog = ref<HTMLDivElement | null>(null);

onMounted(() => {
  show.value = true;
  setTimeout(() => {
    dialog.value!.style.top = window.scrollY + window.innerHeight / 4 + "px";
  }, 1);
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
