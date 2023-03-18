<template>
  <input
    :type="type"
    :inputmode="typeNumber ? 'numeric' : 'text'"
    :pattern="typeNumber ? '[0-9]*' : '[a-zA-Z]'"
    class="px-8 pb-3 pt-4 text-sm rounded-full border-2 text-primary focus:outline-none bg-white peer"
    :class="
      validationMessage
        ? 'border-red-500'
        : 'border-primary focus:border-secondary'
    "
    :id="id"
    @focus="validationMessage = ''"
    @change="setContentAndValidate"
    @blur="setContentAndValidate"
    @keyup="setContentAndValidate($event, true)"
    :value="defaultContent"
  />
  <p class="text-red-500 text-xs text-center" v-if="validationMessage">
    {{ validationMessage }}
  </p>
  <div class="min-h-[1rem]" v-else></div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useDebounce } from "@/Core/Composables/useDebounce";
import { validationService } from "@/Core/Services/Validation/ValidationService";
import type { Rule } from "@/Core/Services/Validation/ValidationInterface";
import { useEventBus } from "@/Core/Services/EventBus";

const { emitter } = useEventBus();

const props = withDefaults(
  defineProps<{
    id: string;
    type: string;
    validationRules?: Rule[];
    typeNumber?: boolean;
    defaultContent?: string | number;
  }>(),
  {
    typeNumber: false,
    defaultContent: "",
  }
);

const emits = defineEmits(["update"]);

const content = ref("");
const validationMessage = ref("");

const setContentAndValidate = (e: Event, debounce = false) => {
  content.value = (e.target as HTMLInputElement).value;
  debounce ? updateLater() : validate(debounce);
};

const validate = (debounce: boolean): void => {
  if (!props.validationRules) {
    debounce ? updateLater() : updateNow();
    return;
  }

  const validation = validationService.validate(
    props.validationRules,
    content.value
  );
  validationMessage.value = validation.message;

  validation.valid ? (debounce ? updateLater() : updateNow()) : "";
};

const updateNow = () => {
  emits("update", content.value);
};

const updateLater = useDebounce(() => {
  emits("update", content.value);
});

emitter.on("validate", (form) => {
  for (const [key] of Object.entries(form)) {
    if (props.id === key) {
      validate(false);
    }
  }
});
</script>

<style lang="scss" scoped></style>
