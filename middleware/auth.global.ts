export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = await getCurrentUser()

    if (!user && to.path === "/admin"){
        return navigateTo("/login")
    }

    if(user && to.path === "/login"){
        return navigateTo("/admin")
    }
})
