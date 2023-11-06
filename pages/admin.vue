<script setup lang="ts">

import type CharacterType from "~/utils/types/characterType";

const characterStore = useCharacterStore()

const {characters} = storeToRefs(characterStore)

const query = ref<string>("")

const tanks = ref()
const dps = ref()
const supports = ref()

const selectedTank1 = ref()
const selectedTank2 = ref()
const selectedTank3 = ref()

const selectedDps1 = ref()
const selectedDps2 = ref()
const selectedDps3 = ref()

const selectedSupport1 = ref()
const selectedSupport2 = ref()
const selectedSupport3 = ref()


const filteredTanks = computed(() =>
    query.value === ''
        ? tanks.value
        : tanks.value.filter((character: CharacterType) =>
            character.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.value.toLowerCase().replace(/\s+/g, ''))
        )
)

const filteredDps = computed(() =>
    query.value === ''
        ? dps.value
        : dps.value.filter((character: CharacterType) =>
            character.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.value.toLowerCase().replace(/\s+/g, ''))
        )
)

const filteredSupports = computed(() => {
  return query.value === ''
      ? supports.value
      : supports.value.filter((character: CharacterType) =>
          character.name
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
})

onMounted(async () => {
  await getCharacters()
  tanks.value = characters.value.filter((character) => character.role === "tank")
  selectedTank1.value = tanks.value[0]
  selectedTank2.value = tanks.value[1]
  selectedTank3.value = tanks.value[2]
  dps.value = characters.value.filter((character) => character.role === "dps")
  selectedDps1.value = dps.value[0]
  selectedDps2.value = dps.value[1]
  selectedDps3.value = dps.value[2]
  supports.value = characters.value.filter((character) => character.role === "support")
  selectedSupport1.value = supports.value[0]
  selectedSupport2.value = supports.value[1]
  selectedSupport3.value = supports.value[2]
})

const updateQuery = (value: string): void => {
  query.value = value;
};
</script>

<template>
  <section class="mt-10 flex">
    <div class="w-1/3">
      <form class="flex flex-col gap-4 items-center w-1/2 mx-auto">
        <label for="dropzone-file"
               class="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
          <img src="/placeholder.png" alt="image">
          <input id="dropzone-file" type="file" class="hidden"/>
        </label>
        <input class="py-2 px-4 rounded-lg w-full" type="text" placeholder="Name">
      </form>
    </div>
    <div class="w-2/3 bg-white p-4 rounded-lg">
      <h1 class="text-2xl font-bold mb-4">Tanks</h1>
      <div class="grid grid-cols-3 gap-8 mb-4">
        <CharacterSelect
            v-model="selectedTank1"
            :filtered-array="filteredTanks"
            :query="query"
            @updateQuery="updateQuery"/>
        <CharacterSelect
            v-model="selectedTank2"
            :filtered-array="filteredTanks"
            :query="query"
            @updateQuery="updateQuery"/>
        <CharacterSelect
            v-model="selectedTank3"
            :filtered-array="filteredTanks"
            :query="query"
            @updateQuery="updateQuery"/>
      </div>
      <h1 class="text-2xl font-bold mb-4">Dps</h1>
      <div class="grid grid-cols-3 gap-8 mb-4">
        <CharacterSelect
            v-model="selectedDps1"
            :filtered-array="filteredDps"
            :query="query"
            @updateQuery="updateQuery"/>
        <CharacterSelect
            v-model="selectedDps2"
            :filtered-array="filteredDps"
            :query="query"
            @updateQuery="updateQuery"/>
        <CharacterSelect
            v-model="selectedDps3"
            :filtered-array="filteredDps"
            :query="query"
            @updateQuery="updateQuery"/>
      </div>
      <h1 class="text-2xl font-bold mb-4">Supports</h1>
      <div class="grid grid-cols-3 gap-8 mb-4">
        <CharacterSelect
            v-model="selectedSupport1"
            :filtered-array="filteredSupports"
            :query="query"
            @updateQuery="updateQuery"/>
        <CharacterSelect
            v-model="selectedSupport2"
            :filtered-array="filteredSupports"
            :query="query"
            @updateQuery="updateQuery"/>
        <CharacterSelect
            v-model="selectedSupport3"
            :filtered-array="filteredSupports"
            :query="query"
            @updateQuery="updateQuery"/>
      </div>
    </div>
  </section>
</template>