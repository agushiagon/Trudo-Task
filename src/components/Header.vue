<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand>TRUDO-NEWS</b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item-dropdown right>
        <template #button-content>
          <em>User</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item v-if="true" href="/auth">Login</b-dropdown-item>
        <b-dropdown-item v-else href="#">Sign Out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {}
</script>

<style scoped>
header {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
