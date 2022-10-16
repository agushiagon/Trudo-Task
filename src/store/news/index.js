export default {
  state() {
    return {
      news: null,
      rowToDelete: {},
      newsModel: {},
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
    async editNews(_, payload) {
      const response = await fetch(
        `https://tudo-task-6e856-default-rtdb.europe-west1.firebasedatabase.app/news/${payload.newsId}.json`,
        {
          method: "PATCH",
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
    async deleteNews(_, payload) {
      const response = await fetch(
        `https://tudo-task-6e856-default-rtdb.europe-west1.firebasedatabase.app/news/${payload.newsId}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const error = new Error("Something went wrong.");
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
    setNewsToDelete(state, row) {
      state.rowToDelete = row;
    },
    setNewsModel(state, row) {
      state.newsModel = row;
    },
  },
  getters: {
    getNews(state) {
      return state.news;
    },
    rowToDelete(state) {
      return state.rowToDelete;
    },
    getNewsModel(state) {
      return state.newsModel;
    },
  },
};
