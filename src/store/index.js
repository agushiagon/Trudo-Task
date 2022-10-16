import Vue from "vue";
import Vuex from "vuex";
import authModule from "./auth/index.js";
import newsModule from "./news/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authModule,
    news: newsModule,
  },
});
