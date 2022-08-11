<template>

<span class="naslov"><h1>Popular People</h1></span>
    <div class="content">
        
        <div class="person" v-for="person in data" :key="person">
            <div class="slika"><img @click="toPerson(person.id)" :src="slika + person.profile_path" alt=""></div>
            <div class="info">
                <a class="ime">{{person.name}}</a>
                <a class="knownFor" v-if="person.known_for[0].original_title">{{person.known_for[0].original_title}}, {{person.known_for[0].original_title}}</a>
                <a class="knownFor" v-if="person.known_for[0].name">{{person.known_for[0].name}}, {{person.known_for[0].name}}</a>
            </div>
        </div>
    </div>
    <div class="paginationWrapper">
        <div class="pagination">
            <a class="number">{{page}}</a>
            <a @click="toPageNext(1)">{{page+1}}</a>
            <a @click="toPageNext(2)">{{page+2}}</a>
            <a @click="toPageNext(3)">{{page+3}}</a>
            <a @click="toPageNext(4)">{{page+4}}</a>
            <a @click="toPageNext(5)">{{page+5}}</a>
            <a @click="toPageNext(6)">{{page+6}}</a>
            <a  @click="nextPage()">Next→</a>
        </div>
    </div>

</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { ref, shallowRef } from 'vue'
export default {
setup(){
    const router = useRouter()
    const route = useRoute()
    const data = ref([])
    const pagea = shallowRef([1])
    const page = ref(1)

    const slika = ref('https://image.tmdb.org/t/p/original/')

    const loadData = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/person/popular?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page='+page.value)
      data.value = await movieData.data.results

    console.log(data.value)

    }
    catch(err){}
    }

    const nextPage = async() => {
    try{
    page.value = 2
     router.push({ name: 'PeoplePage', params: { page: 2 }})
    }
    catch(err){}
    }

    const previousPage = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/person/popular?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page='+pagea.value--)
      data.value = await movieData.data.results

    console.log(data.value)
    }
    catch(err){}
    }

    
    const toPerson = (id) => {
    router.push({ name: 'Actordetails', params: { id: id }}) 
    }

    const toPageNext = async(br) => {
    try{
      page.value = page.value + br
      let movieData = await axios.get('https://api.themoviedb.org/3/person/popular?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page='+page.value)
      data.value = await movieData.data.results

    console.log(data.value)
    await router.push({ name: 'PeoplePage', params: { page: page.value }})
    }
    catch(err){}
    }

loadData()
return{
    data,
    router,
    route,
    slika,
    pagea,
    nextPage,
    previousPage,
    page,
    toPerson,
    toPageNext
}
}
}
</script>

<style scoped>

.content{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 1300px;
    margin: auto;
    padding: 0;
    height: 1300px;
}
.person{
    width: 235px;
    object-fit: cover;
    display: flex;
    flex-direction: column;
    text-align: center;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    border: 1px solid rgba(227,227, 227, 1);
    border-radius: 3px;
    margin: 10px;

}
.slika img{
    width: 235px;
    height: 235px;
    object-fit: cover;
    object-position: 100% 50%;
    cursor: pointer;
}
.slika{
    width: 235px;
    height: 235px;
}
.naslov{
    font-size: 1.5em;
    width: 1300px;
    margin: auto;
    height: 50px;
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.naslov h1{
    font-size: 1em;
    margin-left: 10px;
}
.info{
    background: white;
    display: flex;
    flex-direction: column;
    text-align: left;
    height: 40px;
    overflow: hidden;
    padding: 8px 10px;

}
.info a{
    margin: 0;
    padding: 0;

}
.info p{
    padding: 0;
    margin: 0;
}
.ime{
    font-weight: 600;
    font-size: 1.1em;
    cursor: pointer;
}
.knownFor{
    font-size: 0.9em;
    font-weight: 400;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.paginationWrapper{
    width: 100%;
    height: 100px;
    display: flex;


}
.pagination{
    width: 300px;
    height: 50px;
    display: flex;
    margin: auto;
    align-items: center;
    justify-content: center;
}
.pagination a{
    cursor: pointer;
    margin-left: 3px;
    margin-right: 3px;
    font-weight: bold;
}
.number{
    border: 1px solid black;
    padding: 2px;
    padding-left: 7px;
    padding-right: 7px;
}
</style>