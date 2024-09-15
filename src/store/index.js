import { createStore } from 'vuex';
import weather from './weather';

export default createStore({
  modules: {
    weather,
  },
});
