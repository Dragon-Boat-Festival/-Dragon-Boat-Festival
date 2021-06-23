<template>
	<div class="comment-item">
		<div class="t-div">
			<!--  头像  -->
			<div class="myimg">
				<el-avatar :size="44" src="https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/p01eOiQoJe7J/l3UcHCbM4kFlpf.jpg"></el-avatar>
			</div>
			<!--  用户信息 -->
			<div class="info">
				<span class="name">L*u</span>
				<div class="attach">
					<span>2021-06-15 22:49</span>
					<span class="margin">|</span>
					<span>原味*4只</span>
				</div>
			</div>
		</div>
		<!--  评论文字内容 -->
		<div class="m-div">
			三珍斋不愧是老字号,其产品一直是家人的最爱。外观漂亮、粽子美味,真是佳节首选,好评!好
		</div>
		<!--  评论图片 -->
		<div class="img-div">
			<div class="imggroup-container">
				<el-image
					:preview-src-list="srcList"
					:src="url"
					style="width: 100px; height: 100px"
				>
				</el-image>
			</div>
		</div>
		<!--  底下border -->
		<div class="b-div"></div>
	</div>
</template>
<script>
/**
 * 评论模块
 */
export default {
	name: "CommentItem",
	data() {
		return {
			url: "https://img.youpin.mi-img.com/comment/8f0aac3577f9c5d04b39081458fdc393.jpg?w=3240&h=4320",
			srcList: [
				"https://img.youpin.mi-img.com/comment/8f0aac3577f9c5d04b39081458fdc393.jpg?w=3240&h=4320",
				"https://img.youpin.mi-img.com/comment/08709eb2c9ae526d3b80f4773ada53de.jpg?w=3240&h=4320"
			]
		}
	}
}
</script>
<style>
</style>