<template>
<div class="header" v-if="data">
        <span><div><a>Overview</a> <div class="arrow"></div></div><div class="headerDropdown">
            <router-link :to="{ name: 'Tvdetails', params: { id: id }}">Main</router-link>
            <router-link :to="{ name: 'AlternativeTitlesTv', params: { id: id }}">Alternative Titles</router-link>
            <router-link :to="{ name: 'CastAndCrewTv', params: { id: id }}">Cast & Crew</router-link>
            <router-link :to="{ name: 'TranslationsTv', params: { id: id }}">Translations</router-link>
            <a :href="'https://www.themoviedb.org/tv/'+id+'/changes'">Changes</a>
            </div></span>
        <span><div class="overview">Media <div class="arrow"></div></div><div class="headerDropdown">
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
            <div class="slika" v-if="data.poster_path" ><router-link :to="{ name: 'Moviedetails', params: { id: id }}"><img class="img" ref="slikica" :src=" slika + data.poster_path" alt="" ></router-link></div>
            <div class="info">
                <router-link :to="{ name: 'Moviedetails', params: { id: id }}"><h1>{{data.original_name}}</h1></router-link>
                <router-link :to="{ name: 'Moviedetails', params: { id: id }}"><a>← Back to main</a></router-link>
            </div>

    </div>

</div>
  <div class="pageWrapper">
      <div class="main">
          <div class="left">
              <div class="panel">
                  <div class="blueBox">
                      <h3>Backdrops</h3>
                  </div>
                  <div class="panelContent" v-for="b in chars" :key="b">
                      <span @click="backdropFilter(b)"><a ref="b">{{b}}</a></span>
                      
                  </div>
                  <span class="noLanguage" @click="backdropFilter(null)"><a ref="b">No Language</a></span>
              </div>
          </div>
    <div class="right" >
        <div class="backdrops">
            <div class="backdrop" v-for="backdrop in otherData" :key="backdrop">
            <img :src=" slika + backdrop.file_path" alt="" @click="openImage(backdrop.file_path)">
            <div class="imgInfo">
                <a>Info</a>
            </div>
            <p>Language</p>
            <a ref="a">{{backdrop.iso_639_1}}</a><a v-if="!backdrop.iso_639_1">/</a>
            <p>Size</p>
            <span class="res"><a>{{backdrop.width}}x{{backdrop.height}}</a><img class="check" src="../../assets/check.svg" alt=""></span>
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
    const router = useRouter()
    const route = useRoute()
    const id = route.params.id
    const slikica = ref(null)
    const slika = ref('https://image.tmdb.org/t/p/original/')
    const data = ref([])
    const otherData = ref([])
    const a = ref(null)
    const b = ref(null)
    const clipdata = ref([])
    const newClipData = ref([])
    const middleData = ref([])
    const chars = ref([])
    const external = ref([])
    const overlayOn = ref(false)
    const urlNow = ref(window.location.href)

    const loadData = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/tv/'+ id +'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&append_to_response=reviews')
      data.value = await movieData.data
    console.log(data.value)

    }
    catch(err){}
    }
    const loadOther = async() => {
    try{
      let d = await axios.get('https://api.themoviedb.org/3/tv/'+id+'/images?api_key=0b5e8ce7494ae54d6c643adf4db40da7')
      otherData.value = await d.data.posters
    console.log(otherData.value)

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

    const openImage = (poster) => {
        window.open('https://image.tmdb.org/t/p/original/'+poster, "_blank");
    }

    const panelFilter = async(lang) => {
    try{
      let d = await axios.get('https://api.themoviedb.org/3/tv/'+id+'/images?api_key=0b5e8ce7494ae54d6c643adf4db40da7')
      clipdata.value = await d.data.posters
        console.log(clipdata.value.length)
                newClipData.value = []
    for(let i = 0; clipdata.value.length > i;i++){

    if(clipdata.value[i].iso_639_1 !== null){

            newClipData.value.push(clipdata.value[i].iso_639_1)
            
        }
        middleData.value = newClipData.value
        chars.value = [...new Set(middleData.value)]
        console.log(chars.value, 'newClipData')

        console.log(newClipData.value, 'newClipData')

    }

    }
    catch(err){}
    }

    const backdropFilter = async(lang) => {
    try{
      let d = await axios.get('https://api.themoviedb.org/3/tv/'+id+'/images?api_key=0b5e8ce7494ae54d6c643adf4db40da7')
      clipdata.value = await d.data.posters
        console.log(clipdata.value.length)
                newClipData.value = []
    for(let i = 0; clipdata.value.length > i;i++){

    if(clipdata.value[i].iso_639_1 == lang){

            newClipData.value.push(clipdata.value[i])
            
        }
        otherData.value = newClipData.value

        console.log(newClipData.value, 'newClipData')

    }

    }
    catch(err){}
    }

    const loadExternal = async() => {
        try{
            let recommendationsData = await axios.get('https://api.themoviedb.org/3/tv/'+ id +'/external_ids?api_key=0b5e8ce7494ae54d6c643adf4db40da7')
            external.value = await recommendationsData.data
        }   
        catch(err){}
        console.log(external.value)
    }

    const overlayToggle = () => {
        overlayOn.value = !overlayOn.value

    }

loadData()
loadOther()
panelFilter()
loadExternal()
    return{
        id,data,router,router,slika,slikica,otherData,scrollToElement,a,b,openImage,newClipData,clipdata,panelFilter,middleData,backdropFilter,chars,
        external,overlayToggle,overlayOn,urlNow
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
    justify-content: space-between;
}
.blueBox p{
    margin-right: 20px;
    font-size: 18px;
    font-weight: 400;
    color: white;
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
    flex-direction: row;
    width: 100%;
    height: 100%;
    margin-left: 30px;

}
.right a{
    margin-left: 20px;
    margin-top: 10px;
}
.right img{
    width: 230px;
}
.backdrop{
    width: 230px;
    padding-bottom: 10px;
    border: 1px solid lightgray;
    margin: 10px;
    margin-top: 0;
    margin-bottom: 20px;
}
.backdrops{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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

.right{
    display: flex;
    flex-direction: column;
}
.header a{
    font-size: 17px;
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
.down{
    display: flex;
    width:1000px;
    flex-direction: column;
    
}
.downDown {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 500px;
}
.downUp{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 500px;
}
.downUp a{
    font-weight: bold;
    padding: 10px;
    margin: 0;
}
.downDown a{
    padding: 10px;
    margin: 0;
}
.downUpWrap{
    height: 100%;
    width: 100%;
    border-bottom: 1px solid lightgray;
}
.backdrop a, p{
    margin: 0;
    padding: 0;
    margin-left: 20px;
}
.backdrop img{
    cursor: pointer;
}
.backdrop{
    border-radius: 10px;
    overflow: hidden;
}
.backdrop p{
    margin-top: 10px;
    font-size: 0.8em;
    
}
.imgInfo{
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid lightgray;
}
.imgInfo a{
    margin-left: 20px;
    font-size: 1em;
}

.res{
    display: flex;
    align-items: center;
}
.res img{
    width: 12px;
    height: 12px;
    cursor: auto;
}
.noLang{
    visibility:hidden;
}
.noLanguage a{
    padding: 10px;
    padding-left: 20px;

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
</style>