<template>
	<div class="header-bar flex">
<!--		logo-->
		<div  class="logo">
			<img :src="logo" alt="logo">
		</div>
		<div class="big-menu">
			<ul class="menu-list">
				<li :class="{'menu-item': true, active: item.active}" v-for="(item, index) in menuList" :key="index" @click="handleClickItem(index)">
					<Icon type="ios-people" />{{ item.name }}
				</li>
			</ul>
		</div>
		<SomeInfo />
		<div class="logout">
			<img :src="logout" alt="退出">
		</div>
		<!--	  <div class="logo-con" style="display: inline-block;">-->
		<!--		  <img v-show="true" :src="maxLogo" key="max-logo"/>-->
		<!--		  <img v-show="false" :src="minLogo" key="min-logo"/>-->
		<!--	  </div>-->
		<!--    <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>-->
		<!--    <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb>-->

<!--		没用的-->
<!--		<Menu mode="horizontal" theme="light" active-name="1" class="menu">-->
<!--			<MenuItem name="1">-->
<!--				<Icon type="ios-paper"/>-->
<!--				内容管理-->
<!--			</MenuItem>-->
<!--			<MenuItem name="2">-->
<!--				<Icon type="ios-people"/>-->
<!--				用户管理-->
<!--			</MenuItem>-->
<!--			<MenuItem name="3">新增和启动</MenuItem>-->
<!--			<MenuItem name="4">活跃分析</MenuItem>-->
<!--			<MenuItem name="5">时段分析</MenuItem>-->
<!--			<MenuItem name="6">新增和启动</MenuItem>-->
<!--			<MenuItem name="7">活跃分析</MenuItem>-->
<!--			<MenuItem name="8">时段分析</MenuItem>-->
<!--		</Menu>-->

<!--		<div class="custom-content-con">-->
<!--			<slot></slot>-->
<!--		</div>-->
	</div>
</template>
<script>
    // import siderTrigger from './sider-trigger'
    // import customBreadCrumb from './custom-bread-crumb'
    // import './header-bar.less'
    // import minLogo from '@/assets/images/logo-min.jpg'
    // import maxLogo from '@/assets/images/logo.jpg'
	import logo from '@/assets/images/logo.png'
    import logout from '@/assets/images/logout.png'

    export default {
        // name: 'HeaderBar',
        components: {
            // siderTrigger,
            // customBreadCrumb
			SomeInfo: () => import('./SomeInfo')
        },
        props: {
            collapsed: Boolean
        },
        data () {
            return {
                // minLogo,
                // maxLogo,
                logo,
                logout,
                menuList: [{ name: '系统管理', active: false }, { name: '系统字典', active: false }, { name: '租户管理', active: false }, { name: '子系统数据', active: false }]
            }
        },
        computed: {
            breadCrumbList () {
                return this.$store.state.app.breadCrumbList
            }
        },
        methods: {
            handleCollpasedChange (state) {
                this.$emit('on-coll-change', state)
            },
            handleClickItem (index) {
                this.menuList.forEach(item => {
                    item.active = false
				})
                this.menuList[index].active = true
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
	.line(@right, @background) {
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

	.item-active {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 5px;
		content: "";
		background-color: #52F8D2;
	}
	.big-menu {
		flex: 1;
		/*background-color: silver;*/
		.menu-list {
			padding-left: 30px;
			overflow: hidden;
			.menu-item {
				position: relative;
				float: left;
				list-style-type: none;
				margin-right: 30px;
				cursor: pointer;
				transition: all .2s ease-in-out;
				color: #E3EAFF;
				& > i {
					margin-right: 6px;
				}
				&:hover {
					color: #FFFFFF;
					&:after {
						.item-active;
					}
				}
				&.active {
					color: #FFFFFF;
					/*font-weight: bold;*/
					&:after {
						.item-active;
					}
				}
			}
		}
	}

	.line2(@left, @background) {
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
