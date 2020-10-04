module.exports  = {
  publicPath: process.env.NODE_ENV === "production" ? "/nifo/" : "/",
  //runtimeCompiler: true
  configureWebpack: {
    module: {
      rules: [ {
        test: /\.md$/,
       loader: 'raw-loader', // npm install -D raw-loader
      }]
    }
  }
}
