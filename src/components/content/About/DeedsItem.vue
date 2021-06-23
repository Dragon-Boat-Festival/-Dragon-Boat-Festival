<template>
  <a class="deeds_item" @click="isShowIntroduce(deedsItem.id,deedsItem.name)">
    <span
      ><img
        :src="deedsItem.main_img"
        :data-src="deedsItem.main_img"
        :alt="deedsItem.name"
        class="loaded"
        data-was-processed="true"
    /></span>
    <p>{{ deedsItem.name }}</p>
  </a>
</template>

<script>

export default {
  name: "DeedsItem",
  props: {
    deedsItem: {
      type: Object,
    },
    isShowIntroduce : {
      type: Function
    }
  },
};
</script>

<style scoped>
.deeds_item {
  width: 144px;
  padding: 5px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background-color: #f3f3f3;
  overflow: hidden;
  display: inline-block;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: unset;
  margin-right: 10px;
  transition: all .5s;
}
.deeds_item:hover {
  border: 1px solid var(--color-text)
}
.deeds_item:hover img {
  transform: scale(1.1, 1.1);
  -webkit-transform: scale(1.1, 1.1); /*兼容-webkit-引擎浏览器*/
  -moz-transform: scale(1.1, 1.1); /*兼容-moz-引擎浏览器*/
}
.deeds_item > span {
  width: 144px;
  height: 192px;
  display: flex;
  overflow: hidden;
}
.deeds_item > span > img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease 0s;
}
.deeds_item > p {
  width: 100%;
  overflow: hidden;
  margin-top: 5px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  text-indent: 0;
  text-align: center;
}
</style>