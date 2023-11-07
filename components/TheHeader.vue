<script setup lang="ts">
import {getAuth} from "firebase/auth";

const auth = getAuth()!;
const user = useCurrentUser()

async function signOut() {
  await auth.signOut();
  navigateTo("/")
}
</script>

<template>
  <header class="bg-white">
    <div class="container mx-auto flex items-center justify-between py-4">
      <NuxtLink to="/"><img class="w-16" src="/logo.png" alt="logo"></NuxtLink>
      <div class="flex items-center gap-8">
      <button class="border-2 border-black p-2 rounded-lg"><img src="/theme.svg" alt="theme"></button>
      <button @click="signOut" v-if="user"><Icon size="28" name="mdi:logout"/></button>
      </div>
    </div>
  </header>
</template>