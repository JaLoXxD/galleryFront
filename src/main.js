import { createApp } from "vue";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import AOS from "aos";
import "aos/dist/aos.css";
app.AOS = new AOS.init();
import VAnimateCss from "v-animate-css";
library.add(fas);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(store).use(router).use(VueSweetalert2).use(VAnimateCss).mount("#app");
