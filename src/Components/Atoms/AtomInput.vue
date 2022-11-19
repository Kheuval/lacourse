<template>
  <input
    :type="type"
    placeholder=""
    class="px-8 pb-3 pt-4 text-sm rounded-full border-2 focus:outline-none bg-white peer"
    :class="
      validationMessage
        ? 'border-red-500'
        : 'border-primary focus:border-secondary'
    "
    :id="id"
    @focus="validationMessage = ''"
    @change="validate"
    @blur="validate"
    v-model="content"
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
import type { Rule } from "@/Core/Services/Validation/RuleType";
import { useEventBus } from "@/Core/Services/EventBus";

const { emitter } = useEventBus();

const props = defineProps<{
  id: string;
  type: string;
  validationRules?: Rule[];
}>();

const emits = defineEmits(["update"]);

const content = ref("");
const validationMessage = ref("");

const validate = (): void => {
  if (!props.validationRules) {
    update();
    return;
  }

  const validation = validationService.validate(
    props.validationRules,
    content.value
  );
  validationMessage.value = validation.message;

  validation.valid ? update() : "";
};

const update = useDebounce(() => {
  emits("update", content.value);
});

emitter.on("validate", (form) => {
  for (const [key] of Object.entries(form)) {
    if (props.id === key) {
      validate();
    }
  }
});
</script>

<style lang="scss" scoped></style>
