<template>
  <div>uieuie</div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      personInfo: [
        { headers: "Profil", icon: "person" },
        { headers: "Settings", icon: "settings" },
        {
          headers: "Çıkış Yap",
          icon: "exit_to_app",
          onClick: () => {
            // this.$store.commit("logoutStore");
            this.$router.push("/");
            // this.$router.push("/");
          },
          // routerName: "/",
        },
      ],
    };
  },
};
</script>
