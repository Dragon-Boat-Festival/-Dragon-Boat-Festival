<template>
	<el-card id="map" class="box-card">
		<div class="map-container">
			<div class="text-info">
				<h2 class="name">{{ map.name }}</h2>
				<span class="desc">{{ map.desc }}</span>
				<p class="address">
          <span class="address-title" style="font-weight: 600; font-size: 18px"
          >地址：</span
          >
					<a class="detail" @click="switchActionHold()">{{ map.address }}</a>
				</p>
				<!-- 导航按钮 -->
				<div class="navigation">
					<el-button
						class="navigation"
						round
						style="width: 130px"
						type="primary"
						@click="switchActionHold(map.name)"
					>导航
					</el-button
					>
				</div>
			</div>
			<baidu-map
				:ak="this.ak"
				:center="{ lng: map.lng, lat: map.lat }"
				:dragging="true"
				:scroll-wheel-zoom="true"
				:zoom="zoom"
				class="bm-view"
				@ready="handler"
			>
				<bm-geolocation
					:autoLocation="true"
					:locationIcon="{
            url: 'https://z3.ax1x.com/2021/06/12/25pfjs.png',
            size: { width: 300, height: 157 },
          }"
					:showAddressBar="true"
					anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
				></bm-geolocation>
				<bm-marker
					:dragging="true"
					:icon="{
            url: 'https://z3.ax1x.com/2021/06/12/25pfjs.png',
            size: { width: 300, height: 157 },
          }"
					:position="{ lng: map.lng, lat: map.lat }"
				></bm-marker>
			</baidu-map>
		</div>
	</el-card>
</template>
<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue"
import BmGeolocation from "vue-baidu-map/components/controls/Geolocation.vue"
import BmMarker from "vue-baidu-map/components/overlays/Marker.vue"

export default {
	name: "HoldCard",
	components: {
		BaiduMap,
		BmGeolocation,
		BmMarker
	},
	// 参数校验
	props: {
		map: {
			type: Object,
			default: {}
		},
		index: {
			type: Number,
			default: 0
		},
		switchIsShowHold: {
			type: Function

		}
	},

	mounted() {
		this.maps = {
			lng: this.map.lng,
			lat: this.map.lat
		}
	},

	data() {
		return {
			// 23.470296173825677, 113.23494953958503
			center: {lng: 113.23494953958503, lat: 23.470296173825677},
			zoom: 15,
			ak: "DFntGLYClcm78nyFKu9KoKRhZ864MtWC"

		}
	},

	methods: {
		handler({BMap, map}) {
			// console.log(BMap, map)
			this.center.lng = 116.404
			this.center.lat = 39.915
			this.zoom = 15
		},
		switchActionHold(name) {
			this.$store.commit('set_endcenter', {lng: this.map.lng, lat: this.map.lat})
			this.switchIsShowHold(name)
		}
	}
}
</script>
<style scoped>
@media screen and (max-width: 768px) {
	.map-container {
		flex-direction: column !important;
	}

	.text-info {
		width: 100% !important;
		flex-direction: column !important;
	}

	.bm-view {
		width: 100% !important;
	}

	.text-info > .name {
		margin: 0 auto !important;
	}

	.text-info > .navigation {
		margin: 10px auto !important;
	}

	.bm-view {
		height: 200px;
	}

}

.text {
	font-size: 14px;
}

.item {
	padding: 18px 0;
}

.box-card {
	width: 90%;
	margin: 20px auto;
}

.map-container {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.text-info {
	width: 40%;
	display: flex;
	flex-direction: column;
	padding-right: 10px;
}

.text-info > .name {
	margin-top: 30px;
	color: var(--color-height-text);
}

.text-info > .desc {
	margin-top: 20px;
	text-indent: 2em;
	line-height: 1.5;
	color: #000;
}

.text-info > .address {
	margin-top: 20px;
}

.text-info > .navigation {
	margin-top: 20px;
	text-align: center;
}

.detail {
	text-decoration: underline;
	cursor: pointer;
}

.bm-view {
	width: 60%;
}
</style>