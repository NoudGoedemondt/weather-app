const state = {
  weatherData: null,
};

const getters = {
  weatherData: (state) => state.weatherData,
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

  async fetchWeather({ commit }, { latitude, longitude }) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code&daily=weather_code&timezone=auto`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const { latitude, longitude, timezone_abbreviation, daily } =
        await response.json();

      const { time, weather_code } = daily;

      commit('setWeatherData', {
        latitude,
        longitude,
        timezone_abbreviation,
        time,
        weather_code,
      });
    } catch (error) {
      console.error(error.message);
    }
  },

  async fetchWeatherWithGeolocation({ dispatch }) {
    try {
      const { latitude, longitude } = await dispatch('fetchGeolocation');
      dispatch('fetchWeather', { latitude, longitude });
    } catch (error) {
      console.error('Error fetching geolocation or weather', error);
    }
  },
};

const mutations = {
  setWeatherData(state, data) {
    state.weatherData = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
