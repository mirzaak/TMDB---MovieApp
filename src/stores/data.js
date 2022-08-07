import { defineStore } from 'pinia'
import axios from "axios"

export const useDataStore = defineStore("data", {
    state: () => ({
        data:[],
        dataTwo:[],
        dataThree:[],
        merged:[],
        img: 'http://image.tmdb.org/t/p/',
        movies:[],
        tv:[],
    }),
    getters: {
    },
    actions: {
      async getData (query,type) {
          const fetchedData = await axios.get('https://api.themoviedb.org/3/'+query+'/'+type+'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page=1')
          this.data = await fetchedData.data.results
      },
      async getDataTwo (query,type) {
          const fetchedData = await axios.get('https://api.themoviedb.org/3/'+query+'/'+type+'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page=1')
          this.dataTwo = await fetchedData.data.results
          for(let i = 0 ; this.dataTwo.length > i ; i++){
            if(query == 'movie'){
                this.dataTwo[i].type = 'movie'
            }else if(query == 'tv'){
                this.dataTwo[i].type = 'tv'
            }
          }
      },
      async getDataThree (query,type) {
          const fetchedData = await axios.get('https://api.themoviedb.org/3/'+query+'/'+type+'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page=1')
          this.dataThree = await fetchedData.data.results
          for(let i = 0 ; this.dataThree.length > i ; i++){
            if(query == 'movie'){
                this.dataThree[i].type = 'movie'
            }else if(query == 'tv'){
                this.dataThree[i].type = 'tv'
            }
          }
      },
      async mergeData () {
          const fetchedDataMovies = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page=1')
          const fetchedDataTVs = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page=1')
          this.movies = await fetchedDataMovies.data.results
          this.tv = await fetchedDataTVs.data.results
          for(let i = 0 ; this.movies.length > i ; i++){
            this.movies[i].type = 'movie'
          }
          for(let i = 0 ; this.tv.length > i ; i++){
            this.tv[i].type = 'tv'
          }
          this.merged = this.movies.concat(this.tv)
          this.data = this.merged

      },
    },
})