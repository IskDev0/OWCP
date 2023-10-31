import { defineStore } from "pinia"
import type CharacterType from "~/utils/types/characterType";

export const useCharacterStore = defineStore("characters", () => {

    const characters = ref<CharacterType[]>([])

    return {
        characters
    }

})