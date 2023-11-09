<script setup lang="ts">

import type CharacterType from "~/utils/types/characterType";
import {getDownloadURL, ref as storageRef, uploadBytes} from "firebase/storage";
import {addDoc, collection} from "@firebase/firestore";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

const characterStore = useCharacterStore()

const storage = useFirebaseStorage()
const db = useFirestore()

const {characters} = storeToRefs(characterStore)

const searchQuery = ref<string>("")

const characterName = ref<string>()

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
    searchQuery.value === ''
        ? tanks.value
        : tanks.value.filter((character: CharacterType) =>
            character.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(searchQuery.value.toLowerCase().replace(/\s+/g, ''))
        )
)

const filteredDps = computed(() =>
    searchQuery.value === ''
        ? dps.value
        : dps.value.filter((character: CharacterType) =>
            character.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(searchQuery.value.toLowerCase().replace(/\s+/g, ''))
        )
)

const filteredSupports = computed(() => {
  return searchQuery.value === ''
      ? supports.value
      : supports.value.filter((character: CharacterType) =>
          character.name
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(searchQuery.value.toLowerCase().replace(/\s+/g, ''))
      )
})

const file = ref()
const previewImage = ref()

async function handleUpload(event: Event): Promise<void> {
  if (event.target instanceof HTMLInputElement) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files[0]) {
      const selectedFile = inputElement.files[0];

      const fileRef = storageRef(storage, `/images/${characterName.value}`);
      await uploadBytes(fileRef, selectedFile);

      const pathReference = storageRef(storage, `images/${characterName.value}`);
      previewImage.value = await getDownloadURL(pathReference);
    }
  }
}

async function uploadData() : Promise<void>{
  await addDoc(collection(db, "characters"), {
    name: characterName.value,
    img: previewImage.value,
    role: selectedRole.value.toLowerCase(),
    dps: [selectedDps1.value.name, selectedDps2.value.name, selectedDps3.value.name],
    tanks: [selectedTank1.value.name, selectedTank2.value.name, selectedTank3.value.name],
    supports: [selectedSupport1.value.name, selectedSupport2.value.name, selectedSupport3.value.name],
  })
  await navigateTo("/admin")
}

const roles = ["Tank", "DPS", "Support"]
const selectedRole = ref<string>(roles[0])

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

const updateSearchQuery = (value: string): void => {
  searchQuery.value = value;
};
</script>

<template>
  <section class="pt-10 flex">
    <div class="w-1/3">
      <form class="flex flex-col gap-4 items-center w-1/2 mx-auto">
        <label for="dropzone-file"
               class="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-zinc-600 dark:border-none">
          <img class="rounded-lg" :src="previewImage ? previewImage : '/placeholder.png'" alt="image">
          <input @change="handleUpload" id="dropzone-file" type="file" class="hidden"/>
        </label>
        <input v-model="characterName" class="py-2 px-4 rounded-lg w-full dark:bg-zinc-700 dark:text-white" type="text" placeholder="Name">
        <Listbox v-model="selectedRole">
          <div class="relative mt-1 w-full">
            <ListboxButton
                class="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm dark:bg-zinc-700 dark:text-white"
            >
              <span class="block truncate">{{ selectedRole }}</span>
              <span
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
              >
            <Icon name="mdi:unfold-more-horizontal"/>
          </span>
            </ListboxButton>

            <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
              <ListboxOptions
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm dark:bg-zinc-700 dark:text-white"
              >
                <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="role in roles"
                    :key="role"
                    :value="role"
                    as="template"
                >
                  <li
                      class="dark:bg-zinc-700 dark:text-white"
                      :class="[
                  active ? 'dark:bg-teal-600 dark:text-white' : 'text-gray-900',
                  'relative cursor-pointer select-none py-2 pl-10 pr-4',
                ]"
                  >
                <span
                    :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >{{ role }}</span
                >
                    <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-texl-600"
                    >
                  <Icon name="mdi:check"/>
                </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </form>
    </div>
    <div class="w-2/3 bg-white p-4 rounded-lg dark:bg-zinc-700">
      <h1 class="text-2xl font-bold mb-4 dark:text-white">Tanks</h1>
      <div class="grid grid-cols-3 gap-8 mb-4">
        <CharacterSelect
            v-model="selectedTank1"
            :filtered-array="filteredTanks"
            :searchsearchQuery="searchQuery"
            :selected="selectedTank1"
            @updateSearchQuery="updateSearchQuery"/>
        <CharacterSelect
            v-model="selectedTank2"
            :filtered-array="filteredTanks"
            :searchsearchQuery="searchQuery"
            :selected="selectedTank2"
            @updateSearchQuery="updateSearchQuery"/>
        <CharacterSelect
            v-model="selectedTank3"
            :filtered-array="filteredTanks"
            :searchsearchQuery="searchQuery"
            :selected="selectedTank3"
            @updateSearchQuery="updateSearchQuery"/>
      </div>
      <h1 class="text-2xl font-bold mb-4 dark:text-white">Dps</h1>
      <div class="grid grid-cols-3 gap-8 mb-4">
        <CharacterSelect
            v-model="selectedDps1"
            :filtered-array="filteredDps"
            :searchsearchQuery="searchQuery"
            :selected="selectedDps1"
            @updateSearchQuery="updateSearchQuery"/>
        <CharacterSelect
            v-model="selectedDps2"
            :filtered-array="filteredDps"
            :searchsearchQuery="searchQuery"
            :selected="selectedDps2"
            @updateSearchQuery="updateSearchQuery"/>
        <CharacterSelect
            v-model="selectedDps3"
            :filtered-array="filteredDps"
            :searchsearchQuery="searchQuery"
            :selected="selectedDps3"
            @updateSearchQuery="updateSearchQuery"/>
      </div>
      <h1 class="text-2xl font-bold mb-4 dark:text-white">Supports</h1>
      <div class="grid grid-cols-3 gap-8 mb-4">
        <CharacterSelect
            v-model="selectedSupport1"
            :filtered-array="filteredSupports"
            :searchsearchQuery="searchQuery"
            :selected="selectedSupport1"
            @updateSearchQuery="updateSearchQuery"/>
        <CharacterSelect
            v-model="selectedSupport2"
            :filtered-array="filteredSupports"
            :searchsearchQuery="searchQuery"
            :selected="selectedSupport2"
            @updateSearchQuery="updateSearchQuery"/>
        <CharacterSelect
            v-model="selectedSupport3"
            :filtered-array="filteredSupports"
            :searchsearchQuery="searchQuery"
            :selected="selectedSupport3"
            @updateSearchQuery="updateSearchQuery"/>
      </div>
    </div>
  </section>
  <div class="w-1/2 mx-auto">
    <button @click="uploadData" class="w-full py-2 px-4 rounded-lg bg-teal-600 text-white mt-10 text-center font-bold">Add</button>
  </div>
</template>