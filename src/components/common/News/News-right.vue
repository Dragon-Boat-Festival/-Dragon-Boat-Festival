<template>
  <div class="post">
    <div class="post-box">
      <p>
        <slot name="date">6月9，2019</slot>
      </p>
      <h3 @click="drawer = true">
        <slot name="title">端午假期 文化旅游活动丰富多彩</slot>
      </h3>
      <p>
        <slot name="content"
          >央视网消息（新闻联播）：端午假期各地举办丰富多彩的活动，让人们放松心情，尽享欢乐假期。
          这个假期，武汉吉庆民俗街热闹非凡。惟妙惟肖的泥人、精美绝伦的木雕、活灵活现的面偶，市民不仅能欣赏到非遗传承人的绝活，还可以上手亲自体验。
          在山东枣庄，40多个非物质文化遗产集中亮相；在浙江衢州，感受当地耕读文化；在云南玉溪，傣族传统狮子舞祈福纳祥；在山西晋城，陆地龙舟赛引来观众阵阵叫好。
          假日里，到甘肃张掖跟少数民族同胞策马扬鞭，来一场塞外赛马；来四川内江，与当地群众同下池塘比一比徒手抓鱼；在河南三门峡，来自全国各地的124对双胞胎在落差200多米的河道上竞速漂流，下陡岩，穿暗河，考验胆识和勇气。
          来自文化和旅游部的统计，2019年端午节期间，各地文化和旅游产品供给充足，民俗活动丰富多彩，假期市场安全平稳有序。全国国内旅游接待总人数9597.8万人次，同比增长7.7%，实现旅游收入393.3亿元，同比增长8.6%。
        </slot>
      </p>
    </div>
    <div class="post-img" @click="drawer = true">
      <slot name="img"><img alt="" src="~assets/images/News/1.gif" /></slot>
    </div>
    <el-drawer
      :before-close="handleClose"
      :size="$store.state.size"
      :visible.sync="drawer"
      :with-header="true"
    >
      <h3>
        <slot name="title">端午假期 文化旅游活动丰富多彩</slot>
      </h3>
      <p>
        <slot name="date">6月9，2019</slot>
      </p>
      <span>
        <slot name="content"
          ><span
            >央视网消息（新闻联播）：端午假期各地举办丰富多彩的活动，让人们放松心情，尽享欢乐假期。</span
          >
          <span
            >这个假期，武汉吉庆民俗街热闹非凡。惟妙惟肖的泥人、精美绝伦的木雕、活灵活现的面偶，市民不仅能欣赏到非遗传承人的绝活，还可以上手亲自体验。</span
          >

          <span
            >在山东枣庄，40多个非物质文化遗产集中亮相；在浙江衢州，感受当地耕读文化；在云南玉溪，傣族传统狮子舞祈福纳祥；在山西晋城，陆地龙舟赛引来观众阵阵叫好。</span
          >

          <span
            >假日里，到甘肃张掖跟少数民族同胞策马扬鞭，来一场塞外赛马；来四川内江，与当地群众同下池塘比一比徒手抓鱼；在河南三门峡，来自全国各地的124对双胞胎在落差200多米的河道上竞速漂流，下陡岩，穿暗河，考验胆识和勇气。</span
          >

          <span
            >来自文化和旅游部的统计，2019年端午节期间，各地文化和旅游产品供给充足，民俗活动丰富多彩，假期市场安全平稳有序。全国国内旅游接待总人数9597.8万人次，同比增长7.7%，实现旅游收入393.3亿元，同比增长8.6%。</span
          ></slot
        ></span
      >
      <section class="img_p"
        ><slot name="img"><img alt="" src="~assets/images/News/1.gif" /></slot
      ></section>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "News-slot",
  data() {
    return {
      drawer: false,
    };
  },

  methods: {
    handleClose(done) {
      done();
    },
  },
};
</script>
<style scoped>
@media screen and (max-width: 768px) {
  .post:nth-child(1) {
    margin: 20px auto 0 !important;
  }

  .post {
    flex-direction: column-reverse;
    width: 100% !important;
  }

  .post-box {
    margin: -4px !important;
  }

  .post-box p:nth-child(1) {
    margin: 25px 0 0 30px !important;
  }

  .post-box h3 {
    width: 85% !important;
    height: 100% !important;
  }

  .post-box p:nth-child(3) {
    width: 85% !important;
    height: 100% !important;
    margin: 25px 30px !important;
    -webkit-line-clamp: 2 !important;
  }

  /deep/ .el-drawer__body h3 {
    padding: 0 50px !important;
  }

  /deep/ .el-drawer__body p {
    margin: 20px 0 20px 50px !important;
  }

  /deep/ .el-drawer__body span {
    padding: 5px 25px !important;
  }


  /deep/ .el-drawer__body img {
    padding: 20px 10px !important;
		width: 100% !important;
		padding-left: -24px !important; 
	
  }
}

.post {
  display: flex;
  width: 85%;
  margin: 60px auto 0;
}

.post-img {
  flex: 5.5;
  z-index: 1;
}

.post-img img {
  width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  object-fit: cover;
}

.post-box {
  flex: 4.5;
  padding: 10px;
  margin: 20px 0 20px 30px;
  background-color: #fff;
  border: 1px solid var(--color-text);
  border-right: 0;
}

.post-box p:nth-child(1) {
  font-size: 16px;
  margin: 50px 0 0 30px;
  color: #000;
}

.post-box h3 {
  width: 300px;
  height: 60px;
  margin: 15px 30px;
  font-size: 26px;
  font-weight: 400;
  color: var(--color-height-text);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  cursor: pointer;
}

.post-box p:nth-child(3) {
  width: 300px;
  height: 75px;
  line-height: 26px;
  font-size: 14px;
  margin: 15px 0 0 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: #000;
}

/deep/ .el-drawer__body img {
  padding: 20px 100px;
  margin: 15px auto;
  max-width: 100%;
  width: 70%;
}

/deep/ .el-drawer__body span {
  display: block;
  font-size: 16px;
  line-height: 1.8;
  padding: 10px 50px;
  text-indent: 2em;
  color: #000;
}

/deep/ .el-drawer__body h3 {
  font-size: 28px;
  color: var(--color-height-text);
  font-weight: 400;
  padding: 60px 100px;
}

/deep/ .el-drawer__body p {
  margin-left: 100px;
  margin-bottom: 40px;
  color: #000;
}
.img_p {
  width: 100%;
	text-align: center;
}
</style>