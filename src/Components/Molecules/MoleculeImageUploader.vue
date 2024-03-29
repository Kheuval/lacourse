<template>
  <input
    ref="imageInput"
    class="hidden"
    type="file"
    accept=".jpg,.jpeg,.png"
    @change="previewImage"
  />
  <MoleculeIconButton
    content="Choisir une image"
    icon="fa-regular fa-image"
    :buttonClass="`px-8 py-3 rounded-full border-dashed border-4 flex ${
      isWrongImageFormat ? 'border-red-500' : 'border-secondary'
    }`"
    iconClass="ml-4 text-2xl"
    @click="handleUpload"
    v-if="!isImageUploaded"
  >
  </MoleculeIconButton>
  <div class="relative cursor-pointer" @click="handleUpload">
    <AtomImage
      :src="imageSrc"
      alt=""
      :class="`${
        isImageUploaded
          ? 'rounded-3xl w-full aspect-[3/2] object-cover'
          : 'hidden'
      }`"
    />
    <div
      class="h-full w-full absolute top-0 rounded-3xl bg-black bg-opacity-50 flex items-center justify-center"
      v-if="isImageUploaded"
    >
      <span class="text-white text-3xl text-center">
        Choisir une autre image
      </span>
    </div>
  </div>
  <p class="text-red-500 text-xs text-center mt-2" v-if="isWrongImageFormat">
    Ce format de fichier n'est pas pris en charge
  </p>
</template>

<script lang="ts" setup>
import { inject, ref } from "vue";
import AtomImage from "../Atoms/AtomImage.vue";
import MoleculeIconButton from "./MoleculeIconButton.vue";
import { DataProviderKey } from "@/Core/Config/DataProviderInterface";

const { mediaObjectProvider } = inject(DataProviderKey)!;

const emits = defineEmits(["imageUploaded"]);

const props = defineProps<{
  imagePath?: string;
}>();

const imageInput = ref<HTMLInputElement | null>(null);
const isWrongImageFormat = ref(false);
const isImageUploaded = ref(false);
const imageSrc = ref("");

if (props.imagePath) {
  const src = await mediaObjectProvider.findOneByIri(props.imagePath);

  imageSrc.value = import.meta.env.APP_API_URL + src;
  isImageUploaded.value = true;
}

const handleUpload = () => {
  imageInput.value!.value = "";
  imageInput.value!.click();
};

const previewImage = () => {
  if (null === imageInput.value || !imageInput.value.files!.length) {
    return;
  }

  const image = imageInput.value.files![0];
  const imageTypes = ["image/jpg", "image/jpeg", "image/png"];

  if (!imageTypes.includes(image.type)) {
    isWrongImageFormat.value = true;
    return;
  }

  isWrongImageFormat.value = false;
  imageSrc.value = URL.createObjectURL(image);
  isImageUploaded.value = true;

  emits("imageUploaded", image);
};
</script>
