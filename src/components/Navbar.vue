<template>
<nav>
<div class="navWrapper">
        <div class="navContent">
        <div class="navLeft">
            <router-link to="/"><img class="logo" src="../assets/logo.svg" alt="" width="154"></router-link>
            <ul class="dropdown">
                <li class="dropdownItem">
                    <a>Movies</a>
                    <div class="menu">
                        <ul>
                            <li><router-link :to="{ name: 'Popular'}">Popular</router-link></li>
                            <li><router-link :to="{ name: 'Nowplaying'}">Now playing</router-link></li>
                            <li><router-link :to="{ name: 'Toprated'}">Top Rated</router-link></li>
                            <li><router-link :to="{ name: 'Upcoming'}">Upcoming</router-link></li>
                        </ul>
                    </div>

                </li>
                <li class="dropdownItem">
                    <a>TV Shows</a>
                    <div class="menu">
                        <ul>
                            <li>Popular</li>
                            <li>Now Playing</li>
                            <li>Upcoming</li>
                            <li>Top Rated</li>
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
                <li class="dropdownItem"><a>Login</a></li>
                <li class="dropdownItem"><a href="https://www.themoviedb.org/signup">Join TMDB</a></li>
                <li class="search"><img src="../assets/search.svg" alt="" width="30"></li>
            </ul>
        </div>
    </div>
</div>
</nav>
<router-view/>
</template>

<script setup>

</script>

<style scoped>
nav{
    width: 100%;
    height: 64px;
    background: #0d253f;
}
.navWrapper{
    width: 1300px;
    margin: auto;
}
.navContent{
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