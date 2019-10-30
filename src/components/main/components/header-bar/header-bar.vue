<template>
	<div class="header-bar">
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

		<div class="custom-content-con">
			<slot></slot>
		</div>
	</div>
</template>
<script>
    import siderTrigger from './sider-trigger'
    import customBreadCrumb from './custom-bread-crumb'
    import './header-bar.less'
    import minLogo from '@/assets/images/logo-min.jpg'
    import maxLogo from '@/assets/images/logo.jpg'

    export default {
        name: 'HeaderBar',
        components: {
            siderTrigger,
            customBreadCrumb
        },
        props: {
            collapsed: Boolean
        },
        data () {
            return {
                minLogo,
                maxLogo
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
            }
        }
    }
</script>

<style scoped lang="less">
	.menu {
		display: inline-block;
	}
	.menu.ivu-menu-horizontal {
		.ivu-menu-item {
			color: red;
		}
	}
</style>
