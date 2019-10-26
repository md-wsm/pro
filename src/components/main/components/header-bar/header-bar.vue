<template>
  <div class="header-bar">
<!--	  <div class="logo-con" style="display: inline-block;">-->
<!--		  <img v-show="true" :src="maxLogo" key="max-logo"/>-->
<!--		  <img v-show="false" :src="minLogo" key="min-logo"/>-->
<!--	  </div>-->
<!--    <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>-->
<!--    <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb>-->
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
