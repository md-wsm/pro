<template>
	<Layout style="height: 100%" class="main">
		<Header class="header-con">
			<HeaderBar />
		</Header>
		<Layout style="height: calc(100% - 64px);">
			<Sider hide-trigger collapsible :width="240" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
				<side-menu accordion ref="sideMenu" :active-name="activeName" :collapsed="collapsed" @on-select="turnToPage2" :menu-list="menuList"  :open-names="openNames"></side-menu>
			</Sider>
			<Content class="main-content-con">
				<Layout class="main-layout-con">
					<div class="tag-nav-wrapper">
						<tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
					</div>
					<Content class="content-wrapper">
						<keep-alive :include="tagNavList.map(item => item.name)">
							<router-view/>
						</keep-alive>
						<ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
					</Content>
				</Layout>
			</Content>
		</Layout>
	</Layout>
</template>
<script>
    import SideMenu from './components/side-menu'
    import HeaderBar from './components/header-bar'
    import TagsNav from './components/tags-nav'
    import ABackTop from './components/a-back-top'
    import { mapMutations, mapGetters } from 'vuex'
    import { getNewTagList, routeEqual, createTreeByList, getParentsByCurrentId, setTagNavListInLocalstorage, getTagNavListFromLocalstorage } from '@/libs/util'
    import routers from '@/router/routers'
    import './main.less'
	// import menuList from '@/1.json'

    export default {
		name: 'Main',
		components: {
			SideMenu,
			HeaderBar,
			TagsNav,
			ABackTop
		},
		data () {
			return {
				collapsed: false,
				// menuList: createTreeByList(this.menuList),
                currentMenuId: '',
                activeName: '',
                openNames: []
			}
		},
		computed: {
            homeName () {
              	return this.$config.homeName
			},
			tagNavList () {
				return this.$store.state.app.tagNavList
			},
			cacheList () {
                return [...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
			},
			// menuList () {
			// 	return createTreeByList(this.$store.state.app.list_)
			// },
			...mapGetters(['menuList', 'list_'])
		},
		methods: {
			...mapMutations([
				'setTagNavList',
				'addTag',
				'setHomeRoute',
				'closeTag'
			]),
			turnToPage (route) {
				let { name, params, query } = {}
				if (typeof route === 'string') {
					name = route
				} else {
					name = route.name
					params = route.params
					query = route.query
				}
				if (name.indexOf('isTurnByHref_') > -1) {
					window.open(name.split('_')[1])
					return
				}
				this.$router.push({
					name,
					params,
					query
				})
			},
            turnToPage2 (name) {
                if (this.currentMenuId === name) {
                    return
                }
                this.currentMenuId = name
				let parentIds = getParentsByCurrentId(this.list_, name)
                this.openNames = parentIds.slice(0, parentIds.length - 1)
                this.activeName = name

                this.$router.push({
                    path: this.list_.find(item => item.id === name).routeUrl
                })

                this.$nextTick(() => {
                    this.$refs.sideMenu.$refs.menu.updateOpened()
                    this.$refs.sideMenu.$refs.menu.updateActiveName()
                })
			},
			handleCloseTag (res, type, route) {
				if (type !== 'others') {
					if (type === 'all') {
						this.turnToPage(this.homeName)
					} else {
						if (routeEqual(this.$route, route)) {
							this.closeTag(route)
						}
					}
				}
				this.setTagNavList(res)
			},
			handleClick (item) {
				// this.turnToPage(item)
			},
            closeMenuOpenNames () {
                this.activeName = ''
                this.openNames = []
                this.$nextTick(() => {
                    this.$refs.sideMenu.$refs.menu.updateOpened()
                    this.$refs.sideMenu.$refs.menu.updateActiveName()
                })
            },
			initViewRender (route) {
                const { name, path } = route
                if (name === this.homeName) {
                    this.currentMenuId = ''
                    this.closeMenuOpenNames()
                    return
                }

                let o = this.list_.find(item => item.routeUrl === path)
                if (o) {
                    let { id, parentId, name, routeUrl, title } = o
                    this.addTag({ id, parentId, name, routeUrl, title })

                    this.currentMenuId = id
                    let parentIds = getParentsByCurrentId(this.list_, id)
                    this.openNames = parentIds.slice(0, parentIds.length - 1)
                    this.activeName = id
                }

                this.$nextTick(() => {
                    this.$refs.sideMenu.$refs.menu.updateOpened()
                    this.$refs.sideMenu.$refs.menu.updateActiveName()
                })
			}
		},
		watch: {
            '$route' (newRoute) {
               this.initViewRender(newRoute)

                // this.addTag({
                //     route: { name, query, params, meta },
                //     type: 'push'
                // })
                // this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
                // this.$refs.sideMenu.updateOpenName(newRoute.name)
            }
			// '$route' (newRoute) {
			// 	const { name, query, params, meta } = newRoute
			// 	this.addTag({
			// 		route: { name, query, params, meta },
			// 		type: 'push'
			// 	})
			// 	this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
			// 	// this.$refs.sideMenu.updateOpenName(newRoute.name)
			// }
            // activeName () {
            //     this.$nextTick(() => {
            //         //this.$refs.sideMenu.$refs.menu.updateOpened()
            //        // this.$refs.sideMenu.$refs.menu.updateActiveName()
            //     })
			// }
		},
		created () {
			/**
			 * @description 初始化设置面包屑导航和标签导航
			 */
			this.setTagNavList(getTagNavListFromLocalstorage())
			// this.setHomeRoute(routers)
			// const { name, params, query, meta, path } = this.$route
            // this.addTag( this.$route)
			// console.log(this.tagNavList)

			// this.$nextTick(() => this.initViewRender(this.$route))

            const { name, path } = this.$route
            if (name === this.homeName) {
                this.currentMenuId = ''
                this.closeMenuOpenNames()
                return
            }

            let o = this.list_.find(item => item.routeUrl === path)
            if (o) {
                let { id, parentId, name, routeUrl, title } = o
                this.addTag({ id, parentId, name, routeUrl, title })

                this.currentMenuId = id
                let parentIds = getParentsByCurrentId(this.list_, id)
                this.openNames = parentIds.slice(0, parentIds.length - 1)
                this.activeName = id
				setTimeout(() => {
                    this.$refs.sideMenu.$refs.menu.updateActiveName()
                    this.$refs.sideMenu.$refs.menu.updateOpened()
				}, 150)
            }

            // console.log(this.tagNavList);this.$nextTick(()=>setTagNavListInLocalstorage(this.tagNavList))
			// this.addTag({
			// 	route: { name, params, query, meta }
			// })
			// 如果当前打开页面不在标签栏中，跳到homeName页
			// if (!this.tagNavList.find(item => item.name === this.$route.name)) {
			// 	this.$router.push({
			// 		name: this.homeName
			// 	})
			// }
		},
		created1 () {
            // const { name, path } = this.$route
            // if (name === this.homeName) {
            //     this.currentMenuId = ''
            //     this.closeMenuOpenNames()
            //     return
            // }
			//
            // let o = this.list_.find(item => item.routeUrl === path)
            // if (o) {
            //     let { id, parentId, name, routeUrl, title } = o
            //     this.addTag({ id, parentId, name, routeUrl, title })
			//
            //     this.currentMenuId = id
            //     let parentIds = getParentsByCurrentId(this.list_, id)
            //     this.openNames = parentIds.slice(0, parentIds.length - 1)
            //     this.activeName = id
            // }
			//
            // this.$nextTick(() => {
            //     this.$refs.sideMenu.$refs.menu.updateOpened()
            //     this.$refs.sideMenu.$refs.menu.updateActiveName()
            // })
        }
    }
</script>
