<template>

<div class="media">
<div class="video" @click="overlayToggle">
<img v-if="media.key" :src="preVideo + media.key + postVideo" alt="" >
<div class="play" v-if="media.key">
    <img src="../../assets/play.svg" alt="" >
</div>
</div>
<img v-if="images" class="backdrop" :src="slika + 'w780' + images" alt="" width="780">
<img v-if="poster" class="poster" :src="slika + 'w342' + poster" alt="" width="342">
</div>
<div class="overlay" v-if="overlayOn" @click="overlayToggle">
<div class="overlayVideo">
<iframe v-if="media.key" width="1200" height="800" :src="video + media.key" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
</div>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
    const media = ref([])
    const images = ref()
    const route = useRoute()
    const id = route.params.id
    const preVideo = ref('http://i.ytimg.com/vi/')
    const postVideo = ref('/hqdefault.jpg')
    const slika = ref('https://image.tmdb.org/t/p/')
    const poster = ref()
    const video = ref('https://www.youtube.com/embed/')
    const overlayOn = ref(false)
    const loadVideos = async() => {
        try{
            let videosData = await axios.get('https://api.themoviedb.org/3/movie/'+ id +'/videos?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US')
            media.value = await videosData.data.results[0]
            media.value.length = 1
        }
        catch(err){}
        console.log(media.value,'aadxasdasd')
    }

    const loadImages = async() => {
        try{
            let imagesData = await axios.get('https://api.themoviedb.org/3/movie/'+ id +'/images?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&include_image_language=en%2Cnull')
            images.value = await imagesData.data.backdrops[0].file_path

        }   
        catch(err){}
        console.log(images.value)
    }

    const loadPosters = async() => {
        try{
            let imagesData = await axios.get('https://api.themoviedb.org/3/movie/'+ id +'/images?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&include_image_language=en%2Cnull')
            poster.value = await imagesData.data.posters[0].file_path
        }   
        catch(err){}
        console.log(poster.value)
    }

    const overlayToggle = () => {
        overlayOn.value = !overlayOn.value
    }

loadImages()
loadVideos()
loadPosters()
</script>

<style scoped>

.html { position:absolute; top:0; bottom:0; right:0; left:0; }
.video img{
    height: 400px;
    margin-top: 0px;
    cursor: pointer;    
}
.video{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;

}
.play{
    width: 67px;
    height: 67px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(0,0,0,0.7);
    position: absolute;
    cursor: pointer;
}
.play img{
    width: 30px;
    height: 30px;
    margin-bottom: -1px;
    filter:invert(1)
}
.play:hover.play img{
    opacity: 0.5;
    transition: 0.1s;
}
.media{
    display: flex;
    flex-direction: row;
}
.media .backdrop{
    width: 533px;
    height: 300px;
}
.media .poster{
    height: 300px;
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
  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
  align-items: center;
  justify-content: center;
}
.overlayVideo{
    display: flex;

    background: white;
    margin: auto;
}

</style>