import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Popular from '../views/movies/popular.vue'
import Nowplaying from '../views/movies/now_playing.vue'
import Toprated from '../views/movies/top_rated.vue'
import Upcoming from '../views/movies/upcoming.vue'

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

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
