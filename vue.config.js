module.exports = {
	publicPath: "./",
	configureWebpack: {
		resolve: {
			//配置别名
			alias: {
				'assets': '@/assets',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views'
			}
		}
	}
}
