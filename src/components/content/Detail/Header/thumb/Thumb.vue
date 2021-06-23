<template>

	<div class="banner">
		<div class="main">
			<img :src="this.mainImgUrl2" />
		</div>
		<div class="thumb">
			<div
				:style="'top:' + `-${this.thumbContainerTop}px;`"
				class="thumb-container"
			>
				<div
					v-for="(img, index) in thumbImgs"
					:key="index"
					:style="currThumbImg === index ? 'borderColor: rgb(132, 95, 63)' : ''"
					class="thumb-pic"
					@click="changeMainImg(img, index)"
				>
					<img :src="img" />
				</div>
			</div>
			<div
				class="thumb-arrow-up"
				@click="
          () => {
            let index = currThumbImg;
            let img;
            if (index > 0) {
              img = thumbImgs[index - 1];
              index = currThumbImg - 1;
              this.changeMainImg(img, index);
            }
          }
        "
			>
				<i class="el-icon-caret-top"></i>
			</div>
			<div
				class="thumb-arrow-down"
				@click="
          () => {
            let index = currThumbImg;
            let img;
            if (currThumbImg < thumbImgs.length - 1) {
              img = thumbImgs[index + 1];
              index = currThumbImg + 1;
              this.changeMainImg(img, index);
            }
          }
        "
			>
				<i class="el-icon-caret-bottom"></i>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "Thumb",
	props: {
		// 缩略图的图片数组地址
		thumbImgs: {
			type: Array,
			default: () => {
				return []
			}
		},
		// 当前大图需要显示的img 地址连接
		mainImgUrl: {
			type: String,
			default: ""
		}
	},

	watch: {
		mainImgUrl() {
			this.mainImgUrl2 = this.mainImgUrl
		}
	},

	data() {
		return {
			/// 当前大图显示的下标
			currThumbImg: 0,
			// thumbContainer 整体的偏移量
			thumbContainerTop: 0,
			mainImgUrl2: ""
		}
	},
	created() {
		// console.log(this.thumbImgs);
	},
	methods: {
		/**
		 * 改变主图的img链接
		 * img: 显示的图片地址
		 * index: 当前图片的下标
		 * type: '修改的类型'
		 */
		changeMainImg(img, index) {
			this.mainImgUrl2 = img
			this.currThumbImg = index
			// console.log(index);
			if (this.thumbImgs.length > 4) {
				if (index === 3) {
					//
					this.thumbContainerTop = 96
				} else if (index > 3 && index < this.thumbImgs.length - 1) {
					const top = this.thumbContainerTop
					const preIndex = top / 96 + 1
					const nextIndex = preIndex + 2
					if (index === nextIndex) {
						this.thumbContainerTop = top + 96
					} else if (preIndex - 1 === index) {
						this.thumbContainerTop = top - 96
					}
				} else if (index <= 1) {
					this.thumbContainerTop = 0
				}
			}
		}
	}
}
</script>
<style scoped>
@media screen and (max-width: 768px) {
	.banner {
		display: none !important;
	}
}

.banner {
	margin: 10px 46px 30px 0;
	width: 50%;
	display: flex;
	flex: 6;
}

.banner .main {
	width: 372px;
	height: 372px;
	background-color: #f4f4f4;
	border: 1px solid #ececec;
	position: relative;
}

.banner .main img {
	width: 100%;
	height: 100%;
	border: none;
}

.banner .thumb {
	width: 85px;
	height: 100%;
	position: relative;
	overflow: hidden;
	margin-left: 5px;
}

.banner .thumb .thumb-container {
	position: absolute;
	left: 0;
	transition: top 0.3s ease;
}

.banner .thumb .thumb-container .thumb-pic {
	width: 83px;
	height: 83px;
	margin-bottom: 11px;
	box-sizing: content-box;
	border-width: 1px;
	border-style: solid;
	background-color: #f4f4f4;
	border-color: #ececec;
	transition: all 2s cubic-bezier(0, 1, 0.5, 1);
}

.banner .thumb .thumb-container .thumb-pic img {
	width: 100%;
	height: 100%;
}

.banner .thumb .thumb-arrow-up,
.banner .thumb .thumb-arrow-down {
	cursor: pointer;
	align-items: center;
	justify-content: center;
	display: none;
	width: 100%;
	position: absolute;
	background-color: rgba(0, 0, 0, 0.3);
}

.banner .thumb .thumb-arrow-up .iconfont,
.banner .thumb .thumb-arrow-down .iconfont {
	color: white;
	font-size: 5px;
}

.banner .thumb .thumb-arrow-down {
	bottom: 0 !important;
}

.banner .thumb:hover {
	cursor: pointer;
}

.banner .thumb:hover > .thumb-arrow-up,
.banner .thumb:hover > .thumb-arrow-down {
	cursor: pointer;
	display: flex;
}
</style>