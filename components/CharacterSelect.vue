<script setup lang="ts">
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

defineProps({
  modelValue: {
    type: Object,
  },
  filteredArray: {
    type: Array,
  },
  searchQuery: {
    type: String,
  },
  selected: {
    type: Object
  }
})
const emit = defineEmits(['update:modelValue', 'updateQuery'])
</script>

<template>
  <Listbox :modelValue="selected" @update:modelValue="emit('update:modelValue', $event)">
    <div class="relative mt-1">
      <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm dark:bg-zinc-600 dark:text-white"
      >
        <span class="block truncate">{{ selected?.name }}</span>
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
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm dark:bg-zinc-600"
        >
          <ListboxOption
              v-slot="{ active, selected }"
              v-for="person in filteredArray"
              :key="person.name"
              :value="person"
              as="template"
          >
            <li
                :class="[
                  active ? 'bg-zinc-400 text-white' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4 dark:text-white',
                ]"
            >
                <span
                    :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >{{ person.name }}</span
                >
              <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-white"
              >
                 <Icon name="mdi:check"/>
                </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>