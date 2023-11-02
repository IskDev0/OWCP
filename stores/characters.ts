import { defineStore } from "pinia"
import type CharacterType from "~/utils/types/characterType";

export const useCharacterStore = defineStore("characters", () => {

    const characters = ref<CharacterType[]>([])

    const searchQuery = ref<string>("")

    const currentCharacter = ref<CharacterType>()

    const clearStore = ():void => {
        currentCharacter.value = {
            role: "",
            name: "",
            img: "",
            dps: [],
            tanks: [],
            supports: []
        }
    }

    return {
        characters, searchQuery, currentCharacter, clearStore
    }

})