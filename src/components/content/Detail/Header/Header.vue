<template>
	<div id='detail-header' class="detail-header">
		<Thumb :mainImgUrl="goodData.mainImgUrl" :thumbImgs="goodData.thumbImgs" />
		<!--桌面端显示-->
		<div class="sku-container">
			<div class="name">
				<div class="good-name">{{ goodData.name }}</div>
			</div>
			<div class="summary">{{ goodData.summary }}</div>
			<!-- 商品价格 -->
			<div class="card">
				<div class="price-line">
					<h5 class="sku-title">售价</h5>
					<div class="price">
						<span class="money-symbol">¥</span>
						<span class="value">{{ goodData.price }}</span>
						<span class="money-symbol">起</span>
					</div>
				</div>
				<div class="service-line">
					<h5 class="sku-title">服务</h5>
					<div class="service">
						<div class="service-item">
							<i class="el-icon-success" style="color: #c00000"></i>
							<span class="service-item-text">满30包邮</span>
						</div>
						<div class="service-item">
							<i class="el-icon-success" style="color: #c00000"></i>
							<span class="service-item-text">顺丰速运</span>
						</div>
						<div class="service-item">
							<i class="el-icon-success" style="color: #c00000"></i>
							<span class="service-item-text">消费者权利</span>
						</div>
					</div>
				</div>
			</div>
			<!-- 商品地址 -->
			<div class="address-line">
				<h5 class="sku-title">配送区域</h5>
				<div class="address">
					<div>
						<span>广东省 广州市 高新技术高级技工学校</span>
						<a>修改</a>
					</div>
				</div>
			</div>
			<!-- 商品规格 -->
			<div>
				<div style=" overflow: hidden; padding: 0 0 12px">
					<div class="size-line clearfix">
						<h5 class="sku-title">口味</h5>
						<div class="size-container">
							<el-radio-group>
								<el-radio-button label="原味*4只"></el-radio-button>
							</el-radio-group>
						</div>
					</div>
				</div>
				<!-- 数量count -->
				<div class="count-line">
					<h5 class="sku-title count-title">数量</h5>
					<div class="count-container">
						<el-input-number v-model="productNum" :max="10" :min="1"></el-input-number>
					</div>
				</div>
				<div class="btn-line">
					<div class="buy-btn-container">
						<el-button class="m-btns m-btn-middle m-btn-brown" type="primary" @click='toCar'>
							加入购物车
						</el-button
						>
						<el-button class="m-btns m-btn-middle m-btn-brown-stroke" @click='toBuy'>
							立即购买
						</el-button
						>
					</div>
					<el-button class="m-btns m-btn-middle m-btn-brown-stroke" @click='toCollection'>
						收藏
					</el-button
					>
					<el-button class="m-btns m-btn-middle m-btn-brown-stroke" @click='toService'>
						客服
					</el-button
					>
				</div>
			</div>
		</div>
		<!--移动端显示-->
		<div class='sku-mini'>
			<el-carousel ref="carousel" :interval="5000">
				<el-carousel-item v-for="item in goodData.thumbImgs" :key="item">
					<img style="width: 100%" :src="item" alt />
				</el-carousel-item>
			</el-carousel>
			<div class='sku-mini-item'>
				<h1><span>¥</span>{{ goodData.price }}</h1>
				<h3>{{ goodData.summary }}</h3>
			</div>
			<div class='sku-mini-item'>
				<h2><span>已选</span> 原味*4只 <i class="el-icon-more"></i></h2>
				<h2><span>送至</span> 广东省 广州市 高新技术高级技工学校 <i class="el-icon-more"></i></h2>
				<div class='sku-mini-item-button'>
					<el-button type="primary" @click='toCar'>加入购物车</el-button>
					<el-button @click='toCollection'>收藏</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Thumb from "@/components/content/Detail/Header/thumb/Thumb"

export default {
	components: {
		Thumb
	},
	props: {
		goodData: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			productNum: 1,
			collection: true,
			car: true,
			buy: true
		}
	},
	methods: {
		toCar() {
			if (this.car === true) {
				this.$message({
					message: '加入购物车成功~',
					type: 'success'
				})
				this.car = false
			} else if (this.car === false) {
				this.$message({
					message: '从购物车删除成功~',
					type: 'success'
				})
				this.car = true
			}
		},
		toCollection() {
			if (this.collection === true) {
				this.$message({
					message: '收藏成功~',
					type: 'success'
				})
				this.collection = false
			} else if (this.collection === false) {
				this.$message({
					message: '取消收藏成功~',
					type: 'success'
				})
				this.collection = true
			}
		},
		toBuy() {
			if (this.buy === true) {
				this.$message({
					message: '加入购物车成功，从购物车里结账吧~',
					type: 'success'
				})
				this.buy = false
			} else if (this.buy === false) {
				this.$message({
					message: '从购物车里删除成功，期待下次光临~',
					type: 'success'
				})
				this.buy = true
			}
		},
		toService() {
			this.$message('客服暂未上线噢~')
		}
	}
}
</script>
<style scoped>
@import "~@/components/content/Detail/Header/header.css";

@media screen and (max-width: 768px) {
	.sku-mini {
		width: 100% !important;
		height: 100% !important;
	}
}

.sku-mini {
	width: 0;
	height: 0;
	overflow: hidden;
}

/deep/ .el-carousel--horizontal {
	width: 100%;
}

/deep/ .el-carousel__container {
	width: 100%;
	height: 400px;
}

.sku-mini-item {
	padding: 10px;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, .2);
}

.sku-mini-item h1 {
	color: #C00000;
	margin: 15px 0;
	padding: 10px;
	font-weight: 400;
	/*border-bottom: 1px solid #ccc;*/
}

.sku-mini-item h1 span {
	font-size: 20px;
}

.sku-mini-item h2 {
	padding: 30px 10px;
	color: #000;
	font-size: 14px;
	border-bottom: 1px solid #ccc;
}

.sku-mini-item h2 i {
	float: right;
}

.sku-mini-item h2 span {
	color: var(--color-height-text);
	font-size: 14px;
	font-weight: 400;
}

.sku-mini-item h3 {
	color: #000;
	font-size: 18px;
	line-height: 1.5;
	font-weight: 400;
	margin: 20px 10px;
}

.sku-mini-item-button {
	margin: 20px auto;
	text-align: center;
}

.sku-mini-item-button .el-button {
}
</style>