<template>
<div class="header" v-if="data">
        <span><div class="overview"><a>Overview</a> <div class="arrow"></div></div><div class="headerDropdown">
            <router-link :to="{ name: 'Tvdetails', params: { id: id }}">Main</router-link>
            <router-link :to="{ name: 'AlternativeTitlesTv', params: { id: id }}">Alternative Titles</router-link>
            <router-link :to="{ name: 'CastAndCrewTv', params: { id: id }}">Cast & Crew</router-link>
            <router-link :to="{ name: 'Seasons', params: { id: id }}">Seasons</router-link>
            <router-link :to="{ name: 'TranslationsTv', params: { id: id }}">Translations</router-link>
            <a :href="'https://www.themoviedb.org/tv/'+id+'/changes'">Changes</a>
            </div></span>
        <span><div>Media <div class="arrow"></div></div><div class="headerDropdown">
            <router-link :to="{ name: 'BackdropsTv', params: { id: id }}">Backdrops</router-link>
            <router-link :to="{ name: 'LogosTv', params: { id: id }}">Logos</router-link>
            <router-link :to="{ name: 'PostersTv', params: { id: id }}">Posters</router-link>
            <router-link :to="{ name: 'MediaVideosTv', params: { id: id }}">Videos</router-link>
            </div></span>
        <span><div>Fandom <div class="arrow"></div></div><div class="headerDropdown">
            <a :href="'https://www.themoviedb.org/tv/'+id+'/discuss'">Discussions</a>
            <router-link :to="{ name: 'ReviewsTv', params: { id: id }}">Reviews</router-link>
            </div></span>
        <span><div>Share <div class="arrow"></div></div><div class="headerDropdown">
            <a @click="overlayToggle">Share Link</a>
            <a :href="'https://www.facebook.com/'+external.facebook_id">Facebook</a>
            <a :href="'https://twitter.com/'+external.twitter_id">Tweet</a>
            </div></span>
</div>
<div class="overlay" v-if="overlayOn" @click.self="overlayToggle">
<div class="overlayVideo">
    <a>Share {{data.original_title}}</a>
    <p>URL</p>
    <input type="text" :value="urlNow">
</div>
</div>
<div class="mainMenuWrap">
    <div class="mainMenu" id="back">
            <div class="slika" v-if="data.poster_path" ><router-link :to="{ name: 'Moviedetails', params: { id: id }}"><img id="i" class="imag" ref="slikica" :src="slika+data.poster_path" alt="" ></router-link></div>
            <div class="info">
                <router-link :to="{ name: 'Tvdetails', params: { id: id }}"><div class="glavniNaslov"><h1>{{data.name}}</h1></div></router-link>
                <router-link :to="{ name: 'Tvdetails', params: { id: id }}"><a>← Back to main</a></router-link>
            </div>

    </div>

</div>
    <div class="episodeSelectorWrap">
        <div class="episodeSelector">
            <a @click="toPagePrevious()" class="episodePrevious" v-if="s>1"><img ref="dominantColor" src="../../assets/arrowLeft.svg" alt="">Previous Season</a>
            <a @click="toPageNext()" class="episodeNext" v-if="s<sezone.length-1">Next Season<img src="../../assets/arrowRight.svg" alt=""></a>
        </div>
    </div>
    <div class="episodes"><h1>Episodes<a> {{ episodesLength}}</a></h1></div>
    <div class="sezonaWrap" v-for="index in season" :key="index">
    
        <div class="sezona">
                <div class="sezonaTop">
                <div class="sezonaSlika"><img :src="slika + index.still_path" alt=""></div>
                <div class="sezonaInfo">
                <div class="infoLeft">
                <div class="sezonaInfoPrviRed">
                <div class="naslovEpizode"><a class="number">{{index.episode_number}}</a><div v-if="index.panelTrue" class="naslovRate"><img src="../../assets/star.svg" alt=""><a>{{index.vote_average.toString().substring(0,3)}}</a></div><a v-if="index.name">{{index.name}}</a></div>
                </div>
                <p>{{index.overview}}</p>
                </div>
                <div class="infoRight">
                    <a>{{index.air_date}}</a>
                    <a>{{index.runtime}}m</a>
                </div>
            </div>
                </div>
            <div class="sezonaBottom">
                <div class="expand" ref="expandButton"><img  @click="expand(index)" v-if="!index.panelTrue" class="arrowDown" src="../../assets/arrowDown.svg" alt=""><a class="bold" v-if="!index.panelTrue"  @click="expand(index)"> Expand</a>
                <span class="afterExpand" v-if="index.panelTrue">
                <router-link :to="{ name: 'MediaVideosTv', params: { id: id }}"><a>Videos</a></router-link>
                <router-link :to="{ name: 'BackdropsTv', params: { id: id }}"><a>Images</a></router-link>
                <a :href="'https://www.themoviedb.org/tv/'+id+'/changes'"><a>Changes</a></a>
                </span></div>
                <div :class="{selected:index.panelTrue}" ref="panelA" class="panel">
                <div class="panelLeft">
                    <div class="panelHeader">
                        <a class="bold">Crew </a><a class="drugoA"> {{index.crew.length}}</a>
                    </div>
                    <div>
                <span class="directed"><a class="bold by">Directed By: </a><a v-if="index.crew.name" > {{index.crew[0].name }}</a> <a v-if="index.crew.name" >, {{ index.crew[1].name}}</a></span>
                <span class="directed"><a class="bold by">Written By: </a><a v-if="index.crew.name" > {{index.crew[0].name }}</a> <a v-if="index.crew.name" >, {{ index.crew[1].name}}</a></span>
                    </div>
                
                </div>
                <div class="panelRight">
                    <div class="panelHeader"><a class="bold">Guest Stars </a><a class="drugoA">{{index.guest_stars.length}}</a></div>
                    <div class="starsWrap">
                    <div class="stars" v-for="star in index.guest_stars" :key="star">
                    <div class="star">
                        <img v-if="star.profile_path !== null" :src="slika + star.profile_path" alt="">
                        <img class="person" v-if="star.profile_path == null" src="../../assets/person.svg" alt="">
                        <div class="starInfo">
                        <a class="bold">{{star.name}}</a>
                        <a>{{star.character}}</a>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
                </div> 
            </div>
            
        </div>
       
    </div>
    
</template>

<script>

import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { ref, shallowRef } from 'vue'

export default {
setup(){
const route = useRoute()
const router = useRouter()
const slika = ref('https://image.tmdb.org/t/p/original/')
const data = ref([])
const zadnjaSlika = ref([])
const zadnjaNaslov = ref([])
const zadnjaDate = ref([])
const zadnjaOverview = ref([])
const zadnjaEpisodes = ref([])
const sezone = ref([])
const season = ref([])
const changes = ref([])
const id = route.params.id
const s = ref(parseInt(route.params.s))
const expandButton = ref(null)
const panelA = ref(null)
const episodesLength = ref('')

    const external = ref([])
    const urlNow = ref(window.location.href)
    const overlayOn = ref(false)

    const overlayToggle = () => {
        overlayOn.value = !overlayOn.value

    }
    const loadExternal = async() => {
        try{
            let recommendationsData = await axios.get('https://api.themoviedb.org/3/tv/'+ id +'/external_ids?api_key=0b5e8ce7494ae54d6c643adf4db40da7')
            external.value = await recommendationsData.data
        }   
        catch(err){}
        console.log(external.value)
    }

    const loadData = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/tv/'+ id +'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&append_to_response=reviews')
      data.value = await movieData.data
      sezone.value = await movieData.data.seasons
      zadnjaSlika.value = await sezone.value[sezone.value.length-1].poster_path
      zadnjaNaslov.value = await sezone.value[sezone.value.length-1].name
      zadnjaDate.value = await sezone.value[sezone.value.length-1].air_date
      zadnjaOverview.value = await sezone.value[sezone.value.length-1].overview
      zadnjaEpisodes.value = await sezone.value[sezone.value.length-1].episode_count
    console.log(data.value,'sezone')
    }
    catch(err){}
    }
    const loadSeason = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/tv/'+id+'/season/'+s.value+'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US')
      season.value = await movieData.data.episodes

      episodesLength.value = await movieData.data.episodes.length

    
    console.log(season.value,'season')
    }
    catch(err){}
    }

  const expand = (index) => {
      index.panelTrue = !index.panelTrue
    }

    const toPageNext = async() => {
        window.location.href = s.value+1
    }
    const toPagePrevious = async() => {
        window.location.href = s.value-1
    }


loadData()
loadSeason()

    return{
        data,
        router,router,slika,changes,id,s,zadnjaSlika,zadnjaDate,zadnjaEpisodes,zadnjaNaslov,zadnjaOverview,sezone,season,expand,expandButton,panelA,
        episodesLength,toPageNext, toPagePrevious,
        overlayOn,overlayToggle,urlNow,external
    }
}
}
</script>

<style scoped>
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
    border-bottom: 5px solid #01b4e4;
}
.mainMenuWrap{
    height: 120px;
    width: 100%;
    display: flex;
    border-bottom: 1px solid lightgray; 
    background: #0d253f; 
}
.mainMenu{
    height: 120px;
    width: 1300px;
    display: flex;
    margin: auto;
    align-items: center;
}
.slika img{
    height: 90px;
    cursor: pointer;
}
.info h1{
    margin:0;
    cursor: pointer;
    color: black;
    text-decoration: none;
    font-weight: 700;
}

.info{
    margin-left: 15px;
}

.info a{
    color: lightgray;
    cursor: pointer;
    text-decoration: none;
    font-weight: 600;
}
.info a:hover{
    color:gray;
}
.sezonaWrap{
    width: 100%;


    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
}
.info h1{
    color: white;
    text-decoration: none;
    font-weight: 700;
    
}
.info a{
    color: #01b4e4;
    text-decoration: none;
    font-weight: bold;

}
.sezona{
    width: 1300px;

    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
    border: 1px solid lightgray;
    border-radius: 10px;
    overflow: hidden;
}
.sezonaSlika img{
    height: 150px;
    border-top-left-radius: 10px;
}
.sezonaInfo{
    margin-left: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.sezonaInfo p{
    font-size: 0.9em;
}
.expand{
    height: 35px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid lightgray;
}
.expand a{
    cursor: pointer;
    font-weight: 600;
}
.expand img{
    margin-top: 5px;
}
.sezonaTop{
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: row;
}
.sezonaBottom{

    width: 100%;
}
.panel{
    width: 1300px;
    flex-direction: row;
    margin: auto;
    display: none;
    padding: 20px;
}
.panelHeader{
    margin-bottom: 10px;
}
.selected{
    display: flex;
}
.afterExpand a{
    color: gray;
    text-decoration: none;
}
.afterExpand{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-left: 30px;
    margin-right: 30px;
}
.panelLeft{
    width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.panelRight{
    width: 1100px;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.drugoA{
    color: gray;
}
.directed{
    display: flex;
    flex-direction: row;
    width: 100%;
}
.stars{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.starsWrap{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.star{
    display: flex;
    width: 400px;
    height: 66px;
    margin-bottom: 10px;
}
.star img{
    width: 66px;
    height: 66px;
    object-fit: cover;
    object-position: 100% 30%;
    border-radius: 5px;
}
.starInfo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
}
.person{
    background: lightgray;
    height: 20px;
    width: 20px;
}
.bold{
    font-weight: bold;
}
.naslovEpizode{
    font-size: 1.1em;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.number{
    margin-right: 10px;
}
.infoLeft{
    width: 920px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.infoRight{
    display: flex;
    width: 80px;
    height: 100%;
    flex-direction: column;

    justify-content: center;
}
.infoRight a{
    color: #666;
    font-size: 0.9em;
}
.arrowDown{
    margin-right: 2px;
    cursor: pointer;
}
.by{
    margin-right: 3px;
}
.naslovRate{
    height: 20px;
    min-width: 40px;
    background: black;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1px;
    padding-right: 7px;
    margin-right: 8px;
}
.naslovRate img{
    width: 15px;
}
.naslovRate a{
    color: white;
    font-size: 0.8em;
}
.episodeSelectorWrap{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid lightgray;
    margin-bottom: 40px;
}
.episodeSelector{
    width: 1300px;
    display: flex;
    align-items: center;
    position: relative;

    margin: auto;
    height: 40px;
    flex-direction: row;
}
.episodes {
    margin: auto;
    display: flex;
    width: 1300px;
    margin-bottom: 15px;
    font-size: 1.3em;
    align-items: center;
    justify-content: space-between;
    height: 30px;
}
.episodes p{
    right: 0;
    margin: 0;
}
.episodes a{
    color: gray;
    margin-left: 5px;
    font-size: 1em;
    font-weight: 400;
}
.episodes h1{
    font-size: 1.2em;
    font-weight: bold;
    margin: 0;
}
.episodeNext{
    right: 0;
    position: absolute;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.episodePrevious{
    position: absolute;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    align-items: center;
}
.episodeSelector img{
    width: 30px;
    height: 30px;
    margin-left: 5px;
    margin-right: 5px;
}
</style>