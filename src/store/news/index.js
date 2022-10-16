export default {
  state() {
    return {
      news: null,
    };
  },
  actions: {
    async saveNews(context, payload) {
      const userId = context.rootGetters.userId;
      const response = await fetch(
        `https://tudo-task-6e856-default-rtdb.europe-west1.firebasedatabase.app/news/${userId}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            news: payload,
          }),
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        const error = new Error(
          responseData.error.message || "Something went wrong."
        );
        throw error;
      }
    },

    async getAllNews(context) {
      const userId = context.rootGetters.userId;
      const response = await fetch(
        `https://tudo-task-6e856-default-rtdb.europe-west1.firebasedatabase.app/news/${userId}.json`,
        {
          method: "GET",
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        const error = new Error(
          responseData.error.message || "Something went wrong :)"
        );
        throw error;
      }
      context.commit("setNews", responseData);
    },
  },
  mutations: {
    setNews(state, payload) {
      state.news = payload;
    },
  },
  getters: {
    getNews(state) {
      return state.news;
    },
  },
};
