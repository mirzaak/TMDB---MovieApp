<template>
<div class="header">
<h1>Popular Movies</h1>
</div>
<div class="all" >
<div class="content">
<div class="left">
<div class="filteri">
<div class="filterone filter" :class="{ active: isActiveOne }"  @click="expandone">
<div class="filterhead">
<h2>Sort</h2>
<img class="strelica" src="../../assets/strelica.svg" alt="">
</div>
</div>
<div class="filteronecontent">
<p>Sort Results By</p>
<select name="" id="" v-model="sort" @change="toggleSubmitBlue">
<option value="popularity.asc" @click.prevent="ascending">Popularity Ascending</option>
<option value="popularity.desc" @click.prevent="descending">Popularity Descending</option>
<option value="vote_average.asc" @click.prevent="ratingasc">Rating Ascending</option>
<option value="vote_average.desc" @click.prevent="ratingdesc">Rating Descending</option>
<option value="release_date.asc" @click.prevent="rdasc">Release Date Ascending</option>
<option value="release_date.desc" @click.prevent="rddesc">Release Date Descending</option>
<option value="original_title.asc" @click.prevent="titleasc">Title (A-Z)</option>
<option value="original_title.desc" @click.prevent="titledesc">Title (Z-A)</option>
</select>
</div>
<div class="filtertwo filter" @click="expandtwo" :class="{ active: isActiveTwo }">
<div class="filterhead">
<h2>Filters</h2>
<img class="strelica" src="../../assets/strelica.svg" alt="">
</div>
</div>
<div class="filtertwocontent">
<div class="contentfilter">
<span class="qMark"><p>Show Me</p><span class="markHover"><img class="questionMark" src="../../assets/questionMark.svg" alt=""><span class="tooltipqMark">Login to filter items you've watched.<div class="tip"></div></span></span></span>
<label class="container" @click="toggleSubmitBlue">
  <input type="radio" name="radio">
  <span class="checkmark"></span>
  Everything
</label><label class="container" @click="toggleSubmitBlue">
  <input type="radio" name="radio">
  <span class="checkmark"></span>
  Movies I Haven't Seen
</label><label class="container" @click="toggleSubmitBlue">
  <input type="radio" name="radio">
  <span class="checkmark"></span>
  Movies I Have Seen
</label>
</div>
<div class="contentfilter">
<p>Avaliabilities</p>
<label class="jedan">
  <input type="checkbox" checked="checked">
  <span class="dva"></span>
  Search all avaliabilities?
</label>
</div>
<div class="contentfilter">
<p>Release Date</p>
<label class="jedan">
  <input type="checkbox" checked="checked">
  <span class="dva"></span>
  Search all releases?
</label>
<label for=""><label for="">From</label><input class="from" type="date" @change="toggleSubmitBlue" v-model="odGodina"></label>
<label for=""><label for="">To</label><input  class="to" type="date" @change="toggleSubmitBlue" v-model="doGodina"></label>
</div>
<div class="contentfilter">
<p>Genres</p>
<div class="zanrovi">
<div class="genre" v-for="(oneZanr) in genress" :key="oneZanr">
<a href="#" class="genres" :class="{selected: oneZanr.toggle}" @click.prevent="zanr(oneZanr)">{{oneZanr.name}}</a>
</div>
</div>
</div>
<div class="contentfilter">
<p>Certification</p>
</div>
<div class="contentfilter">
<span class="qMark"><p>Language</p><span class="markHover"><img class="questionMark" src="../../assets/questionMark.svg" alt=""><span class="tooltipqMark">No Database for languages <div class="tipTwo"></div></span></span></span>
</div>
<div class="contentfilter">
<p>User Score</p>
      <div class="slider">
        <div class="progress" @click="uScore"></div>
      </div>
      <div class="range-input" ref="rangeInput">
        <input type="range" ref="rangeone" class="range-min" min="0" max="10"  v-model="uScoreOne" @input="gap" @change="toggleSubmitBlue">
        <input type="range" ref="rangetwo" class="range-max" min="0" max="10"   v-model="uScoreTwo" @input="gapTwo" @change="toggleSubmitBlue">
      <div class="uscoreBack">
        <p>0</p><p>5</p><p>10</p>
      </div>
      </div>
</div>
<div class="contentfilter">
<p>Minimum User Votes</p>
      <div class="slider">
        <div class="progress" @click="uScore"></div>
      </div>
      <div class="range-input">
        <input type="range" ref="rangeone" class="range-min" min="0" max="500"  v-model="votemin" @change="toggleSubmitBlue">
      <div class="uscoreBack">
        <p>0</p><p>250</p><p>500</p>
      </div>
      </div>
</div>
<div class="contentfilter">
<p>Runtime</p>
      <div class="slider">
        <div class="progress" @click="uScore"></div>
      </div>
      <div class="range-input">
        <input type="range" ref="rangeone" class="range-min" min="0" max="360"  v-model="minRuntime" @input="gapRuntime" @change="toggleSubmitBlue">
        <input type="range" ref="rangetwo" class="range-max" min="0" max="360"  v-model="maxRuntime" @input="gapTwoRuntime" @change="toggleSubmitBlue">
      <div class="uscoreBack">
        <p>0</p><p>120</p><p class="trisest">240</p><p class="trisest">360</p>
      </div>
      </div>
</div>
<div class="contentfilter">
<p for="">Keywords</p>
<input class="keywords" type="text" v-model="keywords" placeholder="Filter by keywords...">
</div>
</div>





<div class="filterthree filter" @click="expandthree" :class="{ active: isActiveThree }">
<div class="filterhead">
<h2>What To Watch</h2>
<img class="strelica" src="../../assets/strelica.svg" alt="">
</div>
</div>
<div class="filterthreecontent">
<div class="contentfilter">
<span class="qMark"><p>Show Me</p><span class="markHover"><img class="questionMark" src="../../assets/questionMark.svg" alt=""><span class="tooltipqMark">Login to filter items you've watched.<div class="tipThree"></div></span></span></span>
<label class="jedan">
  <input type="checkbox" checked="checked">
  <span class="dva"></span>
  Restrict searches to my subsrcribed servies?
</label>
</div>
<div class="contentfilter">
<p for="">Country</p>
<select @change="region" name="region" v-model="regionData">
<option v-for="aRegion in avaliableRegions" :key="aRegion">{{aRegion.iso_3166_1}}</option>
</select>
<div class="wProviders">
<div class="providers" v-for="provider in wProviders.results" :key="provider" :class="{selectedProvider: provider.aa}">
  <img class="providerimg"  :src=" slika + provider.logo_path" alt="" @change="selectProvider(provider.provider_name)" @click="toggleSubmitBlue">
</div>
</div>
</div>
</div>
<button class="submit" :class="{submitBlue: submitBlue}" @click="submit" ref="submitButton">Search</button>

</div>
</div>

<div class="right" ref="right">
    <div class="movies" v-if="popular">
        <div class="movie"  v-for="(movie) in popular.results" :key="movie">
            <img v-if="!storeUser.sesija" class="morebutton" ref="morebutton" @click="more(movie)" src="../../assets/cirlceDots.svg" alt="">

            <div v-if="!storeUser.sesija" class="more" :class="{activeMore:movie.active}">
                <p>Want to rate or add this item to a list?</p>
                <a @click="toLogin()">Login<img src="../../assets/strelica.svg" alt=""></a>
            <div class="line"></div>
            <p>Not a member?</p>
            <a href="https://www.themoviedb.org/signup">Sign up and join the community<img src="../../assets/strelica.svg" alt=""></a>
            </div>

            <img v-if="storeUser.sesija" class="morebutton" ref="morebutton" @click="moreSession(movie)" src="../../assets/cirlceDots.svg" alt="">

            <div v-if="storeUser.sesija" class=" moreWithSession" :class="{activeMore:movie.active}">
                <a @click="addList()"><img class="icon" src="../../assets/list.svg" alt="">Add To List</a>
                <div v-if="toggleLists" class="lists"><a href="https://www.themoviedb.org/list/new">+ Create New List</a></div>
                <a  @click="postFav(movie.id)"><img class="icon" src="../../assets/heart.svg" alt="" v-if="!fMoviesIds.includes(movie.id)"><img class="icon" v-if="fMoviesIds.includes(movie.id)" src="../../assets/favorite.svg" alt="">Favourite</a>
                <a @click="postWatchlist(movie.id)"><img class="icon" src="../../assets/bookmark.svg" alt="" v-if="!wMoviesIds.includes(movie.id)"><img img class="icon" v-if="wMoviesIds.includes(movie.id)" src="../../assets/watchlist.svg" alt="">Watchlist</a>
                <a @click="rate(movie)"><img class="icon" src="../../assets/star.svg" alt="" v-if="!movieRating"><img v-if="movieRating" src="../../assets/rated.svg" alt="">Your Rating</a>
                <div v-if="movie.rate"  class="stars" id="stars" ><img class="removeRate" @click="removeRate(movie,'movie')" src="../../assets/rateMinus.svg" alt=""><star-rating @click="postRate(movie)" :border-width="2" :increment="1" :star-size="20" :show-rating="false" v-model:rating="movie.rating" :max-rating="10"></star-rating></div>
            </div>

            <div class="moreback" >
                <img v-if="movie.poster_path" class="movieposter" :src="store.img + 'w154' + movie.poster_path" alt="" @click="toMovie(movie.id)" width="154">
                <img v-if="!movie.poster_path" class="movieposter" src="../../assets/noImage.svg" alt="" @click="toMovie(movie.id)" width="154">
                <div class="card">
                    <span class="progressBar"><circle-progress :percent="movie.vote_average * 10" :border-width="3" :border-bg-width="9" fill-color="#90cea1" empty-color="none" background="#081c22" :size="40" /><p class="midPercent">{{movie.vote_average * 10}}%</p></span>
                    <h2><a href="#" @click="toMovie(movie.id)">{{movie.original_title}}</a></h2>
                    <p class="pDate">{{movie.release_date}}</p>
                </div>
            </div>
            <div class="movieback" :class="{activeMovieback:movie.active}"></div>
        </div>
    </div>
</div>

</div>
<button @click="loadMore" class="loadmore">Load More</button>
</div>

<div v-if="stickyActive" ref="stickyRef" class="stickySubmit" @click="submit">Search</div>
</template>

<script setup>
import "vue3-circle-progress/dist/circle-progress.css";


import StarRating from 'vue-star-rating'

import { useRouter, useRoute } from 'vue-router'

import {ref, onMounted, onUnmounted} from 'vue';

import "vue3-circle-progress/dist/circle-progress.css";

import CircleProgress from "vue3-circle-progress";

import axios from 'axios'

import { useDataStore } from "../../stores/data.js";

import $ from "jquery";

import { useUserStore } from "../../stores/user.js";

const storeUser = useUserStore();

const store = useDataStore();
  const route = useRoute()
  const router = useRouter()
  const popular = ref([])
  const morePopular = ref([])
  let number = 2
  const slika = ref('https://image.tmdb.org/t/p/original/')
  const movie = ref('')
  const slikaProfile = ref('https://image.tmdb.org/t/p/w185/')
  let isActiveOne = ref(false)
  let isActiveTwo = ref(false)
  let isActiveThree = ref(false)
  let sort = ref('popularity.desc')
  let odGodina = ref('')
  let doGodina = ref('')
  let keywords = ref([])
  let sProvider = ref('')
  let wProviders = ref('')
  let avaliableRegions = ref([])
  const regionData = ref('AE')
  let active = ref(false)
  let activeMovies = ref([])
  let uScoreOne = ref(0)
  let uScoreTwo = ref(10)
  let votemin = ref(0)
  let minRuntime = ref(0)
  let maxRuntime = ref(360)
  let submitData = ref([])
  const genress = ref([])
  const genre = ref([])
  let filterTrue = ref(false)
  const right = ref(null)
  const submitBlue = ref(false)
  const stickyActive = ref(false)
  const stickyRef = ref(null)
  const submitButton = ref(null)
  const movieRating = ref()
  const toggleRating = ref(false)
  const toggleLists = ref(false)

    const otherData = ref([])

    const wMovies = ref([])
    const wTV = ref([])
    const favMovies = ref([])
    const favTV = ref([])
    const rMovies = ref([])
    const rTV = ref([])
    const averageMRateFinal = ref()
    const averageTRateFinal = ref()

    const ratedTVs = ref([])
    const averageMRate = ref([])
    const averageTRate = ref([])
    const rejtedMovies= ref([])
    const watchlistMovies = ref([])
    const watchlistTV = ref([])
    const favouriteMovies = ref([])
    const favouriteTV = ref([])
    const ratedMovies = ref([])
    const wMoviesIds = ref([])

    const ratedTV = ref([])
    const movieLength = ref([])
     const fMoviesIds = ref([])
  const toggleSubmitBlue = () => {
          submitBlue.value = true
          window.addEventListener("scroll", handleSticky)
  }

  const loadData = async() => {
    try{
      let popularData = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page=1')
      popular.value = await popularData.data

    }
    catch(err){}
  }
    const loadOtherData = async() => {

      let movieData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+storeUser.sesija+'&page=1')
      let tvData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/watchlist/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+storeUser.sesija+'&page=1')
      let favMoviesData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+storeUser.sesija+'&language=en-US&page=1')
      let favTvData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/favorite/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+storeUser.sesija+'&language=en-US&&page=1')
      let rMovies = await axios.get('https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+storeUser.sesija+'&page=1')
      let rTVs = await axios.get('https://api.themoviedb.org/3/account/{account_id}/rated/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+storeUser.sesija+'&page=1')
      ratedMovies.value = rMovies.data.results
      watchlistMovies.value = movieData.data.results
     otherData.value = await movieData.data.results
        movieLength.value = await movieData.data.results.length
        favouriteMovies.value = await favMoviesData.data.results

    for(let i = 0; ratedMovies.value.length > i ; i++){

        averageMRate.value.push(ratedMovies.value[i].rating)
        console.log(averageMRate.value,'sum')
    }

        averageMRate.value = averageMRate.value.reduce((a, b) => a + b, 0)
        averageMRate.value = averageMRate.value / ratedMovies.value.length
        averageMRate.value = averageMRate.value * 10
        averageMRate.value = Math.round(averageMRate.value)
        averageMRateFinal.value = averageMRate.value

    for(let i = 0; ratedTVs.value.length > i ; i++){

        averageTRate.value.push(ratedTVs.value[i].rating)
    }

        averageTRate.value = averageTRate.value.reduce((a, b) => a + b, 0)
        averageTRate.value = averageTRate.value / ratedTVs.value.length
        averageTRate.value = averageTRate.value * 10
        averageTRate.value = Math.round(averageTRate.value)
        averageTRateFinal.value = averageTRate.value


    console.log(rejtedMovies.value,'aaaaaaaaaaaaaaaaaaaaaaaa')
    for(let i = 0; favouriteMovies.value.length > i; i++){
        fMoviesIds.value.push(favouriteMovies.value[i].id)


    }
    for(let i = 0; watchlistMovies.value.length > i; i++){
        wMoviesIds.value.push(watchlistMovies.value[i].id)


    }
for(let i = 0;otherData.value.length>i;i++){
otherData.value[i].rating = 0
}

    }
  const loadMore = async() => {
    try{

      let moreData = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page='+number++)
      morePopular.value = await moreData.data
      popular.value.results = popular.value.results.concat(morePopular.value.results)

    }
    catch(err){}
    window.addEventListener("scroll",handleScroll)
  }

  const submit = async() => {
          try{
            let submitData = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&sort_by='+sort.value+'&include_adult=false&include_video=false&page=1&primary_release_date.gte='+odGodina.value+'&primary_release_date.lte='+doGodina.value+'&vote_average.gte='+uScoreOne.value+'&vote_average.lte='+uScoreTwo.value+'&watch_region='+regionData.value+'&with_watch_providers='+sProvider.value+'&with_genres='+genre.value+'&with_keywords='+keywords.value+'&vote_count.gte='+votemin.value+'&with_runtime.gte='+minRuntime.value+'&with_runtime.lte='+maxRuntime.value)
            popular.value = await submitData.json()
          }
          catch(err){}
      }

  const selectProvider = (provider) =>{
        sProvider = provider
        submitBlue.value = true
      }

  const region = async() => {
    try{
      let chooseRegionData = await axios.get('https://api.themoviedb.org/3/watch/providers/movie?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&watch_region='+regionData.value)
      wProviders.value = await chooseRegionData.data
    }
    catch(err){}
  }

  const expandone = () => {var acc = document.getElementsByClassName("filter");
var i;
for (i = 0; i < acc.length; i++) {
    isActiveOne.value = !isActiveOne.value
    var panel = acc[0].nextElementSibling;
    if (panel.style.display === "flex") {
      panel.style.display = "none";
    } else {
      panel.style.display = "flex";
    }
  ;
}}

  const expandtwo = () => {
var acc = document.getElementsByClassName("filter");
var i;
    isActiveTwo.value = !isActiveTwo.value
for (i = 0; i < acc.length; i++) {
    var panel = acc[1].nextElementSibling;
    if (panel.style.display === "flex") {
      panel.style.display = "none";
    } else {
      panel.style.display = "flex";
    }
  ;
}}

  const expandthree = () => {
var acc = document.getElementsByClassName("filter");
var i;
    isActiveThree.value = !isActiveThree.value
for (i = 0; i < acc.length; i++) {
    var panel = acc[2].nextElementSibling;
    if (panel.style.display === "flex") {
      panel.style.display = "none";
    } else {
      panel.style.display = "flex";
    }
  ;
}}

 const gap = () => {
   let gapUs = 1
    if(uScoreTwo.value - uScoreOne.value <= gapUs){
      uScoreOne.value = uScoreTwo.value - gapUs
    }
 }

 const gapTwo = () => {
    let gapUs = 1
    if(uScoreTwo.value - uScoreOne.value <= gapUs){
      uScoreTwo.value = +uScoreOne.value + +gapUs
    }
  }

  const gapRuntime = () => {
    let gap = 30
    if(maxRuntime.value-minRuntime.value <= gap){
      minRuntime.value = maxRuntime.value - gap
    }
 }

 const gapTwoRuntime = () => {
   let gap = 30
    if(maxRuntime.value-minRuntime.value<=gap){
      maxRuntime.value = +minRuntime.value + +gap
    }
  }

 const more = (movie) => {
      for(let i = 0;i < popular.value.results.length;i++){
      if(popular.value.results[i].active = true){
          popular.value.results[i].active = false}
    }
    movie.active = true
    $(document).mouseup(function(e) 
{
    var container = $(".more");

    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
      movie.active = false
    }
});
    }
 const moreSession = (movie) => {
      for(let i = 0;i < popular.value.results.length;i++){
      if(popular.value.results[i].active = true){
          popular.value.results[i].active = false}
    }
    movie.active = true
    $(document).mouseup(function(e) 
{
    var container = $(".moreWithSession");

    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
      movie.active = false
    }
});
    }


  const loadGenres = async() => {
    try{
      let genreData = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US')
      genress.value = await genreData.data.genres

      
    }
    catch(err){}
  }
  const zanr = (oneZanr) => {
        let i = genre.value.indexOf(oneZanr.id)
        if(genre.value.includes(oneZanr.id)){genre.value.splice(i,1)}else{genre.value.push(oneZanr.id)}
        oneZanr.toggle = !oneZanr.toggle
        toggleSubmitBlue()
      }

  const loadAvaliableRegions = async() => {
    try{
      let avaliableRegionsData = await axios.get('https://api.themoviedb.org/3/watch/providers/regions?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US')
      avaliableRegions.value = avaliableRegionsData.data.results
    }
    catch(err){}
  }
  
  const handleScroll = (e) => {
    let element = right.value
    if(element.getBoundingClientRect().bottom < window.innerHeight){
      loadMore()
    }
  }

  const handleSticky = () => {
          let submitElement = submitButton.value
          if(        submitElement.getBoundingClientRect().top >= 0 &&
        submitElement.getBoundingClientRect().left >= 0 &&
        submitElement.getBoundingClientRect().bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        submitElement.getBoundingClientRect().right <= (window.innerWidth || document.documentElement.clientWidth)){
            stickyActive.value = false
          }
          else{
            stickyActive.value = true
          }
  }
  
  const toMovie = (id) => {
        router.push({ name: 'Moviedetails', params: { id: id }}) 
  }
  const toLogin = () => {
        router.push({ name: 'Login'}) 
  }
    const rate =async(movie) => {
for(let i = 0;otherData.value.length>i;i++){
otherData.value[i].rate = false
}
movie.rate = true
$(document).mouseup(function(e) 
{
    var container = $(".stars");

    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        movie.rate = false
    }
});
      let rMovies = await axios.get('https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+storeUser.sesija+'&page=1')
    ratedMovies.value = await rMovies.data.results
for(let i = 0 ; ratedMovies.value.length > i ;i++){
    if(movie.id == ratedMovies.value[i].id){
        console.log(ratedMovies.value[i])
        movie.rating = ratedMovies.value[i].rating


    }
}

    }

    const postRate = async(movie) => {
 await axios.post('https://api.themoviedb.org/3/movie/'+movie.id+'/rating?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+storeUser.sesija, {
  "value": movie.rating,

  })
    }
    const removeRate = async(movie,tip) => {
 movie.rating = 0
        console.log(movie.rating,'after')
 await axios.delete('https://api.themoviedb.org/3/'+tip+'/'+movie.id+'/rating?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+storeUser.sesija,)
    }



    const addList =(movie) => {
toggleLists.value = true
$(document).mouseup(function(e) 
{
    var container = $(".lists");

    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        toggleLists.value = false
    }
});



    }
      const postWatchlist =(id) => {
try{    
let i = wMoviesIds.value.indexOf(id)
if(wMoviesIds.value.includes(id)){

    wMoviesIds.value.splice(i,1)
    console.log(wMoviesIds.value)
axios.post('https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+storeUser.sesija, {
  "media_type": "movie",
  "media_id": id,
  "watchlist": false
  })

}else{
        wMoviesIds.value.push(id)
    axios.post('https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+storeUser.sesija, {
  "media_type": "movie",
  "media_id": id,
  "watchlist": true
  })

}

    }
    catch(err){}
    }
      const postFav =(id) => {
try{    
let i = fMoviesIds.value.indexOf(id)
if(fMoviesIds.value.includes(id)){

    fMoviesIds.value.splice(i,1)
    console.log(fMoviesIds.value)
axios.post('https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+storeUser.sesija, {
  "media_type": "movie",
  "media_id": id,
  "favorite": false
  })

}else{
        fMoviesIds.value.push(id)
    axios.post('https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+storeUser.sesija, {
  "media_type": "movie",
  "media_id": id,
  "favorite": true
  })

}

    }
    catch(err){}
    }
  loadOtherData()
  loadAvaliableRegions()
  loadGenres()
  loadData()
if(store.sesija){
    loadRateData()
}
</script>

<style scoped>
.content{
    width: 1300px;
    height: 100%;
    display: flex;
    margin: auto;
    padding: 0;
    align-items: flex-start;
}
.left{
    width: 250px;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
}
.right{
    width: 1050px;
    min-height: 1506px;
    margin-top: 10px;
    align-items: flex-start;
}
.movieposter{
    width: 178px;
    height: 270px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    cursor: pointer;


    
}
.movie{
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-top: 0;
    margin-bottom: 30px;
    border-radius: 10px;
    position: relative;
}
.movies{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.header{
    width: 1300px;
    height: 50px;
    margin: auto;
}
.filter{
    border:1px solid lightgray;
    color: black;
    width: 250px;
    height: 50px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    font-size: 10px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 10px;
    cursor: pointer;
}
.filter h2{
    margin-left: 10px ;
}
.header h1{
    font-size: 23px;
}
.header{
    margin-top: 15px;
    margin-bottom: 10px;
    font-weight: 400;
    align-items: center;
    display: flex;
}
.strelica{
    display: flex;
    height: 15px;
    width: 15px;
    margin-right: 20px;
}
.card{
    display: flex;
    flex-direction: column;
    width: 178px;
    position: relative;
    margin-top: 10px;
}
.card a{
    text-decoration: none;
    color: black;
    padding: 0;
}
.card a:hover{
  color: #01b4e4;
}
.card h2{
  font-size: 1em;
  margin: 0;
  padding-left: 10px;
}
.pDate{
    font-weight: 400;
    color: gray;
    margin: 10px;
    margin-top: 0;
}
.filteronecontent select:hover{
    background: lightgray;
}
.contentfilter select:hover{
    background: lightgray;
}
.loadmore{
    width: 1030px;
    height: 50px;
    background: #01b4e4;
    border-radius: 5px;
    color: white;
    border: none;
    margin-left: 260px;
    margin-bottom: 20px;
}
.loadmore a{
 font-weight: bold;
 font-size: 25px;
 text-decoration: none;
 color: white;   
}
.submit{
    width: 250px;
    height: 44px;
    border-radius: 20px;
    border: none;
    font-weight: bold;
    color: white;
    margin-top: 20px;
    pointer-events: none;
    background: lightgray;
    font-size: 1.2em;
    color: gray;

}
.filteronecontent{
    background: white;
    border: 1px solid lightgray;
    width: 250px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    display: none;
    flex-direction: column;
    margin-bottom: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

}
.filteronecontent p{
    font-size: 15px;
    color: black;
    margin-left: 15px;
    margin-top: 15px;
    margin-bottom: 10px;
    font-weight: 400;
}
.filteronecontent select{
    width: 220px;
    height: 35px;
    background: #e4e7eb;
    align-self: center;
    border-radius: 5px;
    border: 0;
    margin-bottom: 10px;
    cursor: pointer;
}

.filterhead{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 250px;
    height: 50px;
    align-items: center;
    position: absolute;
}
.filterfilter{
    width: 250px;
    height: 400px;
    border: 1px solid lightgray;
    border-radius: 5px;
}
.filtertwocontent{
    background: white;
    border: 1px solid lightgray;
    width: 250px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    display: none;
    flex-direction: column;
    margin-bottom: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.filtertwocontent label{
    font-weight: 400;
    margin-left: 10px;
}
.filtertwocontent p{
    font-weight: 400;
    margin-left: 10px;
}
.contentfilter{
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid lightgray;
}
.filterthreecontent{
    background: white;
    border: 1px solid lightgray;
    width: 250px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    display: none;
    flex-direction: column;
    margin-bottom: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.active{
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-bottom: 0;
}
.container {
  display: block;
  position: relative;
  padding-left: 20px;
  cursor: pointer;
  font-size: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-bottom: 10px;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 15px;
  width: 15px;
  background-color: #eee;
  border-radius: 50%;
}

.container:hover input ~ .checkmark {
  background-color: #ccc;
}

.container input:checked ~ .checkmark {
  background-color: #01b4e4;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}
.container .checkmark:after {
 	top: 4px;
	left: 4px;
	width: 7px;
	height: 7px;
	border-radius: 50%;
	background: white;
}
.jedan {
  display: block;
  position: relative;
  padding-left: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.jedan input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.dva {
  position: absolute;
  top: 0;
  left: 0;
  height: 15px;
  width: 15px;
  border-radius: 5px;
}

.jedan:hover input ~ .dva {
  background-color: #ccc;
}

.jedan input:checked ~ .dva {
  background-color: #01b4e4;
}

.dva:after {
  content: "";
  position: absolute;
  display: none;
}

.jedan input:checked ~ .dva:after {
  display: block;
}

.jedan .dva:after {
  left:5px;
  top: 2px;
  width: 3px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.language{
    width: 230px;
    height: 35px;
    background: #e4e7eb;
    border-radius: 5px;
    border: 0;
    margin-bottom: 10px;
    margin-left: 10px;
    cursor: pointer;
}
.keywords{
    width: 220px;
    height: 35px;
    border-radius: 5px;
    border: 0;
    margin-bottom: 10px;
    margin-left: 10px;
    border: 1px solid lightgray;
    padding-left: 10px;
}
.filterthreecontent{
    background: white;
    border: 1px solid lightgray;
    width: 250px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    display: none;
    flex-direction: column;
    margin-bottom: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    font-weight: 400;
}
.contentfilter p{
    font-size: 15px;
    color: black;
    margin-left: 15px;
    margin-top: 15px;
    margin-bottom: 10px;
    font-weight: 400;
}
.filterthreecontent select{
    width: 220px;
    height: 35px;
    background: #e4e7eb;
    align-self: center;
    border-radius: 5px;
    border: 0;
    margin-bottom: 10px;
    cursor: pointer;
}
.filterthreecontent{
    background: white;
    border: 1px solid lightgray;
    width: 250px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    display: none;
    flex-direction: column;
    margin-bottom: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.filterthreecontent label{
    font-weight: 400;
    margin-left: 10px;
}
.filterthreecontent p{
    font-weight: 400;
    margin-left: 10px;
}
.from{
    margin-left: 40px;
    margin-bottom: 10px;
    height: 30px;
}
.to{
    margin-left: 58px;
    margin-bottom: 10px;
    height: 30px;
}
.range{
    height: 5px;
    accent-color: #01b4e4;
    margin-bottom: 15px;
}
.genres{
  text-decoration: none;
  background: white;
  color: black;
  border-radius: 50px;
  padding: 8px;
  font-size: 12px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  margin: 3px;
}
.zanrovi{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 5px;
    font-weight: 200;
}
.selected{
  border: none;
  color: white;
  background: #01b4e4;
  border: 1px solid #01b4e4;
}
.providerimg{
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
}
.providers{
  display: flex;
  flex-direction: row;
}
.wProviders{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

}
.all{
  width: 1300px;
  margin: auto;
  height: 100%;
}
.filteri{
  display: flex;
  align-self: flex-start;
  flex-direction: column;
}
.loadmore{
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
}
.questionMark{
  width: 16px;
  height: 16px;
  opacity: 0.4;
  margin-top: 15px;
  margin-left: 5px;
}
.qMark{
  display: flex;
  flex-direction: row;
  height: 50px;
  position: relative;
}
.tooltipqMark{
  font-weight: 300;
  height: 25px;
  background: #0d253f;
  position: absolute;
  bottom: 45px;
  right: 45px;
  color: white;
  align-items: center;
  border-radius: 5px;
  display: none;
  padding: 10px;
}
.tip{
    position: absolute;
    border: 10px solid transparent;
    border-top-color:#0d253f;
    bottom: -20px;
    left: 75px;

}
.tipTwo{
    position: absolute;
    border: 10px solid transparent;
    border-top-color:#0d253f;
    bottom: -20px;
    left: 67px;

}
.tipThree{
    position: absolute;
    border: 10px solid transparent;
    border-top-color:#0d253f;
    bottom: -20px;
    left: 70px;

}
.markHover{
  width: 10px;
  height: 10px;
}
.markHover:hover .tooltipqMark{
  display: flex;
}
.from{
  border-radius: 5px;
  border: 1px solid lightgray;
}
.to{
  border-radius: 5px;
  border: 1px solid lightgray;
}
.movieback{
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  display: flex;
}
.moreback{
  overflow: hidden;
  border-radius: 10px;
}
.more{
  width: 300px;
  background: white;
  position: absolute;
  z-index: 3;
  left: 15px;
  top: 35px;
  display: none;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 5px;
  overflow: hidden;
  padding: 10px 0 10px 0;
}
.moreWithSession{
  width: 120px;
  background: white;
  position: absolute;
  z-index: 3;
  left: 110px;
  top: 35px;
  display: none;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 10px 0 10px 0;
}
.moreWithSession a{
  display: flex;
  padding: 10px 0px 10px 10px;
  cursor: pointer;
  align-items: center;
  color: gray;
  text-decoration: none;
}
.icon{
    width: 15px;
    height: 15px;
    filter: invert(1);
    margin-right: 5px;
}
.more img{
  width: 15px;
  height: 15px;
  margin-top: 3px;
  margin-right: 5px;

}
.more p,a{
  padding-left: 0;
}
.more a{
  display: flex;
  width: 100%;
  padding: 10px 0px 10px 15px;
  cursor: pointer;
  align-items: center;
  color: gray;
  text-decoration: none;
}
.more p{
    margin: 0;
    padding: 10px 0px 10px 15px;

}
.more a:hover{
  background: #0d253f;
  color: white;
}
.moreWithSession a:hover{
  background: #0d253f;
  color: white;
}
.more a:hover img{
    filter: invert(1);
}
.line{
  border-top: 2px solid black;
  padding: 0;
  margin: 0;
  width: 100%;
  margin-top: 10px;
  

}
.morebutton{
  width: 25px;
  height: 25px;
  border-radius: 20px;
  position: absolute;
  opacity: 0.5;
  top: 8px;
  left: 145px;
  cursor: pointer;

}
.activeMore{
  display: flex;
}
.activeMovieback{

    position: absolute;
    top: 0;
    left: 0;


    backdrop-filter: blur(20px);
    width: 100%;
    height: 100%;
    border-radius: 10px;
    z-index: 2;
    transition: linear .1s;

}
.slider{
  height: 5px;
  position: relative;
  background: #ddd;
  border-radius: 5px;
  width: 215px;
  margin-left: 15px;
  margin-right: 20px;
}

.range-input{
  position: relative;
  margin-left: 12px;
  margin-right: 15px;
  margin-bottom: 20px;
}
.range-input input{
  position: absolute;
  width: 220px;
  height: 3px;
  top: -6px;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  z-index: 2;

}
input[type="range"]::-webkit-slider-thumb{
  height: 17px;
  width: 17px;
  border-radius: 50%;
  background: #01b4e4;
  pointer-events: auto;
  -webkit-appearance: none;
  box-shadow: 0 0 6px rgba(0,0,0,0.05);
  cursor: pointer;
  z-index: 5;
}
input[type="range"]::-moz-range-thumb{
  height: 17px;
  width: 17px;
  border: none;
  border-radius: 50%;
  background: #01b4e4;
  pointer-events: auto;
  -moz-appearance: none;
  box-shadow: 0 0 6px rgba(0,0,0,0.05);
  cursor: pointer;
  z-index: 5;
}
input[type="range"]::-webkit-slider-thumb:hover{
outline: 3px solid rgb(134, 217, 255);
}
.uscoreBack{
  display: flex;
  flex-direction: row;
  width:215px;
  position: absolute;
  justify-content: space-between;
  margin-bottom: 10px;
  left: 5px;
}
.uscoreBack p{
  margin: 0;
  color: lightgray;
  font-weight: 100;

}
.selectedProvider{
  border: 2px solid black;
}
.submitBlue{
  background:#01b4e4;
  pointer-events: all;
  cursor: pointer;
  color: white;
  font-weight: bold;
}
.submitBlue:hover{
  background: #0d253f;
}
.stickySubmit{
  width: 100%;
  height: 50px;
  background: #01b4e4;
  position: fixed;
  bottom: 0px;
  justify-content: center;
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  z-index: 2;
  font-weight: bold;
}
.stickySubmit:hover{
  background: #0d253f;
  cursor: pointer;
}
.progressBar{
  position: absolute;
  top: -40px;
  left: 8px;
  background: #081c22;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  border-radius: 40px;
}
.progressBar p{
  position: absolute;
  font-size: 0.6em;
  color: white;
  font-weight: bold;
}
.stars{
    padding: 0px 20px;
    height: 60px;
    background: #0d253f;
    position: absolute;
    margin-left: -90px;
    z-index: 5;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top:160px;
}
.stars img{
    filter: invert(1);
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
.lists a{
    color: white;
    font-weight: bold;
    text-decoration: none;
    z-index: 3;
}
.lists{
    width: 150px;
    height: 60px;
    background: #0d253f;
    position: absolute;
    margin-left: 120px;
    top: -1px;
    z-index: 12;
    display: flex;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    cursor: auto;
}
.removeRate{
  cursor: pointer;
}
</style>