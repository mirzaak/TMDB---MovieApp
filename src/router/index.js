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
import Moviedetails from '../views/Moviedetails.vue'

import AlternativeTitles from '../components/Moviedetails/Alternativetitles.vue'
import CastAndCrew from '../components/Moviedetails/CastAndCrew.vue'
import ReleaseDates from '../components/Moviedetails/ReleaseDates.vue'
import Translations from '../components/Moviedetails/Translations.vue'

import Backdrops from '../components/Moviedetails/MediaBackdrops.vue'
import Logos from '../components/Moviedetails/MediaLogos.vue'
import Posters from '../components/Moviedetails/MediaPosters.vue'
import MediaVideos from '../components/Moviedetails/MediaVideos.vue'
import Reviews from '../components/Moviedetails/Reviews.vue'


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
  {
    path: '/movie/:id',
    name: 'Moviedetails',
    component: Moviedetails
  },
  {
    path: '/movie/:id/titles',
    name: 'AlternativeTitles',
    component: AlternativeTitles
  },
  {
    path: '/movie/:id/cast',
    name: 'CastAndCrew',
    component: CastAndCrew
  },
  {
    path: '/movie/:id/releases',
    name: 'ReleaseDates',
    component: ReleaseDates
  },
  {
    path: '/movie/:id/translations',
    name: 'Translations',
    component: Translations
  },

  {
    path: '/movie/:id/backdrops',
    name: 'Backdrops',
    component: Backdrops
  },
  {
    path: '/movie/:id/logos',
    name: 'Logos',
    component: Logos
  },
  {
    path: '/movie/:id/posters',
    name: 'Posters',
    component: Posters
  },
  {
    path: '/movie/:id/videos',
    name: 'MediaVideos',
    component: MediaVideos
  },
  {
    path: '/movie/:id/reviews',
    name: 'Reviews',
    component: Reviews
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
