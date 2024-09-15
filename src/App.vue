<template>
  <div>
    <div v-if="loading">Weatherdata Loading...</div>
    <current-forecast />
    <daily-forecast />
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

import DailyForecast from './components/DailyForecast.vue';
import CurrentForecast from './components/CurrentForecast.vue';

const store = useStore();

const loading = computed(() => store.getters['weather/loading']);

onMounted(() => store.dispatch('weather/fetchWeatherWithGeolocation'));
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
}
</style>
