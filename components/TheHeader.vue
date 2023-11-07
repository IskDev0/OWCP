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
</script>

<template>
  <header class="bg-white px-4">
    <div class="container mx-auto flex items-center justify-between py-4">
      <NuxtLink to="/"><img class="w-16" src="/logo.png" alt="logo"></NuxtLink>
      <form>
        <input
            @input="searchCharacter"
            v-model="searchQuery"
            class="py-2 px-4 border-2 border-black rounded-lg"
            type="search"
            placeholder="Search">
      </form>
      <div class="flex items-center gap-8">
        <button class="border-2 border-black p-2 rounded-lg"><img src="/theme.svg" alt="theme"></button>
        <ClientOnly>
          <button @click="signOut" v-if="user">
            <Icon size="28" name="mdi:logout"/>
          </button>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>