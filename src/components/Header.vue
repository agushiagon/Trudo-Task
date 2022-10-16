<template>
  <b-navbar class="header" type="dark" variant="dark">
    <b-navbar-brand to="/">TRUDO-NEWS</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item-dropdown left>
        <template #button-content>
          <b-avatar></b-avatar>
        </template>
        <b-dropdown-item to="/user-profile">Profile</b-dropdown-item>
        <b-dropdown-item to="/user-news">My News</b-dropdown-item>
        <b-dropdown-item v-if="!isLoggedIn" to="/auth">Login</b-dropdown-item>
        <b-dropdown-item v-else @click="logout"> Log Out </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/auth");
      // this.$route.name === "news" ? "" : this.$router.replace("/news");
    },
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  padding: 20px 100px 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
