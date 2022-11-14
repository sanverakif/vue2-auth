export default {
    authenticated: state => state.users !== null,
    users: state => state.users
}