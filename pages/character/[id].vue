<script setup lang="ts">
import getCurrentCharacter from "~/utils/getCurrentCharacter";
import {useCharacterStore} from "~/stores/characters";
import {useFirebaseStorage} from 'vuefire'
import loadImagesURL from "~/utils/loadImagesURL";

const characterStore = useCharacterStore()
const storage = useFirebaseStorage()

const dpsUrl = ref<string[]>([]);
const tanksUrl = ref<string[]>([]);
const supportsUrl = ref<string[]>([]);

const {currentCharacter} = storeToRefs(characterStore)

onMounted(async () => {
  await getCurrentCharacter()
  await Promise.all([loadImagesURL(currentCharacter.value!.dps, dpsUrl),
    loadImagesURL(currentCharacter.value!.tanks, tanksUrl),
    loadImagesURL(currentCharacter.value!.supports, supportsUrl)]);
})

const currentCharacterClassIcon = computed(():string => {
  return currentCharacter.value?.img ? `../${currentCharacter.value.role}_icon.svg` : ''
})
</script>

<template>
  <section class="flex flex-col items-center sm:items-start lg:flex-row gap-10 mt-10" v-if="currentCharacter">
    <div class="md:w-1/3">
      <div class="flex flex-col items-center bg-white rounded-lg">
        <img class="max-w-64" :src="currentCharacter.img" :alt="currentCharacter.name">
        <div class="flex items-center gap-2 py-2">
          <h1
              class="font-bold text-xl italic">{{ currentCharacter.name }}</h1>
          <img :src="currentCharacterClassIcon" :alt="currentCharacter.name">
        </div>
      </div>
    </div>
    <div class="lg:w-2/3">
      <div class="flex flex-col items-center sm:grid sm:grid-cols-3 gap-8" v-if="supportsUrl">
        <div @click="navigateTo(tank)" v-for="(tank,index) in currentCharacter.tanks" :key="index"
             class="flex flex-col items-center bg-white rounded-lg">
          <img class="max-w-64" :src="tanksUrl[index]" :alt="tank">
          <div class="flex items-center gap-2 py-2">
            <h2 class="text-xl font-bold italic">{{ tank }}</h2>
            <img src="/tank_icon.svg" alt="tank">
          </div>
        </div>
        <div @click="navigateTo(dps)" v-for="(dps,index) in currentCharacter.dps" :key="index"
             class="flex flex-col items-center bg-white rounded-lg">
          <img class="max-w-64" :src="dpsUrl[index]" :alt="dps">
          <div class="flex items-center gap-2 py-2">
            <h2 class="text-xl font-bold italic">{{ dps }}</h2>
            <img src="/dps_icon.svg" alt="dps">
          </div>
        </div>
        <div @click="navigateTo(support)" v-for="(support,index) in currentCharacter.supports" :key="index"
             class="flex flex-col items-center bg-white rounded-lg">
          <img class="max-w-64" :src="supportsUrl[index]" :alt="support">
          <div class="flex items-center gap-2 py-2">
            <h2 class="text-xl font-bold italic">{{ support }}</h2>
            <img src="/support_icon.svg" alt="support">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>