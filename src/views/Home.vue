<template>

</template>

<script setup>
import { ref, onMounted,computed } from 'vue';

import { useDataStore } from "../stores/data";

const store = useDataStore();

const data = computed(() => {
  return store.data
})


</script>
<style>
</style>