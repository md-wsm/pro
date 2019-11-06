<template>
	<Layout style="height: 100%" class="main">
		<Header class="header-con">
			<HeaderBar />
		</Header>
		<Layout style="height: calc(100% - 64px);">
			<Sider hide-trigger collapsible :width="240" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
				<side-menu accordion ref="sideMenu" :active-name="activeName" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList" :open-names="openNames"></side-menu>
			</Sider>
			<Content class="main-content-con">
				<Layout class="main-layout-con">
					<div class="tag-nav-wrapper">
						<tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag" @on-close-all-other="handleCloseTagAllOrOther"/>
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
			...mapGetters(['menuList', 'list_'])
		},
		methods: {
			...mapMutations([
				'setTagNavList',
				'addTag',
				'delOneTagNavList'
			]),
            turnToPage (name) {
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
			},
            handleCloseTag (item, index) {
				this.delOneTagNavList(index)
                if (this.currentMenuId === item.id) {
                    if (this.tagNavList[index]) {
                        this.handleClick(this.tagNavList[index])
                    } else if (this.tagNavList[index - 1]) {
                        this.handleClick(this.tagNavList[index - 1])
                    } else {
                        this.closeMenuOpenNames()
                    }
                }
			},
            handleCloseTagAllOrOther (type, res) {
                if (type === 'all') {
					if (this.$route.name !== this.homeName) {
                        this.closeMenuOpenNames()
					}
                }
                this.setTagNavList(res)
                setTagNavListInLocalstorage(res)
			},
			handleClick (_item) {
			    if (this.currentMenuId === _item.id) {
			        return
				}
                this.currentMenuId = _item.id
				if (_item.name === this.homeName) {
                    this.closeMenuOpenNames()
				} else {
                    let parentIds = getParentsByCurrentId(this.list_, _item.id)
                    this.openNames = parentIds.slice(0, parentIds.length - 1)
                    this.$router.push({
                        path: _item.routeUrl
                    })
				}
                this.activeName = this.currentMenuId
			},
            closeMenuOpenNames () {
                this.currentMenuId = ''
                this.activeName = ''
                this.openNames = []
                this.$router.push('/home')
            },
			initViewRender (route) {
                const { name, path } = route
                if (name === this.homeName) {
                    this.currentMenuId = ''
                    this.activeName = ''
                    this.openNames = []
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
			}
		},
		watch: {
            '$route' (newRoute) {
               this.initViewRender(newRoute)
            },
            openNames () {
                this.$nextTick(() => {
                    this.$refs.sideMenu.$refs.menu.updateOpened()
                    this.$refs.sideMenu.$refs.menu.updateActiveName()
                })
			},
            menuList (n) {
                this.$nextTick(() => {
                    this.$refs.sideMenu.$refs.menu.updateOpened()
                    this.$refs.sideMenu.$refs.menu.updateActiveName()
                })
			}
		},
		mounted () {
			/**
			 * @description 初始化设置面包屑导航和标签导航
			 */
			this.setTagNavList(getTagNavListFromLocalstorage())

            this.initViewRender(this.$route)

			// 如果当前打开页面不在标签栏中，跳到homeName页
			// if (!this.tagNavList.find(item => item.name === this.$route.name)) {
			// 	this.$router.push({
			// 		name: this.homeName
			// 	})
			// }
		}
    }
</script>
