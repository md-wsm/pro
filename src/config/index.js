export default {
    /**
   * @description 配置显示在浏览器标签的title
   */
    title: '标题',
    /**
   * @description token在Cookie中存储的天数，默认1天
   */
    /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
    useI18n: false, // 默认这里是true, 直接更改router.js中的title没有效果。只有把这里改为false才行。
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
    }
}
