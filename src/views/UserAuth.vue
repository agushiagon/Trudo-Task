<template>
  <div class="user-auth">
    <div v-if="mode === 'signup'">
      <b-form-group class="mb-2" label="First Name:">
        <b-form-input
          v-model="firstName"
          type="text"
          placeholder="Enter first name"
        />
      </b-form-group>
      <b-form-group class="mb-2" label="Last name:">
        <b-form-input
          v-model="lastName"
          type="text"
          placeholder="Enter last name"
        />
      </b-form-group>
      <b-form-group class="mb-2" label="Username:">
        <b-form-input
          v-model="userName"
          type="text"
          placeholder="Enter username"
        />
      </b-form-group>
    </div>
    <b-form-group label="Email address:">
      <b-form-input
        v-model="email"
        type="email"
        placeholder="Enter email"
        required
      />
    </b-form-group>
    <b-form-group class="mt-2" label="Password:">
      <b-form-input
        v-model="password"
        type="password"
        placeholder="Enter Password"
        required
      />
    </b-form-group>
    <p v-if="!formIsValid">
      Please enter a valid email and password (must be at least 6 characters
      long).
    </p>
    <b-button
      size="sm"
      type="submit"
      class="mt-3"
      variant="primary"
      :disabled="isLoading"
      @click="submitForm"
    >
      <b-spinner v-if="isLoading" class="ml-50" small variant="light" />
      {{ submitButtonCaption }}
    </b-button>
    <b-button size="sm" class="mt-3 ml-2" @click="switchAuthMode">{{
      switchModeButtonCaption
    }}</b-button>
    <b-modal
      @hidden="handleError"
      ref="errorModal"
      hide-footer
      centered
      title="An error occurred"
    >
      <p class="my-4">{{ error }}</p>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      userName: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Signup";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Signup instead";
      } else {
        return "Login instead";
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        userName: this.userName,
      };

      try {
        if (this.mode === "login") {
          await this.$store.dispatch("login", actionPayload);
        } else {
          await this.$store.dispatch("signup", actionPayload);
        }
        const redirectUrl = "/" + (this.$route.query.redirect || "news");
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || "Failed to authenticate, try later.";
        this.$refs.errorModal.show();
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.user-auth {
  width: 50%;
  margin: 50px auto 0 auto;
}
</style>
