import {
    setTagNavListInLocalstorage,
    getMenuByRouter,
    getTagNavListFromLocalstorage,
    getHomeRoute,
    getNextRoute,
    routeHasExist,
    routeEqual,
    getRouteTitleHandled,

	createTreeByList
} from '@/libs/util'
import router from '@/router'
import routers from '@/router/routers'
import config from '@/config'
const { homeName } = config

const closePage = (state, route) => {
    const nextRoute = getNextRoute(state.tagNavList, route)
    state.tagNavList = state.tagNavList.filter(item => {
        return !routeEqual(item, route)
    })
    router.push(nextRoute)
}

export default {
    state: {
        tagNavList: [{ id: '', name: homeName, path: '/' + homeName, title: '首页', routeUrl: '/' + homeName }],
        homeRoute: {},

		list: [{ icon: '_qq', id: '1', name: 'wu_page', parentId: null, routeUrl: '/wu/wu_page', title: '测试单元测试' },
			{ icon: 'logo-buffer', id: '2', name: 'components', parentId: null, routeUrl: '/components', title: '组件' },
			{ icon: 'md-arrow-dropdown-circle', id: '3', name: 'tree_select_page', parentId: '2', routeUrl: '/components/tree_select_page', title: '树状下拉选择器' },
			{ icon: 'ios-infinite', id: '4', name: 'drag_list_page', parentId: '2', routeUrl: '/components/drag_list_page', title: '拖拽列表' },
			{ icon: 'md-menu', id: '5', name: 'multilevel', parentId: null, routeUrl: '/multilevel', title: '多级菜单' },
			{ icon: 'md-funnel', id: '6', name: 'level_2_1', parentId: '5', routeUrl: '/multilevel/level_2_1', title: '二级-1' },
			{ icon: 'md-funnel', id: '7', name: 'level_2_2', parentId: '5', routeUrl: '/multilevel/level_2_2', title: '二级-2' },
			{ icon: 'md-funnel', id: '8', name: 'level_2_2_1', parentId: '7', routeUrl: '/multilevel/level_2_2/level_2_2_1', title: '三级-1' },
			{ icon: 'md-funnel', id: '9', name: 'level_2_2_2', parentId: '7', routeUrl: '/multilevel/level_2_2/level_2_2_2', title: '三级-2' }]
    },
    getters: {
        // menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),
		list_: state => state.list, // 后端返回维度为1的list
		menuList: (state, getters) => createTreeByList(getters.list_)// 生成的菜单1
    },
    mutations: {
		setTagNavList (state, navList) {
			state.tagNavList = [{ id: '', name: homeName, path: '/' + homeName, title: '首页', routeUrl: '/' + homeName }].concat(navList)
		},
		addTag (state, route) {
			if (!state.tagNavList.find(item => item.routeUrl === route.routeUrl)) {
				state.tagNavList.push(route)
				setTagNavListInLocalstorage(state.tagNavList.filter(item => item.name !== homeName))
			}
		},
		closeTag (state, route) {

		},
		setTagNavList2 (state, index) {
			state.tagNavList.splice(index, 1)
		},

        setHomeRoute2 (state, routes) {
            state.homeRoute = getHomeRoute(routes, homeName)
        },
        setTagNavList22 (state, list) {
            let tagList = []
            if (list) {
                tagList = [...list]
            } else tagList = getTagNavListFromLocalstorage() || []
            if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
            let homeTagIndex = tagList.findIndex(item => item.name === homeName)
            if (homeTagIndex > 0) {
                let homeTag = tagList.splice(homeTagIndex, 1)[0]
                tagList.unshift(homeTag)
            }
            state.tagNavList = tagList
            setTagNavListInLocalstorage([...tagList])
        },
        closeTag2 (state, route) {
            let tag = state.tagNavList.filter(item => routeEqual(item, route))
            route = tag[0] ? tag[0] : null
            if (!route) return
            closePage(state, route)
        },
        addTag2 (state, { route, type = 'unshift' }) {
            let router = getRouteTitleHandled(route)
            if (!routeHasExist(state.tagNavList, router)) {
                if (type === 'push') state.tagNavList.push(router)
                else {
                    if (router.name === homeName) state.tagNavList.unshift(router)
                    else state.tagNavList.splice(1, 0, router)
                }
                setTagNavListInLocalstorage([...state.tagNavList])
            }
        }
    },
    actions: {
    }
}
