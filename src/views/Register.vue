<template>
  <div id="content">
    <h2>Register</h2>
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
      Already have an account? <span @click="moveToLogin">Login</span>
    </div>

    <button class="mt-4 btn-pers" @click="register">Login</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterPage",

  data() {
    return {
      users: {
        userName: null,
        passWord: null,
      },
    };
  },
  methods: {
    register() {
      axios.post("http://localhost:3000/users", this.users).then((res) => {
        console.log(res);
        this.$router.push({ name: "LoginPage" });
        this.users = "";
      });
    },
    moveToLogin() {
      this.$router.push({ name: "LoginPage" });
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
  padding: 1.5em 2.5em;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 700;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease 0s;
  cursor: pointer;
  outline: none;
  transform: translateX(-50%);
}
.btn-pers:hover {
  background-color: #198754;
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translate(-50%, 5px);
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
