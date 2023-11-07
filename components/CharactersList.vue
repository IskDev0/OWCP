<script setup lang="ts">
import type {PropType} from "vue";
import type CharacterType from "~/utils/types/characterType";

defineProps({
  characters: {
    type: Array as PropType<CharacterType[]>,
  }
})
</script>

<template>
  <div class="flex flex-col gap-4 mt-10 sm:grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    <CharacterItem :path="`character/${character.name}`" v-for="(character,index) in characters" :key="index" :character="character"/>
  </div>
</template>