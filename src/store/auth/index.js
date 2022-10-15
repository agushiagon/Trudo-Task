let timer;

export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
      userData: null,
    };
  },
  actions: {
    async login(context, payload) {
      return context.dispatch("auth", {
        ...payload,
        mode: "login",
      });
    },
    async signup(context, payload) {
      return context.dispatch("auth", {
        ...payload,
        mode: "signup",
      });
    },
    async auth(context, payload) {
      const mode = payload.mode;
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNVQ341PGUOg_iyhsLpvhU6KxDPAPCpgw";

      if (mode === "signup") {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNVQ341PGUOg_iyhsLpvhU6KxDPAPCpgw";
      }
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          displayName: `${payload.firstName} ${payload.lastName}`,
          returnSecureToken: true,
        }),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        const error = new Error(
          responseData.error.message ||
          "Failed to authenticate. Check your login data."
        );
        throw error;
      }

      if (mode === "signup") {
        await fetch(
          `https://tudo-task-6e856-default-rtdb.europe-west1.firebasedatabase.app/users/${responseData.localId}.json?auth=` +
          responseData.idToken,
          {
            method: "PUT",
            body: JSON.stringify({
              email: payload.email,
              firstName: payload.firstName,
              lastName: payload.lastName,
              userName: payload.userName,
              totalNewsCreated: null,
            }),
          }
        );
      }

      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("tokenExpiration", expirationDate);

      timer = setTimeout(function () {
        context.dispatch("autoLogout");
      }, expiresIn);

      context.commit("setUser", {
        token: responseData.idToken,
        userId: responseData.localId,
      });
    },
    tryLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const tokenExpiration = localStorage.getItem("tokenExpiration");

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      timer = setTimeout(function () {
        context.dispatch("autoLogout");
      }, expiresIn);

      if (token && userId) {
        context.commit("setUser", {
          token: token,
          userId: userId,
        });
      }
    },
    logout(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenExpiration");

      clearTimeout(timer);

      context.commit("setUser", {
        token: null,
        userId: null,
      });
    },
    autoLogout(context) {
      context.dispatch("logout");
      context.commit("setAutoLogout");
    },
    async getUserData(context) {
      const userId = context.rootGetters.userId;
      const response = await fetch(
        `https://tudo-task-6e856-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json?auth=`,
        {
          method: "GET",
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        const error = new Error(
          responseData.error.message || "Something went wrong :)"
        );
        throw error;
      }
      context.commit("setUserData", responseData);
    },
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.didAutoLogout = false;
    },
    setAutoLogout(state) {
      state.didAutoLogout = true;
    },
    setUserData(state, payload) {
      state.userData = payload;
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    userData(state) {
      return state.userData;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    },
  },
};
