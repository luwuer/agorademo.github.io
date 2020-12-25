import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Logger, LogLevel } from "./assets/common/Logger";
import {
  ElForm,
  ElFormItem,
  ElButton,
  ElInput,
  ElTooltip,
  ElPopper,
  ElMessage
} from "element-plus";

// init app
const app = createApp(App)
  .use(store)
  .use(router);
app.mount("#app");

// init global components
app.component(ElForm.name, ElForm);
app.component(ElFormItem.name, ElFormItem);
app.component(ElButton.name, ElButton);
app.component(ElInput.name, ElInput);
app.component(ElTooltip.name, ElTooltip);
app.component(ElPopper.name, ElPopper);
app.config.globalProperties.$message = ElMessage;

// init logger
app.config.globalProperties.$logger = new Logger(config.logLevel as LogLevel);
