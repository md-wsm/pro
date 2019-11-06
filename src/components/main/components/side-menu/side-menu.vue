<template>
	<div class="side-menu-wrapper">
<!--		<slot></slot>-->
		<Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openNames" :accordion="accordion"
			  :theme="theme" width="auto" @on-select="handleSelect">
			<template v-for="item in menuList">
				<MySubmenu
					v-if="item.children && item.children.length > 0" :key="item.id"
					:parent-item="item"
				/>
				<MenuItem v-else :name="item.id" :key="item.id">
					<Icon :type="item.icon"></Icon>{{ item.title }}
				</MenuItem>
			</template>
		</Menu>
	</div>
</template>
<script>
    import SideMenuItem from './side-menu-item.vue'
    import CollapsedMenu from './collapsed-menu.vue'
	import MySubmenu from './MySubmenu'
    import { getUnion } from '@/libs/tools'
    import mixin from './mixin'

    export default {
        name: 'SideMenu',
        // mixins: [mixin],
        components: {
            SideMenuItem,
            CollapsedMenu,
            MySubmenu
        },
        props: {
            menuList: {
                type: Array,
                default () {
                    return []
                }
            },
            collapsed: {
                type: Boolean
            },
            theme: {
                type: String,
                // default: 'dark'
                default: 'light'
            },
            rootIconSize: {
                type: Number,
                default: 20
            },
            iconSize: {
                type: Number,
                default: 16
            },
            accordion: Boolean,
            activeName: {
                type: String,
                default: ''
            },
            openNames: {
                type: Array,
                default: () => []
            }
        },
        data () {
            return {
                openedNames: []
            }
        },
        methods: {
            handleSelect (name) {
                this.$emit('on-select', name)
            },
            getOpenedNamesByActiveName (name) {
                return this.$route.matched.map(item => item.name).filter(item => item !== name)
            },
            updateOpenName (name) {
                if (name === this.$config.homeName) {
                    this.openedNames = []
                } else {
                    this.openedNames = this.getOpenedNamesByActiveName(name)
                }
            }
        },
        computed: {
            textColor () {
                return this.theme === 'dark' ? '#fff' : '#495060'
            }
        },
        watch: {
            // openNames (n) {
            //             this.$nextTick(() => {console.log(n)
            //                 this.$refs.menu.updateOpened()
            //             })
			// },
            // activeName (n) {
            //     this.$nextTick(() => {console.log(n);
            //         this.$refs.menu.updateActiveName()
            //     })
			// }

            // activeName (name) {
            //     if (this.accordion) {
            //         this.openedNames = this.getOpenedNamesByActiveName(name)
            //     } else {
            //         this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
            //     }
            // },

        },
        mounted () {
            // console.log(this.menuList)
            // this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
        }
    }
</script>
<style lang="less">
	@import './side-menu.less';
</style>
