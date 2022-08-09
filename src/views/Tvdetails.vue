<template>
<div class="header" v-if="data">
        <span><div class="overview"><a>Overview</a> <div class="arrow"></div></div><div class="headerDropdown">
            <router-link :to="{ name: 'Tvdetails', params: { id: id }}">Main</router-link>
            <router-link :to="{ name: 'AlternativeTitlesTv', params: { id: id }}">Alternative Titles</router-link>
            <router-link :to="{ name: 'CastAndCrewTv', params: { id: id }}">Cast & Crew</router-link>
            <router-link :to="{ name: 'Seasons', params: { id: id }}">Seasons</router-link>
            <router-link :to="{ name: 'TranslationsTv', params: { id: id }}">Translations</router-link>
            <a :href="'https://www.themoviedb.org/tv/'+id+'/changes'">Changes</a>
            </div></span>
        <span><div>Media <div class="arrow"></div></div><div class="headerDropdown">
            <router-link :to="{ name: 'BackdropsTv', params: { id: id }}">Backdrops</router-link>
            <router-link :to="{ name: 'LogosTv', params: { id: id }}">Logos</router-link>
            <router-link :to="{ name: 'PostersTv', params: { id: id }}">Posters</router-link>
            <router-link :to="{ name: 'MediaVideosTv', params: { id: id }}">Videos</router-link>
            </div></span>
        <span><div>Fandom <div class="arrow"></div></div><div class="headerDropdown">
            <a :href="'https://www.themoviedb.org/tv/'+id+'/discuss'">Discussions</a>
            <router-link :to="{ name: 'ReviewsTv', params: { id: id }}">Reviews</router-link>
            </div></span>
        <span><div>Share <div class="arrow"></div></div><div class="headerDropdown">
            <a @click="overlayToggle">Share Link</a>
            <a :href="'https://www.facebook.com/'+external.facebook_id">Facebook</a>
            <a :href="'https://twitter.com/'+external.twitter_id">Tweet</a>
            </div></span>
</div>
<div class="overlay" v-if="overlayOn" @click.self="overlayToggle">
<div class="overlayVideo">
    <a>Share {{data.original_name}}</a>
    <p>URL</p>
    <input type="text" :value="urlNow">
</div>
</div>
<div class="overlay" v-if="overlayOnPoster" @click.self="overlayTogglePoster">
<div class="overlayPoster">
        <img v-if="poster" :src=" slikaPoster + poster" alt="">
        <div class="overlayPosterText">
                    <h3 class="posterInfo"><a class="maloA">Info</a></h3>

        <p class="maloA">Size:</p>
        <a class="maloA">{{images.posters[0].width}}</a>x<a class="maloA">{{images.posters[0].height}}</a>
        </div>
</div>
</div>
<div class="overlay" v-if="overlayOnTrailer" @click.self="overlayToggleTrailer">

<iframe width="1200" height="800" :src="'https://www.youtube.com/embed/' + trailer" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


</div>
<div v-if="data" class="main">
    <div class="behindmain">
        <img v-if="data.backdrop_path" :src=" slika + data.backdrop_path" alt="">
    </div>
    <div class="frontmain">
        <div class="left">
            <div class="posterback">
            <div class="poster">
                
                <img v-if="poster" :src=" slikaPoster + poster" alt="" @click.self="overlayTogglePoster">
            </div>
           
            </div>
        <span class="expand"><img src="../assets/expand.svg" alt="">Expand</span> 
        </div>
        <div class="right">
            <div class="rightup">
                <span class="rednaslova"><h1 v-if="data.original_name">{{ data.original_name }}</h1><h1 v-if="data.first_air_date" class="hajedan"> ({{ data.first_air_date }})</h1></span>
                <span class="rednaslovaDrugired"><a v-if="data.first_air_date">{{data.first_air_date}}</a><div v-if="data.first_air_date" class="dot"></div><span class="redzanrova" v-for="genre in data.genres" :key="genre"><a v-if="genre.name">{{genre.name}}</a></span><div v-if="data.runtime" class="dot"></div><a v-if="data.runtime">{{data.runtime}}min</a></span>
            </div>
            <div class="rightdown">





                <div class="buttonsWrap">
                    <div class="buttons">
                        <div class="userscore">
                            <div class="circleAndText">
                                <div class="circle" v-if="averageVote"><circle-progress class="circleProgress" :percent="data.vote_average*10" fill-color="lightgreen" empty-color="none" /><a>{{averageVote}}<p>%</p></a></div>
                                <h2 v-if="averageVote">User Score</h2>
                            </div>
                        </div>
                        <div v-if="data.id && !store.sesija" class="fourButtons">
                            <div class="smallCircle">

                                    <div class="circleTooltip">
                                    <a>Login to add and create custom lists</a>
                                    <div class="tip"></div>
                                </div>
                                <img src="../assets/list.svg" alt="">
                            </div>
                            <div class="smallCircle">
                                    <div class="circleTooltip">
                                    <a>Login to add this to your favourite list</a>
                                    <div class="tip"></div>
                                </div>

                                <img src="../assets/heart.svg" alt="">
                            </div>
                            <div class="watchlist, smallCircle">
                                    <div class="circleTooltip">
                                    <a>Login to add this to your watchlist</a>
                                    <div class="tip"></div>
                                </div>
                                <img src="../assets/bookmark.svg" alt="">
                            </div>
                            <div class="rate, smallCircle">
                                    <div class="circleTooltip">
                                    <a>Login to rate</a>
                                    <div class="tip"></div>
                                </div>
                                <img src="../assets/star.svg" alt="">
                            </div>
                        </div>
                        <div v-if="data.id && store.sesija" class="fourButtons">
                            <div class="smallCircle addToList" @click="addList()">
                                    <div class="circleTooltip">
                                    <a>Add to list</a>
                                    <div class="tip"></div>
                                </div>
                                <img src="../assets/list.svg" alt="">
                                <div v-if="toggleLists" class="lists"><a href="https://www.themoviedb.org/list/new">+ Create New List</a></div>
                            </div>
                            <div class="smallCircle" @click="postFav(data.id)">
                                    <div class="circleTooltip">
                                    <a>Mark as favourite</a>
                                    <div class="tip"></div>
                                </div>

                                <img src="../assets/heart.svg" alt="" v-if="!favouriteMovies.includes(data.id)"><img v-if="favouriteMovies.includes(data.id)" src="../assets/favorite.svg" alt="">
                            </div>
                            <div class="watchlist, smallCircle" @click="postWatchlist(data.id)">
                                    <div class="circleTooltip">
                                    <a>Add to your watchlist</a>
                                    <div class="tip"></div>
                                </div>
                                <img src="../assets/bookmark.svg" alt="" v-if="!watchlistMovies.includes(data.id)"><img v-if="watchlistMovies.includes(data.id)" src="../assets/watchlist.svg" alt="">
                            </div>
                            <div class="rate, smallCircle toggleRating" @click="rate">
                                    <div class="circleTooltip">
                                    <a>Rate It!</a>
                                    <div class="tip"></div>
                                    
                                </div>
                                <img src="../assets/star.svg" alt="" v-if="!movieRating"><img v-if="movieRating" src="../assets/rated.svg" alt="">
                                <div v-if="toggleRating"  class="stars" id="stars" ><img @click="removeRate(movie,'tv')" src="../assets/rateMinus.svg" alt=""><star-rating @click="postRate()" :border-width="2" :increment="1" :star-size="20" :show-rating="false" v-model:rating="movieRating" :max-rating="10"></star-rating></div>
                            </div>
                        </div>

                        <div v-if="data.id" class="playTrailer">
                            <span @click="overlayToggleTrailer"><img src="../assets/play.svg" alt=""><a>Play Trailer</a></span>
                        </div>
                        
                    </div>
                </div>
                
                
                
                
                
                
                
                <div v-if="data.overview" class="overviewB">
                    <a>{{data.tagline}}</a>
                    <p>Overview</p>
                    <p>{{data.overview}}</p>
                </div>
                <div class="frontglumci">
                    <div class="frontGlumac" v-for="index in fourCredits" :key="index">
                        <a v-if="index.name">{{index.name}}</a>
                        <p v-if="index.known_for_department">{{index.known_for_department}}</p>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>






<div class="other" >
    <div class="otherleft">
            <span class="actorsHeader"><h1>Top Billed Cast</h1></span>
            <div class="actorFade">
                <div class="actorssection" v-if="credits" ref="fadeScroll"> 
            <div class="actors">
            <div class="actor" v-for="glumac in credits" :key="glumac">
            <div class="actorCard" v-if="glumac">
                <div>
                <img v-if="glumac.profile_path" @click="toPerson(glumac.id)" :src="slikaProfile + glumac.profile_path" alt=""><img class="noImage" v-if="glumac.profile_path==null" src="../assets/person.svg" alt="">
                </div>
                <p><a @click="toPerson(glumac.id)">{{glumac.original_name}}</a></p>
                <p>{{glumac.character}}</p>
            </div>
      
            </div>
                <div class="lastActorCard"><a @click="toCast">View more</a></div>

            </div>

                            
                </div>
                <div class="fade" ref="fade"></div>
                </div>
            
        <a class="cANDc" @click="toCast">Full Cast & Crew</a>

        <div class="seasonSection">
            <div class="seasonHeader"><h1>Current Season</h1></div>
            <div class="season">
                <div class="slika"><img :src="slika + zadnjaSlika" alt="" @click="toSeason"></div>
                <div class="info">
                    <div class="prviRed">
                    <h2><a @click="toSeason">{{zadnjaNaslov}}</a></h2>
                    <p>{{zadnjaDate}} | {{zadnjaEpisodes}} Episodes</p>
                    </div>
                    <div class="infoOverview">
                        <p>{{zadnjaOverview}}</p>
                    </div>
                </div>
            </div>
            <router-link :to="{ name: 'Seasons', params: { id: id }}"><a>View All Seasons</a></router-link>
        </div>

        <div class="reviewsection" v-if="review">
            <div class="reviews">
                <span class="reviewheader"><h1>Social</h1><router-link :to="{ name: 'Reviews', params: { id: id }}"><a>Reviews</a></router-link><a :href="'https://www.themoviedb.org/tv/'+id+'/discuss'">Discussions</a></span>
                <div class="review">
                <div class="reviewcard">
                <span class="reviewPrviRed"><img v-if="revjuSlika" :src="revjuSlika" alt=""><img v-if="!revjuSlika" src="../assets/gravatar.svg" alt=""><img v-if="!revjuSlika.toString().includes('https://www.gravatar.com/avatar/')" :src="'https://www.gravatar.com/avatar/'+revjuSlika" alt=""><div class="reviewProstor" ></div>
                <span class="reviewPrviRedText">
                <span class="reviewPrviRedTextRate" v-if="review.author"><h3><a>{{review.author}}</a></h3><div class="reviewrate" v-if="revjuRating">{{revjuRating}}</div></span>
                <h5 v-if="review.author">Written by <a>{{review.author}}</a> on <a>{{review.created_at}}</a></h5>
                </span>
                </span>
                <div class="reviewcontent" v-if="review.content">
                <p>{{review.content}}</p><a :href="'https://www.themoviedb.org/review/'+review.id">read the rest.</a>
                </div>
                </div>
            </div>

        </div>
        </div>
        <div class="mediasection">
        <span class="mediaheader"><h1>Media</h1><h2  @click="changeComp(Mostpopular)" :class="{selectedMedia:comp===Mostpopular}">Most Popular</h2><h2 @click="changeComp(Videos)" :class="{selectedMedia:comp===Videos}">Videos</h2><h2 @click="changeComp(Backdrops)" :class="{selectedMedia:comp===Backdrops}">Backdrops</h2><h2 @click="changeComp(Posters)" :class="{selectedMedia:comp===Posters}">Posters</h2></span>
        <div class="media">
                <component :is="comp">
                    
                </component>
        </div>
        <div class="fade"></div>
        </div>
        <div class="recommendationssection" v-if="!recommendations.length === 0">
            <div class="recommendationHeader" ><h1>Recommendations</h1></div>
            <div class="recommendationWrapper">
            <div class="recommendation" v-for="predlozeno in recommendations" :key="predlozeno">
                <img @click="toMovie(predlozeno.id)" v-if="predlozeno.backdrop_path" :src="slikaBackdrop + predlozeno.backdrop_path" alt=""><div v-if="!predlozeno.backdrop_path" class="noRecommendationImg"><a>No Image</a></div>
                <a  @click="toMovie(predlozeno.id)">{{predlozeno.original_name}}</a>
            </div>
        </div>
        <div class="fade"></div>    

        </div>
    </div>
    <div class="otherright">
        <span class="social">
            <a :href="'https://www.facebook.com/'+external.facebook_id"><img src="../assets/facebook.svg" alt=""></a>
            <a :href="'https://www.twitter.com/'+external.facebook_id"><img src="../assets/twitter.svg" alt=""></a>
            <a :href="'https://www.instagram.com/'+external.facebook_id"><img src="../assets/instagram.svg" alt=""></a>
            <a :href="data.homepage"><img src="../assets/homepage.svg" alt=""></a>
        </span>
        <a>Status</a>
        <p v-if="data.status">{{data.status}}</p>
        
        <a>Original Language</a>
        <p v-if="language">{{language}}</p>

        <a>Budget</a>
        <p v-if="data.budget">{{data.budget}}$</p>

        <a>Revenue</a>
        <p v-if="data.revenue">{{data.revenue}}$</p>
        <span class="keywords">
            <div class="keyword" v-for="keyword in keywords" :key="keyword">
                <a>{{keyword.name}}</a>
            </div>
        </span>
    </div>
</div>
</template>

<script setup>
import $ from 'jquery'
import StarRating from 'vue-star-rating'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { ref, shallowRef } from 'vue'
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
import { useUserStore } from "../stores/user.js";
import Mostpopular from '../components/DetailsTv/Mostpopular.vue'
import Videos from '../components/DetailsTv/Videos.vue'
import Backdrops from '../components/DetailsTv/Backdrops.vue'
import Posters from '../components/DetailsTv/Posters.vue'
    const store = useUserStore();
    const router = useRouter()
    const route = useRoute()
    const slika = ref('https://image.tmdb.org/t/p/original/')
    const slikaPoster = ref('https://image.tmdb.org/t/p/w342/')
    const slikaBackdrop = ref('https://image.tmdb.org/t/p/w300/')
    const slikaProfile = ref('https://image.tmdb.org/t/p/w185/')
    const data = ref([])
    const credits = ref([])
    const images = ref([])
    const videos = ref([])
    const videoUrl = ref('https://www.youtube.com/embed/')
    const id = route.params.id
    let backdropActive = ref(false)
    const comp = shallowRef(Mostpopular)
    const recommendations = ref([])
    const fade = ref()
    const fadeScroll = ref()
    const review = ref([])
    const details = ref([])
    const revjuSlika = ref([])
    const revjuRating = ref([])
    const fourCredits = ref([])
    const overlayOn = ref(false)
    const overlayOnPoster = ref(false)
    const overlayOnTrailer = ref(false)
    const external = ref([])
    const urlNow = ref(window.location.href)
    const trailer = ref([])
    const averageVote = ref('')
    const poster = ref('')
    const language = ref('')
    const keywords = ref([])

    const wMovies = ref([])
    const wTV = ref([])
    const favMovies = ref([])
    const favTV = ref([])
    const rMovies = ref([])
    const rTV = ref([])

    const watchlistMovies = ref([])
    const watchlistTV = ref([])
    const favouriteMovies = ref([])
    const favouriteTV = ref([])
    const ratedMovies = ref([])
    const ratedTV = ref([])

    const season = ref()
    const sezone = ref()
    const zadnjaSlika = ref()
    const zadnjaNaslov = ref()
    const zadnjaDate = ref()
    const zadnjaOverview = ref()
    const zadnjaEpisodes = ref()
    const videosTrailer = ref()

    const movieRating = ref()

    const toggleRating = ref(false)
    const toggleLists = ref(false)

    const loadRateData = async() => {
      let wMoviesData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/watchlist/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+store.sesija+'&sort_by=created_at.asc&page=1')
      let wTVData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/watchlist/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+store.sesija+'&sort_by=created_at.asc&page=1')
      let favMoviesData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/favorite/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija+'&language=en-US&sort_by=created_at.asc&page=1')
      let favTVData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/favorite/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija+'&language=en-US&sort_by=created_at.asc&page=1')
      let rMoviesData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/rated/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+store.sesija+'&sort_by=created_at.asc&page=1')
      let rTVData = await axios.get('https://api.themoviedb.org/3/account/{account_id}/rated/tv?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&session_id='+store.sesija+'&sort_by=created_at.asc&page=1')
        wMovies.value = await wMoviesData.data.results
        wTV.value = await wTVData.data.results
        favMovies.value = await favMoviesData.data.results
        favTV.value = await favTVData.data.results
        rMovies.value = await rMoviesData.data.results
        rTV.value = await rTVData.data.results
        console.log(wMovies.value,'wMovies')
        console.log(wTV.value)
        console.log(favMovies.value)
        console.log(favTV.value)
        console.log(rMovies.value)
        console.log(rTV.value)
    for(let i = 0; wMovies.value.length > i; i++){
        watchlistMovies.value.push(wMovies.value[i].id)
    }
    for(let i = 0; wTV.value.length > i; i++){
        watchlistTV.value.push(wTV.value[i].id)
    }
    for(let i = 0; favMovies.value.length > i; i++){
        favouriteMovies.value.push(favMovies.value[i].id)
    }

    for(let i = 0; favTV.value.length > i; i++){
        favouriteTV.value.push(favTV.value[i].id)
    }
    for(let i = 0; rMovies.value.length > i; i++){
        ratedMovies.value.push(rMovies.value[i].id)
        
    }
    for(let i = 0; rTV.value.length > i; i++){
        ratedTV.value.push(rTV.value[i].id)
    }
    for(let i = 0; rMovies.value.length > i; i++){
        if(rMovies.value[i].id==data.value.id){
            movieRating.value=rMovies.value[i].rating
            console.log(movieRating.value,'mRating')
        }
        
    }
    }
    const changeComp = (c) => {
        comp.value = c
    }

    const overlayToggle = () => {
        overlayOn.value = !overlayOn.value

    }
    const overlayTogglePoster = () => {
        overlayOnPoster.value = !overlayOnPoster.value

    }
    const overlayToggleTrailer = () => {
        overlayOnTrailer.value = !overlayOnTrailer.value

    }
    const loadData = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/tv/'+ id +'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&append_to_response=reviews,keywords')
      data.value = await movieData.data
      averageVote.value = await movieData.data.vote_average.toString().substring(2,0) * 10
      poster.value = await movieData.data.poster_path
      language.value = await movieData.data.spoken_languages[0].english_name
      keywords.value = await movieData.data.keywords.keywords
    console.log(data.value,'data')
    }
    catch(err){}
    }
        const loadSeason = async() => {
    try{
      let movieData = await axios.get('https://api.themoviedb.org/3/tv/'+ id +'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&append_to_response=reviews')
      season.value = await movieData.data
      sezone.value = await movieData.data.seasons
      zadnjaSlika.value = await sezone.value[sezone.value.length-1].poster_path
      zadnjaNaslov.value = await sezone.value[sezone.value.length-1].name
      zadnjaDate.value = await sezone.value[sezone.value.length-1].air_date
      zadnjaOverview.value = await sezone.value[sezone.value.length-1].overview
      zadnjaEpisodes.value = await sezone.value[sezone.value.length-1].episode_count
    console.log(data.value,'sezone')
    }
    catch(err){}
    }
    const loadReview = async() => {
    try{
      let reviewData = await axios.get('https://api.themoviedb.org/3/tv/'+ id +'?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&append_to_response=reviews')
      review.value = await reviewData.data.reviews.results[0]
      details.value = await reviewData.data.reviews.results[0].author_details
      revjuSlika.value = await reviewData.data.reviews.results[0].author_details.avatar_path.substring(1)
      revjuRating.value = await reviewData.data.reviews.results[0].author_details.rating
      console.log(review.value)
    }
    catch(err){}
    }

    const loadCredits = async() => {
        try{
            let creditsData = await axios.get('https://api.themoviedb.org/3/tv/'+ id +'/credits?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US')
            credits.value = await creditsData.data.cast
            credits.value.length = 8
        }
        catch(err){}
        console.log(credits.value)
    }
    const loadFourCredits = async() => {
        try{
            let creditsAData = await axios.get('https://api.themoviedb.org/3/tv/'+ id +'/credits?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US')
            fourCredits.value = await creditsAData.data.cast
            fourCredits.value.length = 4
        }
        catch(err){}
        console.log(credits.value)
    }

    const loadImages = async() => {
        try{
            let imagesData = await axios.get('https://api.themoviedb.org/3/tv/'+ id +'/images?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&include_image_language=en%2Cnull')
            images.value = await imagesData.data
        }   
        catch(err){}
        console.log(images.value,'images')
    }
    const loadRecommendations = async() => {
        try{
            let recommendationsData = await axios.get('https://api.themoviedb.org/3/tv/'+ id +'/recommendations?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US&page=1')
            recommendations.value = await recommendationsData.data.results
            console.log(recommendations.value,'recommendationnnnnnnnnnnnnnnnnnnnnnnn')
        }   
        catch(err){}
        console.log(recommendations.value)
    }
    const loadExternal = async() => {
        try{
            let recommendationsData = await axios.get('https://api.themoviedb.org/3/tv/'+ id +'/external_ids?api_key=0b5e8ce7494ae54d6c643adf4db40da7')
            external.value = await recommendationsData.data
        }   
        catch(err){}
        console.log(external.value,'external')
    }
    const loadVideos = async() => {
        try{
            let recommendationsData = await axios.get('https://api.themoviedb.org/3/tv/'+ id +'/videos?api_key=0b5e8ce7494ae54d6c643adf4db40da7&language=en-US')
            trailer.value = await recommendationsData.data.results[0].key
        }   
        catch(err){}
    }

    const toPerson = (id) => {
        router.push({ name: 'Actordetails', params: { id: id }})  
    }

    const toCast = () => {
        router.push({ name: 'CastAndCrew', params: { id: id }})  
    }
    const toMovie = (movieId) => {
        window.location.href="http://localhost:8080/tv/" + movieId
    }
    const postFav =(id) => {
try{    
      let i = favouriteMovies.value.indexOf(id)
if(favouriteMovies.value.includes(id)){

    favouriteMovies.value.splice(i,1)
    console.log(favouriteMovies.value)
axios.post('https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija, {
  "media_type": "tv",
  "media_id": data.value.id,
  "favorite": false
  })

}else{
        favouriteMovies.value.push(id)
    axios.post('https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija, {
  "media_type": "tv",
  "media_id": data.value.id,
  "favorite": true
  })

}

    }
    catch(err){}

    }
    const toSeason = () => {
        router.push({ name: 'Seasons', params: { id: id }}) 
    }
    const postWatchlist =(id) => {   
      let i = watchlistMovies.value.indexOf(id)
if(watchlistMovies.value.includes(id)){
watchlistMovies.value.splice(i,1)
axios.post('https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija, {
  "media_type": "tv",
  "media_id": id,
  "watchlist": false
  })

}else{
        watchlistMovies.value.push(id)
    axios.post('https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija, {
  "media_type": "tv",
  "media_id": id,
  "watchlist": true
  })

}
    } 

    const postRate = async() => {
 await axios.post('https://api.themoviedb.org/3/tv/'+data.value.id+'/rating?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija, {
  "value": movieRating.value,

  })
  console.log('posted')
    }

    const rate =async() => {
toggleRating.value = true
$(document).mouseup(function(e) 
{
var container = $(".toggleRating");
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        toggleRating.value = false
    }
});

}
    const removeRate = async() => {
 movieRating.value = 0
 await axios.delete('https://api.themoviedb.org/3/tv/'+data.value.id+'/rating?api_key=0b5e8ce7494ae54d6c643adf4db40da7&session_id='+store.sesija,)

    }
    const addList =() => {
toggleLists.value = true
$(document).mouseup(function(e) 
{
    var container = $(".addToList");

    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        toggleLists.value = false
    }
});
}

loadData()
loadImages()
loadCredits()
loadRecommendations()
loadReview()
loadFourCredits()
loadExternal()
loadVideos()
loadSeason()
if(store.sesija){
    loadRateData()
}


</script>

<style scoped>
.overlay {
  position: fixed; 

  width: 100%; 
  height: 100%; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); 
  z-index: 2; 
  cursor: pointer; 
}
.header{
    border-bottom: 1px solid lightgray;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.header span:hover .headerDropdown{
    display: flex;
}
.headerDropdown{
    background: white;
    border: 1px solid lightgray;
    display: none;
    position: absolute;
    top: 100px;
    padding-top: 8px;
    padding-bottom: 8px;
    flex-direction: column;
    border-radius: 5px;
    z-index: 3;
}
.headerDropdown a{
    height: 30px;
    align-items: center;
    display: flex;
    padding-left: 20px;
    padding-right: 60px;
    color: black;
    text-decoration: none;
    font-size: 17px;
}
.headerDropdown a:hover{
    background: lightgrey;
}
.header span{
    margin-right: 20px;
    margin-left: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 10px;
    padding-bottom: 10px;
}
.arrow {
  margin-left: 5px;
  margin-bottom: 3px;
  border: solid black;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 2px;
   transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.overview{
    display: flex;
    align-items: center;
    height: 35px;
    border-bottom: 5px solid #01b4e4;
}
.main{
    height: 510px;
    width: 100%;
    position: relative;
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
}
.behindmain{
    height: 510px;
    width: 100%;
    position: relative;
    z-index: 1;
    background: #0d253f;
}
.behindmain img{
    width: 100%;
    position: relative;
    z-index: 1;
    filter: brightness(30%);
}
.frontmain{
    z-index: 2;
    position: absolute;
    display: flex;
    margin: auto;
    width: 1350px;
    color: white;
    align-items: center;
}

.poster img{
    width: 300px;
    z-index: 2;
    border-radius: 10px;

}
.poster{
    position: relative;
    display: flex;
}
.poster:hover{
    filter: blur(10px);
    cursor: pointer;
}
.left:hover .expand{
    display: flex;
    pointer-events: none;
}
.expand{
    position: absolute;
    z-index: 4;
    flex-direction: row;
    align-items: center;
    margin-left: 115px;
    display: none;
    top: 45%;

}
.expand img{
    width: 15px;
}
.posterback{
    overflow: hidden;
    border-radius: 10px;

}
.rednaslova{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.rednaslova h1:hover{
    cursor: pointer;
    opacity: 0.7;
}
.hajedan{
    opacity: 0.7;
    margin-left: 5px;
    font-weight: 400;
    cursor: auto;
}
.right{
    display: flex;
    flex-direction: column;
    margin-left: 40px;
}
.rightup{
    display: flex;
    align-items: left;
    flex-direction: column;
    width: 100%;
}
.rightdown{
    display: flex;
    align-items: left;
    flex-direction: column;
    width: 100%;
}
.frontglumci{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 900px;

    position: relative;

}
.frontGlumac{
    width: 33%;
    margin-bottom: 20px;
}
.frontGlumac a{
    font-weight: bold;
}
.frontGlumac p{
    margin: 0;
}
.frontglumci span{
    margin-right: 120px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
}
.frontglumci span p{
    margin: 0;
    width: 200px;

}
.actor{
    display: flex;
    flex-direction: column;
}
.other{
    display: flex;
    width: 1350px;
    margin: auto;
    min-height: 1500px;
}
.otherleft{
    display: flex;
    width: 1030px;
    flex-direction: column;
}
.actors{
    display: flex;
    position: relative;

}
.actorCard{
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    margin-bottom: 20px;
    border: 1px solid lightgray;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    font-family: 'Source Sans Pro', Arial, sans-serif;
    font-size: 1em;
    padding-bottom: 10px;
    width: 138px;
    height: 100%;
}
.sectionFade{
    position: relative;
    width: 100%;
    height: 100%;

}
.actorCard img{
    cursor: pointer;
    width: 138px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}
.actorCard p{
    margin: 0;
    padding-left: 10px;
    padding-bottom: 0;
    font-size: 0.8em;

}
.actors p a{
    font-weight: bold;
    cursor: pointer;
}
.actorsHeader{
    height: 60px;

    display: flex;
    align-items: center;
}
.actorsHeader h1{
    font-size: 1.4em;
}
::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  border-radius: 20px;
}
::-webkit-scrollbar-thumb {
  background: lightgray;
  border-radius: 10px;
}
.reviewheader{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.reviewheader h1{
    margin-right: 20px;
    font-size: 1.4em;
}

.reviewheader h2{
    cursor: pointer;
    margin-right: 10px;
}

.reviewheader a{
    cursor: pointer;
    margin-right: 10px;
    text-decoration: none;
    color: black;
    font-weight: bold;
}
.review{
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    margin-bottom: 20px;
}
.reviewsection{
    margin-top: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid lightgray;
}
.reviewsection a{
    color: black;
    text-decoration: none;
}
.mediasection{
    margin-top: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid lightgray;
    position: relative;
    height: 380px;

}
.mediaheader{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
}
.mediaheader h2{
    cursor: pointer;
    margin-right: 20px;
    font-size: 1.1em;

}
.mediaheader h1{
    margin-right: 50px;
    font-size: 1.4em;
}
.media{
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
    border-top-left-radius: 10px;
    position: relative;
}
.fade{
    width: 60px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-image: linear-gradient(to right, rgba(255,255,255,0) 0%, #fff 100%);
    opacity: 1;
    pointer-events: none;

}
.videos{
    display: flex;
    flex-direction: row;
}
.actorssection{
    display: flex;
    overflow: auto;
    margin-bottom: 20px;
    position: relative;
    width: 1030px;

}
.actorFade{
    position: relative;
}
.lastActorCard{
    height: 93%;
    width: 138px;
    border: 1px solid lightgray;
    border-radius: 10px;
    display: flex;

    align-items: center;
    justify-content: center;
}
.lastActorCard a{
    cursor: pointer;
}
.review img{
    border-radius: 50px;
}

.reviewheader h2{
    font-size: 1em;
}
.reviewcontent a{
    cursor: pointer;
    text-decoration: underline;
}

.reviewcontent p{
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;

}
.reviewcontent{
    margin-left: 70px;
}
.reviewcard{
    padding: 20px;
}

.reviewPrviRed{
    display: flex;
    flex-direction: row;
    height: 63px;
}
.reviewPrviRedText{
    margin-left: 10px;
    justify-content: center;
    display: flex;
    flex-direction: column;
}
.reviewPrviRedText h3{
    margin: 0;
}
.reviewPrviRedText h5{
    margin: 0;
}
.reviewPrviRedTextRate{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.reviewrate{
    width: 30px;
    height: 15px;
    display: flex;
    background: black;
    border-radius: 5px;
    color: white;
    margin-left: 10px;
    align-items: center;
    justify-content: center;
}
.collectionsection{
    margin-top: 20px;
    height: 400px;

    border: 1px solid lightgray;
}
.recommendationssection{
    margin-top: 20px;

    position: relative;
    display: flex;
    flex-direction: column;

    border-radius: 10px;
    width: 1030px;

}
.recommendationWrapper{

    position: relative;
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: none;
    border-radius: 10px;
    width: 1030px;
    flex-direction: row;
}
.recommendationHeader h1{
    font-size: 1.4em;
}
.recommendation img{
    width: 300px;
    border-radius: 10px;
    cursor: pointer;
}
.recommendation a{
    cursor: pointer;
}
.recommendation{
    margin-right: 20px;

}
.collection img{
    width: 100%;
}
.collection{
    overflow: hidden;
}
.collectionsection{
    height: 300px;
    width: 100%;
    margin-top: 20px;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: row;
    overflow: auto;
    border-radius: 10px;
}
.collection{
    overflow: hidden;
    height: 300px;
    width: 100%;
}
.collection h1{
    position: absolute;
}
.circle{
    display: flex;
    width: 70px;
    height: 70px;
    border-radius: 70px;
    background: #081c22;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}
.circle:hover{
    transform: scale(1.1);
    cursor:pointer;
    transition: transform .2s;
}
.circle a{
    color: white;
    font-weight: bold;
    font-size: 20px;
    position: absolute;
    justify-self: center;
    align-self: center;
    display: flex;
}
.circle p{
    font-size: 10px;
    margin: 0;
    margin-top: 4px;
}
.circleProgress{
    position: absolute;
    top: 60px;
    padding: 5px;
}
.buttonsWrap{
    margin-top: 20px;
    height: 70px;
    display: flex;
    flex-direction: row;
}
.buttons{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.circleAndText{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.circleAndText h2{
    margin-left: 7px;
    flex-wrap: wrap;
    width: 5px;
    font-size: 18px;
}
.fourButtons{
    display: flex;
    flex-direction: row;

    height: 50px;
    margin-left: 60px;
}
.smallCircle{
    display: flex;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background: #081c22;
    margin-left: 20px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.playTrailer img{
    width: 30px;
    height: 30px;
    margin-right: 5px;
}
.playTrailer{
    display: flex;
    width: 40px;
    height: 40px;
    align-items: center;
    cursor: pointer;
}
.playTrailer span{
    color: black;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    filter: invert(1);
    
}
.playTrailer a{
    width: 90px;
}
.smallCircle img{
    width: 15px;
    height: 15px;
}
.overviewB a{
    opacity: 0.7;
    font-style: italic;
}
.overviewB{
    margin-top: 20px;
}
.dot{
    display: flex;
    height: 5px;
    width: 5px;
    border-radius: 5px;
    background: white;
}
.rednaslovaDrugired{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.rednaslovaDrugired a{
    margin-right: 5px;
    margin-left: 5px;
}
.smallCircle:hover .circleTooltip{
    display: flex;
}
.circleTooltip{
    display: none;
    height: 20px;
    background:#081c22;
    position: absolute;
    top: 200px;
    z-index: 5;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
    padding-left: 10px;
    padding-right: 10px;
}
.tip{
    position: absolute;
    border: 10px solid transparent;
    border-bottom-color:#081c22;
    bottom: 20px;
}
.selectedMedia{
    border-bottom: 4px solid black;
}
.noImage{
    height: 207px;
}
.overlay {
  position: fixed; /* Sit on top of the page content */
  display: flex;
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 3; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
  align-items: center;
  justify-content: center;


}
.overlayVideo{
    display: flex;
    width: 400px;
    height: 100px;
    background: white;
    margin: auto;
    flex-direction: column;

    overflow: hidden;

}

.overlayPoster img{
    width: 400px;

}
.overlayPoster{
    display: flex;
    width: 700px;

    background: white;
    margin: auto;
    flex-direction: row;
    align-items: center;
    overflow: hidden;

}
.posterInfo{
    border-bottom: 1px solid lightgray;
    width: 100%;
}
.overlayVideo input{
    width: 370px;
    height: 30px;
    margin-top: 5px;
    margin-left: 10px;
    margin-bottom: 10px;
}
.overlayVideo a{
    margin-top: 10px;
    padding-left: 10px;
    height: 30px;
    width: 100%;
    border-bottom: 1px solid lightgray;
    align-self: left;
}
.overlayVideo p{
    padding-left: 10px;
    margin: 0;
    margin-top: 5px;
    width: 100%;

}
.noRecommendationImg{
    width: 300px;
    height: 150px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items:center ;
    font-weight: bold;
    color: gray;
    justify-content: center;
}
.cANDc{
    color: black;
    text-decoration: none;
    cursor: pointer;
}
.maloA{
    margin: 0;
    margin-left: 20px;


}
.overlayPosterText{
    width: 100%;
}
.otherright p{
    margin:0;
    margin-bottom:10px;
}
.otherright{
    margin-left: 20px;
    width: 280px;
    display: flex;
    flex-direction: column;
}
.social{
    display: flex;
    padding: 20px 20px 20px 0;
    align-items: center;
}
.social img{
    width: 30px;
    height: 30px;
    margin-right:10px;
    cursor: pointer;
}
.otherright a{
    font-weight: bold;
}
.otherright p{
    margin-bottom: 20px;
}
.homepage{
    border-left: 1px solid lightgray;
    padding-left: 10px;
}
.keywords{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.keyword{
    background-color: rgba(0,0,0,0.1);
    border: 1px solid #d7d7d7;
    color: #000;
    padding: 4px 10px;
    border-radius: 4px;
    margin: 2px;
    cursor: pointer;
}
.stars{
    padding: 0px 20px;
    height: 60px;
    background: #0d253f;
    position: absolute;
    margin-left: 30px;
    z-index: 5;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top:120px;
}
.stars img{
    filter: invert(1);
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
.seasonSection{
    width: 100%;
    height: 300px;
    display: flex;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    flex-direction: column;
    margin-top: 20px;
}
.seasonSection a{
    text-decoration: none;
    color:black;
    cursor:pointer;
    margin-bottom: 10px;
}
.season{
    height: 220px;
    width: 100%;
    border: 1px solid lightgray;
    display: flex;
    border-radius: 10px;
    margin-bottom: 20px;
    overflow: hidden;
}
.seasonHeader{
    height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 10px;
}
.seasonHeader h1{
    font-size: 1.4em;
    margin-right: 10px;
    cursor: pointer;
}
.seasonHeader p{
    margin: 0;
}
.prviRed a{
    cursor:pointer;
}
.info{
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 20px;
}
.info h2{
    margin: 0;
}
.info p{
    margin: 0;
    margin-top: 10px;
}
.slika img{
    height: 100%;
    border-top-left-radius: 10px;
    cursor: pointer;
}
.lists a{
    color: white;
    font-weight: bold;
    text-decoration: none;
    z-index: 3;
}
.lists{
    width: 150px;
    height: 60px;
    background: #0d253f;
    position: absolute;
    margin-top: 120px;
    z-index: 12;
    display: flex;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    cursor: auto;
}

</style>