import { defineStore } from 'pinia'
import axios from "axios"

export const useDataStore = defineStore("data", {
    state: () => ({
        data:[],
        dataTwo:[],
        dataThree:[],
        merged:[],
        img: 'http://image.tmdb.org/t/p/',
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
      },
      async getDataThree (query,type) {
          const fetchedData = await axios.get('https://api.themoviedb.org/3/'+query+'/'+type+'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page=1')
          this.dataThree = await fetchedData.data.results
      },
      async mergeData () {
          const fetchedDataMovies = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page=1')
          const fetchedDataTVs = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page=1')
          const mergeMovies = await fetchedDataMovies.data.results
          const mergeTVs = await fetchedDataTVs.data.results
          this.data = mergeMovies.concat(mergeTVs)
          this.merged = mergeMovies.concat(mergeTVs)
      },
    },
})