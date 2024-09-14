const state = {
  weatherData: null,
  loading: false,
};

const getters = {
  current: (state) => state.weatherData.current,
  hourly: (state) => state.weatherData.hourly,
  daily: (state) => state.weatherData.daily,
  loading: (state) => state.loading,
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
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const weatherData = await response.json();

      commit('setWeatherData', weatherData);
    } catch (error) {
      console.error(error.message);
    }
  },

  async fetchWeatherWithGeolocation({ dispatch, commit }) {
    commit('setLoading', true);
    try {
      const { latitude, longitude } = await dispatch('fetchGeolocation');
      dispatch('fetchWeather', { latitude, longitude });
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
