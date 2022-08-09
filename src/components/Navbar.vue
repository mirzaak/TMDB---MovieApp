<template>
<nav>
<div class="navWrapper" ref="nav">
        <div class="navContent" ref="nav">
        <div class="navLeft" ref="nav">
            <router-link to="/"><img class="logo" src="../assets/logo.svg" alt="" width="154"></router-link>
            <ul class="dropdown">
                <li class="dropdownItem">
                    <a>Movies</a>
                    <div class="menu">
                        <ul>
                            <router-link :to="{ name: 'Popular'}"><li>Popular</li></router-link>
                            <router-link :to="{ name: 'Nowplaying'}"><li>Now playing</li></router-link>
                            <router-link :to="{ name: 'Toprated'}"><li>Top Rated</li></router-link>
                            <router-link :to="{ name: 'Upcoming'}"><li>Upcoming</li></router-link>
                        </ul>
                    </div>

                </li>
                <li class="dropdownItem">
                    <a>TV Shows</a>
                    <div class="menu">
                        <ul>
                            <router-link :to="{ name: 'PopularTV'}"><li>Popular</li></router-link>
                            <router-link :to="{ name: 'AiringtodayTV'}"><li>Airing Today</li></router-link>
                            <router-link :to="{ name: 'OnTV'}"><li>On TV</li></router-link>
                            <router-link :to="{ name: 'TopratedTV'}"><li>Top Rated</li></router-link>
                        </ul>
                    </div>

                </li>
                <li class="dropdownItem">
                    <a>People</a>
                </li>
                <li class="dropdownItem">
                    <a>More</a>
                </li>
            </ul>
        </div>
        <div class="navRight">
            <ul class="dropdown">
                <li class="dropdownItem" v-if="!store.sesija">
                    <router-link :to="{ name: 'Login'}"><li>Login</li></router-link>
                </li>
                <li v-if="store.sesija" class="dropdownItem">
                    <img @click="toggleMenu()" :src="profileImg" alt="">
                    <div v-if="toggleProfile" class="menuProfile">
                        <ul>
                            <span class="vyp"><router-link :to="{ name: 'Profile', params:{id:store.username}}"><li><p>{{store.username}}</p>View your profile</li></router-link></span>
                            <span><router-link  :to="{ name: 'Ratings', params:{id:store.username}}"><li>Ratings</li></router-link>
                            <router-link :to="{ name: 'Watchlist', params:{id:store.username}}"><li>Watchlist</li></router-link></span>
                            <span><router-link  @click="logOut()" :to="{ name: 'Home'}"><li>Log Out</li></router-link></span>
                        </ul>
                    </div>

                </li>
                <li v-if="!store.sesija" class="dropdownItem"><a href="https://www.themoviedb.org/signup">Join TMDB</a></li>
                <li class="search"><img src="../assets/search.svg" alt="" width="30"></li>
            </ul>
        </div>
    </div>
</div>
</nav>
<router-view/>
</template>

<script setup>
import $ from 'jquery'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { useUserStore } from "../stores/user.js";
import axios from 'axios'
const route = useRoute()
const store = useUserStore();
const nav = ref()
const profileImg = ref()
const toggleProfile = ref(false)
const toggleMenu = () => {
toggleProfile.value = true
$(document).mouseup(function(e) 
{
    var container = $(".menuProfile");

    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        toggleProfile.value = false
    }
});
}
    
const loadData = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/account?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija)
      profileImg.value = 'https://www.gravatar.com/avatar/'+ await movieData.data.avatar.gravatar.hash
    console.log(data.value)
    console.log(sesija)
    }
    catch(err){}
    }
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.documentElement.scrollTop > 64) {
    nav.value.style.top = "-64px"

  } else {
    nav.value.style.top = "0px ";
  }
}

const logOut = () => {
    store.username = null;
    store.sesija = null;
    localStorage.removeItem('username');
    localStorage.removeItem('sesija');
}
loadData()
</script>

<style scoped>
nav{
    width: 100%;
    height: 64px;
    background: #0d253f;
}
.navWrapper{
    width: 100%;
    height: 64px;
    background: #0d253f;
    margin: auto;
    position: fixed;
    z-index: 5;
    transition: 0.5s;
}
.navContent{
    width: 1300px;
    height: 64px;
    padding: 0 40px;
    margin:auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px 0 40px;
}
.navLeft{
    display: flex;
    align-items: center;
}
ul{
    color: white;
    list-style-type: none;
    padding: 0;
}
.menu{
    position: absolute;
    top: 50px;
    left: -3px;
    border: 1px solid lightgray;
    border-radius: 7px;
    background: white;
    visibility:hidden;
    width: 180px;
    z-index: 5;

}
.menuProfile{
    position: absolute;
    top: 70px;
    right: -63px;
    border: 1px solid lightgray;
    border-radius: 7px;
    background: white;
    width: 180px;
    z-index: 5;

}
.menu ul{
    padding: 7px 0;
    color: black;
}
.menu li{
    padding: 8px 0px 8px 20px;
    cursor: pointer;
}
.menu li:hover{
    background:lightgray;
}
.dropdown{
    display: flex;
    align-items: center;
}
.menu a{
    color: black;
    font-weight: 400;
}
.menuProfile ul{
    padding: 7px 0;
    color: black;
}
.menuProfile li{
    padding: 8px 0px 8px 20px;
    cursor: pointer;
}
.menuProfile li:hover{
    background:lightgray;
}
.menuProfile a{
    color: black;
    font-weight: 400;
}
.dropdownItem {
    padding: 20px 10px 20px 10px;
    margin-right: 10px;
    cursor: pointer;
    display: flex;
    position: relative;
}
.dropdownItem:hover .menu{
    visibility: visible;
}
.logo{
    margin-right: 14px;
}
a{
    font-weight: bold;
    font-size: 1em;
    color: white;
    text-decoration: none;
}
.search{
    height: 30px;
    align-self: center;
    cursor: pointer;
}
.dropdownItem img{
    width: 40px;
    height: 40px;
    border-radius: 40px;
}
.menuProfile::after {
  content: " ";
  position: absolute;
  bottom: 100%;  /* At the top of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent white transparent;
}
.menuProfile span{
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid lightgray;
}
.menuProfile span:last-of-type{
    border: none;
}
.menuProfile p{
    margin: 0;
}
.menuProfile span:first-of-type a{
    font-size: 0.8em;
    color: gray;
}
.menuProfile span:first-of-type p{
    font-size: 1.3em;
    color: black;
}
</style>