<template>
<div class="up">
    <div class="backContent">
    <div class="upContent">
        <img :src="profileImg" alt="">
    <div class="profileStatsUp">
        <h1>{{data.username}}</h1>
        <div class="statsUp">
<span class="percentageWrapUp"><div class="percentageUp"><circle-progress class="circleUp" :percent="averageMRateFinal" :size="70" fill-color="#90cea1" empty-color="none" :border-width="6" /><p v-if="averageMRateFinal" class="percentagebroj">{{averageMRateFinal}}%</p></div><a>Average Movies Score</a></span>
<span class="percentageWrapUp"><div class="percentageUp"><circle-progress class="circleUp" :percent="averageTRateFinal"  :size="70" fill-color="#90cea1" empty-color="none" :border-width="6" /><p v-if="averageTRateFinal" class="percentagebroj">{{averageTRateFinal}}%</p></div><a>Average TV Score</a></span>
        </div>
    </div>
</div>

    </div>

</div>

<div class="header">
        <span><div ><a>Overview</a> <div class="arrow"></div></div><div class="headerDropdown">
            <router-link :to="{ name: 'Profile', params: { id: id }}">Main</router-link>

            <a href="https://www.themoviedb.org/settings/profile">Edit Profile</a>
            </div></span>
        <span><router-link class="discc" :to="{ name: 'Ratings', params: { id: id }}">Ratings</router-link></span>
        <span><router-link class="discc overview" :to="{ name: 'Watchlist', params: { id: id }}">Watchlist</router-link></span>

</div>
<div class="downHeader">
    <div class="downHeaderLeft">
        <h2>My Watchlist</h2>
        <div class="downHeaderCircle"><img src="../ProfileAssets/triTacke.svg" alt=""></div>
        <a :class="{typeLinija:tip==='movies'}" @click="changeType('movies')">Movies<p>{{movieLength}}</p></a>
        <a :class="{typeLinija:tip==='tv'}" @click="changeType('tv')">TV <p>{{tvLength}}</p></a>
    </div>
    <div class="downHeaderRight">
    <a>Filter By:</a>
    <a>Date Added</a>
    <a>Order:</a>
    <p class="strelica" v-if="filterTip=='created_at.asc'" @click="filter('created_at.desc')">↑</p>
    <p class="strelica" v-if="filterTip=='created_at.desc'" @click="filter('created_at.asc')">↓</p>
    </div>
</div>
<div class="down">
    <div class="downContent"  >
        <div class="movies">
            <div class="movie" v-for="(movie) in otherData" :key="movie">
            <img :src="slika + movie.poster_path" alt=""><img v-if="movie.poster_path === null" src="../ProfileAssets/noImg.svg" alt="">
            <div class="movieInfo">
                <div class="prviRed" >
                <div class="percentage"><circle-progress class="circle" :percent="movie.vote_average*10" :size="60" fill-color="green" empty-color="none" :border-width="4" /><p class="percentagebroj">{{movie.vote_average.toString().substring(2,0)*10}}%</p></div>
                    <div class="prviRedText" >
                        <h2 v-if="movie.title"><a>{{movie.title}}</a></h2>
                        <h2 v-if="movie.name"><a>{{movie.name}}</a></h2>
                        <p v-if="movie.release_date">{{movie.release_date}}</p>
                        <p v-if="movie.first_air_date">{{movie.first_air_date}}</p>
                    </div>
                </div>
                <div class="desc" >
                    <p  >{{movie.overview}}</p>
                </div>
                
                <div class="actionBar">
                    <div v-if="tvData ==false" class="movieButtonA" ref="rejt" id="movieButton">
                        <span @click="rate(movie)" class="movieButtonCircle star"><img src="../ProfileAssets/star.svg" alt=""></span><a @click="rate(movie)">Your Rating</a>
                        <div  class="stars" id="stars" :class="{showStars:movie.rate}"><img @click="removeRate(movie,'movie')" src="../ProfileAssets/minus.svg" alt=""><star-rating @click="postRate(movie,'movie')" :border-width="2" :increment="1" :star-size="20" :show-rating="false" v-model:rating="movie.rating" :max-rating="10"></star-rating></div>
                    </div>
                    <div v-if="tvData" class="movieButtonA" ref="rejt" id="movieButton">
                        <span @click="rate(movie)" class="movieButtonCircle star"><img src="../ProfileAssets/star.svg" alt=""></span><a @click="rate(movie)">Your Rating</a>
                        <div  class="stars" id="stars" :class="{showStars:movie.rate}"><img @click="removeRate(movie,'tv')" src="../ProfileAssets/minus.svg" alt=""><star-rating @click="postRate(movie,'tv')" :border-width="2" :increment="1" :star-size="20" :show-rating="false" v-model:rating="movie.rating" :max-rating="10"></star-rating></div>
                    </div>
                    <div v-if="tvData == false" class="movieButton" @click="postFav(movie.id)">
                        <span ref="heart" :class="{heartPink:fMoviesIds.includes(movie.id)}" class="movieButtonCircle heart"><img src="../ProfileAssets/heart.svg" alt=""></span><a>Favourite</a>
                    </div>
                    <div v-if="tvData" class="movieButton" @click="postFav(movie.id)">
                        <span ref="heart" :class="{heartPink:fTVIds.includes(movie.id)}" class="movieButtonCircle heart"><img src="../ProfileAssets/heart.svg" alt=""></span><a>Favourite</a>
                    </div>
                    <div class="movieButtonC" @click="addList(movie)">
                        <span class="movieButtonCircle lines"><img src="../ProfileAssets/lines.svg" alt=""></span><a>Add To List</a>
                        <div class="lists" id="list" :class="{showList:movie.list}"><a href="https://www.themoviedb.org/list/new">+ Create New List</a></div>
                        
                    </div>
                    <div v-if="tvData == false" class="movieButton" @click="deleteIndex(movie.id)">
                        <span class="movieButtonCircle x"><img src="../ProfileAssets/x.svg" alt=""></span><a>Remove</a>
                    </div>
                    <div v-if="tvData" class="movieButton" @click="deleteIndex(movie.id)">
                        <span class="movieButtonCircle x"><img src="../ProfileAssets/x.svg" alt=""></span><a>Remove</a>
                    </div>

                </div>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import $ from 'jquery'
import StarRating from 'vue-star-rating'
import WatchlistTv from '../views/WatchlistComponents/WatchlistTv.vue'
import WatchlistMovies from '../views/WatchlistComponents/WatchlistMovies.vue'
import { useRouter, useRoute } from 'vue-router'
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
import axios from 'axios'
import { ref, shallowRef,computed } from 'vue'
import { useUserStore } from "../stores/user.js";

    const router = useRouter()
    const route = useRoute()

    const store = useUserStore()

    const slika = ref('https://image.tmdb.org/t/p/original/')
    const data = ref([])
    const otherData = ref([])
    const credits = ref([])
    const images = ref([])
    const videos = ref([])
    const videoUrl = ref('https://www.youtube.com/embed/')
    const id = route.params.id
    const profileImg = ref('')

    const movieLength = ref('')
    const tvLength = ref('')
    const tip = shallowRef('movies')
    const heart = ref()

    const favouriteTvs = ref([])
    const favouriteTVs = ref([])
    const favouriteMovies = ref([])

    const favourite = ref()

     const fMoviesIds = ref([])
     const fTVIds = ref([])
    const reload = ref(true)
    const rejt = ref(0)
    const filterTip = ref('created_at.desc')
    const tvData =  ref(false)
    const averageMRateFinal = ref()
    const averageTRateFinal = ref()
    const ratedMovies = ref([])
    const ratedTVs = ref([])
    const averageMRate = ref([])
    const averageTRate = ref([])
    const rejtedMovies= ref([])
    const loadData = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/account?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija)
      data.value = await movieData.data
      profileImg.value = 'https://www.gravatar.com/avatar/'+ await movieData.data.avatar.gravatar.hash
    console.log(data.value)
    console.log(sesija)
    }
    catch(err){}
    }

    const loadOtherData = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+store.sesija+'&sort_by='+filterTip.value+'&page=1')
      let tvData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/watchlist/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+store.sesija+'&sort_by='+filterTip.value+'&page=1')
      let favMoviesData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija+'&language=en-US&sort_by='+filterTip.value+'&page=1')
      let favTvData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/favorite/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija+'&language=en-US&sort_by='+filterTip.value+'&page=1')
      let rMovies = await axios.get('https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+store.sesija+'&sort_by='+filterTip.value+'&page=1')
      let rTVs = await axios.get('https://api.themoviedb.org/3/account/{account_id}/rated/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+store.sesija+'&sort_by='+filterTip.value+'&page=1')
      ratedMovies.value = rMovies.data.results
      ratedTVs.value = rTVs.data.results
     otherData.value = await movieData.data.results
        movieLength.value = await movieData.data.results.length
        tvLength.value = await tvData.data.results.length
        favouriteMovies.value = await favMoviesData.data.results
        favouriteTVs.value = await favTvData.data.results
        console.log(otherData.value,'otherData')
        console.log(favouriteMovies.value,'favouriteMovies')
    console.log(favouriteMovies.value)

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


    console.log(rejtedMovies.value)
    for(let i = 0; favouriteMovies.value.length > i; i++){
        fMoviesIds.value.push(favouriteMovies.value[i].id)


    }
    for(let i = 0; favouriteTVs.value.length > i; i++){
        fTVIds.value.push(favouriteTVs.value[i].id)


    }
for(let i = 0;otherData.value.length>i;i++){
otherData.value[i].rating = 0
}
    }
    catch(err){}
    }

    const changeType = async(type) => {
      tip.value = type
      let movieData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/watchlist/'+type+'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+store.sesija+'&sort_by=created_at.'+filterTip.value+'&page=1')
        otherData.value = await movieData.data.results
        if(tip.value =='tv'){
            tvData.value = true
        }else{
            tvData.value = false
        }
    }

    const postFav =(id) => {
try{    
if(tip.value == 'movies'){
      let i = fMoviesIds.value.indexOf(id)
if(fMoviesIds.value.includes(id)){

    fMoviesIds.value.splice(i,1)
    console.log(fMoviesIds.value)
axios.post('https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija, {
  "media_type": "movie",
  "media_id": id,
  "favorite": false
  })

}else{
        fMoviesIds.value.push(id)
    axios.post('https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija, {
  "media_type": "movie",
  "media_id": id,
  "favorite": true
  })

}
}else if(tip.value=='tv'){
if(fTVIds.value.includes(id)){
      let i = fTVIds.value.indexOf(id)
    fTVIds.value.splice(i,1)
    console.log(fTVIds.value)
axios.post('https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija, {
  "media_type": "tv",
  "media_id": id,
  "favorite": false
  })

}else{
        fTVIds.value.push(id)
    axios.post('https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija, {
  "media_type": "tv",
  "media_id": id,
  "favorite": true
  })

}

}
    }
    catch(err){}
console.log(fMoviesIds.value)
console.log(fTVIds.value)
    }
const selectFilter = () => {
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");



optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});
}
    const deleteIndex =async(id) => {

if(tip.value == 'movies'){
 await axios.post('https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija, {
  "media_type": "movie",
  "media_id": id,
  "watchlist": false
  })
let movieData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+store.sesija+'&sort_by='+filterTip.value+'&page=1')
otherData.value = movieData.data.results

}else if( tip.value == 'tv'){
 await axios.post('https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija, {
  "media_type": "tv",
  "media_id": id,
  "watchlist": false
  })
let movieData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/watchlist/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+store.sesija+'&sort_by='+filterTip.value+'&page=1')
otherData.value = movieData.data.results

}



    }

    const rate =async(movie) => {
for(let i = 0;otherData.value.length>i;i++){
otherData.value[i].rate = false
}
movie.rate = true
$(document).mouseup(function(e) 
{
    var container = $(".movieButtonA");

    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        movie.rate = false
    }
});

    console.log(movie.rating,'1')


if(tip.value=="movies"){
        console.log(movie.rating,'vrijednost')
      let rMovies = await axios.get('https://api.themoviedb.org/3/account/{account_id}/rated/movies?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+store.sesija+'&sort_by='+filterTip.value+'&page=1')
    ratedMovies.value = await rMovies.data.results
for(let i = 0 ; ratedMovies.value.length > i ;i++){
    if(movie.id == ratedMovies.value[i].id){
        console.log(ratedMovies.value[i])
        movie.rating = ratedMovies.value[i].rating


    }
}
}else if(tip.value=="tv"){
        console.log(movie.rating,'vrijednost')
      let rMovies = await axios.get('https://api.themoviedb.org/3/account/{account_id}/rated/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+store.sesija+'&sort_by='+filterTip.value+'&page=1')
    ratedTVs.value = await rMovies.data.results
for(let i = 0 ; ratedTVs.value.length > i ;i++){
    if(movie.id == ratedTVs.value[i].id){
        console.log(ratedTVs.value[i])
        movie.rating = ratedTVs.value[i].rating


    }
}
}
    }

    const postRate = async(movie,tip) => {
 await axios.post('https://api.themoviedb.org/3/'+tip+'/'+movie.id+'/rating?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija, {
  "value": movie.rating,

  })
    }
    const removeRate = async(movie,tip) => {
 movie.rating = 0
        console.log(movie.rating,'after')
 await axios.delete('https://api.themoviedb.org/3/'+tip+'/'+movie.id+'/rating?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija,)
    }



    const addList =(movie) => {

for(let i = 0;otherData.value.length>i;i++){
otherData.value[i].list = false
}
movie.list = true
$(document).mouseup(function(e) 
{
    var container = $(".movieButtonC");

    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        movie.list = false
    }
});



    }

    const filter = async(filterType) => {
        filterTip.value = filterType
        if(tip.value == 'movies'){
      let movieData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+store.sesija+'&sort_by='+filterType+'&page=1')
        otherData.value = movieData.data.results
        }else if(tip.value == 'tv'){
      let movieData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/watchlist/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+store.sesija+'&sort_by='+filterType+'&page=1')
        otherData.value = movieData.data.results
        }

    }









loadData()
loadOtherData()
</script>

<style scoped>
.header{
    border-bottom: 1px solid (227,227,227);
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

}
.header span:hover .headerDropdown{
    display: flex;
}
.headerDropdown{
    background: white;
    border: 1px solid lightgray;
    display: none;
    position: absolute;
    top: 40px;
    padding-top: 8px;
    padding-bottom: 8px;
    flex-direction: column;
    border-radius: 5px;
    z-index: 3;
}
.headerDropdown a{
    height: 30px;
    align-items: center;
    display: flex;
    padding-left: 20px;
    padding-right: 60px;
    color: black;
    text-decoration: none;
    font-size: 17px;
    width: 80px;
}
.headerDropdown a:hover{
    background: lightgrey;
}
.header span{
    margin-right: 20px;
    margin-left: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 10px;
    position: relative;
}
.arrow {
  margin-left: 5px;
  margin-bottom: 3px;
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 2px;
   transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.overview{
    display: flex;
    align-items: center;
    height: 35px;
    border-bottom: 5px solid gray;
}
.up{
    width: 100%;
    height: 230px;
    background: #0d253f;

}
.upContent{
    width: 1330px;
    height: 230px;
    display: flex;
    margin: auto;
    align-items: center;



}
.upContent img {
    width: 150px;
    height: 150px;
    border-radius: 180px;
}
.backContent{
    background-image: url(../assets/backLines.svg);
    background-position: center -260px;
    width: 1500px;
    margin: auto;
}
.down{
    width: 1300px;
    display: flex;
    margin: auto;
}
.downContent{
    display: flex;
    margin-bottom:10px;
}
.movie{
    height: 200px;
    width: 1300px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    border: 1px solid rgba((lightgray), 1);
    display: flex;
}
.movie img{
    height: 200px;
    cursor: pointer;
}
.prviRedText p,h2{
    margin: 0;
}
.prviRedText a{
    cursor: pointer;
}
.prviRed{
    display: flex;
    position: relative;
    align-items: center;
}
.desc{
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
    margin-top: 15px;
    margin-bottom: 15px;
}
.desc p{
    margin: 0;
    padding: 0;

}
.movieButtonCircle{
    height: 25px;
    width: 25px;
    border-radius: 25px;
    outline: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
}
.movieButtonCircle img{
    width: 17px;
    height: 17px;
    filter: invert(64%) sepia(0%) saturate(2%) hue-rotate(139deg) brightness(92%) contrast(92%);
}
.actionBar{
    display: flex;
}
.movieButton{
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor:pointer;
}
.movieButtonA{
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor:pointer;
}
.movieButtonC{
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor:pointer;
}

.movieButton a{
    cursor: pointer;
}
.movieButtonA a{
    cursor: pointer;
}
.movieButtonC a{
    cursor: pointer;
}
.movieInfo{
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.percentage{
    background-color: #081c22;
  height: 40px;
  width: 40px;
  display: flex;
  border-radius: 34px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.percentagebroj{
  display: flex;
  align-self: center;
  justify-content: center;

}
.percentage p{
  font-size: 10px;
  color: white;
  position: absolute;
}
.percentage a{
  left: 14px;
  bottom: 17px;
  font-size: 7px;
  color: white;

}
.circle{
    margin-top: 20px;


}
.downHeader{
    width: 1300px;
    height: 60px;
    display: flex;

    margin: auto;
    margin-top: 20px;
    justify-content: space-between;
}
.downHeaderLeft{
    display: flex;
    align-items: center;
}
.downHeaderLeft p{
    margin: 0;
    color: lightgrey;
    margin-left: 5px;
}
.downHeaderLeft a{
    display: flex;
    cursor: pointer;
}
.downHeaderRight{
    display: flex;
    align-items: center;
    position: relative;
}
.downHeaderLeft a{
    margin-left: 10px;
}
.downHeaderRight a{
    cursor: pointer;
    font-size: 1em;
    padding: 5px;
    font-weight: 300;
}
.downHeaderCircle{
    margin-left: 5px;
    background: lightgray;
    width: 20px;
    height:20px;
    border-radius:20px;
    cursor: pointer;
}

.filters{
    padding: 0;
    margin: 0;

    display: flex;
    flex-direction: column;

}


.filter a{
    font-size: 1em;
    padding: 0;
    border-bottom: 1px solid lightgray;
    font-weight: bold;
    color: lightgray;
}
.filterBy{
    position: absolute;
    right: 130px;
    width: 100px;
}
.typeLinija{
    border-bottom:4px solid gray;
    margin-bottom: -4px;
}
.heartPink img{
    filter: invert(1) sepia(0%) saturate(2%) hue-rotate(139deg) brightness(100%) contrast(100%);
}
.heartPink{
    background: hotpink;
    outline: none;

}
.filters option{
    padding:10px;
}
.heart:hover{
    background: hotpink;
    outline: none;

}
.heart:hover img{
    filter: invert(1) sepia(0%) saturate(2%) hue-rotate(139deg) brightness(100%) contrast(100%);
}
.x:hover{
    background: gray;
    outline: none;

}
.x:hover img{
    filter: invert(1) sepia(0%) saturate(2%) hue-rotate(139deg) brightness(100%) contrast(100%);
}
.lines:hover img{
    filter: invert(1) sepia(0%) saturate(2%) hue-rotate(139deg) brightness(100%) contrast(100%);
}
.star:hover img{
    filter: invert(1) sepia(0%) saturate(2%) hue-rotate(139deg) brightness(100%) contrast(100%);
}
.lines:hover{
    background: gray;
    outline: none;

}
.star:hover{
    background: gray;
    outline: none;

}

.stars{
    width: 300px;
    height: 60px;
    background: #0d253f;
    position: absolute;
    margin-left: 30px;
    z-index: 2;
    border-radius: 5px;
    display: none;
    align-items: center;
    justify-content: center;
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
    height: 70px;
    background: #01b4e4;
    position: absolute;
    margin-left: 30px;
    z-index: 2;
    border-radius: 5px;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: auto;
}

.showStars{
    display: flex;
}
.showList{
    display: flex;
}
.heart:hover{
    background: hotpink;
    outline: none;

}
.heart:hover img{
    filter: invert(1) sepia(0%) saturate(2%) hue-rotate(139deg) brightness(100%) contrast(100%);
}
.container{
    margin-top: 79px;
    z-index: 3;
}
.select-box {
  display: flex;
  width: 100px;
  flex-direction: column;
  margin-top: 2px;

}

.select-box .options-container {
  background: white;
  color: black;
  width: 100%;
  opacity: 0;
  padding: 10px;
  overflow: hidden;
  outline: 1px solid lightgray;
  order: 1;
  border-top: none;
}

.selected {
  background: white;
  position: relative;
  width: 100px;
    padding: 5px 10px;
}

.selected::after {
  content: "";
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  height: 100%;
  width: 20px;
  top: 5px;
}

.container:hover .options-container {
  max-height: 240px;
  opacity: 1;
}
.container:hover .selected {
    outline: 1px solid lightgray;

}
.select-box .options-container.active + .selected::after {
  transform: rotateX(180deg);
  top: -6px;
}
.select-box .option,
.selected {
  cursor: pointer;
}
.select-box label {
  cursor: pointer;
}

.select-box .option .radio {
  display: none;
}
.downHeaderRight a{
    margin-left: 5px;
    cursor:auto;
}
.downHeaderRight p{
    margin: 0;
    cursor:pointer;
    font-weight: bold;
    font-size: 1.3em;

}
.discc{
    color: black;
    text-decoration: none;
    cursor: pointer;
}
.strelica{
    padding: 5px;
}
.strelica:hover{
    color: gray;
}
.profileStatsUp{
    width:300px;
    height:200px;
    z-index: 2;
    margin-left: 40px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.statsUp{
    width: 320px;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.percentageUp {
    background-color: #081c22;
}
.percentageWrapUp a{
    width: 100px;
}
.percentageWrapUp{
    display: flex;
    align-items: center;
}
.percentageUp{

  height: 70px;
  width: 70px;
  display: flex;
  border-radius: 70px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;

}

.percentagebrojUp{
  display: flex;
  align-self: center;
  justify-content: center;

}
.percentageUp p{
  font-size: 17px;
  color: white;
  position: absolute;
  font-weight: bold;
}
.percentageUp a{
  left: 14px;
  bottom: 17px;
  font-size: 7px;
  color: white;

}
.profileStatsUp h1{
    margin: 0;
    font-size: 2.2em;
}
</style>