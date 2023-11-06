<script setup lang="ts">
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot
} from "@headlessui/vue";

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
  <Combobox :value="modelValue" @update:modelValue="value => emit('update:modelValue', value)">
    <div class="relative mt-1">
      <div
          class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
      >
        <ComboboxInput
            class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            :displayValue="character => character.name"
            @change="emit('updateQuery', $event.target.value)"
            :value="selected?.name"
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
          @after-leave="emit('updateQuery', '')"
      >
        <ComboboxOptions
            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          <div
              v-if="filteredArray!.length === 0 && searchQuery !== ''"
              class="relative cursor-default select-none py-2 px-4 text-gray-700"
          >
            Nothing found.
          </div>

          <ComboboxOption
              v-for="character in filteredArray"
              as="template"
              :key="character.id"
              :value="character"
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
                  {{ character.name ? character.name : character }}
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
</template>