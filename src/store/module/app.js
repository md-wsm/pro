import {
    setTagNavListInLocalstorage,
	createTreeByList
} from '@/libs/util'
import config from '@/config'
const { homeName, initTagNavList } = config

export default {
    state: {
        tagNavList: [],
		headerMenuId: '',

		list: [
			{ icon: 'md-analytics', id: '1', name: 'sys', parentId: null, routeUrl: '/sys', title: '系統管理' },
			{ icon: 'ios-albums', id: '11', name: 'tenant', parentId: '1', routeUrl: '/sys/tenant', title: '租户管理' },
			{ icon: 'md-alert', id: '12', name: 'role', parentId: '1', routeUrl: '/sys/role', title: '角色管理' },
			{ icon: 'ios-aperture', id: '121', name: 'roleConfig', parentId: '12', routeUrl: '/sys/role/config', title: '角色配置' },
			{ icon: 'ios-analytics', id: '122', name: 'roleEdit', parentId: '12', routeUrl: '/sys/role/edit', title: '角色修改' },

			{ icon: 'logo-buffer', id: '2', name: 'components', parentId: null, routeUrl: '/components', title: '系统字典' },
			{ icon: 'md-arrow-dropdown-circle', id: '21', name: 'tree_select_page', parentId: '2', routeUrl: '/components/tree_select_page', title: '土建结构' },
			{ icon: 'ios-infinite', id: '22', name: 'drag_list_page', parentId: '2', routeUrl: '/components/drag_list_page', title: '拖拽列表' },

			{ icon: 'md-menu', id: '3', name: 'multilevel', parentId: null, routeUrl: '/multilevel', title: '基础数据' },
			{ icon: 'md-funnel', id: '31', name: 'level_2_1', parentId: '3', routeUrl: '/multilevel/level_2_1', title: '二级-1' },
			{ icon: 'md-funnel', id: '32', name: 'level_2_2', parentId: '3', routeUrl: '/multilevel/level_2_2', title: '二级-2' },
			{ icon: 'md-funnel', id: '311', name: 'level_2_2_1', parentId: '31', routeUrl: '/multilevel/level_2_2/level_2_2_1', title: '三级-1' },
			{ icon: 'md-funnel', id: '312', name: 'level_2_2_2', parentId: '31', routeUrl: '/multilevel/level_2_2/level_2_2_2', title: '三级-2' },

			{ icon: 'ios-alarm', id: '4', name: 'subSys', parentId: null, routeUrl: '/subSys', title: '子系统数据' },
			{ icon: 'logo-apple', id: '41', name: 'unitPerson', parentId: '4', routeUrl: '/subSys/unitPerson', title: '单位人员' },
			{ icon: 'ios-at', id: '411', name: 'personConfig', parentId: '41', routeUrl: '/subSys/unitPerson/config', title: '人员配置' },
			{ icon: 'md-basketball', id: '412', name: 'personPreset', parentId: '41', routeUrl: '/subSys/unitPerson/preset', title: '人员预设' }
		]
    },
    getters: {
		list_: state => state.list, // 后端返维度为1的list
		headerMenuList: (state, getters) => createTreeByList(getters.list_),
		menuList: (state, getters) => {
			let item = getters.headerMenuList.find(item => item.id === state.headerMenuId)
			return item ? (item.children || []) : []
		}// 生成的左侧菜单
    },
    mutations: {
		setTagNavList (state, navList) {
			state.tagNavList = initTagNavList(homeName).concat(navList)
		},
		addTag (state, route) {
			if (!state.tagNavList.find(item => item.routeUrl === route.routeUrl)) {
				state.tagNavList.push(route)
				setTagNavListInLocalstorage(state.tagNavList.filter(item => item.name !== homeName))// 不把首页加到localStorage
			}
		},
		delOneTagNavList (state, index) {
			state.tagNavList.splice(index, 1)
			setTagNavListInLocalstorage(state.tagNavList.filter(item => item.name !== homeName))
		},
		setHeaderMenuId (state, headerMenuId) {
			state.headerMenuId = headerMenuId
		}
    }
}
