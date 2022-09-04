const CompressionPlugin = require('compression-webpack-plugin');
// const path = require("path");

module.exports = {



	configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [new CompressionPlugin({
          filename: '[path].gz[query]',
          test: new RegExp(
            '\\.(js|css)$'    //压缩 js 与 css
          ),
          threshold: 10240,
          minRatio: 0.8
        })]
      }
    }
  },
	devServer: {
			// host: "localhost", //要设置当前访问的ip 否则失效
			port: 8080,//当前web服务端口
			// open: false, //浏览器自动打开页面
			proxy: {
					'/api': {
							target: 'http://49.234.71.174:10861/api/',//目标地址
							ws: true,//是否代理websocket
							changeOrigin: true,//是否跨域
							pathRewrite: {
									'^/api': ''//url重写
							}
					}
			}
	}
}
