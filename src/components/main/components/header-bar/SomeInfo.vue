<template>
<div class="flex" style="margin-right: 18px;">
	<div class="weather">
		<span>{{ day.date }}</span>
		<span>{{ day.week }}</span>
		<img v-if="weatherIcon" :src="weatherIcon" alt="天气">
		<span>{{ weatherData.weather }}</span>
		<span>{{ weatherData.temperature }} ℃</span>
		<span style="margin-right: 30px;">{{ weatherData.city }}</span>
	</div>
	<div class="user">
		<User :message-unread-count="$store.state.user.unreadCount" :user-avatar="require('@/assets/images/user-avatar-default.png')"/>
	</div>
</div>
</template>

<script>
import User from '../../components/user'
import { getCityCode, getWeather } from '@/api/city-weather'
const basic = {
    adCodeUrl: 'https://restapi.amap.com/v3/ip',
    key: '0eba3966ff511babf517314688bd2512',
    weatherUrl: 'https://restapi.amap.com/v3/weather/weatherInfo'
}

export default {
    components: {
        User
	},
	data () {
	    return {
            weatherIcon: null,
            weatherData: {}
		}
	},
	created () {
	    this.getCityCodeAndWeatherApi()
	},
	computed: {
	  	 day () {
             const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
             const date = new Date()
             const week = date.getDay()
	  	     return {
	  	         date: `${date.getFullYear()}.${(date.getMonth() + 1)}.${date.getDate()}`,
				 week: weeks[week]
             }
		 }
	},
	methods: {
        getCityCodeAndWeatherApi () {
            let { adCodeUrl, key, weatherUrl } = basic
            return getCityCode(adCodeUrl, key).then(({ data }) => {
                let { status, adcode } = data
				if (status === '1') {
                    return getWeather(weatherUrl, {
                        city: adcode, key
                    }).then(({ data }) => {
                        let { status, lives } = data
						if (status === '1') {
                            this.getWeatherIcon(lives[0].weather)
							this.weatherData = lives[0]
						} else {
                            this.$Message.error('获取天气失败')
						}
					})
				} else {
                    this.$Message.error('获取城市失败')
				}
			})
		},
        getWeatherIcon (type) {
            switch (type) {
                case '晴':
                    this.weatherIcon = require('@/assets/images/weather/sun.png')
                    break
                case '多云':
                    this.weatherIcon = require('@/assets/images/weather/cloudy_sky.png')
                    break
                case '阴':
                    this.weatherIcon = require('@/assets/images/weather/cloudy.png')
                    break
                case '雨夹雪':
                case '雷阵雨并伴有冰雹':
                case '冻雨':
                    this.weatherIcon = require('@/assets/images/weather/rain_snow.png')
                    break
                case '阵雨':
                case '小雨':
                case '中雨':
                case '大雨':
                case '小雨-中雨':
                case '中雨-大雨':
                    this.weatherIcon = require('@/assets/images/weather/small_rain.png')
                    break
                case '雷阵雨':
                case '暴雨':
                case '大暴雨':
                case '大雨-暴雨':
                case '暴雨-大暴雨':
                case '大暴雨-特大暴雨':
                case '特大暴雨':
                    this.weatherIcon = require('@/assets/images/weather/thunderstorm.png')
                    break
                case '小雪':
                case '阵雪':
                case '中雪':
                case '大雪':
                case '暴雪':
                case '小雪-中雪':
                case '中雪-大雪':
                case '大雪-暴雪':
                case '弱高吹雪':
                    this.weatherIcon = require('@/assets/images/weather/snow.png')
                    break
                case '雾':
                case '浮尘':
                case '扬沙':
                case '轻霾':
                case '霾':
                    this.weatherIcon = require('@/assets/images/weather/wu.png')
                    break
                case '龙卷风':
                    this.weatherIcon = require('@/assets/images/weather/waterspout.png')
                    break
                case '飑':
                case '沙尘暴':
                case '强沙尘暴':
                    this.weatherIcon = require('@/assets/images/weather/wind.png')
                    break
                default:
                    this.weatherIcon = null
            }
        }
	}
}
</script>

<style scoped lang="less">
	.weather {
		display: flex;
		align-items: center;
		color: #FFFFFF;
		span {
			margin-right: 20px;
		}
		img {
			width: 20px;
			margin-right: 5px;
		}
	}
</style>
