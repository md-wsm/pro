<template>
	<div class="header-bar flex">
		<div  class="logo">
			<img :src="logo" alt="logo">
		</div>
		<div class="big-menu">
			<ul class="menu-list">
				<li :class="{'menu-item': true, active: item.id === headerMenuId}" v-for="item in headerMenuList" :key="item.id" @click="handleClickItem(item)">
					<Icon :type="item.icon" />{{ item.title }}
				</li>
			</ul>
		</div>
		<SomeInfo />
		<div class="logout">
			<img :src="logout" alt="退出">
		</div>
<!--		<div class="custom-content-con">-->
<!--			<slot></slot>-->
<!--		</div>-->
	</div>
</template>
<script>
	import logo from '@/assets/images/logo.png'
    import logout from '@/assets/images/logout.png'
	import { mapGetters, mapState } from 'vuex'

    export default {
        name: 'HeaderBar',
        components: {
			SomeInfo: () => import('./SomeInfo')
        },
        data () {
            return {
                logo,
                logout
                // menuList: [{ name: '系统管理', active: false }, { name: '系统字典', active: false }, { name: '租户管理', active: false }, { name: '子系统数据', active: false }]
            }
        },
        computed: {
            ...mapGetters(['headerMenuList']),
			...mapState({
                headerMenuId: state => state.app.headerMenuId
			})
        },
        methods: {
            handleClickItem (item) {
                // this.menuList.forEach(item => {
                //     item.active = false
				// })
                // this.menuList[index].active = true

				this.$store.commit('setHeaderMenuId', item.id)
			}
        }
    }
</script>

<style scoped lang="less">
	.header-bar {
		width: 100%;
		height: 100%;
		padding-left: 20px;
	}
	.line (@right, @background) {
		content: "";
		display: block;
		width: 1px;
		position: absolute;
		top: 0;
		bottom: 0;
		right: @right;
		background: @background;
	}
	.logo {
		display: flex;
		align-items: center;
		position: relative;
		width: 220px;
		height: 100%;
		&:before {
			.line(0, #255CBE);
		}
		&:after {
			.line(-1px, #4488FF);
		}
	}
	.item-default () {
		position: absolute;
		bottom: 0;
		width: 0;
		height: 5px;
		content: "";
		transition: all .25s ease-in-out;
	}
	.item-active () {
		width: 50%;
		background-color: #52F8D2;
	}
	.big-menu {
		flex: 1;
		.menu-list {
			padding-left: 30px;
			overflow: hidden;
			.menu-item {
				position: relative;
				float: left;
				list-style-type: none;
				margin-right: 30px;
				cursor: pointer;
				transition: all .25s ease-in-out;
				color: #E3EAFF;
				& > i {
					margin-right: 6px;
				}
				&:before {
					.item-default();
					right: 50%;
				}
				&:after {
					.item-default();
					left: 50%;
				}
				&:hover, &.active {
					color: #FFFFFF;
					&:after, &:before {
						.item-active();
					}
				}
			}
		}
	}
	.line2 (@left, @background) {
		content: "";
		display: block;
		width: 1px;
		position: absolute;
		top: 0;
		bottom: 0;
		left: @left;
		background: @background;
	}
	.logout {
		position: relative;
		padding: 0 20px;
		img {
			vertical-align: middle;
			cursor: pointer;
		}
		&:before {
			.line2(-1px, #255CBE);
		}
		&:after {
			.line2(0, #4488FF);
		}
	}
</style>
