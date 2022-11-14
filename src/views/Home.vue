<template>
  <div>
    <v-app>
      <v-app-bar color="primary" dense dark clipped-left height="50vh" flat app>
        <v-app-bar-nav-icon color="black" @click="drawer = !drawer">
        </v-app-bar-nav-icon>
        <v-toolbar-title>Anasayfa</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-menu
          class="toolbar-menu-item"
          offset-y
          origin="center center"
          :nudge-bottom="10"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn fab small text v-bind="attrs" v-on="on">
              <v-icon color="black">person</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, Myindex) in personInfo"
              :key="Myindex"
              style="max-height: 0px"
              @click="item.onClick"
            >
              <v-list-item-title>
                <v-icon left small>{{ item.icon }}</v-icon
                >{{ item.headers }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer app v-model="drawer" fixed absolute height="100%">
        <v-list>
          <v-list-group
            v-for="(item, i) in users.sevdigiYemekler[0].fastFood"
            :key="i"
          >
            <template v-slot:activator>
              <v-list-item-icon
                ><v-icon color="#c4c4c4" small>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <template v-if="item.yagli">
                <v-list-item-title class="headerClr" style="font-size: 14px">{{
                  item.yagli
                }}</v-list-item-title>
              </template>
              <template v-else>
                <v-list-item-title class="headerClr" style="font-size: 14px">{{
                  item.tur
                }}</v-list-item-title>
              </template>
            </template>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <h2>fastFood</h2>
        <v-card style="display: flex; flex-wrap: nowrap">
          <v-card
            v-for="item in users.sevdigiYemekler[0].fastFood"
            :key="item"
            max-width="374"
            class="mx-auto my-12"
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img class="img" :src="item.img"></v-img>
            <v-card-text>
              <div class="my-4 text-subtitle-1">
                $ • {{ item.yagli + " " + item.price }} tl
              </div>

              <div>
                {{ item.description }}
              </div>
            </v-card-text>
          </v-card></v-card
        >
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HomePage",
  data() {
    return {
      drawer: true,
      drawerLinks: [
        {
          icon: "dashboard",
          text: "patates",
          routerName: "patates",
        },

        {
          icon: "folder",
          text: "patates",
        },
        {
          icon: "mdi-account",
          text: "ezogelin",
        },
        {
          icon: "star",
          text: "çiğ köfte",
        },
        {
          icon: "local_taxi",
          text: "kebap",
        },
      ],
      personInfo: [
        {
          headers: "Profil",
          icon: "person",
          onClick: () => {
            this.$router.push({
              name: "UserProfile",
              params: { id: this.$store.state.users.id },
            });
          },
        },
        { headers: "Settings", icon: "settings" },
        {
          headers: "Çıkış Yap",
          icon: "exit_to_app",
          onClick: () => {
            this.$store.commit("logOut");
            this.$router.push({
              name: "LoginPage",
            });
          },
        },
      ],
    };
  },

  methods: {
    createOrderInfoWindow(marker) {
      const infoWindowText = `
      <div>
          <p><b>id: </b>${marker.id}</p>
          <p><b>isim: </b>${marker.userName}</p>
          <p><b>il: </b>${marker.yasadigiYer.il}</p>
          <p><b>adres: </b>${marker.yasadigiYer.adres}</p>
      </div>`;
      return new this.google.maps.InfoWindow({
        content: infoWindowText,
      });
    },
  },
  computed: {
    ...mapGetters(["users"]),
  },
};
</script>

<style scoped>
.card {
  width: 400px;
}
.img {
  height: 200px;
}
.v-navigation-drawer {
  padding-top: 40px;
}
</style>
