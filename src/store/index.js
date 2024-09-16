import { createStore } from 'vuex';
import serviceHub from './serviceHub';

export default createStore({
  modules: {
    serviceHub,
  },
});
