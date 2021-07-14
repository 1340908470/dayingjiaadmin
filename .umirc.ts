import { defineConfig } from "umi";

export default defineConfig({
  nodeModulesTransform: {
    type: "none",
  },
  routes: [{ exact: true, path: "/", component: "@/index" }],
  proxy: {
    "/api": {
      target: "https://api.wdbox.com.cn/api",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
      secure: false,
    },
  },
  theme: {
    "primary-color": "#FF3E3E",
  },
  fastRefresh: {},
});