import { defineStore } from 'pinia'
import axios from "axios"

export const useDataStore = defineStore("data", {
    state: () => ({
        data: [],
    }),
    getters: {
    },
    actions: {
      async fetchData() {
        try {
          const data = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page=1')
            this.data = await data.data.results
            console.log(this.data)
          }
          catch (error) {
            console.log(error)
        }
      }
    },
})