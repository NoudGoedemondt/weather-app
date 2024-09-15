<template>
  <main>
    <div v-if="loading">Weatherdata Loading...</div>
    <current-forecast />
    <hourly-forecast />
    <daily-forecast />
  </main>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

import DailyForecast from './components/DailyForecast.vue';
import CurrentForecast from './components/CurrentForecast.vue';
import HourlyForecast from './components/HourlyForecast.vue';

const store = useStore();

const loading = computed(() => store.getters['weather/loading']);

onMounted(() => store.dispatch('weather/fetchWeatherWithGeolocation'));
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

:root {
  --bg-color: #0b121e;
  --container-bg: #202b3c;
  --text-color: #fff;
  --accent-color: #0093ff;
  --border-radius: 15px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  margin-top: 5rem;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
}

.container {
  max-width: 700px;
  margin: 2rem auto;
}
</style>
