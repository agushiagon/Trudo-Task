<template>
  <section>
    <b-card class="error-page">
      <div class="error-page__text">
        <h2>Page not found</h2>
        <p>
          This page could not be found - maybe check out all our
          <router-link to="/news">news</router-link>.
        </p>
      </div>
    </b-card>
  </section>
</template>
<style scoped>
.error-page {
  height: calc(100vh - 96px);
  align-items: center;
}
.card-body {
  display: flex;
}
.error-page__text {
  margin-top: 40%;
}
</style>
