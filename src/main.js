import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store";
import VueTippy, { TippyComponent } from "vue-tippy";

const app = createApp(App);

app.use(store);
app.use(VueTippy);

app.component("tippy-tooltip", TippyComponent);

app.mount("#app");
