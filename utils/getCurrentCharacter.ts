import {collection, getDocs, getFirestore, where, query} from "@firebase/firestore";
import type CharacterType from "~/utils/types/characterType";

async function getCurrentCharacter(): Promise<void> {
    const db = getFirestore();
    const characterStore = useCharacterStore();
    const route = useRoute();

    const { currentCharacter } = storeToRefs(characterStore);

    const collectionRef = collection(db, "characters");

    const q = query(collectionRef, where("name", "==", route.params.id));

    const querySnapshot = await getDocs(q);

    let tempArray: unknown = {};
    querySnapshot.forEach((doc):void => {
        tempArray = doc.data();
    });
    currentCharacter.value = tempArray as CharacterType;
}

export default getCurrentCharacter