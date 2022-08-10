<template>
      <div class="searchBarWrapper">
          <div class="searchBar">
              <div class="search">
                  <img src="../assets/lupa.svg" alt="">
                  <input v-model="query" type="text" placeholder="Search for a movie, tv show, person..." @keyup.enter="submitSearch">
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
                      <span><a>Movies</a><p>0</p></span>
                      <span><a>TV Shows</a><p>0</p></span>
                      <span><a>People</a><p>0</p></span>
                      <span><a>Collections</a><p>0</p></span>
                      <span><a>Companies</a><p>0</p></span>
                      <span><a>Keywords</a><p>0</p></span>
                      <span><a>Networks</a><p>0</p></span>
                  </div>
              </div>
          </div>
          <div class="right">
              <a>There are no TV shows that matched your query.</a>
          </div>
      </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { ref, shallowRef } from 'vue'
export default {
setup(){
    const query = ref('')
    const route = useRoute()
    const router = useRouter()

    const submitSearch = async() => {
        router.push({ name: 'Searched', params: { query:query.value } })
    }
    return{
        submitSearch,
        query
    }
}
}
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
    border-radius: 10px;
    flex-direction: column;
}
.blueBox{
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    background: #01b4e4;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
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
    width: 100%;
    height: 100%;
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
}


</style>