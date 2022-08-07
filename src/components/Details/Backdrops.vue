<template>
<div class="media" v-for="backdrop in images" :key="backdrop">
<img v-if="backdrop.file_path" :src="slika+ 'w780' + backdrop.file_path" alt="">
</div>


</template>

<script setup>

import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

    const media = ref([])
    const mediaTwo = ref([])
    const mediaThree = ref([])
    const mediaFour = ref([])
    const mediaFive = ref([])
    const mediaSix = ref([])
    const images = ref([])
    const route = useRoute()
    const id = route.params.id
    const preVideo = ref('http://i.ytimg.com/vi/')
    const postVideo = ref('/hqdefault.jpg')
    const slika = ref('https://image.tmdb.org/t/p/')
    const poster = ref([])
    const video = ref('https://www.youtube.com/embed/')
    const overlayOn = ref(false)
    const spicifiedVideo = ref('')
    const loadImages = async() => {
        try{
            let imagesData = await axios.get('https://api.themoviedb.org/3/movie/'+ id +'/images?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&include_image_language=en%2Cnull')
            images.value = await imagesData.data.backdrops

        }   
        catch(err){}
        console.log(images.value)
    }

    const overlayToggle = (key) => {
        overlayOn.value = !overlayOn.value
        spicifiedVideo.value = key
    }

    loadImages()
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
    height: 300px;
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