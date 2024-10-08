<template>
  <div class="container">
    <ul>
      <li v-for="(weather, index) in hourlyWeatherData" :key="index">
        <h3>{{ weather.hour }}</h3>
        <img :src="weather.day.image" :alt="weather.day.description" />
        <p>{{ weather.temp }}&deg;C</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';
import { parseISOString } from '../utils/dateUtils';
import descriptions from '../assets/descriptions.json';

const props = defineProps(['selectedDate']);

const store = useStore();

const hourlyWeather = computed(() => store.getters['serviceHub/hourly']);

const hourlyWeatherData = computed(() => {
  const times = hourlyWeather.value.time;
  const temperatures = hourlyWeather.value.temperature_2m;
  const weatherCodes = hourlyWeather.value.weather_code;

  const filteredData = times
    .map((dateTime, index) => {
      // Parse the date and hour from the ISO string
      const { date, hour } = parseISOString(dateTime);
      return { date, hour, index };
    })
    .filter((item) => {
      // Filter items on selected date
      return item.date === props.selectedDate;
    });

  // Map the filtered data to the desired output format
  const result = filteredData.map((item) => {
    const weatherCode = weatherCodes[item.index];
    const temperature = temperatures[item.index];
    const dayDescription = descriptions[weatherCode].day;
    const nightDescription = descriptions[weatherCode].night;

    return {
      date: item.date,
      hour: item.hour,
      temp: temperature,
      day: dayDescription,
      night: nightDescription,
    };
  });

  return result;
});
</script>

<style scoped>
ul {
  display: flex;
  align-items: center;
  justify-content: start;
  list-style: none;
  overflow: auto;
  padding-top: var(--scrollbar-height);
}

ul::-webkit-scrollbar {
  height: var(--scrollbar-height);
}

ul::-webkit-scrollbar-track {
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  background-color: var(--container-bg);
}

ul::-webkit-scrollbar-thumb {
  border-radius: var(--border-radius);
  background-clip: content-box;
  background-color: var(--accent-color);
}

li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
