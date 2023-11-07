<script setup lang="ts">
import {useCharacterStore} from "~/stores/characters";
import getCharacters from "~/utils/getCharacters";

const characterStore = useCharacterStore()
const {filteredCharacters} = storeToRefs(characterStore)

onMounted(() => {
  getCharacters()
})
</script>

<template>
  <CharactersList :characters="filteredCharacters"/>
  <NotFound v-if="filteredCharacters.length === 0"/>
</template>
