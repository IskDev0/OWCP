<script setup lang="ts">
const characterStore = useCharacterStore()

const {filteredCharacters} = storeToRefs(characterStore)

onMounted(() => {
  getCharacters()
})
</script>

<template>
  <div class="pt-10">
  <NuxtLink to="/admin/add"
            class="w-full flex justify-center py-2 bg-white rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-200 dark:bg-zinc-700 dark:text-white">
    <Icon name="mdi:plus"/>
  </NuxtLink>
  </div>
  <AdminCharactersList :characters="filteredCharacters"/>
</template>