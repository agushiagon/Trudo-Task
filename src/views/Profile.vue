<template>
  <div class="w-100 text-center" v-if="isLoading">Loading...</div>
  <div v-else class="user-profile">
    <div>
      <span> First Name: </span>
      {{ userData?.firstName }}
    </div>
    <div>
      <span> Last Name: </span>
      {{ userData?.lastName }}
    </div>
    <div>
      <span> Username: </span>
      {{ userData?.userName }}
    </div>
    <div>
      <span> Email: </span>
      {{ userData?.email }}
    </div>
    <div>
      <span> Total News Created: </span>
      {{ totalNewsCreated }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
    totalNewsCreated() {
      const news = this.$store.getters.getNews;
      const userId = localStorage.userId;
      const userNews = news?.filter((news) => news.authorId === userId);
      return userNews.length;
    },
  },
  created() {
    this.getUserData();
    this.getAllNews();
  },
  methods: {
    async getUserData() {
      this.isLoading = true;
      await this.$store.dispatch("getUserData");
      this.isLoading = false;
    },
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
<style scoped>
.user-profile {
  display: flex;
  flex-direction: column;
  font-size: 22px;
  margin-top: 50px;
  margin-left: auto;
  width: fit-content;
  margin-right: auto;
}
span {
  margin-bottom: 15px;
  font-weight: 600;
}
</style>
