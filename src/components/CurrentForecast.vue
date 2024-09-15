<template>
  <div class="container">
    <div class="current-forecast" v-if="weatherData">
      <div>
        <h1>{{ city }}</h1>
        <h2>{{ currentWeather.temperature_2m }}&deg;C</h2>
      </div>
      <img :src="iconUrl" alt="current weather icon" />
    </div>
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

<style scoped>
.current-forecast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
}

h1 {
  font-weight: 400;
  margin-bottom: 2rem;
}

h2 {
  font-size: 3rem;
}

img {
  width: 100px;
  height: auto;
}
</style>
