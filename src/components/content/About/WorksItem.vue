<template>
  <a @click="isShowIntroduce(work.id, work.name)"> 
    <span>
    <el-image  data-was-processed="true" :alt="work.name" class="loaded" :data-src="work.main_img" :src="work.main_img" lazy></el-image>
<!--      <img
          :src="work.main_img"
          :data-src="work.main_img"
          :alt="work.name"
          class="loaded"
          data-was-processed="true"
      />-->
      </span>
    <p>{{ work.name }}</p>
  </a>
</template>

<script>
export default {
  name: "WorksItem",
  props: {
    work: {
      type: Object,
    },
    isShowIntroduce : {
      type: Function
    }
  },
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  a {
    width: 49% !important;
  }
}
a {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 24%;
  align-items: center;
  cursor: pointer;
}
a:hover .loaded {
  opacity: 0.8;
    transform: scale(1.1, 1.1);
  -webkit-transform: scale(1.1, 1.1); /*兼容-webkit-引擎浏览器*/
  -moz-transform: scale(1.1, 1.1); /*兼容-moz-引擎浏览器*/
}
a > span {
  width: 100%;
  height: 150px;
  overflow: hidden;
}
a > span > .loaded {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease 0s;
}
a > p {
  text-indent: 0;
  margin: 10px 0;
}

@keyframes mymove {
  0% {
    transform: scale(1); /*开始为原始大小*/
  }
  25% {
    transform: scale(1.1); /*放大1.1倍*/
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.1);
  }
}
</style>