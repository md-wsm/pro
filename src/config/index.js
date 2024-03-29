export default {
    /**
   * @description 配置显示在浏览器标签的title
   */
    title: '标题',
    /**
   * @description token在Cookie中存储的天数，默认1天
   */

    /**
   * @description api请求基础路径
   */
    baseUrl: {
        dev: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
        pro: 'https://produce.com'
    },
    /**
   * @description 默认打开的首页的路由name值，默认为home
   */
    homeName: 'home',
    /**
   * @description 需要加载的插件
   */
    plugin: {
    },

	/**
	 * @description 标签tab列表默认有首页
	 */
	initTagNavList: (homeName) => {
		return [{ id: '', name: homeName, path: '/' + homeName, title: '首页', routeUrl: '/' + homeName }]
	}
}
