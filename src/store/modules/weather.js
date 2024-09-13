const state = {
  weatherData: null,
};

const getters = {
  weatherData: (state) => state.weatherData,
};

const actions = {
  async fetchWeather({ commit }) {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=51.892304&longitude=4.472388&hourly=temperature_2m,weather_code&daily=weather_code&timezone=Europe%2FBerlin';
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
