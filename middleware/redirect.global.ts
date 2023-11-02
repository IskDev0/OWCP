export default defineNuxtRouteMiddleware((to, from) => {
    const characterStore = useCharacterStore()

    characterStore.clearStore()
})
