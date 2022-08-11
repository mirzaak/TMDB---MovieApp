<template>
<div class="discoverWrapper">
  <img v-if="backSlika" :src=" store.img + 'w1280' + backSlika " alt="">
  <div class="discoverBackground"></div>
      <div class="discover">
        <h1>Welcome.</h1>
        <h2>Millions of movies, TV Shows and people to discover. Explore Now.</h2>
        <span class="search">
          <label for="search"></label>
          <input type="text" placeholder="Search for a movie, tv show, person..." v-model="searchText" @keyup.enter="search()">
          <button class="submit" @click="search()">Search</button>
        </span>
  </div>
</div>
<Suspense>
  <template #default>
    <AsyncComp/>
  </template>
  <template #fallback>
<div class="columnWrapper">
  <div class="columnHeader">
    <h2>What's Popular</h2>
    <div class="pill">
      <div class="selector">
        <div class="selected" ref="selected"></div>
        <h3><a  @click="store.mergeData();select('0','130px','merged')">Streaming</a></h3>
        <h3><a  @click="store.getData('tv', 'popular');select('110px','115px','popular')">On TV</a></h3>
        <h3><a  @click="store.getData('movie', 'now_playing');select('205px','120px','nowplaying')">For Rent</a></h3>
        <h3><a  @click="store.getData('movie', 'upcoming');select('310px','145px','upcoming')">In Theatres</a></h3>
      </div>
    </div>
  </div>
  <div class="movies" ref="movies">
    <div class="movieWrapper">
    <div class="movie" v-for="index in 8" :key="index">
      <div class="movieCard">
        <img src="../assets/noImage.svg">
          <span class="movieInfo">
        </span>
      </div>
    </div>
  </div>
  </div>
</div>
  </template>
</Suspense>

<Suspense>
  <template #default>
    <AsyncCompTwo/>
  </template>
  <template #fallback>
<div class="columnWrapper">
  <div class="columnHeader">
    <h2>Free To Watch</h2>
    <div class="pill">
      <div class="selector">
        <div class="selected" ref="selected"></div>
        <h3><a  @click="store.getDataTwo('movie', 'popular');select('0','107px','movie')">Movies</a></h3>
        <h3><a  @click="store.getDataTwo('tv', 'popular');select('90px','67px','tv')">TV</a></h3>
      </div>
    </div>
  </div>
  <div class="movies" ref="movies">
    <div class="movieWrapper">
    <div class="movie" v-for="index in 8" :key="index">
      <div class="movieCard">
        <img src="../assets/noImage.svg">
          <span class="movieInfo">
        </span>
      </div>
    </div>
  </div>
  </div>
</div>
  </template>
</Suspense>

<div class="trailers"><h1>No Trailers API</h1></div>
<Suspense>
  <template #default>
    <AsyncCompThree/>
  </template>
  <template #fallback>
<div class="columnWrapper">
  <div class="columnHeader">
    <h2>Free To Watch</h2>
    <div class="pill">
      <div class="selector">
        <div class="selected" ref="selected"></div>
        <h3><a  @click="store.getDataThree('tv', 'airing_today');select('0','96px','today')">Today</a></h3>
        <h3><a  @click="store.getDataThree('movie', 'upcoming');select('85px','130px','thisweek')">This Week</a></h3>
      </div>
    </div>
  </div>
  <div class="movies" ref="movies">
    <div class="movieWrapper">
    <div class="movie" v-for="index in 8" :key="index">
      <div class="movieCard">
        <img src="../assets/noImage.svg">
          <span class="movieInfo">
        </span>
      </div>
    </div>
  </div>
  </div>
</div>
  </template>
</Suspense>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue';
import { useDataStore } from "../stores/data.js";
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('../components/Home/ColumnWrapper.vue')
)
const AsyncCompTwo = defineAsyncComponent(() =>
  import('../components/Home/ColumnWrapperTwo.vue')
)
const AsyncCompThree = defineAsyncComponent(() =>
  import('../components/Home/ColumnWrapperThree.vue')
)
const router = useRouter()
const route = useRoute()
const searchText = ref('')
const store = useDataStore();
      function getRandomInt(max) {
      return Math.floor(Math.random() * max);
      }
const data = ref([])
const merged = ref([])
const backSlika = ref('')
      const mergeData = async() => {
          const fetchedDataMovies = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page=1')
          const fetchedDataTVs = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page=1')
          const mergeMovies = await fetchedDataMovies.data.results
          const mergeTVs = await fetchedDataTVs.data.results
          data.value = mergeMovies.concat(mergeTVs)
          merged.value = mergeMovies.concat(mergeTVs)
          backSlika.value = merged.value[getRandomInt(21)].backdrop_path
      }
    const search = () => {
        router.push({ name: 'Searched', params: { query: searchText.value }})  
    }
onMounted(() => {
  mergeData()
})
</script>
<style scoped>
.discoverWrapper{
  height: 300px;
  width: 1300px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
.discover h1{
  margin: 0;
  font-size: 2.5em;
  font-weight: bold;
  color: white;
}
.discover h2{
  margin: 0;
  font-weight: bold;
  color: white;
}
.search input{
  width: 1000px;
  height: 30px;
  border-radius: 30px;
  padding: 10px;
  padding-left: 20px;
  margin-top: 30px;
  border: none;
  outline: none;
  font-size: 1em;
}
.trailers{
  width: 1300px;
  height: 300px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d253f;
  color: white;
}
.discover{
  z-index: 3;
  filter: opacity(1);
}
.discoverWrapper img{
  width: 1300px;
  position: absolute;
  object-fit: cover;
  object-position: 100% 40%;
}
.discoverBackground{
  width: 100%;
  height: 100%;
  background:#0d253f;
  z-index: 2;
  filter:opacity(0.6);
  position: absolute;
}
.search{
  display: flex;
  flex-direction: row;
  width: 1110px;
  margin: auto;
  margin-top: 0;
  margin-bottom: 0;
  position: relative;
}
.submit{
  font-size: 15px;
  text-align: center;
  font-weight: bold;
  color: white;
  cursor: pointer;
  background: linear-gradient(to right, rgba(30	213	169) 0%,rgba(1	180	228) 100%);
  width: 130px;
  height: 50px;
  padding: 10px;
  position: absolute;
  border-radius: 30px;
  border: none;
  outline: none;
  top: 30px;
  left: 900px;
}
.submit:hover{
  color: black;
}
.columnWrapper{
  width: 1300px;
  margin: auto;
  margin-top: 30px;
  height: 386px;

}
.columnHeader{
  height: 30px;
  margin: 0 40px 0 40px;
  display: flex;
  align-items: center;
}
.movies{
  display: flex;
  width:1300px;
  overflow-x: scroll;
  padding: 20px 0 10px 0;
}
.movieWrapper{
  display: flex;
  margin-left: 20px;
}
.movieCard{
  width: 154px;
  margin-left: 20px;
  overflow: hidden;
  margin-bottom: 10px;
}
.movieCard img{
  border-radius: 10px;
  cursor: pointer;
  width: 154px;
  height: 231px;
  filter: invert(1);
}
.movieInfo{
  color: black;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 15px;
}
.movieInfo h2{
  font-size: 1em;
  margin: 0;
}
.movieInfo a{
  text-decoration: none;
  color: black;
  font-weight: bold;
}
.movieInfo p{
  color: gray;
  margin: 0;
}
.movieInfo a:hover{
  color: #01b4e4;
}
::-webkit-scrollbar {
  height: 7px;
  border-radius: 5px;
  
}
::-webkit-scrollbar-thumb {
  background: lightgray;
  border-radius: 5px;
}
.progressBar{
  position: absolute;
  top: -25px;
  left: 8px;
  background: #081c22;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  border-radius: 40px;
}
.progressBar p{
  position: absolute;
  font-size: 0.6em;
  color: white;
  font-weight: bold;
}
.pill{
  overflow: hidden;
  display: flex;
  border-radius: 30px;
  outline: 1px solid #0d253f;
  margin-left: 20px;
}
.selector{
  display: flex;
  align-items: center;
  position: relative;
}
.pill a{
  text-decoration: none;
  color: black;
  cursor: pointer;
}
.selectedPill{
    background: linear-gradient(to right, #c0fecf 0%, #1ed5a9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.pill h3{
  margin: 0;
  padding: 4px 20px;
  border-radius: 20px;
}
.selected{ 
  background: #0d253f;
  width: 130px;
  height: 32px;
  border-radius: 30px;
  position: absolute;
  transition: left 0.5s;
  left: 0;
  z-index: -1;
}
</style>