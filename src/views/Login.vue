<template>
<div class="all">
    <h1>Login to your account</h1>
    <p>In order to use the editing and rating capabilities of TMDB, as well as get personal recommendations you will need to login to your account. If you do not have an account, registering for an account is free and simple.</p>
    <p>If you signed up but didn't get your verification email, click here to have it resent.</p>
    <div class="login">
    <label for="username">Username</label>
    <input type="text"  v-model="username">

    <label>Password</label>
    <input type="password"  v-model="password" @keyup.enter="submit">
    <div class="loginn">
    <button @click="submit">Login</button>
    <a href="https://www.themoviedb.org/reset-password">Reset password</a>
    </div>
    </div>
</div>
</template>

<script setup>

import { useRouter, useRoute } from 'vue-router'
import {ref} from 'vue'
import { computed } from 'vue'
import { useUserStore } from "../stores/user.js";
import axios from 'axios'

const store = useUserStore();
const route = useRoute()
const router = useRouter()
const username = ref(null)
const password = ref(null)
const reqToken = ref(null)
const approvedToken = ref(null)
const sessionId = ref(null)

    const submit = async() => {
        let rToken = await axios.get('https://api.themoviedb.org/3/authentication/token/new?api_key=0b5e8ce7494ae54d6c643adf4db40da7')
        reqToken.value = await rToken.data.request_token

        let aToken = await axios.post('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=0b5e8ce7494ae54d6c643adf4db40da7',{
             username: username.value,
             password: password.value,
             request_token: reqToken.value
         })
         approvedToken.value = await aToken.data.request_token

         let sId = await axios.post('https://api.themoviedb.org/3/authentication/session/new?api_key=0b5e8ce7494ae54d6c643adf4db40da7',{
            request_token: approvedToken.value
        })
        sessionId.value = await sId.data.session_id
        store.sesija = sId.data.session_id
        localStorage.setItem('sesija', JSON.stringify(store.sesija));

        let last = await axios.get('https://api.themoviedb.org/3/account?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id=' + sessionId.value)
        store.username = last.data.username
        localStorage.setItem('username', JSON.stringify(store.username));
        router.push('/')
    }
</script>
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600&display=swap');


.body{
    font-family: 'Source Sans Pro', Arial, sans-serif;
    color: black;
}
.all{
    display: flex;
    flex-direction: column;

    width: 1300px;
    margin: auto;
    margin-top: 20px;

}
.login{
    display: flex;
    flex-direction: column;
    height: 200px;
}
.login input{
    width: 1180px;
    padding: 10px;
    transition: 0.3s;
}
.login input:focus{
    outline: #01b4e4;
    border: 1px solid #01b4e4;
}
.all p{
    margin-bottom: 10px;
    margin-top: 10px;
    color: black;
}
.login label{
    margin-top: 20px;
}
.login input{
    height: 30px;
    border-radius: 5px;
    border: 1px solid lightgray;
    width: 100%;
}

.login button{
    width: 70px;
    color: white;
    background:  #01b4e4;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    font-size: 15px;
}
.login a{
    margin-left: 10px;
    color:#01b4e4;
    font-size: 15px;
    cursor: pointer;
    text-decoration: none;
}
.loginn{
    margin-top: 20px;
    display: flex;
    align-items: center;
}
h1{
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 0;
}
</style>