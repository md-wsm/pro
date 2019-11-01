import axios from '@/libs/api.request'

// 获取城市adCode
export const getCityCode = (url, key) => {
	return axios.request({
		url,
		params: {
			key
		}
	})
}
// 获取天气信息
export const getWeather = (url, params) => {
	return axios.request({
		url,
		params
	})
}
