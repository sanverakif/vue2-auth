<template>
  <div>
    <div>
      <v-card class="cardList">
        <v-list>
          <v-list-item v-for="item in userInfo" :key="item.id">
            <v-list-item-content>
              <v-list-item-title>{{ "id:" + item.id }}</v-list-item-title>
              <v-list-item-title>{{
                "userName: " + item.userName
              }}</v-list-item-title>
              <v-list-item-title>{{
                "adres: " + item.yasadigiYer.adres
              }}</v-list-item-title>
              <v-list-item-title>{{
                "enlem: " + item.yasadigiYer.lat
              }}</v-list-item-title>
              <v-list-item-title>{{
                "boylam: " + item.yasadigiYer.lng
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </div>

    <div class="main-panel">
      <div class="content">
        <div class="md-layout md-size-100">
          <div
            class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-60"
          >
            <div class="mapDizayn">
              <div ref="mapRef" id="google-map" class="gMap"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
import { mapGetters } from "vuex";
export default {
  name: "UserProfile",
  data() {
    return {
      userInfo: [],
    };
  },
  computed: {
    google: () => window.google,
    ...mapGetters(["users"]),
  },
  mounted() {
    const loader = new Loader({
      apiKey: "AIzaSyCJreuxCbc1kEdU75jlKGc-uUSKqzNbBFQ",
      version: "weekly",
    });
    loader.load().then(() => {
      this.map = new this.google.maps.Map(
        document.getElementById("google-map"),
        {
          center: {
            lat: 38.73222,
            lng: 35.48528,
          },
          zoom: 6,
          fullscreenControl: false,
          fullscreenControlOptions: {
            position: this.google.maps.ControlPosition.RIGHT_TOP,
          },
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: this.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          },
          mapTypeId: this.google.maps.MapTypeId.ROADMAP, //HYBRID
        }
      );
      this.userInfo.forEach((v) => {
        const location_place = {
          lat: parseFloat(v.yasadigiYer.lat),
          lng: parseFloat(v.yasadigiYer.lng),
        };
        const marker = new this.google.maps.Marker({
          position: location_place,
          animation: this.google.maps.Animation.DROP,
          map: this.map,
        });
        marker.addListener("click", () => {
          const infoWindow = this.createOrderInfoWindow(v);
          infoWindow.close();
          infoWindow.open(marker.getMap(), marker);
        });
      });
    });
  },
  created() {
    this.userInfo.push(this.users);
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
};
</script>

<style>
.mapDizayn {
  top: 25px;
  position: absolute;
  width: 70%;
  height: 70%;
}
.gMap {
  width: 65%;
  height: 90%;
}
.cardList {
  height: 50vh;
  width: 30vh;
  /* height: 50vh; */
  margin: 20px 20px;
  opacity: 0.85;
  float: left;
}
</style>
