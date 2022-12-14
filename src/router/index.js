import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserProfile from '../views/UserProfile.vue'

Vue.use(VueRouter)

const routes = [{
        name: "LoginPage",
        path: "/Login",
        component: Login
    },
    {
        name: "UserProfile",
        path: "/UserProfile/:id",
        component: UserProfile
    }, {
        name: "HomePage",
        path: "/",
        component: Home,
    }, {
        name: "RegisterPage",
        path: "/Register",
        component: Register
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router