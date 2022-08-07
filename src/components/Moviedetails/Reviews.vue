<template>
<div class="header" v-if="data">
        <span><div><a>Overview</a> <div class="arrow"></div></div><div class="headerDropdown">
            <router-link :to="{ name: 'Moviedetails', params: { id: id }}">Main</router-link>
            <router-link :to="{ name: 'AlternativeTitles', params: { id: id }}">Alternative Titles</router-link>
            <router-link :to="{ name: 'CastAndCrew', params: { id: id }}">Cast & Crew</router-link>
            <router-link :to="{ name: 'ReleaseDates', params: { id: id }}">Release Dates</router-link>
            <router-link :to="{ name: 'Translations', params: { id: id }}">Translations</router-link>
            <a :href="'https://www.themoviedb.org/movie/'+id+'/changes'">Changes</a>
            </div></span>
        <span><div class="overview">Media <div class="arrow"></div></div><div class="headerDropdown">
            <router-link :to="{ name: 'Backdrops', params: { id: id }}">Backdrops</router-link>
            <router-link :to="{ name: 'Logos', params: { id: id }}">Logos</router-link>
            <router-link :to="{ name: 'Posters', params: { id: id }}">Posters</router-link>
            <router-link :to="{ name: 'MediaVideos', params: { id: id }}">Videos</router-link>
            </div></span>
        <span><div>Fandom <div class="arrow"></div></div><div class="headerDropdown">
            <a :href="'https://www.themoviedb.org/movie/'+id+'/discuss'">Discussions</a>
            <router-link :to="{ name: 'Reviews', params: { id: id }}">Reviews</router-link>
            </div></span>
        <span><div>Share <div class="arrow"></div></div><div class="headerDropdown">
            <a @click="overlayToggle">Share Link</a>
            <a :href="'https://www.facebook.com/'+external.facebook_id">Facebook</a>
            <a :href="'https://twitter.com/'+external.facebook_id">Tweet</a>
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
                <router-link :to="{ name: 'Moviedetails', params: { id: id }}"><h1>{{data.original_title}}</h1></router-link>
                <router-link :to="{ name: 'Moviedetails', params: { id: id }}"><a>← Back to main</a></router-link>
            </div>

    </div>

</div>
  <div class="pageWrapper">
      <div class="main">
          <div class="left">

          </div>
    <div class="right" >
                    <div class="reviews" v-for="review in otherData" :key="review">
            <div class="review">
                <div class="reviewcard">
                <span class="reviewPrviRed"><img :src=" slika + review.author_details.avatar_path" alt=""><img v-if="review.author_details.avatar_path" :src="review.author_details.avatar_path.slice(1)" alt=""><div class="reviewProstor" ></div>
                <span class="reviewPrviRedText">
                <span class="reviewPrviRedTextRate"><h3><a>{{review.author}}</a></h3><div class="reviewrate">a</div></span>
                <h5>Written by <a>{{review.author}}</a> on <a>{{review.created_at}}</a></h5>
                </span>
                </span>
                
                <div class="reviewcontent">
                <p>{{review.content}}</p><a :href="'https://www.themoviedb.org/review/'+review.id">read the rest.</a>
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
    const router = useRouter()
    const route = useRoute()
    const id = route.params.id
    const slikica = ref(null)
    const slika = ref('https://image.tmdb.org/t/p/original/')
    const data = ref([])
    const otherData = ref([])
    const external = ref([])
    const overlayOn = ref(false)
    const urlNow = ref(window.location.href)

    const loadData = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/movie/'+ id +'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&append_to_response=reviews')
      data.value = await movieData.data
    console.log(data.value)

    }
    catch(err){}
    }

    const loadOther = async() => {
    try{
      let d = await axios.get('https://api.themoviedb.org/3/movie/' + id + '/reviews?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page=1')
      otherData.value = await d.data.results
    console.log(otherData.value)

    }
    catch(err){}
    }

    const loadExternal = async() => {
        try{
            let recommendationsData = await axios.get('https://api.themoviedb.org/3/movie/'+ id +'/external_ids?api_key=0b5e8ce7494ae54d6c643adf4db40da7')
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
loadExternal()
    return{
        id,data,router,router,slika,slikica,otherData,loadExternal,external,overlayOn,overlayToggle,urlNow

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
    justify-content: right;
}

.right{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    margin-left: 30px;

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
.reviews{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.review{
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    margin-bottom: 20px;
}
.review img{
    border-radius: 50px;
}

.reviewheader h2{
    font-size: 1em;
}
.reviewcontent a{
    cursor: pointer;
    text-decoration: underline;
}

.reviewcontent p{
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;

}
.reviewcontent{
    margin-left: 70px;
}
.reviewcontent a{
    text-decoration: underline;
    color: black;
}
.reviewcard{
    padding: 20px;
}

.reviewPrviRed{
    display: flex;
    flex-direction: row;
    height: 63px;
}
.reviewPrviRedText{
    margin-left: 10px;
    justify-content: center;
    display: flex;
    flex-direction: column;
}
.reviewPrviRedText h3{
    margin: 0;
}
.reviewPrviRedText h5{
    margin: 0;
}
.reviewPrviRedTextRate{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.reviewrate{
    width: 30px;
    height: 15px;
    display: flex;
    background: black;
    border-radius: 5px;
    color: white;
    margin-left: 10px;
    align-items: center;
    justify-content: center;
}
</style>