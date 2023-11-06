<script setup lang="ts">
const characterStore = useCharacterStore()

const {characters} = storeToRefs(characterStore)

onMounted(() => {
  getCharacters()
})
</script>

<template>
  <NuxtLink to="/admin/add" class="w-full flex justify-center py-2 bg-white rounded-lg shadow-lg mt-10 hover:bg-gray-200 transition-all duration-200"><Icon name="mdi:plus"/></NuxtLink>
<AdminCharactersList :characters="characters"/>
</template>