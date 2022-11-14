<template>
  <div>
    <toastTst position="top-center" />

    <div id="content">
      <h2>Login</h2>
      <div class="input">
        <label>UserName</label>
        <v-text-field
          v-model="users.userName"
          placeholder="userName"
          solo
        ></v-text-field>
      </div>
      <div class="input">
        <label for="password">Password</label>

        <v-text-field
          v-model="users.passWord"
          :type="showPassword ? 'text' : 'password'"
          :rules="PWDRules"
          placeholder="123"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          solo
        ></v-text-field>
      </div>

      <div class="alternative-option mt-4">
        You don't have an account? <span @click="moveToRegister">Register</span>
      </div>

      <button class="mt-4 btn-pers" id="login_button" @click="login">
        Login
      </button>
      <div
        class="alert alert-warning alert-dismissible fade show mt-5 d-none"
        role="alert"
        id="alert_2"
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterPage",

  data() {
    return {
      showPassword: false,
      users: {
        userName: null,
        passWord: null,
      },
    };
  },
  methods: {
    login() {
      axios
        .get(
          `http://localhost:3000/users?userName=${this.users.userName}&passWord=${this.users.passWord}`
        )
        .then((res) => {
          if (res.data.length > 0) {
            this.$store.commit("setUser", res.data[0]);
            localStorage.setItem("token", res.data[0].id);
            this.$router.push("/");
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Uyarı Mesajı",
              detail: "Hatalı giriş",
              life: 1000,
            });
          }
        });
    },
    moveToRegister() {
      this.$router.push("/Register");
    },
  },
};
</script>

<style scoped>
#content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid lightgray;
  padding: 4rem 4rem;
  border-radius: 5px;
  background: #fefefe;
}

.container {
  width: 400px;
  max-width: 95%;
}

::before,
::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: none;
  border-color: currentColor;
}

.input {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.input > label {
  text-align: start;
}
.input > input {
  margin-top: 6px;
  height: 38px !important;
}
/* From uiverse.io */
.btn-pers {
  position: relative;
  left: 50%;
  padding: 1em 2.5em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 700;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  transform: translateX(-50%);
}
.btn-pers:hover {
  background-color: #198754;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translate(-50%, -7px);
}
.btn-pers:active {
  transform: translate(-50%, -1px);
}
/*  */
.alternative-option {
  text-align: center;
}
.alternative-option > span {
  color: #0d6efd;
  cursor: pointer;
}
h2 {
  margin-bottom: 10px;
}
</style>
