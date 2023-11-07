<script setup lang="ts">
import {deleteUser, GoogleAuthProvider, signInWithPopup} from "@firebase/auth";
import {getAuth} from "firebase/auth";
import {ref} from "vue";
import {collection, getDocs, getFirestore} from "@firebase/firestore";

const auth = getAuth()!;

const user = useCurrentUser()
const db = getFirestore()

const provider = new GoogleAuthProvider();

const authorizedId = ref("")

const getAuthDoc = async () => {
  const docRef = collection(db, "authorized");
  const docSnap = await getDocs(docRef);


  authorizedId.value = docSnap.docs[0].data().id
}

async function signInWithGoogle() {

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    if (user.uid == authorizedId.value) {
      navigateTo("/admin")
    } else {
      await deleteUser(user)
      navigateTo("/")
    }

  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  getAuthDoc()
})
</script>

<template>
  <section class="h-[calc(100vh-78px)] flex items-center justify-center">
      <button class="flex items-center gap-4 py-2 px-4 rounded-lg bg-white uppercase font-semibold dark:bg-zinc-700 dark:text-white" @click="signInWithGoogle"><Icon size="20" name="logos:google-icon"/><span>Sign In</span></button>
  </section>
</template>