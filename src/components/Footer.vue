  <template>
    <footer>
    <div class="footer">
      <div class="footercontent">
        <div class="fcontent">
        <div class="footerleft">
        <img class="logodva" src="../assets/logodva.svg" alt="">
        <div v-if="!store.sesija" class="footeruser">User</div>
        <div v-if="store.sesija" class="footeruser">{{store.username}}</div>
        </div>
        <ul>
          <a href="#">THE BASICS</a>
          <li>About TMDB</li>
          <li>Contact Us</li>
          <li>Support Forums</li>
          <li>API</li>
          <li>System Status</li>
        </ul>
        <ul>
          <a href="#">GET INVOLVED</a>
          <li>Contribution Bible</li>
          <li>Add New Movie</li>
          <li>Add New TV Show</li>
        </ul>
        <ul>
          <a href="#">COMMUNITY</a>
          <li>Guidelines</li>
          <li>Discussions</li>
          <li>Leaderboard</li>
          <li>Twitter</li>
        </ul>
        <ul>
          <a href="#">COMMUNITY</a>
          <li>Terms of Use</li>
          <li>API Terms of Use</li>
          <li>Privacy Policy</li>
        </ul>
        
      </div>
    </div>
    </div>
  </footer>
  </template>
  
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { useUserStore } from "../stores/user.js";
import axios from 'axios'
const route = useRoute()
const store = useUserStore();
  </script>
  
  <style scoped>
  .footer{
  height: 300px;
  width: 100%;
  background: #0d253f;
  bottom: -300px;
  position: absolute;

}
.footercontent{
  width: 1000px;
  height: 300px;
  margin: auto;
  display: flex;
  flex-direction: row;
}
.footercontent li{
  text-decoration: none;
  color: white;
  list-style-type: none;
  font-size: 1.0em;
  line-height: 1.4em;
}
.footercontent a{
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 1.2em;
  line-height: 1.2em;
  cursor: auto;
}
.logodva{
  width: 130px;
  height: 94px;
}
.fcontent{
  display: flex;
  margin-top: 40px;
  margin: auto;
}

.footeruser{
  background:white;
  width: 130px;
  height: 30px;
  border-radius: 5px;
  color: #01b4e4;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
  margin-top: 20px;
  font-weight: bold;
}
.dropdownAccount{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;

}
.dropdowncontentAccount{

    background: white;
    border: 1px solid lightgray;
    display: flex;
    position: absolute;
    top: 50px;
    padding-top: 8px;
    padding-bottom: 8px;
    flex-direction: column;
    border-radius: 5px;
    z-index: 5;
  
}
.tip .dropdowncontentAccount::after {
  content: " ";
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}
.dropdowncontentAccount a{
  margin: 0;
  color: black;
  font-weight: 400;
  padding-left: 24px;
  padding-right: 64px;
  font-size: 1rem;
  padding-top: 5px;
  padding-bottom: 5px;
    align-items: center;
    display: flex;
}
.dropdowncontentAccount a:hover{
  background: rgba(211, 211, 211, 0.489);
  overflow: hidden;
}
.dropdownAccount a{
  cursor: pointer;
}
  </style>