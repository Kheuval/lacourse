<template>
  <nav class="inline-block">
    <AtomButton
      class="text-[3.438rem] left-0 z-[1] m-0 cursor-pointer"
      content="-"
      @click="toggleMenu"
    />
    <Transition name="menuToggle">
      <ul
        class="flex mt-4 flex-col justify-center items-center list-none absolute w-[90%] h-[28.75rem] right-0 p-0 text-center bg-primary z-10 rounded-tl-[10px] rounded-bl-[10px]"
        v-if="showMenu"
      >
        <li
          class="flex flex-col items-center justify-evenly h-[5.313rem] after:content-['%20'] after:block after:h-[0.313rem] after:bg-secondary after:w-3/4"
          v-for="(link, index) in links"
          :key="index"
        >
          <AtomLink
            class="font-lexend inline-block text-2xl w-full text-white"
            :to="link.to"
            @click="
              toggleMenu();
              link.click ? link.click() : '';
            "
            >{{ link.content }}
          </AtomLink>
        </li>
      </ul>
    </Transition>
  </nav>
  <AtomOverlay :show="showMenu" @click="toggleMenu" />
</template>

<script lang="ts" setup>
import { ref, type Ref } from "vue";
import AtomButton from "../Atoms/AtomButton.vue";
import AtomLink from "../Atoms/AtomLink.vue";
import AtomOverlay from "../Atoms/AtomOverlay.vue";

defineProps<{
  links: {
    to: string;
    content: string;
    click?: Function;
  }[];
}>();

const showMenu: Ref<boolean> = ref(false);
const toggleMenu = () => (showMenu.value = !showMenu.value);
</script>

<style lang="scss" scoped>
.menuToggle-enter-active,
.menuToggle-leave-active {
  transition: transform 0.3s ease-in-out;
}

.menuToggle-enter-from,
.menuToggle-leave-to {
  transform: translate(100%);
}
</style>
