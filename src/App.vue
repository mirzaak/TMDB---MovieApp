<template>
<Navbar/>
<Footer/>
</template>

<script setup>
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'
import { onMounted } from 'vue';
import { useDataStore } from "./stores/data";
const store = useDataStore();

</script>

<style>
body{
  margin: 0;
  min-height: 100vh;
  position: relative;
}
*{
    font-family: 'Source Sans Pro', Arial, sans-serif;
}
.html{
  min-height: 100vh
}
</style>