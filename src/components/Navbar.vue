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
                    <a>{{store.username}}</a>
                    <div class="menu">
                        <ul>
                            <router-link  @click="logOut()" :to="{ name: 'Home'}"><li>Log Out</li></router-link>
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
import { ref } from 'vue'
import { useUserStore } from "../stores/user.js";

const store = useUserStore();
const nav = ref()

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
    border: 1px solid lightgray;
    border-radius: 7px;
    background: white;
    visibility:hidden;
    z-index: 5;

}
.menu ul{
    padding: 7px 0;
    color: black;
}
.menu li{
    padding: 8px 40px 8px 20px;
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
.dropdownItem {
    padding: 20px 10px 20px 10px;
    margin-right: 10px;
    cursor: pointer;
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
</style>