const state = {
  selectedDate: null,
};

const getters = {
  selectedDate: (state) => state.selectedDate,
};

const mutations = {
  setSelectedDate(state, data) {
    state.selectedDate = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
