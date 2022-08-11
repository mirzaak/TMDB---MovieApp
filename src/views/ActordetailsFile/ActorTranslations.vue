<template>
    <div class="header">
        <span><div class="overview"><a>Overview</a> <div class="arrow"></div></div><div class="headerDropdown">
            <router-link :to="{ name: 'Actordetails', params: { id: id }}">Main</router-link>
            <router-link :to="{ name: 'ActorTranslations', params: { id: id }}">Translations</router-link>
            <a :href="'https://www.themoviedb.org/person/'+data.id+'/changes'">Changes</a>
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
    <div class="mainMenuWrapper">
        <div class="mainMenu">
            <div class="slika" v-if="data.profile_path"><router-link :to="{ name: 'Actordetails', params: { id: id }}"><img :src=" slika + data.profile_path" alt=""></router-link></div>
            <div class="info">
                <router-link :to="{ name: 'Actordetails', params: { id: id }}"><h1>{{data.name}}</h1></router-link>
                <router-link :to="{ name: 'Actordetails', params: { id: id }}"><a>← Back to main</a></router-link>
            </div>
        </div>
    </div>
  <div class="pageWrapper">
      <div class="main">
          <div class="left">
              <div class="panel">
                  <div class="blueBox">
                      <h3>Search Results</h3>
                  </div>
                  <div v-for="index in translations" :key="index" class="panelContent">
                      <span ref="b" @click="scrollToElement(index.name)"><a>{{index.name}}</a><p>({{index.iso_639_1}}-{{index.iso_3166_1}})</p></span>
                  </div>
              </div>
          </div>
          <div class="right">
              <div class="translations" v-for="index in translations" :key="index">
                  <div  class="translation">
                      <div class="up"><a ref="a" >{{index.name}}</a><p>({{index.iso_639_1}}-{{index.iso_3166_1}})</p></div>
                        <div class="down">{{index.data.biography}}</div>
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
const a = ref(null)
const b = ref(null)
const route = useRoute()
const router = useRouter()
const slika = ref('https://image.tmdb.org/t/p/original/')
const data = ref([])
const translations = ref([])
const id = route.params.id
const translationRef = ref(null)
const overlayOn = ref(false)
const urlNow = ref(window.location.href)


    const loadData = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/person/'+id+'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-&append_to_response=external_ids')
      data.value = await movieData.data
    console.log(data.value)
    }
    catch(err){}
    }

    const loadTranslations = async() => {
    try{
      let tData = await axios.get('https://api.themoviedb.org/3/person/'+id+'/translations?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US')
      translations.value = await tData.data.translations
    console.log(translations.value)
    }
    catch(err){}
    }

    const scrollToElement = (iso) => {
      var  element = a.value
      var  elementTwo = b.value
    for(let i = 0; elementTwo.length>i;i++){
        if(element[i].outerText==iso){
            element[i].scrollIntoView()
        }
    }
    }
    const overlayToggle = () => {
        overlayOn.value = !overlayOn.value

    }


loadData()
loadTranslations()
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
.mainMenuWrapper{
    width: 100%;
    height: 120px;
    background: #0d253f;
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
.info a:hover{
    color:gray ;
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
.info a{
    color: #01b4e4;
    text-decoration: none;
    font-weight: bold;

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