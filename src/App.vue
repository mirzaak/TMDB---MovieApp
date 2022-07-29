<template>
  <router-view/>
</template>

<script setup>
import { onMounted } from 'vue';
import { useDataStore } from "./stores/data";
const store = useDataStore();

onMounted(() => {
  store.fetchData();
})
</script>

<style>
body{
  margin: 0;
}
*{
    font-family: 'Source Sans Pro', Arial, sans-serif;
}
</style>