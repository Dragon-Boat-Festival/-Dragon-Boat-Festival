<template>

	<div class="detail-content">
		<div class="info">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane
					label="商品详情"
					name="1"
				>
					<div class="main-body">
						<div class="goodsDImg">
							<el-image v-for="(img, index) in goodData.goodsDetailImg" :key="index" :src="img"></el-image>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="评论" name="2">
					<div class="main-body">
						<!-- 整个评论的盒子头部  -->
						<div class="comment-top-container">
							<!-- 头部  -->
							<h3 class="comment-top-positive-rate">96%满意</h3>
							<!-- 卡片切换筛选评论部分  -->
							<div class="comment-top-tabs">
								<div class="tabbar-container">
									<el-radio-group>
										<el-radio-button label="1" name="全部（620）"
										>全部（620）
										</el-radio-button
										>
										<el-radio-button label="2" name="有图（84）"
										>有图（84）
										</el-radio-button
										>
										<el-radio-button label="3" name="好评（5）"
										>好评（5）
										</el-radio-button
										>
									</el-radio-group>
								</div>
							</div>
						</div>
						<!-- 整个评论盒子的内容部分 -->
						<div class="comment-items">
							<CommentItem />
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="商品参数" name="3">
					<div class="main-body">
						<div>
							<img
								v-for="(img, index) in goodsParams"
								:key="index"
								:src="img"
								style="width: 100%; height: 100%"
							/>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
import CommentItem from "@/components/content/Detail/detailContent/CommentItem"

export default {
	name: "DetailContent",
	components: {
		CommentItem
	},
	props: {
		goodData: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			activeName: "1",
			url: "",
			srcList: [],
			goodsParams: [
				"https://img.youpin.mi-img.com/editor1/377fab1e28049d3aed2e25b236682ca0.jpg?w=1080&h=1019",
				"https://img.youpin.mi-img.com/editor1/98436c92e40d562e10b35d0aacb44f5a.jpg?w=1080&h=1002",
				"https://img.youpin.mi-img.com/editor1/5ddfcaf2cd67863449a293e580bca645.jpg?w=1080&h=428"
			]
		}
	},

	methods: {
		handleClick(tab, event) {
			// console.log(tab, event);
		}
	}
}
</script>
<style>
@import "~@/components/content/Detail/detailContent/detailContent.css";
@media screen and (min-width: 1024px) {
	.goodsDImg {
		max-width: 80% !important;
	}
}
</style>