<template>
    <div class="header">
        <span><div class="overview"><a>Overview</a> <div class="arrow"></div></div><div class="headerDropdown">
            <router-link :to="{ name: 'Actordetails', params: { id: id }}">Main</router-link>
            <router-link :to="{ name: 'ActorTranslations', params: { id: id }}">Translations</router-link>
            <router-link :to="{ name: 'ActorChanges', params: { id: id }}">Changes</router-link>
            </div></span>
        <span><div>Share <div class="arrow"></div></div><div class="headerDropdown">
            <a @click="overlayToggle">Share Link</a>
            <a v-if="data.external_ids.facebook_id" :href="'https://www.facebook.com/'+data.external_ids.facebook_id">Facebook</a>
            <a v-if="data.external_ids.twitter_id" :href="'https://twitter.com/'+data.external_ids.twitter_id">Tweet</a>
            </div></span>
    </div>
<div class="overlay" v-if="overlayOn" @click.self="overlayToggle">
<div class="overlayVideo">
    <a>Share {{data.name}}</a>
    <p>URL:</p>
    <input type="text" :value="urlNow">
</div>
</div>
  <div class="content" v-if="data">
        <div class="leftWrapper">
        <div class="left">
            <div class="portraitWrapper">
            <div class="portrait">
                <img :src="slika + data.profile_path" alt="">
            </div>
            </div>
            <div class="media">
                <a :href="'https://www.facebook.com/'+data.external_ids.facebook_id"><img src="../assets/facebook.svg" alt=""></a>
                <a :href="'https://www.twitter.com/'+data.external_ids.twitter_id"><img src="../assets/twitter.svg" alt=""></a>
                <a :href="'https://www.instagram.com/'+data.external_ids.instagram_id"><img src="../assets/instagram.svg" alt=""></a>
            </div>
            <div class="actorInfo" v-if="data">
                <h2>Personal Info</h2>
                <a v-if="data.known_for_department">Known For</a>
                <p>{{data.known_for_department}}</p>
                <a v-if="data.popularity">Known Credits</a>
                <p>{{data.popularity}}</p>
                <a v-if="data.gender">Gender</a>
                <p>{{data.gender}}</p>
                <a v-if="data.birthday">Birthdate</a>
                <p>{{data.birthday}}</p>
                <a v-if="data.place_of_birth">Place of birth</a>
                <p>{{data.place_of_birth}}</p>
                <a v-if="data.also_known_as">Also Known As</a>
                <span v-for="name in data.also_known_as" :key="name"><p>{{name}}</p></span>
            </div>
        </div>
        </div>
        <div class="rightWrapper">
            <div class="right">
               <h1 class="name">{{data.name}}</h1>
                <div class="biography">
                    <h1>Biography</h1>
                    <p>{{data.biography}}</p>
                </div>
                <div class="knownForWrapper">
                    <h3>Known For</h3>
                    <div class="knownFor" v-if="movieCredits">
                    <div class="knownForMovies" v-for="i in movieCredits" :key="i">
                    <div class="knownForMovie" @click="toMovie(i.id)">
                        <img :src="slika + i.poster_path" alt="">
                        <a><p>{{i.original_title}}</p></a>
                    </div>
                </div>
                </div>
                </div>
                <h2 class="acting">Acting</h2>
                <div class="actingWrapper">
                    
                <div class="acting" v-for="movie in combined" :key="movie">
                <span><a v-if="movie.first_air_date">{{movie.first_air_date.substring(0,4)}}</a><a v-if="movie.release_date">{{movie.release_date.substring(0,4)}}</a><a v-if="!movie.release_date && !movie.first_air_date">—</a><p @click="movieRoute(movie)" class="movieName">{{movie.original_title}}{{movie.original_name}}</p> <p class="as">as</p> <p class="character">{{movie.character}}</p></span>
                    

                </div>
                </div>
            
            
            </div>
        </div>
  
  
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { ref, shallowRef } from 'vue'

const route = useRoute()
const router = useRouter()
const slika = ref('https://image.tmdb.org/t/p/original/')
const data = ref([])
const external = ref([])
const movieCredits = ref([])
const combined = ref([])
const id = route.params.id
const expandTrue = ref(false)
const mCredits = ref(false)
const tvCredits = ref(false)
const overlayOn = ref(false)
const urlNow = ref(window.location.href)

    const loadData = async() => {

      let movieData = await axios.get('https://api.themoviedb.org/3/person/'+id+'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-&append_to_response=external_ids')
      data.value = await movieData.data

    }

    const loadMovieCredits = async() => {
    try{
      let movieCreditsData = await axios.get('https://api.themoviedb.org/3/person/'+id+'/movie_credits?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US')
      movieCredits.value = await movieCreditsData.data.cast
      movieCredits.value.length = 8
    }
    catch(err){}
    }

    const loadCombined = async() => {
    try{
      let mCreditsData = await axios.get('https://api.themoviedb.org/3/person/'+id+'/movie_credits?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US')
      let tCreditsData = await axios.get('https://api.themoviedb.org/3/person/'+id+'/tv_credits?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US')
      mCredits.value = await mCreditsData.data.cast
              for(let i = 0 ; mCredits.value.length > i ; i++){
            mCredits.value[i].type = 'movie'
        }
      tvCredits.value = await tCreditsData.data.cast
        for(let i = 0 ; tvCredits.value.length > i ; i++){
            tvCredits.value[i].type = 'tv'
        }
      combined.value = mCredits.value.concat(tvCredits.value)
      combined.value.sort(function(a,b){
  return new Date(b.release_date) - new Date(a.release_date);

});
      combined.value.sort(function(a,b){
  return new Date(b.first_air_date) - new Date(a.first_air_date);

});

    }
    catch(err){}
    }

    const loadExternal = async() => {
    try{
      let combinedData = await axios.get('https://api.themoviedb.org/3/person/'+id+'/external_ids?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US')
      external.value = await combinedData.data.cast
    }
    catch(err){}
    }

    const toMovie = (id) => {
        router.push({ name: 'Moviedetails', params: { id: id }})  
    }
    const movieRoute = (item) => {
        if(item.type == 'movie'){
            router.push({ name: 'Moviedetails', params: { id: item.id }}) 
        } else if(item.type == 'tv'){
            router.push({ name: 'Tvdetails', params: { id: item.id }}) 
        }
    }
    const overlayToggle = () => {
        overlayOn.value = !overlayOn.value

    }

loadData()
loadMovieCredits()
loadCombined()
loadExternal()
</script>

<style scoped>
.content{
    font-family: 'Source Sans Pro', Arial, sans-serif;
    font-weight: 400;
    display: flex;
    margin: auto;
    width: 1300px;
    height: 100%;
    padding-top: 30px;
}
.leftWrapper{
    width: 300px;
    height: 100%;
    display: flex;

    align-self: flex-start;
}
.left{
    width: 300px;
    display: flex;
    align-items: flex-start;
    height: 100%;
    flex-direction: column;
}
.name{
    display: flex;
    align-self: left;
    font-size: 30px;
    cursor: pointer;
    text-decoration: none;
    color: black;
    padding: 0;
    margin: 0;
}
.acting{
    display: flex;
    align-self: flex-start;
}
.biography h1{
    font-size: 20px;
}
.actorInfo {
    display: flex;
    flex-direction: column;
}
.actorInfo a{
    padding: 0;
    font-weight: bold;
}
.actorInfo h2{
    margin-top: 0;
}
.actorInfo{
    margin-top: 10px;
}
.actorInfo p,a{
    font-size: 17px;
}
.actorInfo p{
    margin: 0;
    margin-bottom: 15px;
}
.media{
    display: flex;
    flex-direction: row;
    margin-top: 10px;
}
.media img{
    margin-right: 10px;
    cursor: pointer;
    width: 40px;
    height: 40px;
}
.portrait{
    display: flex;
    border-radius: 20px;
}
.portraitWrapper:hover{
    cursor: pointer;
    overflow: hidden;
    border-radius: 20px;
}
.portrait:hover{
    filter: blur(10px);
}
.portrait img{
    width: 300px;
    border-radius: 20px;
}
.rightWrapper{
    width: 1000px;
    height: 100%;
    display: flex;
    align-self: flex-end;
}
.right{
    margin-left: 20px;
    height: 100%;
    width: 100%;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
}
.knownForWrapper{
    display: flex;
    width: 100%;
    flex-direction: column;
}
.knownForWrapper h3{
    margin-bottom: 10px;
}
.knownFor{
    display: flex;
    flex-direction: row;
    overflow: auto;
}
.knownForMovies{
    display: flex;
    flex-direction: row;


}
.knownForMovie{
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    border-radius: 10px;
    align-items: center;
    width: 150px;
    margin-bottom: 15px;
    text-align: center;
}
.knownForMovie a{
    color: black;
    padding: 0;
}
.knownForMovie p{
    margin: 0;
    margin-top: 5px;
    align-self: center;
}
.knownForMovie p:hover{
    cursor: pointer;
    color: #01b4e4;
}
.knownForMovies img{
    width: 150px;
    border-radius: 10px;
    cursor: pointer;
}
::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  border-radius: 20px;
}
::-webkit-scrollbar-thumb {
  background: lightgray;
  border-radius: 10px;
}
.acting{
    display: flex;
    align-self: flex-start;
}
.acting span{
    display: flex;
    align-items: center;
}
.as{
    margin: 0;
    margin: 0 5px 0 5px;
    color: gray;
}
.movieName{
    margin: 0;
    cursor: pointer;
    font-weight: bold;
}
.movieName:hover{
    color: #01b4e4;
}
.character{
    margin: 0;
}
.acting a{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.acting span a{
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 0 5px 0;
}
.actingWrapper {
    border: 1px solid lightgray;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    width: 100%;
    display: flex;
    align-self: flex-start;
    flex-direction: column;
    padding: 10px;
}
.header{
    border-bottom: 1px solid lightgray;
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
    top: 100px;
    padding-top: 8px;
    padding-bottom: 8px;
    flex-direction: column;
    border-radius: 5px;
}
.headerDropdown a{
    height: 30px;
    align-items: center;
    display: flex;
    padding-left: 10px;
    padding-right: 50px;
    color: black;
    text-decoration: none;
    font-size: 17px;
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
}
.arrow {
  margin-left: 5px;
  margin-bottom: 3px;
  border: solid black;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
   transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.overview{
    display: flex;
    align-items: center;
    height: 35px;
    border-bottom: 5px solid #01b4e4;
}
.header a{
    font-size: 17px;
}
.overlay {
  position: fixed; /* Sit on top of the page content */
  display: flex;
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 3; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
  align-items: center;
  justify-content: center;
}
.overlayVideo{
    display: flex;
    width: 400px;
    height: 100px;
    background: white;
    margin: auto;
    flex-direction: column;
    padding: 10px;
    overflow: hidden;

}
</style>