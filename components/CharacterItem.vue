<script setup lang="ts">
import type {PropType} from "vue";
import type CharacterType from "~/utils/types/characterType";

defineProps({
  character: {
    type: Object as PropType<CharacterType>,
  }
})
</script>

<template>
  <article @click="navigateTo(`/character/${character.name}`)" class="bg-white rounded-lg" v-if="character">
    <img :src="character.img" :alt="character.name">
    <p class="font-bold italic text-xl text-center py-2">{{ character.name }}</p>
  </article>
</template>