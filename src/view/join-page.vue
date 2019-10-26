<template>
	<div>
		<h1>的花费很多水果和</h1>
		<Table :columns="columns15" :data="data11" border show-summary :summary-method="handleSummary" max-height="1600" ></Table>
	</div>
</template>

<script>
	export default {
		name: 'wu_page',
		created () {
			console.log(123)
		},
		data () {
			return {
				columns15: [
					{
						title: 'ID',
						key: 'id'
					},
					{
						title: 'Name',
						key: 'name'
					},
					{
						title: 'Amount1',
						key: 'amount1',
resizable: true,
width: 100
					},
					{
						title: 'Amount2',
						key: 'amount2'
					},
					{
						title: 'Amount3',
						key: 'amount3'
					}
				],
data11: [
					{
						id: '100001',
						name: 'John Brown',
						amount1: '123',
						amount2: '1.2',
						amount3: 10
					}, {
						id: '100002',
						name: 'Jim Green',
						amount1: '234',
						amount2: '2.3',
						amount3: 11
					}, {
						id: '100003',
						name: 'Joe Black',
						amount1: '345',
						amount2: '3.4',
						amount3: 12
					}, {
						id: '100004',
						name: 'Jon Snow',
						amount1: '456',
						amount2: '4.5',
						amount3: 13
					}, {
						id: '100005',
						name: 'Jobs',
						amount1: '678',
						amount2: '5.6',
						amount3: 14
					}, {
						id: '100005',
						name: 'Jobs',
						amount1: '678',
						amount2: '5.6',
						amount3: 14
					}, {
						id: '100005',
						name: 'Jobs',
						amount1: '678',
						amount2: '5.6',
						amount3: 14
					}, {
						id: '100005',
						name: 'Jobs',
						amount1: '678',
						amount2: '5.6',
						amount3: 14
					}, {
						id: '100005',
						name: 'Jobs',
						amount1: '678',
						amount2: '5.6',
						amount3: 14
					}, {
						id: '100005',
						name: 'Jobs',
						amount1: '678',
						amount2: '5.6',
						amount3: 14
					}, {
						id: '100005',
						name: 'Jobs',
						amount1: '678',
						amount2: '5.6',
						amount3: 14
					}, {
						id: '100005',
						name: 'Jobs',
						amount1: '678',
						amount2: '5.6',
						amount3: 14
					}, {
						id: '100005',
						name: 'Jobs',
						amount1: '678',
						amount2: '5.6',
						amount3: 14
					}, {
						id: '100005',
						name: 'Jobs',
						amount1: '678',
						amount2: '5.6',
						amount3: 14
					}, {
						id: '100005',
						name: 'Jobs',
						amount1: '678',
						amount2: '5.6',
						amount3: 14
					}, {
						id: '100005',
						name: 'Jobs',
						amount1: '678',
						amount2: '5.6',
						amount3: 14
					}, {
						id: '100005',
						name: 'Jobs',
						amount1: '678',
						amount2: '5.6',
						amount3: 14
					}
				]
			}
		},
		methods: {
			handleSummary ({ columns, data }) {
				const sums = {}
				columns.forEach((column, index) => {
					const key = column.key
					if (index === 0) {
						sums[key] = {
							key,
							value: '总价'
						}
						return
					}
					const values = data.map(item => Number(item[key]))
					if (!values.every(value => isNaN(value))) {
						const v = values.reduce((prev, curr) => {
							const value = Number(curr)
							if (!isNaN(value)) {
								return prev + curr
							} else {
								return prev
							}
						}, 0)
						sums[key] = {
							key,
							value: v + ' 元'
						}
					} else {
						sums[key] = {
							key,
							value: 'N/A'
						}
					}
				})

				return sums
			},
			handleSpan ({ row, column, rowIndex, columnIndex }) {
				if (rowIndex === 0 && columnIndex === 0) {
					return [1, 2]
				} else if (rowIndex === 0 && columnIndex === 1) {
					return [0, 0]
				}
				if (rowIndex === 2 && columnIndex === 0) {
					return {
						rowspan: 2,
						colspan: 1
					}
				} else if (rowIndex === 3 && columnIndex === 0) {
					return {
						rowspan: 0,
						colspan: 0
					}
				}
			}
		}
	}
</script>

<style scoped>

</style>
