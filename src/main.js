import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./library";
import "./index.css";
import Toaster from "@meforma/vue-toaster";

let app = createApp(App);
app.use(router);
app.use(Toaster);

app.mount("#app");
