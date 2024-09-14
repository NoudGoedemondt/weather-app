<template>
  <div>
    <h1>Weather Data</h1>
    <pre>{{ combinedWeatherDataWithDescriptions }}</pre>
  </div>

  <!-- <div v-for="(data, code) in descriptionsData" :key="code">
    {{ code }}
    <img :src="data.day.image" />
    <img :src="data.night.image" />
  </div> -->
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import descriptions from '../assets/descriptions.json';

const store = useStore();

const daily = computed(() => store.getters['weather/daily']);

const combinedWeatherData = computed(() =>
  daily.value.time.map((date, index) => ({
    date: date,
    weatherCode: daily.value.weather_code[index],
  }))
);

const combinedWeatherDataWithDescriptions = computed(() =>
  combinedWeatherData.value.map((day) => ({
    ...day,
    day: descriptions[day.weatherCode].day,
    night: descriptions[day.weatherCode].night,
  }))
);
</script>
