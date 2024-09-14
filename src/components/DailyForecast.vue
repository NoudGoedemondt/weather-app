<template>
  <ul v-if="weatherData">
    <li v-for="weather in dailyWeatherData" :key="weather.date">
      <img :src="weather.day.image" :alt="weather.day.description" />
      <h3>{{ getWeekday(weather.date) }}</h3>
      <p>
        <i class="fa-solid fa-caret-up"></i>
        <span>{{ weather.maxTemp }}&deg;C</span>
      </p>
      <p>
        <i class="fa-solid fa-caret-down"></i>
        <span>{{ weather.minTemp }}&deg;C</span>
      </p>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import descriptions from '../assets/descriptions.json';

const store = useStore();

const weatherData = computed(() => store.state.weather.weatherData);

const daily = computed(() => store.getters['weather/daily']);

const dailyWeatherData = computed(() =>
  daily.value.time.map((date, index) => {
    const weatherCode = daily.value.weather_code[index];
    return {
      date: date,
      day: descriptions[weatherCode].day,
      night: descriptions[weatherCode].night,
      maxTemp: daily.value.temperature_2m_max[index],
      minTemp: daily.value.temperature_2m_min[index],
    };
  })
);

const getWeekday = (dateString) => {
  const weekdays = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
  const day = new Date(dateString);
  return weekdays[day.getDay()];
};
</script>

<style scoped>
ul {
  display: flex;
  list-style: none;
  gap: 1rem;
}

li {
  text-align: center;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

img {
  max-width: 100px;
  max-height: 100px;
}

h3 {
  margin-bottom: 1rem;
}

p {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1rem;
}
</style>
