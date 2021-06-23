<template>
  <div class="article_detail">
    <div class="title">
      <h1>{{currData.title}}</h1>
      <span class="time">发布时间：{{currData.time}}</span>
    </div>
    <div class="detail">
      <h5 v-show="currData.detail" v-for="(item, index) in currData.detail" :key="index">
        <strong v-if="item.style === 'strong'">{{item.text}}</strong>
        <span v-if="item.style === 'default'">{{item.text}}</span>
        <img v-if="item.style === 'img'" :src="item.text" />
        <h3 v-if="item.style === 'h3'">{{item.text}}</h3>
      </h5>
    
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleDetail",
  props: {
    currData: {
      type: Object
    }
  },
  mounted() {
    // console.log(this.currData)
  }

  
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .article_detail {
    padding: 20px 50px !important;
  }
  .detail > h5 {
    padding: 0 !important;
  }
}
.article_detail {
  width: 100%;
  padding: 0 40px 40px  40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title > h1 {
  color: var(--color-height-text);
  font-weight: 400;
}

.title > .time {
  color: #999999;
  font-size: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.detail {

}
.detail > h5 {
  color: var(--color-text);
  font-size: 16px;
  line-height: 1.8;
  padding: 10px 50px;
  text-indent: 2em;
  font-weight: 400;
}
.detail img {
  max-width: 100%;
  display: block;
  margin: 15px auto;
}
.detail h3 {
border-left: 2px solid #a90013;
padding-left: 5px;
background:#fff6f7;
width: 100%;
color: #a90013;
}
.detail span {
color: #333333;
}
</style>