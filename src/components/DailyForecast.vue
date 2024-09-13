<template>
  <div>
    <h1>Weather Data</h1>
    <pre>{{ daily }}</pre>
  </div>
  <div v-for="(data, code) in descriptionsData" :key="code">
    {{ code }}
    <img :src="data.day.image" />
    <img :src="data.night.image" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import descriptions from '../assets/descriptions.json';

const store = useStore();

const descriptionsData = ref(descriptions);

const daily = computed(() => store.getters['weather/daily']);
</script>
