<template>
      <div class="searchBarWrapper">
          <div class="searchBar">
              <div class="search">
                  <img src="../assets/lupa.svg" alt="">
                  <input v-model="query" @keyup.enter="searchSubmit" type="text" placeholder="Search for a movie, tv show, person...">
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
                  <div class="panelContent">
                      <span @click="searched = movies"><a>Movies</a><p>{{movies.length}}</p></span>
                      <span @click="searched = tvshows"><a>TV Shows</a><p>{{tvshows.length}}</p></span>
                      <span @click="searched = people"><a>People</a><p>{{people.length}}</p></span>
                      <span @click="searched = collections"><a>Collections</a><p>{{collections.length}}</p></span>
                      <span @click="searched = companies"><a>Companies</a><p>{{companies.length}}</p></span>
                      <span @click="searched = keywords"><a>Keywords</a><p>{{keywords.length}}</p></span>
                  </div>
              </div>
          </div>
          <div class="right">
              <div class="searched" v-for="item in searched" :key="item">
                  <div class="singleSearch">
                      <img @click="toMovie(item)" v-if="item.poster_path" :src=" slika + item.poster_path" alt="">
                      <img @click="toMovie(item)" v-if="!item.poster_path" src="../assets/noImage.svg" alt="">

                        <div class="info">
                      <div class="up">
                          <a><h3>{{item.original_title}}</h3></a>
                          <a><h3 @click="toMovie(item)">{{item.name}}</h3></a>

                          
                          <p>{{item.release_date}}</p>
                          <p>{{item.first_air_date}}</p>
                          <p>{{item.known_for_department}}</p>
                      </div>
                      <div class="opis">
                          <p>{{item.overview}}</p>
                      </div>
                        </div>
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
const route = useRoute()
const router = useRouter()
const slika = ref('https://image.tmdb.org/t/p/original/')
const query = ref(route.params.query)
const NewQuery = ref('')

const searched = ref([])

const movies = ref([])
const tvshows = ref([])
const people = ref([])
const collections = ref([])
const companies = ref([])
const keywords = ref([])


    const loadMovies = async() => {
        try{
        let a = await axios.get('https://api.themoviedb.org/3/search/movie?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&query='+query.value+'&include_adult=false&')
        searched.value = await a.data.results
        movies.value = await a.data.results
        for(let i = 0 ; movies.value.length > i ; i++){
            movies.value[i].type = 'movie'
        }
        console.log(movies.value,'movies')
        }
        catch(err){}
    } 

    const loadTvshows = async() => {
        try{
        let b = await axios.get('https://api.themoviedb.org/3/search/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&query='+query.value+'&page=1&include_adult=false&')
        tvshows.value = await b.data.results
        for(let i = 0 ; tvshows.value.length > i ; i++){
            tvshows.value[i].type = 'tv'
        }
        console.log(tvshows.value)
        }
        catch(err){}
    } 

    const loadPeople = async() => {
        try{
        let c = await axios.get('https://api.themoviedb.org/3/search/person?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&query='+query.value+'&page=1&include_adult=false&')
        people.value = await c.data.results

        console.log(people.value)
        }
        catch(err){}
    } 

    const loadCollections = async() => {
        try{
        let d = await axios.get('https://api.themoviedb.org/3/search/collection?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&query='+query.value+'&page=1&include_adult=false&')
        collections.value = await d.data.results
        console.log(collections.value)
        }
        catch(err){}
    } 

    const loadCompanies = async() => {
        try{
        let e = await axios.get('https://api.themoviedb.org/3/search/company?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&query='+query.value+'&page=1&include_adult=false&')
        companies.value = await e.data.results
        console.log(companies.value)
        }
        catch(err){}
    } 

    const loadKeywords = async() => {
        try{
        let f = await axios.get('https://api.themoviedb.org/3/search/keyword?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&query='+query.value+'&page=1&include_adult=false&')
        keywords.value = await f.data.results
        console.log(keywords.value)
        }
        catch(err){}
    } 
    


    const searchSubmit = async() => {
                try{
        let a = await axios.get('https://api.themoviedb.org/3/search/movie?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&query='+query.value+'&include_adult=false&')
        searched.value = await a.data.results
        movies.value = await a.data.results
        console.log(movies.value)
        }
        catch(err){}
                try{
        let b = await axios.get('https://api.themoviedb.org/3/search/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&query='+query.value+'&include_adult=false&')
        tvshows.value = await b.data.results
        console.log(movies.value)
        }
        catch(err){}
                try{
        let c = await axios.get('https://api.themoviedb.org/3/search/person?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&query='+query.value+'&page=1&include_adult=false&')
        people.value = await c.data.results
        console.log(people.value)
        }
        catch(err){}
                try{
        let d = await axios.get('https://api.themoviedb.org/3/search/collection?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&query='+query.value+'&page=1&include_adult=false&')
        collections.value = await d.data.results
        console.log(collections.value)

        }
        catch(err){}
                try{
        let e = await axios.get('https://api.themoviedb.org/3/search/company?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&query='+query.value+'&page=1&include_adult=false&')
        companies.value = await e.data.results
        console.log(companies.value)
        }
        catch(err){}
                try{
        let f = await axios.get('https://api.themoviedb.org/3/search/keyword?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&query='+query.value+'&page=1&include_adult=false&')
        keywords.value = await f.data.results
        console.log(keywords.value)
        }
        catch(err){}



        router.push({ name: 'Searched', params: { query:query.value } })
    }
    const toMovie = (item) => {
        if(item.type == 'movie'){
            router.push({ name: 'Moviedetails', params: { id: item.id }})  
        }else if(item.type == 'tv'){
            router.push({ name: 'Tvdetails', params: { id: item.id }})  
        }
        
    }

loadMovies()
loadTvshows()
loadPeople()
loadCollections()
loadCompanies()
loadKeywords()
</script>

<style scoped>
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
    padding-top: 10px;
    padding-bottom: 10px;

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
.searchBarWrapper{
    width: 100%;
    height: 45px;
    display: flex;
    border-bottom: 1px solid lightgray;
}
.searchBar{
    display: flex;
    flex-direction: row;
    width: 1300px;
    height: 100%;
    margin: auto;
}
.search{
    width: 1300px;
    height: 100%;
    display: flex;
    flex-direction: row;

}
.search input{
    width: 1200px;
    height: 36px;
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
    font-size: 1.1em;
    color: lightgray;
    font-style: italic;
}
.search img{
    margin-bottom: 8px;
    margin-right: 10px;
    align-self: center;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
.searched{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.singleSearch img{
    height: 140px;
    cursor: pointer;
}
.singleSearch{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    border: 1px solid lightgray;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}
.info{
    display: flex;
    flex-direction: column;
    height: 140px;
    justify-content: center;

    margin-left: 15px;
}
.info p,a,h3{
    margin: 0;
}
.up a{
    margin: 0;
    padding: 0;
    cursor: pointer;
}
.up h3{
    cursor: pointer;
    padding: 0;
}
.up p{
    color: #999;
    font-weight: bold;
}
.opis{
    overflow: hidden;
    width: 900px;
    color: #999;
    font-weight: bold;
    padding: 10px;
    padding-left: 0;
    margin-top: 10px;

}
.opis p{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    color: black;
    font-weight: 400;
}
.up{
    display: flex;
    flex-direction: column;
    width:fit-content;
}
</style>