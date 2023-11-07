<script setup lang="ts">
const characterStore = useCharacterStore()
const {searchQuery} = storeToRefs(characterStore)
</script>

<template>
  <section class="h-[calc(100vh-158px)]">
    <div class="flex flex-col gap-4 items-center mt-10">
      <h1 class="font-bold text-3xl">Nothing found</h1>
      <p class="text-gray-500">You searched for "{{ searchQuery }}"</p>
    </div>
  </section>
</template>