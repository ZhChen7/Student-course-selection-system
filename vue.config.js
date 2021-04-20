module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://10.60.197.87:3000/", //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
