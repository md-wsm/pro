module.exports = {
	root: true,
	'extends': [
		'plugin:vue/essential',
		'@vue/standard'
	],
	rules: {
		/**
		  * off 或 0：表示不验证规则。
		  * warn 或 1：表示验证规则，当不满足时，给警告
		  * error 或 2 ：表示验证规则，不满足时报错
		  */
		// allow async-await
		'generator-star-spacing': 'off',
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'vue/no-parsing-error': [2, {
			'x-invalid-end-tag': false
		}],
		'camelcase': 'off',
		'no-var': 2,
		'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': [0, 4],
		'semi': ['error', 'always'],
		'no-extra-semi': 0,
		'no-mixed-spaces-and-tabs': 0,
		'no-tabs': 0
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
}
