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
    <div class="sezonaWrap" v-for="index in data.seasons" :key="index">
        <div class="sezona">
            <div class="sezonaSlika"><img @click="toSeason(index.season_number)" :src="slika + index.poster_path" alt=""></div>
            <div class="sezonaInfo">
                <div class="sezonaInfoPrviRed">
                    <h2><a @click="toSeason(index.season_number)">{{index.name}}</a><p>{{index.air_date}}</p> | <p>{{index.episode_count}} episodes</p></h2>
                </div>
                <p>{{index.overview}}</p>
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
const changes = ref([])
const id = route.params.id

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

    const toSeason = (sn) => {
        router.push({ name: 'Season', params: { id: id,s:sn }})  
    }

loadData()
    return{
        data,
        router,router,slika,changes,id,zadnjaSlika,zadnjaDate,zadnjaEpisodes,zadnjaNaslov,zadnjaOverview,sezone,
        overlayOn,overlayToggle,urlNow,external,toSeason
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
    color: white;
    text-decoration: none;
    font-weight: 700;
    font-size: 2.2em;
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
.info a:hover{
    color:gray;
}
.sezonaWrap{
    width: 100%;
    height: 180px;
    border-bottom: 1px solid lightgray;
    display: flex;
    align-items: center;
    flex-direction: column;
}
.sezona{
    width: 1300px;
    height: 180px;
    display: flex;
    flex-direction: row;
    margin: auto;
    align-items: center;
}
.sezonaSlika img{
    height: 150px;
    border-radius: 10px;
    cursor: pointer;
}
.sezonaInfo{
    margin-left: 20px;
    display: flex;
    width: 100%;
    flex-direction: column;
}
.overlayVideo input{
    width: 370px;
    height: 30px;
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 10px;
}
.overlayVideo a{
    margin-top: 10px;
    padding-left: 10px;
    height: 30px;
    width: 100%;
    border-bottom: 1px solid lightgray;
    align-self: left;
}
.overlayVideo p{
    padding-left: 10px;
    margin: 0;
    margin-top: 5px;
    width: 100%;

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

    overflow: hidden;

}
.sezonaInfoPrviRed a{
    margin-right: 5px;
    cursor: pointer;
}
.sezonaInfoPrviRed p{
    margin: 0;
    font-weight: 400;
    font-size: 0.8em;
    margin-right: 5px;
    margin-left: 5px;
}
.sezonaInfoPrviRed h2{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0;
}
</style>