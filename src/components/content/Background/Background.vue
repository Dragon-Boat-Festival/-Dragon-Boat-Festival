<template>
<div id="container"> 
<div id="leafContainer" ref="leafContainer"></div>
</div>
  
</template>

<script>
export default {
  name: "Background",

  mounted() {
    // console.log(this.imgArr);
    this.init();
    this.pageHeight = window.document.body.scrollHeight
  },

  data() {
    return {
      imgArr: [
        require("@/assets/images/background/realLeaf1.png"),
        require("@/assets/images/background/realLeaf2.png"),
        require("@/assets/images/background/realLeaf3.png"),
        require("@/assets/images/background/realLeaf4.png"),
      ],
      count: 5,
      pageWidth: 0,
      pageHeight: 0,
    };
  },
  methods: {
    init() {
      let container = this.$refs.leafContainer;
      for (let i = 0; i < this.count; i++) {
        container.appendChild(this.createLeaf());
      }
    },
    randomInteger() {
      return this.imgArr[Math.floor(Math.random() * this.imgArr.length)];
    },
    randomFloat(min, max) {
      const time = min + Math.random() * (max - min);
      // console.log(time);
      return time;
    },
    durationValue(value) {
      return value + "s";
    },

    createLeaf() {
      let srcs = this.randomInteger();
      
      let tops = "-100px";
      let lefts = "" + this.randomInteger(0, document.body.clientWidth) + "px";
      let imgSpinName = Math.random() < 5 ? "leftRotation" : "rightRotation";
      let divName = "fade,drop";
      let aniDuration = this.durationValue(this.randomFloat(5,20));
      let imgSpinDuration = this.durationValue(this.randomFloat(4,8));
      let leafDelay = this.durationValue(this.randomFloat(0, 5));
      let leafDiv = document.createElement("div");
      let leafImage = document.createElement("img");
      leafImage.src = srcs;
      leafDiv.style.top = tops;
      leafDiv.style.left = lefts;
      leafDiv.style.webkitAnimationName = divName;
      leafImage.style.webkitAnimationName = imgSpinName;
      leafDiv.style.webkitAnimationDuration = aniDuration + "," + aniDuration;
      leafDiv.style.webkitAnimationDelay = leafDelay + "," + leafDelay;
      leafImage.style.webkitAnimationDuration = imgSpinDuration;
      leafDiv.appendChild(leafImage);
      return leafDiv;
    },
  },
};
</script>

<style>
@import "~@/components/content/Background/index.css";
</style>