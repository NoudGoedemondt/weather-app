import { getCityFromCoordinates } from '@/services/geocodingService';
import { fetchWeather } from '@/services/weatherService';

const state = {
  weatherData: null,
  loading: false,
  city: null,
};

const getters = {
  current: (state) => state.weatherData.current,
  hourly: (state) => state.weatherData.hourly,
  daily: (state) => state.weatherData.daily,
  loading: (state) => state.loading,
  city: (state) => state.city,
};

const actions = {
  async fetchGeolocation() {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject('Geolocation is not available');
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          resolve({ latitude, longitude });
        },
        (err) => {
          reject(err.message);
        }
      );
    });
  },

  async fetchWeatherAndCityWithGeolocation({ dispatch, commit }) {
    commit('setLoading', true);
    try {
      const { latitude, longitude } = await dispatch('fetchGeolocation');

      const weatherData = await fetchWeather(latitude, longitude);
      commit('setWeatherData', weatherData);

      const city = await getCityFromCoordinates(latitude, longitude);
      commit('setCity', city);
    } catch (error) {
      console.error('Error fetching geolocation or weather', error);
    } finally {
      commit('setLoading', false);
    }
  },
};

const mutations = {
  setWeatherData(state, data) {
    state.weatherData = data;
  },
  setLoading(state, status) {
    state.loading = status;
  },
  setCity(state, city) {
    state.city = city;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
