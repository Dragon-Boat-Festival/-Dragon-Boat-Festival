<template>
  <div id="app">
    <Cover v-show="isShow" />
    <Affix v-if="showNav">
      <navbar></navbar>
    </Affix>
    <navbar v-else></navbar>
    <div class="full">
      <Background style="left: -100%"> </Background>
      <Background> </Background>
      <transition name="el-fade-in-linear">
        <router-view v-if="isShow"></router-view>
      </transition>
    </div>

    <Footer />
  </div>
</template>


 
<script>
import Navbar from "@/components/content/NavBar/Navbar";
import Cover from "@/components/content/Cover/Cover";
import Affix from "@/components/common/Affix/Affix";
import Footer from "@/components/content/Footer/Footer";
import Background from "@/components/content/Background/Background";
import {CHANGESIZE} from '@/store/mutations-types.js'
export default {
  name: "app",
  components: { Navbar, Cover, Affix, Footer, Background },
  // 渲染前
  created() {
    if (document.getElementById("loading")) {
      document.getElementById("loading").remove();
    }
  },
  mounted() {
    if (window.document.body.clientWidth < 768) {
      this.showNav = false;
      this.$store.commit(CHANGESIZE, "100%");
    }
    const _this = this;
    window.addEventListener("resize", () => {
      if (window.document.body.clientWidth < 768) {
        return (() => {
          _this.showNav = false;
          _this.$store.commit(CHANGESIZE, "100%");
        })();
      } else if (window.document.body.clientWidth > 768) {
        return (() => {
          _this.showNav = true;
          _this.$store.commit(CHANGESIZE, "90%");
        })();
      }
    });

    

  },
  computed: {
    isShow() {
      let reg = /(navmap|detail)/i;
      return !reg.test(this.$route.path);
    },
  },
  data() {
    return {
      msg: "hello vue",
      showNav: true,
    };
  },
};
</script>


<style scoped>
@import "~@/assets/css/base.css";
@import "~@/assets/css/theme/index.css";
@import "~@/assets/css/theme/index.css";
@import "~@/assets/font/icon/iconfont.css";
@media screen and (min-width: 1280px) and (max-width: 1440px) {
  .full {
    margin: 0 10%;
  }
}

@media screen and (min-width: 1441px) and (max-width: 1770px) {
  .full {
    margin: 0 15%;
  }
}

@media screen and (min-width: 1771px) {
  .full {
    margin: 0 20%;
  }
}
.full {
  position: relative;
}
#app {
  overflow-x: hidden;
}
</style>
