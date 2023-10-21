const path = require('path')
const CracoLessPlugin = require('craco-less');
const { loaderByName } =  require('@craco/craco');

module.exports = {
  	// webpack 配置
	devServer: {
		proxy: {
			'/api': {
			target: 'https://admin-api.macrozheng.com',
			changeOrigin: true,
			pathRewrite: {
				"^/api": ""
			}
			}
		}
	},
	webpack: {
		// 配置别名
		alias: {
			// 约定：使用 @ 表示 src 文件所在路径
			'@': path.resolve(__dirname, 'src')
		}
	},
	plugins: [
		// 针对 less 的相关配置(如 module 样式)
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						javascriptEnabled: true,
						modifyVars: {}
					}
				},
				modifyLessRule(lessRule, context) {
					lessRule.exclude = /\.module\.less$/;
					return lessRule;
				},
				modifyLessModuleRule(lessModuleRule, context) {
					lessModuleRule.test = /\.module\.less$/;
					const cssLoader = lessModuleRule.use.find(loaderByName('css-loader'));
					cssLoader.options.modules = {
					  localIdentName: '[local]_[hash:base64:5]'
					};
					return lessModuleRule;
				}
			}
		}
	]
}