import {collection, getDocs, getFirestore} from "@firebase/firestore";
import type CharacterType from "~/utils/types/characterType";
import {useCharacterStore} from "~/stores/characters";

async function getCharacters(): Promise<void> {
    const db = getFirestore()
    const characterStore = useCharacterStore()

    const {characters, filteredCharacters} = storeToRefs(characterStore)

    const data = await getDocs(collection(db, "characters"))

    let tempArr: CharacterType[] = []

    data.forEach((doc): void => {
        tempArr.push(doc.data() as CharacterType)
    })

    characters.value = tempArr
    filteredCharacters.value = characters.value
}

export default getCharacters