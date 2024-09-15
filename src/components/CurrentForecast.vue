<template>
  <div v-if="weatherData">
    <h1>{{ city }}</h1>
    <pre>
      {{ currentWeather }}
    </pre>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const weatherData = computed(() => store.state.weather.weatherData);

const city = computed(() => store.getters['weather/city']);

const currentWeather = computed(() => store.getters['weather/current']);
</script>
