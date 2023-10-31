<script setup lang="ts">
import {useCharacterStore} from "~/stores/characters";
import getCharacters from "~/utils/getCharacters";

const characterStore = useCharacterStore()
const {characters} = storeToRefs(characterStore)

onMounted(() => {
  getCharacters()
})
</script>

<template>
  <CharactersList :characters="characters"/>
</template>
