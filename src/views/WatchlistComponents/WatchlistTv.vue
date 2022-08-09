<template>
    <div class="downContent">

        <div class="movies">
            <div class="movie" v-for="movie in otherData" :key="movie">
            <img :src="slika + movie.poster_path" alt="">
            <div class="movieInfo">
                <div class="prviRed">
                <div class="percentage"><circle-progress class="circle" :percent="movie.vote_average*10" :size="60" fill-color="green" empty-color="none" :border-width="4" /><p class="percentagebroj">{{movie.vote_average.toString().substring(2,0)*10}}%</p></div>
                    <div class="prviRedText">
                        <h2 v-if="movie.title"><a>{{movie.title}}</a></h2>
                        <h2 v-if="movie.name"><a>{{movie.name}}</a></h2>
                        <p v-if="movie.release_date">{{movie.release_date}}</p>
                        <p v-if="movie.first_air_date">{{movie.first_air_date}}</p>
                    </div>
                </div>
                <div class="desc">
                    <p>{{movie.overview}}</p>
                </div>
                <div class="actionBar">
                    <div class="movieButton">
                        <span class="movieButtonCircle star"><img src="../../ProfileAssets/star.svg" alt=""></span><a>Your Rating</a>
                    </div>
                    <div class="movieButton" @click="postFav(movie.id)">
                        <span ref="heart" :class="{heartPink:fMoviesIds.includes(movie.id)}" class="movieButtonCircle heart"><img src="../../ProfileAssets/heart.svg" alt=""></span><a>Favourite</a>
                    </div>
                    <div class="movieButton">
                        <span class="movieButtonCircle lines"><img src="../../ProfileAssets/lines.svg" alt=""></span><a>Add To List</a>
                    </div>
                    <div class="movieButton" @click="deleteIndex(movie.id)">
                        <span class="movieButtonCircle x"><img src="../../ProfileAssets/x.svg" alt=""></span><a>Remove</a>
                    </div>

                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
import axios from 'axios'
import { ref, shallowRef,computed } from 'vue'
import { useUserStore } from "../../stores/user.js";
    const router = useRouter()
    const route = useRoute()

    const store = useUserStore()


    const slika = ref('https://image.tmdb.org/t/p/original/')
    const data = ref([])
    const otherData = ref([])
    const credits = ref([])
    const images = ref([])
    const videos = ref([])
    const videoUrl = ref('https://www.youtube.com/embed/')
    const id = route.params.id
    const profileImg = ref('')

    const movieLength = ref('')
    const tvLength = ref('')
    const tip = ref('movies')
    const heart = ref()

    const favouriteTvs = ref([])

    const favouriteMovies = ref([])

    const favourite = ref()

     const fMoviesIds = ref([])

    const loadData = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/account?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+sesija.value)
      data.value = await movieData.data
      profileImg.value = 'https://www.gravatar.com/avatar/'+ await movieData.data.avatar.gravatar.hash
    console.log(data.value)
    console.log(sesija)
    }
    catch(err){}
    }

    const loadOtherData = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+sesija.value+'&sort_by=created_at.asc&page=1')
      let tvData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/watchlist/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+sesija.value+'&sort_by=created_at.asc&page=1')
      let favMoviesData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/favorite/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+sesija.value+'&language=en-US&sort_by=created_at.asc&page=1')
      otherData.value = await tvData.data.results
        movieLength.value = await movieData.data.results.length
        tvLength.value = await tvData.data.results.length
        favouriteMovies.value = await favMoviesData.data.results
        console.log(otherData.value,'otherData')
        console.log(favouriteMovies.value,'favouriteMovies')
    console.log(favouriteMovies.value)

    for(let i = 0; favouriteMovies.value.length > i; i++){
        fMoviesIds.value.push(favouriteMovies.value[i].id)
        fMoviesIds.value.push(favouriteMovies.value[i].id)

    }

    }
    catch(err){}
    }

    const changeType = async(type) => {
      let tvData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/watchlist/'+type+'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+sesija.value+'&sort_by=created_at.asc&page=1')
      otherData.value = await tvData.data.results
      tip.value = type
    }

    const postFav =(id) => {
      let i = fMoviesIds.value.indexOf(id)
try{      
if(fMoviesIds.value.includes(id)){

    fMoviesIds.value.splice(i,1)
    console.log(fMoviesIds.value)
axios.post('https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+sesija.value, {
  "media_type": "tv",
  "media_id": id,
  "favorite": false
  })

}else{
        fMoviesIds.value.push(id)
    axios.post('https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+sesija.value, {
  "media_type": "tv",
  "media_id": id,
  "favorite": true
  })

}


    }
    catch(err){}

    }

    const deleteIndex =async(id) => {

 await axios.post('https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+sesija.value, {
  "media_type": "tv",
  "media_id": id,
  "watchlist": false
  })
let movieData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/watchlist/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+sesija.value+'&sort_by=created_at.asc&page=1')
otherData.value = movieData.data.results




    }
    
loadData()
loadOtherData()
</script>

<style scoped>
.downContent{
    display: flex; 
}
.movie{
    height: 200px;
    width: 1300px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    border: 1px solid rgba((lightgray), 1);
    display: flex;
}
.movie img{
    height: 200px;
    cursor: pointer;
}
.prviRedText p,h2{
    margin: 0;
}
.prviRedText a{
    cursor: pointer;
}
.prviRed{
    display: flex;
    position: relative;
    align-items: center;
}
.desc{
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.movieButtonCircle{
    height: 25px;
    width: 25px;
    border-radius: 25px;
    outline: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
}
.movieButtonCircle img{
    width: 17px;
    height: 17px;
    filter: invert(64%) sepia(0%) saturate(2%) hue-rotate(139deg) brightness(92%) contrast(92%);
}
.actionBar{
    display: flex;
}
.movieButton{
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor:pointer;
}
.movieButton a{
    cursor: pointer;
}
.movieInfo{
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.percentage{
  background: #0d253f;
  height: 40px;
  width: 40px;
  display: flex;
  border-radius: 34px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.percentagebroj{
  display: flex;
  align-self: center;
  justify-content: center;

}
.percentage p{
  font-size: 10px;
  color: white;
  position: absolute;
}
.percentage a{
  left: 14px;
  bottom: 17px;
  font-size: 7px;
  color: white;

}
.circle{
    margin-top: 20px;


}
.downHeader{
    width: 1300px;
    height: 60px;
    display: flex;

    margin: auto;
    margin-top: 20px;
    justify-content: space-between;
}
.downHeaderLeft{
    display: flex;
    align-items: center;
}
.downHeaderLeft p{
    margin: 0;
    color: lightgrey;
    margin-left: 5px;
}
.downHeaderLeft a{
    display: flex;
    cursor: pointer;
}
.downHeaderRight{
    display: flex;
    align-items: center;
    position: relative;
}
.downHeaderLeft a{
    margin-left: 10px;
}
.downHeaderRight a{
    cursor: pointer;
    font-size: 1.3em;
    padding: 5px;
}
.downHeaderCircle{
    margin-left: 5px;
    background: lightgray;
    width: 20px;
    height:20px;
    border-radius:20px;
    cursor: pointer;
}

.filters{
    padding: 0;
    margin: 0;

    display: flex;
    flex-direction: column;

}


.filter a{
    font-size: 1em;
    padding: 0;
    border-bottom: 1px solid lightgray;
    font-weight: bold;
    color: lightgray;
}
.filterBy{
    position: absolute;
    right: 130px;
    width: 100px;
}
.typeLinija{
    border-bottom:4px solid gray;
    margin-bottom: -4px;
}
.heartPink img{
    filter: invert(1) sepia(0%) saturate(2%) hue-rotate(139deg) brightness(100%) contrast(100%);
}
.heartPink{
    background: hotpink;
    outline: none;

}
.filters option{
    padding:10px;
}
.x:hover{
    background: gray;
    outline: none;

}
.x:hover img{
    filter: invert(1) sepia(0%) saturate(2%) hue-rotate(139deg) brightness(100%) contrast(100%);
}
.lines:hover img{
    filter: invert(1) sepia(0%) saturate(2%) hue-rotate(139deg) brightness(100%) contrast(100%);
}
.star:hover img{
    filter: invert(1) sepia(0%) saturate(2%) hue-rotate(139deg) brightness(100%) contrast(100%);
}
.lines:hover{
    background: gray;
    outline: none;

}
.star:hover{
    background: gray;
    outline: none;

}
.heart:hover{
    background: hotpink;
    outline: none;

}
.heart:hover img{
    filter: invert(1) sepia(0%) saturate(2%) hue-rotate(139deg) brightness(100%) contrast(100%);
}
</style>