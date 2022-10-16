<template>
  <div class="usernews-page">
    <b-card class="my-50" no-body>
      <news-table :data="userNews" :is-loading="isLoading" />
    </b-card>
    <b-modal
      id="modal-small-delete"
      ok-title="Delete"
      cancel-title="Cancel"
      ok-variant="danger"
      cancel-variant="outline-secondary"
      centered
      size="md"
      title="Delete News"
      no-enforce-focus
      :hide-footer="!rowToDelete.isRemovable"
      @ok="triggerDelete"
    >
      <span v-if="rowToDelete.isRemovable">
        Are you sure you want to delete this
      </span>
      <span v-else>You can not delete this news :(</span>
    </b-modal>
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
    rowToDelete() {
      return this.$store.getters.rowToDelete;
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
    async triggerDelete() {
      try {
        await this.$store.dispatch("deleteNews", this.rowToDelete);
      } catch (err) {
        console.log(err);
      } finally {
        await this.getAllNews();
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
