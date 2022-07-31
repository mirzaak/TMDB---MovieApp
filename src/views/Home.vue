<template>
<div class="discoverWrapper">
  <img v-if="backSlika" :src=" store.img + 'w1280' + backSlika " alt="">
  <div class="discoverBackground"></div>
      <div class="discover">
        <h1>Welcome.</h1>
        <h2>Millions of movies, TV Shows and people to discover. Explore Now.</h2>
        <span class="search">
          <label for="search"></label>
          <input type="text">
        </span>
  </div>
</div>
<ColumnWrapper/>
<ColumnWrapperTwo/>
<div class="trailers"><h1>No Trailers API</h1></div>
<ColumnWrapperThree/>
</template>

<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue';
import ColumnWrapper from '../components/Home/ColumnWrapper.vue'
import ColumnWrapperTwo from '../components/Home/ColumnWrapperTwo.vue'
import ColumnWrapperThree from '../components/Home/ColumnWrapperThree.vue'
import { useDataStore } from "../stores/data.js";

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
  margin-top: 30px;
  border: none;
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
</style>