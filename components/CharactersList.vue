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
  <div class="grid grid-cols-6 gap-4 mt-10">
    <CharacterItem v-for="(character,index) in characters" :key="index" :character="character"/>
  </div>
</template>