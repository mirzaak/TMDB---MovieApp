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
    },
})