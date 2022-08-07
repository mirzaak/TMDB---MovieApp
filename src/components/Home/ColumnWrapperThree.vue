<template>
<div class="columnWrapper">
  <div class="columnHeader">
    <h2>Free To Watch</h2>
    <div class="pill">
      <div class="selector">
        <div class="selected" ref="selected"></div>
        <h3><a :class="{selectedPill:headerSelect === 'today'}" @click="store.getDataThree('tv', 'airing_today');select('0','96px','today')">Today</a></h3>
        <h3><a :class="{selectedPill:headerSelect == 'thisweek'}" @click="store.getDataThree('movie', 'upcoming');select('85px','130px','thisweek')">This Week</a></h3>
      </div>
    </div>
  </div>
  <div class="movies" ref="movies">
    <div class="movieWrapper">
    <div class="movie" v-for="index in dataThree" :key="index">
      <div class="movieCard">
        <img :src=" store.img + 'w154' + index.poster_path" alt="" width="154" height="231" @click="toMovie(index)">
          <span class="movieInfo">
            <span class="progressBar"><circle-progress :border-width="3" :border-bg-width="9" :percent="index.vote_average * 10" fill-color="#90cea1" empty-color="none" background="#081c22" :size="40" /><p>{{index.vote_average * 10}}%</p></span>
            <h2 index.name><a href="#">{{index.name}}</a></h2>
            <h2 v-if="index.title"><a href="#">{{index.title}}</a></h2>
            <p v-if="index.release_date">{{index.release_date}}</p>
            <p v-if="index.first_air_date">{{index.first_air_date}}</p>
        </span>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted,computed } from 'vue';

import CircleProgress from "vue3-circle-progress";

import { useDataStore } from "../../stores/data.js";


import { useRouter, useRoute } from 'vue-router'
    
const route = useRoute()

const id = route.params.id

const router = useRouter()

const store = useDataStore();

const movies = ref()

const selected = ref()

const headerSelect = ref('today')

const select = (l,w,type) => {
headerSelect.value = type
  selected.value.style.left = l
  selected.value.style.width = w
}

const dataThree = computed(() => {
  return store.dataThree
})

const toMovie = (index) => {
      if(index.type==='movie'){
        router.push({ name: 'Moviedetails', params: { id: index.id }})    
      }else if(index.type=='tv'){
        console.log('tv')
      }
}
onMounted(() => {
  store.getDataThree('tv', 'airing_today');
})
</script>
<style scoped>
.columnWrapper{
  width: 1300px;
  margin: auto;
  margin-top: 30px;
    background-image: url(http://localhost:8081/img/back.5a94e8fd.svg);
    background-repeat: repeat-x;
    background-position: bottom;
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
  padding: 10px 0 10px 0;
}
.movieWrapper{
  display: flex;
  margin-left: 20px;
}
.movieCard{
  width: 154px;
  margin-left: 20px;
  overflow: hidden;
}
.movieCard img{
  border-radius: 10px;
  cursor: pointer;
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
  width: 96px;
  height: 32px;
  border-radius: 30px;
  position: absolute;
  transition: left 0.5s;
  left: 0;
  z-index: -1;
}

</style>