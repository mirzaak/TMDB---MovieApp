<template>
    <div class="header">
        <span><div class="overview"><a>Overview</a> <div class="arrow"></div></div><div class="headerDropdown">
            <router-link :to="{ name: 'Actordetails', params: { id: id }}">Main</router-link>
            <router-link :to="{ name: 'ActorTranslations', params: { id: id }}">Translations</router-link>
            <router-link :to="{ name: 'ActorChanges', params: { id: id }}">Changes</router-link>
            </div></span>
        <span><div>Media <div class="arrow"></div></div><div class="headerDropdown">
            <a>Profiles</a></div></span>
        <span><div>Fandom <div class="arrow"></div></div><div class="headerDropdown">
            <a>Discussions</a></div></span>
        <span><div>Share <div class="arrow"></div></div><div class="headerDropdown">
            <a>Share Link</a>
            <a>Facebook</a>
            <a>Tweet</a>
            </div></span>
    </div>
    <div class="mainMenuWrapper">
        <div class="mainMenu">
            <div class="slika" v-if="data.profile_path"><router-link :to="{ name: 'Actordetails', params: { id: id }}"><img :src=" slika + data.profile_path" alt=""></router-link></div>
            <div class="info">
                <router-link :to="{ name: 'Actordetails', params: { id: id }}"><h1>{{data.name}}</h1></router-link>
                <router-link :to="{ name: 'Actordetails', params: { id: id }}"><a>← Back to main</a></router-link>
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
const changes = ref([])
const id = route.params.id
const translationRef = ref(null)



    const loadData = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/person/'+id+'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US')
      data.value = await movieData.data
    console.log(data.value)
    }
    catch(err){}
    }

    const loadChanges = async() => {
    try{
      let tData = await axios.get('https://api.themoviedb.org/3/person/'+id+'/changes?api_key=0b5e8ce7494ae54d6c643adf4db40da7&page=1')
      changes.value = await tData.data.changes
    console.log(changes.value)
    }
    catch(err){}
    }

    const scrolltoElement = (name) => {
        let element = translationRef.value
        console.log(element)
    }



loadData()
loadChanges()
    return{
        route, router, slika, data, id, changes, scrolltoElement,translationRef

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
  border-width: 0 3px 3px 0;
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
.mainMenuWrapper{
    width: 100%;
    height: 90px;
    background: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
}
.mainMenu{
    height: 90px;
    width: 1300px;
    display: flex;
    align-items: center;

}
.slika img{
    height: 75px;
    cursor: pointer;
}
.info h1{
    margin:0;
    cursor: pointer;
}
.info{
    margin-left: 15px;
}
.info a{
    color: #01b4e4;
    cursor: pointer;
}
.info a:hover{
    color:aqua;
}
.pageWrapper{
    width: 1300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: auto;
}
.main{
    display: flex;
    flex-direction: row;
    margin-top: 50px;
}
.left{
    display: flex;
    height: 100%;
    width: 250px;
    flex-direction: row;
}
.panel{
    display: flex;
    width: 250px;
    border:1px solid lightgray;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    border-radius: 8px;
    flex-direction: column;

    padding-bottom: 10px;
}
.blueBox{
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    background: #01b4e4;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    align-self: flex-start;
}
.blueBox h3{
    color: white;
    margin-left: 20px;
    font-size: 18px;
    font-weight: 600;
}
.panelContent{
    display: flex;
    flex-direction: column;
    font-size: 1em;

}
.panelContent a{
    padding: 10px;
    padding-left: 20px;

}
.panelContent a:hover{
    background: lightgray;
    cursor: pointer;
}
.right{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-left: 30px;
}
.right a{
    margin-left: 20px;
    margin-top: 10px;
}
.panel span {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.panel span p{
    margin: 0;
    margin-right: 20px;
    padding-right: 10px;
    padding-left: 10px;
    border-radius: 7px;
    background: lightgray;
}
.panel span:hover{
    background: lightgray;
    cursor: pointer;
}
.panel span:hover p{
    background: white;
}
.translation{
    width: 1000px;
    border: 1px solid lightgray;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    border-radius: 10px;
    margin-bottom: 20px;
    overflow: hidden;
}
.translation .up{
    padding-left: 10px;
    height: 40px;
    background: lightgray;
    border-bottom: 1px solid lightgray;
    width: 100%;
    display: flex;
    align-items:center;
    flex-direction: row;
}
.translation .down{
    padding: 10px;
    color: black;
}
.translations .up a{
    margin: 0;
}
.right{
    display: flex;
    flex-direction: column;
}
.translations{
    display: flex;
    flex-direction: column;
}
.header a{
    font-size: 17px;
}
.info h1{
    color: black;
    text-decoration: none;
    font: bold;
    
}
.info a{
    color: #01b4e4;
    text-decoration: none;
    font-weight: bold;

}
</style>