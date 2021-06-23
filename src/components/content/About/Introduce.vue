<template>
	<div class="introduce">
		<el-card class="box-card content-text">
			<h3 class="cell" style="color: var(--color-height-text)">关于屈原</h3>
			<el-divider></el-divider>
			<div class="deeds_items">
				<swiper :options="swiperOption" class="swiper">
					<swiper-slide v-for="(deedsItem, index) in deedsData" :key="index"
					>
						<DeedsItem
							:deedsItem="deedsItem"
							:isShowIntroduce="swichShowIntroduce"
						></DeedsItem>
					</swiper-slide>
					<div slot="pagination" class="swiper-pagination"></div>
				</swiper>
			</div>
		</el-card>
		<el-card class="box-card content-text works">
			<h3 class="cell" style="color: var(--color-height-text)">屈原代表作品</h3>
			<el-divider></el-divider>
			<div class="works_items">
				<WorksItem
					v-for="(work, index) in worksData"
					:key="index"
					:isShowIntroduce="swichShowIntroduce"
					:work="work"
				>
				</WorksItem>
			</div>
		</el-card>
		<el-drawer
			:destroy-on-close="true"
			:size="$store.state.size"
			:title="currName"
			:visible.sync="isShowIntroduce"
		>
			<ArticleDetail :currData="currData"></ArticleDetail>
		</el-drawer>
	</div>
</template>
<script>
import TemplateSlot from "@/components/content/About/TemplateSlot"
import WorksItem from "@/components/content/About/WorksItem"
import IntroduceData from "@/tools/introduce.json"
import DeedsItem from "@/components/content/About/DeedsItem"
import ArticleDetail from "@/components/content/About/ArticleDetail"
import {Swiper, SwiperSlide} from "vue-awesome-swiper"
import 'swiper/swiper-bundle.css'

export default {
	name: "Introduce",
	components: {
		TemplateSlot,
		DeedsItem,
		WorksItem,
		ArticleDetail,

		Swiper,
		SwiperSlide
	},
	mounted() {
		this.deedsData = IntroduceData.deeds
		this.worksData = IntroduceData.weeks

	},
	data() {
		return {
			deedsData: [],
			worksData: [],
			size: "90%",
			isShowIntroduce: false,
			screenWidth: document.body.clientWidth,
			currData: {},
			currName: "",
			swiperOption: {
				slidesPerView: 3,
				spaceBetween: 10,
				freeMode: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				breakpoints: {
					768: {
						slidesPerView: 5
					}
				}
			}
		}
	},
	methods: {
		swichShowIntroduce(id, name) {
			// console.log(id)
			this.isShowIntroduce = true
			if (id <= 7) {
				const res = this.deedsData.find((item) => item.id === id)
				this.currData = res
				this.currName = name
			} else {
				const res = this.worksData.find((item) => item.id === id)
				this.currName = name
				this.currData = res
			}
		}
	}
}
</script>
<style scoped>
@media screen and (max-width: 768px) {
	.deeds_items {
		position: relative;
		left: -30px;
		width: 100vw !important;
	}

	.works {
		margin-top: 20px !important;
	}
}

.deeds_items {
	width: 100%;
	white-space: nowrap;
	overflow: scroll;
	cursor: pointer;
}

.works_items {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
</style>