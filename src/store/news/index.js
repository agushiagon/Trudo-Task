export default {
  state() {
    return {
      news: null,
    };
  },
  actions: {
    async saveNews(_, payload) {
      const response = await fetch(
        `https://tudo-task-6e856-default-rtdb.europe-west1.firebasedatabase.app/news.json`,
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.error.message || "Something went wrong."
        );
        throw error;
      }
    },

    async getAllNews(context) {
      const response = await fetch(
        `https://tudo-task-6e856-default-rtdb.europe-west1.firebasedatabase.app/news.json`,
        {
          method: "GET",
        }
      );

      const responseData = await response.json();
      const allNewsId = Object.keys(responseData);
      const news = Object.values(responseData).map((newsData, index) => ({
        ...newsData,
        newsId: allNewsId[index],
      }));

      if (!response.ok) {
        const error = new Error(
          responseData.error.message || "Something went wrong :)"
        );
        throw error;
      }
      context.commit("setNews", news);
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
