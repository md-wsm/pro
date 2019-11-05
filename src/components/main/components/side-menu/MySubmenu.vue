<template>
	<Submenu :name="parentItem.id">
		<template slot="title">
			<Icon :type="parentItem.icon"></Icon>{{ parentItem.title }}
		</template>
		<template v-for="item in parentItem.children">
			<MySubmenu
				v-if="item.children && item.children.length > 0" :key="item.id"
				:parent-item="item"
			/>
			<MenuItem v-else :name="item.id" :key="item.id">
				<Icon :type="item.icon"></Icon>{{ item.title }}
			</MenuItem>
		</template>
	</Submenu>
</template>

<script>
export default {
    name: 'MySubmenu',
    props: {
        parentItem: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style scoped>

</style>
