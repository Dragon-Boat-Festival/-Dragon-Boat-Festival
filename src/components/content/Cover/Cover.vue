<template>
	<!-- 首屏 -->
	<div class="screen">
		<!-- 图片 -->
		<div ref="cover" class="mark">

<!--      <el-image  data-was-processed="true" class="loaded" :data-src="coverImg" alt="cover"
                 data-depth="0.2"
                 :src="coverImg" lazy></el-image>-->

			<img
				alt="cover"
				data-depth="0.2"
				src="@/assets/images/banner-bg/banner-bg.jpg"
			/>
		</div>
		<!--  -->
		<div class="vibrant" draggable="{true}">
			<svg
				height="100%"
				preserveAspectRatio="xMaxYMax slice"
				viewBox="0 0 2880 1620"
			>
				<polygon
					opacity="0.7"
					points="2000,1620 0,1620 0,0 600,0 "
					style="fill: rgb(91, 179, 92)"
				></polygon>
			</svg>
		</div>
		<!-- 字体部分 -->
		<div class="screen-text">
			<p>中国·端午节</p>
		</div>
		<!-- 描述 -->
		<div class="screen-desc">
			<span class="screen-nowTime">{{ this.nowTime }}</span>
			<div class="screen-disTime">
        <span
	        v-if="this.disTime === 0 "
        >端午节就是现在：端午节快乐！！
        </span>
				<span v-if='this.disTime < 0 '>距离下一个端午还有：{{ Math.abs(this.disTime) }} 天</span>
				</span>
			</div>
			<!-- 诗词 -->
			<div class="screen-poetry" style="display: flex">
				<span class="text"> {{ this.typers.output }} </span>
				<span id="author"></span>
			</div>
		</div>
		<!-- 按钮 -->
		<div class="about_button">
			<el-button
				round
				size="medium"
				style="width: 150px; height: 50px; font-size: 18px; border-radius: 30px"
				type="primary"
				@click='goPages'
			>进入页面
			</el-button>
		</div>
		<div id='screen'></div>
		<!-- 吊坠 -->
		<div class="diaozui"><img src="@/assets/images/banner-bg/webp.webp" /></div>
	</div>
</template>
<script>
/**
 * 主图
 */

import Parallax from "parallax-js"
import moment from "moment"
import {formatDate} from "@/tools/tools"
import EasyTyper from "easy-typer-js"

export default {
	mounted() {
		this.handleParallax(this.$refs.cover)
		this.initTyper()
		console.log(this.disTime)
		this.disTime = moment(new Date()).diff(moment("2022-6-3 00:00:00"), "days")
	},

	data() {
		return {
			// 距离端午节时间
			disTime: "",
			// 现在时间
			nowTime: formatDate(new Date()),
			// 诗词
			poetrys: [
				{
					text: "彩线轻缠红玉臂，小符斜挂绿云鬟。佳人相见一千年。    — 苏轼《浣溪沙·端午》",
					author: "苏轼《浣溪沙·端午》"
				},
				{
					text: "轻汗微微透碧纨，明朝端午浴芳兰。   — 苏轼《浣溪沙·端午",
					author: "苏轼《浣溪沙·端午》"
				},
				{
					text: "国亡身殒今何有，只留离骚在世间。 — 张耒《和端午》",
					author: "张耒《和端午》"
				},
				{
					text: "五月五日午，赠我一枝艾。— 文天祥《端午即事》",
					author: "文天祥《端午即事》"
				},
				{
					text: "绿杨带雨垂垂重。五色新丝缠角粽。    — 欧阳修《渔家傲·五月榴花妖艳烘》",
					author: "欧阳修《渔家傲·五月榴花妖艳烘》"
				},
				{
					text: "屈子冤魂终古在，楚乡遗俗至今留。   - 边贡《午日观竞渡》",
					author: "边贡《午日观竞渡》"
				},
				{
					text: "碧艾香蒲处处忙。谁家儿共女，庆端阳 。   - 舒頔《小重山·端午》",
					author: "舒頔《小重山·端午》"
				},
				{
					text: "年年端午风兼雨，似为屈原陈昔冤。   - 赵蕃《端午三首》",
					author: "赵蕃《端午三首》"
				},
				{
					text: "良辰当五日，偕老祝千年。    - 权德舆《端午日礼部宿斋有衣服彩结之贶以诗还答》",
					author: "权德舆《端午日礼部宿斋有衣服彩结之贶以诗还答》"
				},
				{
					text: "鹤发垂肩尺许长，离家三十五端阳。   - 殷尧藩《同州端午》",
					author: "殷尧藩《同州端午》"
				}
			],
      coverImg: require('@/assets/images/banner-bg/banner-bg.jpg'),
			// 保存当前的诗词
			typers: {
				output: "",
				isEnd: false,
				speed: 300,
				singleBack: false,
				sleep: 0,
				type: "rollback",
				backSpeed: 60,
				sentencePause: false
			}
		}
	},

	methods: {
		handleParallax: (cover) => {
			new Parallax(cover, {
				limitY: 400,
				limitX: 400
			})
		},

		initTyper() {
			const poetrys =
				this.poetrys[Math.floor(Math.random() * this.poetrys.length)].text
			new EasyTyper(
				this.typers,
				poetrys,
				(instance) => {
					// 回调函数 如果这里使用了递归调用会一直循环打印，需要在外部触发停止
					// 此回调用于获取新的数据然后重新输出
					instance.input = [
						this.poetrys[Math.floor(Math.random() * this.poetrys.length)].text
					]
					instance.play()
				},
				(output, instance) => {
					// 钩子函数，每一帧的数据获取和实例easy-typer-js的获取
					this.output = output
				}
			)
		},

		goPages() {
			document.getElementById("navbar").scrollIntoView()
		}
	}
}
</script>
<style scoped>
@media screen and (max-width: 768px) {
	.screen-desc {
		width: 60% !important;
		margin-bottom: 20px;
	}

	.screen-disTime span {
		width: 300px;
		height: 40px;
	}

	.diaozui {
		left: 55% !important;
		width: 40% !important;
	}
}

.screen {
	position: relative;
	overflow: hidden;
	height: 100vh;
}

.screen > .mark {
	position: relative;
	width: 100%;
	height: 100vh;
	overflow: hidden;
}

/* 图片 */
.screen > .mark > img {
	position: absolute;
	width: calc(100% + 4rem);
	height: calc(100% + 4rem);
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	object-fit: cover;
	object-position: center;
	margin-left: -3rem;
	margin-top: -3rem;
}

.vibrant {
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
}

.screen-text {
	position: absolute;
	top: 70px;
	color: white;
	margin: 0 60px;
	font-size: 24px;
	/* font-family: "ChangChengXingKaiTi-1"; */
}

/* 描述 */
.screen-desc {
	display: flex;
	flex-direction: column;
	position: absolute;
	width: 25%;
	left: 10%;
	top: 42%;
	color: #fff;
}

.screen-disTime {
	font-size: 24px;
	display: flex;
	flex-direction: column;
	margin-top: 15px;
	width: 400px;
}

.screen-nowTime {
	font-size: 12px;
}

.screen-poetry {
	font-size: 14px;
	margin-top: 30px;
	display: flex;
	flex-direction: column;
}

.screen-poetry > .text {
	margin-top: 10px;
	line-height: 30px;
}

/* 关于端午 */
.about_button {
	position: absolute;
	top: 75%;
	left: 13%;
}

.diaozui {
	position: absolute;
	top: 0;
	left: 20%;
	width: 10%;
}

.diaozui > img {
	width: 100%;
	transform-origin: 0% 0%;
	animation: roundRule 4s ease-in-out infinite;
	-webkit-transform-origin: top center;
}

@keyframes roundRule {
	0%, 100% {
		-webkit-transform: rotate(-10deg);
	}
	50% {
		-webkit-transform: rotate(10deg);
	}
}
</style>