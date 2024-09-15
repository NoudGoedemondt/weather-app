<template>
  <div v-if="weatherData">
    <h1>{{ city }}</h1>
    <img :src="iconUrl" alt="current weather icon" />
    <h2>{{ currentWeather.temperature_2m }}&deg;C</h2>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import descriptions from '../assets/descriptions.json';

const store = useStore();

const weatherData = computed(() => store.state.weather.weatherData);

const city = computed(() => store.getters['weather/city']);
const currentWeather = computed(() => store.getters['weather/current']);

const iconUrl = computed(() => {
  const index = currentWeather.value.weather_code;
  return descriptions[index].day.image;
});
</script>
