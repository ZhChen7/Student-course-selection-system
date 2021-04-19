module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://10.61.116.222:3000/", //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
