<template>
  <main>
    <div v-if="loading">Weatherdata Loading...</div>
    <div v-else-if="weatherData">
      <current-forecast />
      <daily-forecast @dateSelected="selectDate" :selectedDate="selectedDate" />
      <hourly-forecast :selectedDate="selectedDate" />
    </div>
    <div v-else>Weather data could not be loaded.</div>
  </main>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';

import DailyForecast from './components/DailyForecast.vue';
import CurrentForecast from './components/CurrentForecast.vue';
import HourlyForecast from './components/HourlyForecast.vue';

const store = useStore();

//set selectedDate to current date
const selectedDate = ref(new Date().toISOString().split('T')[0]);

const loading = computed(() => store.getters['serviceHub/loading']);

const weatherData = computed(() => store.state.serviceHub.weatherData);

const selectDate = (date) => (selectedDate.value = date);

onMounted(
  async () =>
    await store.dispatch('serviceHub/fetchWeatherAndCityWithGeolocation')
);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

:root {
  --bg-color: #0b121e;
  --container-bg: #202b3c;
  --text-color: #fff;
  --accent-color: #0093ff;
  --border-radius: 15px;
  --scrollbar-height: 9px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
}

main {
  margin-top: 6rem;
}

.container {
  display: flex;
  align-items: center;
  max-width: 700px;
  height: 180px;
  margin: 2rem auto;
  background-color: var(--container-bg);
  border-radius: var(--border-radius);
}

.container.top {
  background-color: transparent;
}
</style>
