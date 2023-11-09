<script setup lang="ts">
import {getAuth} from "firebase/auth";
import type CharacterType from "~/utils/types/characterType";

const auth = getAuth()!;
const user = useCurrentUser()

const characterStore = useCharacterStore()

const {characters, searchQuery, filteredCharacters} = storeToRefs(characterStore)


function searchCharacter(): void {
  if (searchQuery.value.length > 0) {
    filteredCharacters.value = characters.value.filter((character: CharacterType) => {
      return character.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    })
  } else {
    filteredCharacters.value = characters.value
  }
}

async function signOut(): Promise<void> {
  await auth.signOut();
  navigateTo("/")
}

function toggleDarkMode(): void {
  const html = document.querySelector("html");
  html?.classList.toggle("dark");
}

onMounted(() => {
  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

</script>

<template>
  <header class="bg-white px-4 dark:bg-zinc-900 fixed top-0 left-0 right-0">
    <div class="container mx-auto flex items-center justify-between py-4">
      <NuxtLink to="/"><img class="w-16 h-12" src="/logo.png" alt="logo"></NuxtLink>
      <form>
        <input
            @input="searchCharacter"
            v-model="searchQuery"
            class="py-2 px-4 border-2 border-zinc-500 rounded-lg outline-none dark:bg-zinc-700 dark:text-white dark:border-zinc-600 max-w-xs w-40 sm:w-60 md:w-96"
            type="search"
            placeholder="Search">
      </form>
      <div class="flex items-center gap-2 sm:gap-8">
        <button @click="toggleDarkMode" class="flex items-center justify-center rounded-lg h-8 w-8"><Icon class="dark:text-white" size="32" name="mdi:white-balance-sunny"/></button>
        <ClientOnly>
          <button @click="signOut" v-if="user">
            <Icon class="dark:text-white" size="28" name="mdi:logout"/>
          </button>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>