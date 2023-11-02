<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'

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
</script>

<template>
  <section class="mt-10 flex">
    <div class="w-1/3">
      <form class="flex flex-col gap-4 items-center w-1/2 mx-auto">

        <label for="dropzone-file"
               class="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
          <img src="/placeholder.png" alt="">
          <input id="dropzone-file" type="file" class="hidden"/>
        </label>

        <input class="py-2 px-4 rounded-lg w-full" type="text" placeholder="Name">
      </form>
    </div>
    <div class="w-2/3 bg-white p-4 rounded-lg">
      <h1 class="text-2xl font-bold mb-4">Tanks</h1>
      <div class="grid grid-cols-3 gap-8 mb-4">
        <Combobox v-model="selectedTank1">
          <div class="relative mt-1">
            <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
            >
              <ComboboxInput
                  class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  :displayValue="(person) => person.name"
                  @change="query = $event.target.value"
              />
              <ComboboxButton
                  class="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <Icon name="mdi:unfold-more-horizontal"/>
              </ComboboxButton>
            </div>
            <TransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="query = ''"
            >
              <ComboboxOptions
                  class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
              >
                <div
                    v-if="filteredTanks.length === 0 && query !== ''"
                    class="relative cursor-default select-none py-2 px-4 text-gray-700"
                >
                  Nothing found.
                </div>

                <ComboboxOption
                    v-for="person in filteredTanks"
                    as="template"
                    :key="person.id"
                    :value="person"
                    v-slot="{ selected, active }"
                >
                  <li
                      class="relative cursor-pointer select-none py-2 pl-10 pr-4"
                      :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
                  >
                <span
                    class="block truncate"
                    :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ person.name }}
                </span>
                    <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{ 'text-white': active, 'text-teal-600': !active }"
                    >
                  <Icon name="mdi:check"/>
                </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </TransitionRoot>
          </div>
        </Combobox>
        <Combobox v-model="selectedTank2">
          <div class="relative mt-1">
            <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
            >
              <ComboboxInput
                  class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  :displayValue="(person) => person.name"
                  @change="query = $event.target.value"
              />
              <ComboboxButton
                  class="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <Icon name="mdi:unfold-more-horizontal"/>
              </ComboboxButton>
            </div>
            <TransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="query = ''"
            >
              <ComboboxOptions
                  class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
              >
                <div
                    v-if="filteredTanks.length === 0 && query !== ''"
                    class="relative cursor-default select-none py-2 px-4 text-gray-700"
                >
                  Nothing found.
                </div>

                <ComboboxOption
                    v-for="person in filteredTanks"
                    as="template"
                    :key="person.id"
                    :value="person"
                    v-slot="{ selected, active }"
                >
                  <li
                      class="relative cursor-pointer select-none py-2 pl-10 pr-4"
                      :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
                  >
                <span
                    class="block truncate"
                    :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ person.name }}
                </span>
                    <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{ 'text-white': active, 'text-teal-600': !active }"
                    >
                  <Icon name="mdi:check"/>
                </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </TransitionRoot>
          </div>
        </Combobox>
        <Combobox v-model="selectedTank3">
          <div class="relative mt-1">
            <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
            >
              <ComboboxInput
                  class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  :displayValue="(person) => person.name"
                  @change="query = $event.target.value"
              />
              <ComboboxButton
                  class="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <Icon name="mdi:unfold-more-horizontal"/>
              </ComboboxButton>
            </div>
            <TransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="query = ''"
            >
              <ComboboxOptions
                  class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
              >
                <div
                    v-if="filteredTanks.length === 0 && query !== ''"
                    class="relative cursor-default select-none py-2 px-4 text-gray-700"
                >
                  Nothing found.
                </div>

                <ComboboxOption
                    v-for="person in filteredTanks"
                    as="template"
                    :key="person.id"
                    :value="person"
                    v-slot="{ selected, active }"
                >
                  <li
                      class="relative cursor-pointer select-none py-2 pl-10 pr-4"
                      :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
                  >
                <span
                    class="block truncate"
                    :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ person.name }}
                </span>
                    <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{ 'text-white': active, 'text-teal-600': !active }"
                    >
                  <Icon name="mdi:check"/>
                </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </TransitionRoot>
          </div>
        </Combobox>
      </div>
      <h1 class="text-2xl font-bold mb-4">Dps</h1>
      <div class="grid grid-cols-3 gap-8 mb-4">
        <Combobox v-model="selectedDps1">
          <div class="relative mt-1">
            <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
            >
              <ComboboxInput
                  class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  :displayValue="(person) => person.name"
                  @change="query = $event.target.value"
              />
              <ComboboxButton
                  class="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <Icon name="mdi:unfold-more-horizontal"/>
              </ComboboxButton>
            </div>
            <TransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="query = ''"
            >
              <ComboboxOptions
                  class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
              >
                <div
                    v-if="filteredDps.length === 0 && query !== ''"
                    class="relative cursor-default select-none py-2 px-4 text-gray-700"
                >
                  Nothing found.
                </div>

                <ComboboxOption
                    v-for="person in filteredDps"
                    as="template"
                    :key="person.id"
                    :value="person"
                    v-slot="{ selected, active }"
                >
                  <li
                      class="relative cursor-pointer select-none py-2 pl-10 pr-4"
                      :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
                  >
                <span
                    class="block truncate"
                    :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ person.name }}
                </span>
                    <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{ 'text-white': active, 'text-teal-600': !active }"
                    >
                  <Icon name="mdi:check"/>
                </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </TransitionRoot>
          </div>
        </Combobox>
        <Combobox v-model="selectedDps2">
          <div class="relative mt-1">
            <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
            >
              <ComboboxInput
                  class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  :displayValue="(person) => person.name"
                  @change="query = $event.target.value"
              />
              <ComboboxButton
                  class="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <Icon name="mdi:unfold-more-horizontal"/>
              </ComboboxButton>
            </div>
            <TransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="query = ''"
            >
              <ComboboxOptions
                  class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
              >
                <div
                    v-if="filteredDps.length === 0 && query !== ''"
                    class="relative cursor-default select-none py-2 px-4 text-gray-700"
                >
                  Nothing found.
                </div>

                <ComboboxOption
                    v-for="person in filteredDps"
                    as="template"
                    :key="person.id"
                    :value="person"
                    v-slot="{ selected, active }"
                >
                  <li
                      class="relative cursor-pointer select-none py-2 pl-10 pr-4"
                      :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
                  >
                <span
                    class="block truncate"
                    :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ person.name }}
                </span>
                    <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{ 'text-white': active, 'text-teal-600': !active }"
                    >
                  <Icon name="mdi:check"/>
                </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </TransitionRoot>
          </div>
        </Combobox>
        <Combobox v-model="selectedDps3">
          <div class="relative mt-1">
            <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
            >
              <ComboboxInput
                  class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  :displayValue="(person) => person.name"
                  @change="query = $event.target.value"
              />
              <ComboboxButton
                  class="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <Icon name="mdi:unfold-more-horizontal"/>
              </ComboboxButton>
            </div>
            <TransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="query = ''"
            >
              <ComboboxOptions
                  class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
              >
                <div
                    v-if="filteredDps.length === 0 && query !== ''"
                    class="relative cursor-default select-none py-2 px-4 text-gray-700"
                >
                  Nothing found.
                </div>

                <ComboboxOption
                    v-for="person in filteredDps"
                    as="template"
                    :key="person.id"
                    :value="person"
                    v-slot="{ selected, active }"
                >
                  <li
                      class="relative cursor-pointer select-none py-2 pl-10 pr-4"
                      :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
                  >
                <span
                    class="block truncate"
                    :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ person.name }}
                </span>
                    <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{ 'text-white': active, 'text-teal-600': !active }"
                    >
                  <Icon name="mdi:check"/>
                </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </TransitionRoot>
          </div>
        </Combobox>
      </div>
      <h1 class="text-2xl font-bold mb-4">Supports</h1>
      <div class="grid grid-cols-3 gap-8 mb-4">
        <Combobox v-model="selectedSupport1">
          <div class="relative mt-1">
            <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
            >
              <ComboboxInput
                  class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  :displayValue="(person) => person.name"
                  @change="query = $event.target.value"
              />
              <ComboboxButton
                  class="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <Icon name="mdi:unfold-more-horizontal"/>
              </ComboboxButton>
            </div>
            <TransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="query = ''"
            >
              <ComboboxOptions
                  class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
              >
                <div
                    v-if="filteredSupports.length === 0 && query !== ''"
                    class="relative cursor-default select-none py-2 px-4 text-gray-700"
                >
                  Nothing found.
                </div>

                <ComboboxOption
                    v-for="person in filteredSupports"
                    as="template"
                    :key="person.id"
                    :value="person"
                    v-slot="{ selected, active }"
                >
                  <li
                      class="relative cursor-pointer select-none py-2 pl-10 pr-4"
                      :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
                  >
                <span
                    class="block truncate"
                    :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ person.name }}
                </span>
                    <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{ 'text-white': active, 'text-teal-600': !active }"
                    >
                  <Icon name="mdi:check"/>
                </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </TransitionRoot>
          </div>
        </Combobox>
        <Combobox v-model="selectedSupport2">
          <div class="relative mt-1">
            <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
            >
              <ComboboxInput
                  class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  :displayValue="(person) => person.name"
                  @change="query = $event.target.value"
              />
              <ComboboxButton
                  class="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <Icon name="mdi:unfold-more-horizontal"/>
              </ComboboxButton>
            </div>
            <TransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="query = ''"
            >
              <ComboboxOptions
                  class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
              >
                <div
                    v-if="filteredSupports.length === 0 && query !== ''"
                    class="relative cursor-default select-none py-2 px-4 text-gray-700"
                >
                  Nothing found.
                </div>

                <ComboboxOption
                    v-for="person in filteredSupports"
                    as="template"
                    :key="person.id"
                    :value="person"
                    v-slot="{ selected, active }"
                >
                  <li
                      class="relative cursor-pointer select-none py-2 pl-10 pr-4"
                      :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
                  >
                <span
                    class="block truncate"
                    :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ person.name }}
                </span>
                    <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{ 'text-white': active, 'text-teal-600': !active }"
                    >
                  <Icon name="mdi:check"/>
                </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </TransitionRoot>
          </div>
        </Combobox>
        <Combobox v-model="selectedSupport3">
          <div class="relative mt-1">
            <div
                class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
            >
              <ComboboxInput
                  class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  :displayValue="(person) => person.name"
                  @change="query = $event.target.value"
              />
              <ComboboxButton
                  class="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <Icon name="mdi:unfold-more-horizontal"/>
              </ComboboxButton>
            </div>
            <TransitionRoot
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                @after-leave="query = ''"
            >
              <ComboboxOptions
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
              >
                <div
                    v-if="filteredSupports.length === 0 && query !== ''"
                    class="relative cursor-default select-none py-2 px-4 text-gray-700"
                >
                  Nothing found.
                </div>

                <ComboboxOption
                    v-for="person in filteredSupports"
                    as="template"
                    :key="person.id"
                    :value="person"
                    v-slot="{ selected, active }"
                >
                  <li
                      class="relative cursor-pointer select-none py-2 pl-10 pr-4"
                      :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active,
                }"
                  >
                <span
                    class="block truncate"
                    :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ person.name }}
                </span>
                    <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                        :class="{ 'text-white': active, 'text-teal-600': !active }"
                    >
                  <Icon name="mdi:check"/>
                </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </TransitionRoot>
          </div>
        </Combobox>
      </div>
    </div>
  </section>
</template>