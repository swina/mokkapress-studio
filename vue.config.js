var webpack = require('webpack');
console.log ( 'Themes at ' + process.env.VUE_APP_NUXPRESSO_URL )
module.exports = {
  /*  
  devServer: {
    proxy:  
    { 
      '^/uploads' : {
        target: process.env.VUE_APP_NUXPRESSO_URL || 'http://localhost:3000/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {'^/uploads': '/uploads'}, 
        logLevel: 'debug'
      }
    }
    
  },
  */
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/background.js',
      rendererProcessFile: 'src/main.js',
    },
  },
  configureWebpack: {
     
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      }),
      
    ]
  },
  chainWebpack: config => {
    config.module
      .rule('graphql')
      .test(/\.gql$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
  }
}