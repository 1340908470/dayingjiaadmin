const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app: any) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://api.canonjy.wdbox.com.cn/api",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
      secure: false,
    })
  );
};
