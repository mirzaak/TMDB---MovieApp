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
<div class="mainMenuWrap">
    <div class="mainMenu" id="back">
            <div class="slika" v-if="data.poster_path" ><router-link :to="{ name: 'Tvdetails', params: { id: id }}"><img class="img" ref="slikica" :src=" slika + data.poster_path" alt="" ></router-link></div>
            <div class="info">
                <router-link :to="{ name: 'Tvdetails', params: { id: id }}"><div class="glavniNaslov"><h1>{{data.original_name}}</h1><p>({{datum}})</p></div></router-link>
                <router-link :to="{ name: 'Tvdetails', params: { id: id }}"><a>← Back to main</a></router-link>
            </div>

    </div>

</div>

<div class="content">
<div class="left">
    <div class="naslovi"><h1>Cast</h1><p>{{otherDataCast.length}}</p></div>
<div class="persons" v-for="person in otherDataCast" :key="person">
        <div class="person">
        <img @click="toPerson(person.id)" v-if="person.profile_path" :src="slika + person.profile_path" alt=""><img class="noImage" v-if="person.profile_path==null" src="../../assets/person.svg" alt="">
    <div class="personInfo">
        <p @click="toPerson(person.id)"><a class="name">{{person.name}}</a></p>
        <p class="podNaslov">{{person.character}}</p>
    </div>
    </div>
</div>
</div>
<div class="right">
    <div class="naslovi"><h1>Crew</h1><p>{{otherDataCrew.length}}</p></div>
<div class="persons" v-for="person in otherDataCrew" :key="person">
        <div class="person">
        <img @click="toPerson(person.id)" v-if="person.profile_path" :src="slika + person.profile_path" alt=""><img class="noImage" v-if="person.profile_path==null" src="../../assets/person.svg" alt="">
    <div class="personInfo">
        <p @click="toPerson(person.id)"><a class="name">{{person.name}}</a></p>
        <p class="podNaslov">{{person.character}}</p>
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

    const router = useRouter()
    const route = useRoute()
    const id = route.params.id
    const slikica = ref(null)
    const slika = ref('https://image.tmdb.org/t/p/original/')
    const data = ref([])
    const otherDataCast = ref([])
    const otherDataCrew = ref([])
    const datum = ref('')
    const external = ref([])

    const loadData = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/tv/'+ id +'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&append_to_response=reviews')
      data.value = await movieData.data
      datum.value = await movieData.data.first_air_date.substring(0,4)
    console.log(data.value)

    }
    catch(err){}
    }
    const loadExternal = async() => {
        try{
            let recommendationsData = await axios.get('https://api.themoviedb.org/3/tv/'+ id +'/external_ids?api_key=0b5e8ce7494ae54d6c643adf4db40da7')
            external.value = await recommendationsData.data
        }   
        catch(err){}
        console.log(external.value,'external')
    }
    const loadOther = async() => {
    try{
      let d = await axios.get('https://api.themoviedb.org/3/tv/'+id+'/credits?api_key=0b5e8ce7494ae54d6c643adf4db40da7')
      otherDataCast.value = await d.data.cast
      otherDataCrew.value = await d.data.crew
    console.log(otherDataCast.value)
    console.log(otherDataCrew.value)

    }
    catch(err){}
    }

    const toPerson = (id) => {
    router.push({ name: 'Actordetails', params: { id: id }}) 
    }

loadData()
loadOther()
loadExternal()
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
    padding-left: 20px;
    padding-right: 60px;
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
    color: #01b4e4;
    cursor: pointer;
    text-decoration: none;
    font-weight: 600;
}
.info a:hover{
    color:gray;
}
.content{
  width: 1300px;
  display: flex;
  align-items: flex-start;
  margin: auto;
  height: 100%;
  margin-top: 20px;
}
.left{
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    align-items: flex-start;
}
.right{
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    align-items: flex-start;
}
.persons{
    display: flex;
    flex-direction: column;
}
.person{
    display:flex;
    flex-direction:row;
    margin-bottom: 10px;
    height: 70px;
}
.person img{
    height: 70px;
    object-fit: cover;
    width: 70px;
    border-radius: 5px;
    cursor: pointer;
}
.personInfo a,p{
    margin: 0;
    padding: 0;
}
.podNaslov{
    font-weight: 400;
    font: 1em;
}
.personInfo{
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    margin-left: 20px;
}
.naslovi{
    display: flex;
}
.naslovi h1{
    font-size: 1.4em;
    margin: 0;
    margin-bottom: 20px;
}
.naslovi p{
    font-size: 1.4em;
    margin: 0;
    font-weight: 400;
    margin-left: 7px;
    color: gray;
}
.glavniNaslov{
    display: flex;
}
.glavniNaslov p{
    font-weight: 400;
    font-size: 2.2em;
    color: gray;
    margin: 0;
    margin-left: 5px;
}
.name{
   cursor: pointer;
}

</style>