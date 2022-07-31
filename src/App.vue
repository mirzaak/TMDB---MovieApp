<template>
<Navbar/>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import { onMounted } from 'vue';
import { useDataStore } from "./stores/data";
const store = useDataStore();

</script>

<style>
body{
  margin: 0;
}
*{
    font-family: 'Source Sans Pro', Arial, sans-serif;
}
</style>