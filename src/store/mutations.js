export default {
    setUser(state, user) {
        state.users = user
    },
    logOut: (state) => {
        state.users = null
        localStorage.removeItem("token")
    }
}