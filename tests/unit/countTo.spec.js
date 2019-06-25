import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import Counter from '@/view/join-page.vue';

describe('Counter', () => {
	// 挂载组件得到包裹器(包裹器会暴露很多封装、遍历和查询其内部的 Vue 组件实例的便捷的方法。)
	const wrapper = mount(Counter);
	// 测试组件渲染出来的HTML。
	it('renders the correct markup', () => {
		expect(wrapper.html()).to.contain('<span class="count">0</span>');
	});

	// 检查已存在的元素
	it('has a button', () => {
		expect(wrapper.contains('button')).toBe(true);
	});
});
