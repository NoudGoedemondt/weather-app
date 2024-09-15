<template>
  <div class="container">
    <ul class="hourly-forecast" v-if="weatherData">
      <li v-for="(weather, index) in hourlyWeatherData" :key="index">
        <h3>{{ weather.hour }}</h3>
        <img :src="weather.day.image" :alt="weather.day.description" />
        <p>{{ weather.temp }}&deg;C</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { parseISOString } from '../utils/dateUtils';
import descriptions from '../assets/descriptions.json';

//const selectedDate = ref('2024-09-15');

const store = useStore();

const weatherData = computed(() => store.state.weather.weatherData);

const hourlyWeather = computed(() => store.getters['weather/hourly']);

const hourlyWeatherData = computed(() =>
  hourlyWeather.value.time.map((dateTime, index) => {
    const weatherCode = hourlyWeather.value.weather_code[index];
    const { date, hour } = parseISOString(dateTime);
    return {
      date: date,
      hour: hour,
      temp: hourlyWeather.value.temperature_2m[index],
      day: descriptions[weatherCode].day,
      night: descriptions[weatherCode].night,
    };
  })
);
</script>

<style scoped>
.container {
  background-color: var(--container-bg);
  border-radius: var(--border-radius);
}

ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  overflow-x: scroll;
  overflow-y: hidden;
}

ul::-webkit-scrollbar {
  width: 16px;
  height: 10px;
}

ul::-webkit-scrollbar-track {
  border-radius: 8px;
  background-color: #e7e7e710;
}

ul::-webkit-scrollbar-thumb {
  border-radius: var(--border-radius);
  background-clip: content-box;
  background-color: var(--accent-color);
}

li {
  text-align: center;
  padding: 1rem;
}

img {
  max-width: 50px;
  max-height: 50px;
}

h3 {
  font-weight: 400;
}

p {
  font-weight: 200;
}
</style>
