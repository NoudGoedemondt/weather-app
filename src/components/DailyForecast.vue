<template>
  <div class="container">
    <ul v-if="weatherData">
      <li v-for="weather in dailyWeatherData" :key="weather.date">
        <img :src="weather.day.image" :alt="weather.day.description" />
        <h3>{{ weather.weekday }}</h3>
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
import descriptions from '../assets/descriptions.json';

const store = useStore();

const weatherData = computed(() => store.state.weather.weatherData);

const daily = computed(() => store.getters['weather/daily']);

const dailyWeatherData = computed(() =>
  daily.value.time.map((date, index) => {
    const weatherCode = daily.value.weather_code[index];
    return {
      date: date,
      weekday: getWeekday(date),
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
.container {
  background-color: var(--container-bg);
  border-radius: var(--border-radius);
}

ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
}

li {
  text-align: center;
  padding: 1rem;
  border-radius: 5px;
}

img {
  max-width: 50px;
  max-height: 50px;
}

h3 {
  margin-bottom: 0.5rem;
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
