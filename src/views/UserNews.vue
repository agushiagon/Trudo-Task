<template>
  <div class="usernews-page">
    <b-card class="my-50" no-body>
      <news-table :data="userNews" :is-loading="isLoading" />
    </b-card>
  </div>
</template>

<script>
import NewsTable from "./NewsTable.vue";

export default {
  name: "UserNews",
  components: {
    NewsTable,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    this.getAllNews();
  },
  computed: {
    userNews() {
      const news = this.$store.getters.getNews;
      const userId = localStorage.userId;
      const userNews = news?.filter((news) => news.authorId === userId);
      return userNews;
    },
  },
  methods: {
    async getAllNews() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("getAllNews");
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
.usernews-page {
  margin: 50px;
}
</style>
