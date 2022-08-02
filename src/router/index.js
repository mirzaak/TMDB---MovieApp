import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "../stores/user.js";

import Home from '../views/Home.vue'
import Popular from '../views/movies/popular.vue'
import Nowplaying from '../views/movies/now_playing.vue'
import Toprated from '../views/movies/top_rated.vue'
import Upcoming from '../views/movies/upcoming.vue'

import PopularTV from '../views/tv/popular.vue'
import AiringtodayTV from '../views/tv/airing_today.vue'
import OnTV from '../views/tv/on_tv.vue'
import TopratedTV from '../views/tv/top_rated.vue'

import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/popular',
    name: 'Popular',
    component: Popular
  },
  {
    path: '/now_playing',
    name: 'Nowplaying',
    component: Nowplaying
  },
  {
    path: '/top_rated',
    name: 'Toprated',
    component: Toprated
  },
  {
    path: '/upcoming',
    name: 'Upcoming',
    component: Upcoming
  },
  {
    path: '/tv/popular',
    name: 'PopularTV',
    component: PopularTV
  },
  {
    path: '/tv/airing_today',
    name: 'AiringtodayTV',
    component: AiringtodayTV
  },
  {
    path: '/tv/on_tv',
    name: 'OnTV',
    component: OnTV
  },
  {
    path: '/tv/top_rated',
    name: 'TopratedTV',
    component: TopratedTV
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(async(to, from) => {
const store = useUserStore()
  if(store.sesija && to.name == 'Login'){
    return { name: 'Home' }
  } 
  
})
export default router
