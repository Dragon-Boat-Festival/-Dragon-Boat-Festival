<template>
	<div class="nav_map" >
		<baidu-map
			:ak="this.ak"
			:center="startCenter"
			:dragging="true"
			:scroll-wheel-zoom="true"
			:zoom="zoom"
			class="bm-view"
			@ready="handler"
		>
			<!-- 右上角缩放条 -->
			<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
			<!-- 城市列表 -->
			<bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
			<!-- 绘制导航路线  -->
			<bm-driving
				:auto-viewport="true"
				:end="getEndCenter"
				:start="startCenter"
				class="bm_driving"
				endCity="广州"
				policy="BMAP_DRIVING_POLICY_LEAST_DISTANCE"
				startCity="广州"
			></bm-driving>
		</baidu-map>
	</div>
</template>
<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue"
import BmMarker from "vue-baidu-map/components/overlays/Marker.vue"
import BmInfoWindow from "vue-baidu-map/components/overlays/InfoWindow.vue"
import BmNavigation from "vue-baidu-map/components/controls/Navigation.vue"
import BmCityList from "vue-baidu-map/components/controls/CityList.vue"
import BmDriving from "vue-baidu-map/components/search/Driving.vue"

export default {
	name: "NavigationMap",
	components: {
		BaiduMap,
		BmMarker,
		BmInfoWindow,
		BmNavigation,
		BmCityList,
		BmDriving
	},

	
	computed: {
		getEndCenter() {
			// console.log(this.$store.state.lat)
			return {
				lat:this.$store.state.lat,
				lng:this.$store.state.lng,
			}
		}
	},

	data() {
		return {
			startCenter: {lng: 113.23494953958503, lat: 23.470296173825677},
			zoom: 50,
			ak: "DFntGLYClcm78nyFKu9KoKRhZ864MtWC",
		}
	},
	mounted() {
		this.positionInfo()
		
	},

	methods: {
		// 渲染视图
		handler({BMap, map}) {
			// 113.239282,23.477302
			this.startCenter.lng = 113.239282
			this.startCenter.lat = 23.477302
			this.zoom = 50
		},
		// 获取位置信息
		positionInfo() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					async (pos) => {
						let lat = pos.coords.latitude, // 纬度
							lng = pos.coords.longitude // 经度
						// console.log(lat,lng)

						/*  this.startCenter = {
						  lng: 113.23497099727373,
						  lat:  23.470197761759202,
						}; */
					},
					(error) => {
						message.error("定位有误，推荐使用Edge浏览器进行使用")
					}
				)
			} else {
				// 当前浏览器不支持定位服务
				message.error("当前浏览器不支持定位服务")
			}
		}
	},
}
</script>
<style scoped>
.nav_map {
	width: 100%;
	height: 100vh;
}

.bm-view {
	width: 100%;
	height: 70%;
}
</style>