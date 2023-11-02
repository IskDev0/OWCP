import {getDownloadURL, ref as storageRef} from "firebase/storage";

async function loadImagesURL(characterList:string[], urlArray:Ref<string[]>):Promise<void> {

    const storage = useFirebaseStorage()

    const promises : Promise<string>[] = characterList.map(async (character : string) : Promise<string> => {
        const pathReference = storageRef(storage, `images/${character.toLowerCase()}.png`);
        return await getDownloadURL(pathReference);
    });

    urlArray.value = await Promise.all(promises);
}

export default loadImagesURL