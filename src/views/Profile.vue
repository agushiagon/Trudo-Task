<template>
  <div v-if="isLoading">test</div>
  <div v-else class="user-profile">
    <div>
      <span> First Name: </span>
      {{ userData.firstName }}
    </div>
    <div>
      <span> Last Name: </span>
      {{ userData.lastName }}
    </div>
    <div>
      <span> Username: </span>
      {{ userData.userName }}
    </div>
    <div>
      <span> Email: </span>
      {{ userData.email }}
    </div>
    <div>
      <span> Total News Created: </span>
      {{ userData.totalNewsCreated || 0 }}
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
  },
  created() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      this.isLoading = true;
      await this.$store.dispatch("getUserData");
      this.isLoading = false;
    },
  },
};
</script>
<style scoped>
.user-profile {
  display: flex;
  flex-direction: column;
  font-size: 22px;
  align-items: center;
  margin-top: 50px;
}
span {
  margin-bottom: 15px;
  font-weight: 600;
}
</style>
