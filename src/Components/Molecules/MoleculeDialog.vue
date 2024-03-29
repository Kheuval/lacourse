<template>
  <dialog
    class="py-6 flex flex-col justify-between items-center bg-primary mx-auto rounded-xl text-white text-xl z-50 backdrop:bg-black backdrop:opacity-90 overflow-x-hidden"
    :class="styles"
    ref="dialog"
    @click="onCancel"
  >
    <!-- Hack to catch focus on dialog open as it screws the layout on mobile -->
    <input class="h-0 opacity-0" type="checkbox" />
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
        @click="onCancel()"
      >
        Annuler
      </AtomButton>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import AtomButton from "../Atoms/AtomButton.vue";

const props = withDefaults(
  defineProps<{
    dismissible?: boolean;
    styles?: string;
    buttons?: { ok: boolean; cancel: boolean };
    prevent?: Function;
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

const dismissDialog = () => {
  dialog.value!.classList.add("hide");
  document.querySelector("body")!.classList.remove("overflow-hidden");
  dialog.value!.addEventListener("animationend", () => {
    dialog.value!.close();
  });
};

const onOk = () => {
  if (props.prevent && !props.prevent()) {
    return;
  }

  dismissDialog();
  setTimeout(() => {
    emits("ok");
  }, 300);
};

const onCancel = (event?: MouseEvent) => {
  if (event && event.clientX === 0 && event.clientY === 0) {
    return;
  }

  if (!event) {
    dismissDialog();
    setTimeout(() => {
      emits("cancel");
    }, 300);
  } else if (
    props.dismissible &&
    (dialogRect.value!.left > event.clientX ||
      dialogRect.value!.right < event.clientX ||
      dialogRect.value!.top > event.clientY ||
      dialogRect.value!.bottom < event.clientY)
  ) {
    dismissDialog();
    setTimeout(() => {
      emits("cancel");
    }, 300);
  }
};

const dialog = ref<HTMLDialogElement | null>(null);
const dialogRect = ref<DOMRect | undefined>();

onMounted(() => {
  dialog.value!.showModal();
  document.querySelector("body")!.classList.add("overflow-hidden");
  dialogRect.value = dialog.value!.getBoundingClientRect();
});

onUnmounted(() => {
  document.querySelector("body")!.classList.remove("overflow-hidden");
});
</script>

<style lang="scss" scoped>
dialog[open] {
  animation: show 0.3s ease-in-out;
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

dialog.hide {
  animation: hide 0.3s ease-in-out;
}

@keyframes hide {
  to {
    opacity: 0;
  }
}
</style>
