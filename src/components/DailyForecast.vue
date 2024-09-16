<template>
  <div class="container">
    <ul>
      <li v-for="weather in dailyWeatherData" :key="weather.date">
        <h3>{{ weather.weekday }}</h3>
        <img :src="weather.day.image" :alt="weather.day.description" />
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
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { getWeekdayAbbr } from '../utils/dateUtils';
import descriptions from '../assets/descriptions.json';

const store = useStore();

const dailyWeather = computed(() => store.getters['serviceHub/daily']);

const dailyWeatherData = computed(() =>
  dailyWeather.value.time.map((date, index) => {
    const weatherCode = dailyWeather.value.weather_code[index];
    const dateObject = new Date(date);
    return {
      date: date,
      weekday: getWeekdayAbbr(dateObject),
      day: descriptions[weatherCode].day,
      night: descriptions[weatherCode].night,
      maxTemp: dailyWeather.value.temperature_2m_max[index],
      minTemp: dailyWeather.value.temperature_2m_min[index],
    };
  })
);
</script>

<style scoped>
/* * {
  outline: 1px red auto;
} */

ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  width: 100%;
}

li {
  text-align: center;
  padding: 1rem;
  border-radius: var(--border-radius);
}

img {
  max-width: 50px;
  max-height: 50px;
}

h3 {
  font-weight: 400;
}

p {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 200;
}

p i {
  margin-right: 5px;
  font-size: 0.75rem;
}
</style>
