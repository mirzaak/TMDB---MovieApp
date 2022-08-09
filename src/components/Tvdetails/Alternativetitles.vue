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
            <div class="slika" v-if="data.poster_path" ><router-link :to="{ name: 'Tvdetails', params: { id: id }}"><img id="i" class="imag" ref="slikica" :src="slika+data.poster_path" alt="" ></router-link></div>
            <div class="info">
                <router-link :to="{ name: 'Tvdetails', params: { id: id }}"><div class="glavniNaslov"><h1>{{data.original_name}}</h1><p>({{datum}})</p></div></router-link>
                <router-link :to="{ name: 'Tvdetails', params: { id: id }}"><a>← Back to main</a></router-link>
            </div>

    </div>

</div>
  <div class="pageWrapper">
      <div class="main">
          <div class="left">
              <div class="panel">
                  <div class="blueBox">
                      <h3>Alternative Titles</h3><p>{{otherData.length}}</p>
                  </div>
                  <div @click="scrollToElement(b.iso_3166_1)" class="panelContent" v-for="b in otherData" :key="b">
                      <span><a ref="b">{{b.iso_3166_1}}</a><p></p></span>
                  </div>
              </div>
          </div>
          <div class="right">
              <div class="translations" v-for="a in otherData" :key="a">
                  <div  class="translation">
                      <div class="up"><a ref="a" >{{a.iso_3166_1}}</a></div>
                        <div class="down">
                            <div class="downUpWrap">
                                <div class="downUp"><a>Title</a><a>Type</a></div>
                            </div>
                            <div  class="downDown" id="element"><a v-if="a.title">{{a.title}}</a><a v-if="a.type">{{a.type}}</a></div>
                        </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
<div class="content">
    <div class="left"></div>
    <div class="right"></div>
</div>
</template>

<script setup>

import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { ref, shallowRef } from 'vue'


    const router = useRouter()
    const route = useRoute()
    const id = route.params.id
    const slikica = shallowRef('')
    const slika = ref('https://image.tmdb.org/t/p/original/')
    const data = ref([])
    const otherData = ref([])
    const a = ref(null)
    const b = ref(null)
    const dataImg = ref('')
    const lastImg = ref('')
    const datum = ref('')
    const external = ref([])
    const loadData = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/tv/'+ id +'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&append_to_response=reviews')
      data.value = await movieData.data
      dataImg.value = await movieData.data.poster_path
      lastImg.value = slika.value + movieData.data.poster_path
      datum.value = await movieData.data.first_air_date.substring(0,4)
    console.log(data.value)

    }
    catch(err){}
    }
    const loadOther = async() => {
    try{
      let d = await axios.get('https://api.themoviedb.org/3/tv/'+id+'/alternative_titles?api_key=0b5e8ce7494ae54d6c643adf4db40da7')
      otherData.value = await d.data.results
    console.log(otherData.value)

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
    const scrollToElement = (iso) => {
      var  element = a.value
      var  elementTwo = b.value
    for(let i = 0; elementTwo.length>i;i++){
        if(element[i].outerText==iso){
            element[i].scrollIntoView()
        }
    }
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


}
.downUp{
    display: flex;
    flex-direction: row;

}
.downUp a{
    font-weight: bold;
    padding: 10px;
    margin: 0;
    width: 500px;
}
.downDown a{
    padding: 10px;
    margin: 0;
    width: 500px;
}
.downUpWrap{
    height: 100%;
    width: 100%;
    border-bottom: 1px solid lightgray;
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
</style>