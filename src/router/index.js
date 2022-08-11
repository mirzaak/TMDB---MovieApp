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
import Tvdetails from '../views/Tvdetails.vue'

import AlternativeTitles from '../components/Moviedetails/Alternativetitles.vue'
import CastAndCrew from '../components/Moviedetails/CastAndCrew.vue'
import ReleaseDates from '../components/Moviedetails/ReleaseDates.vue'
import Translations from '../components/Moviedetails/Translations.vue'

import Backdrops from '../components/Moviedetails/MediaBackdrops.vue'
import Logos from '../components/Moviedetails/MediaLogos.vue'
import Posters from '../components/Moviedetails/MediaPosters.vue'
import MediaVideos from '../components/Moviedetails/MediaVideos.vue'
import Reviews from '../components/Moviedetails/Reviews.vue'

import AlternativeTitlesTv from '../components/Tvdetails/Alternativetitles.vue'
import CastAndCrewTv from '../components/Tvdetails/CastAndCrew.vue'
import TranslationsTv from '../components/Tvdetails/Translations.vue'

import BackdropsTv from '../components/Tvdetails/MediaBackdrops.vue'
import LogosTv from '../components/Tvdetails/MediaLogos.vue'
import PostersTv from '../components/Tvdetails/MediaPosters.vue'
import MediaVideosTv from '../components/Tvdetails/MediaVideos.vue'
import ReviewsTv from '../components/Tvdetails/Reviews.vue'
import Seasons from '../components/Tvdetails/Seasons.vue'
import Season from '../components/Tvdetails/Season.vue'

import Profile from '../views/Profile.vue'
import Watchlist from '../views/Watchlist.vue'
import Ratings from '../views/Ratings.vue'

import Search from '../views/Search.vue'
import Searched from '../views/Searched.vue'

import Actordetails from '../views/Actordetails.vue'
import ActorChanges from '../views/ActordetailsFile/ActorChanges.vue'
import ActorTranslations from '../views/ActordetailsFile/ActorTranslations.vue'

import People from '../views/People.vue'
import PeoplePage from '../views/PeoplePage.vue'


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
  {
    path: '/tv/:id',
    name: 'Tvdetails',
    component: Tvdetails
  },
  {
    path: '/tv/:id/titles',
    name: 'AlternativeTitlesTv',
    component: AlternativeTitlesTv
  },
  {
    path: '/tv/:id/cast',
    name: 'CastAndCrewTv',
    component: CastAndCrewTv
  },
  {
    path: '/tv/:id/translations',
    name: 'TranslationsTv',
    component: TranslationsTv
  },

  {
    path: '/tv/:id/backdrops',
    name: 'BackdropsTv',
    component: BackdropsTv
  },
  {
    path: '/tv/:id/logos',
    name: 'LogosTv',
    component: LogosTv
  },
  {
    path: '/tv/:id/posters',
    name: 'PostersTv',
    component: PostersTv
  },
  {
    path: '/tv/:id/videos',
    name: 'MediaVideosTv',
    component: MediaVideosTv
  },
  {
    path: '/tv/:id/reviews',
    name: 'ReviewsTv',
    component: ReviewsTv
  },
  {
    path: '/tv/:id/seasons',
    name: 'Seasons',
    component: Seasons
  },
  {
    path: '/tv/:id/season/:s',
    name: 'Season',
    component: Season
  },
  {
    path: '/u/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/u/:id/watchlist',
    name: 'Watchlist',
    component: Watchlist
  },
  {
    path: '/u/:id/ratings',
    name: 'Ratings',
    component: Ratings
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/search/:query',
    name: 'Searched',
    component: Searched
  },
  {
    path: '/search/:query',
    name: 'Searched',
    component: Searched
  },
  {
    path: '/search/:query',
    name: 'Searched',
    component: Searched
  },
  {
    path: '/search/:query',
    name: 'Searched',
    component: Searched
  },
  {
    path: '/person/:id',
    name: 'Actordetails',
    component: Actordetails
  },
  {
    path: '/person/:id/translations',
    name: 'ActorTranslations',
    component: ActorTranslations
  },
  {
    path: '/person/:id/changes',
    name: 'ActorChanges',
    component: ActorChanges
  },
  {
    path: '/people',
    name: 'People',
    component: People
  },
  {
    path: '/people/:page',
    name: 'PeoplePage',
    component: PeoplePage
  },
]

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
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
