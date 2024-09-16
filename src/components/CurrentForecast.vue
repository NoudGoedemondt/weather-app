<template>
  <div class="container top">
    <section>
      <div>
        <h1>{{ city }}</h1>
        <h2>{{ currentWeather.temperature_2m }}&deg;C</h2>
      </div>
      <img :src="iconUrl" alt="current weather icon" />
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import descriptions from '../assets/descriptions.json';

const store = useStore();

const city = computed(() => store.getters['serviceHub/city']);
const currentWeather = computed(() => store.getters['serviceHub/current']);

const iconUrl = computed(() => {
  const index = currentWeather.value.weather_code;
  return descriptions[index].day.image;
});
</script>

<style scoped>
section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
