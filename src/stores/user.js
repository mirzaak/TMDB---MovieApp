import { defineStore } from 'pinia'
import axios from "axios"

export const useUserStore = defineStore("user", {
    state: () => ({
        sesija: JSON.parse(localStorage.getItem(['sesija'])),
        username: JSON.parse(localStorage.getItem(['username'])),
    }),
    getters: {
    },
    actions: {
      async getData (query,type) {
          const fetchedData = await axios.get('https://api.themoviedb.org/3/'+query+'/'+type+'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page=1')
          this.data = await fetchedData.data.results
      },
    },
})