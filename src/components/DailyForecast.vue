<template>
  <div>
    <h1>Weather Data</h1>
    <pre>{{ combinedWeatherDataWithDescriptions }}</pre>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import descriptions from '../assets/descriptions.json';

const store = useStore();

const daily = computed(() => store.getters['weather/daily']);

const combinedWeatherDataWithDescriptions = computed(() =>
  daily.value.time.map((date, index) => {
    const weatherCode = daily.value.weather_code[index];
    return {
      date: date,
      day: descriptions[weatherCode].day,
      night: descriptions[weatherCode].night,
    };
  })
);
</script>
