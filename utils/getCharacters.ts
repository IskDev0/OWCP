import {collection, getDocs, getFirestore} from "@firebase/firestore";
import type CharacterType from "~/utils/types/characterType";
import {useCharacterStore} from "~/stores/characters";

async function getCharacters(): Promise<void> {
    const db = getFirestore()
    const characterStore = useCharacterStore()

    const {characters} = storeToRefs(characterStore)

    const data = await getDocs(collection(db, "characters"))
    data.forEach((doc): void => {
        characters.value.push(doc.data() as CharacterType)
    })
}

export default getCharacters