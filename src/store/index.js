import { createStore } from 'vuex';
import serviceHub from './serviceHub';
import eventBus from './eventBus';

export default createStore({
  modules: {
    serviceHub,
    eventBus,
  },
});
