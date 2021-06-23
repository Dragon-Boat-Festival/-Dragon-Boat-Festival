<template>

	<div class="hold">
		<div class="container">
			<hold-card v-for="(map, index) in mapData" :key="index" :index="index" :map="map" :switchIsShowHold="switchIsShowHold"></hold-card>
		</div>
		<!-- Drawer 抽屉 -->
		<el-drawer :destroy-on-close="true" :size="$store.state.size" :title="'正在导航到:' + currName" :visible.sync="isShowHold" >
			<NavigationMap :lat="lat" :lng="lng" />
		</el-drawer>
	</div>
</template>
<script>
/**
 * 地图
 */
import HoldCard from "@/components/content/Hold/HoldCard";
import NavigationMap from "@/views/NavigationMap";

export default {
  components: { HoldCard, NavigationMap },
  name: "Hold",

  data() {
    return {
      mapData: [
        {
          name: "猎德招景",
          lng: 113.345124,
          lat: 23.114987,
          desc: "从农历五月初一起，猎德龙舟队和猎德女子龙舟队的成员们就开始了每日大概两小时的训练，各队参与人数在70人左右。尤其是猎德女子龙舟队，今年吸引了更多村民参与，比往年增加了20人",
          address: "广州猎德涌",
        },
        {
          name: "番禺区“莲花杯”“禺山杯”龙舟赛",
          // 113.384745,22.931936
          lng: 113.384745,
          lat: 22.931936,
          desc: `本届龙舟赛竞赛项目有"莲花杯"传统龙舟600米+500米折回竞速赛、"禺山杯"标准龙舟600米+500米折回竞速公开赛、彩龙1000米×2折回竞艳。本次参加活动的龙舟共102艘.`,
          address: "广州番禺区市桥河(德兴大桥以东河段)",
        },
        {
          name: "海珠区海珠湿地龙舟景",
          lng: 113.34666,
          lat: 23.07647,
          desc: "从农历五月初一起，猎德龙舟队和猎德女子龙舟队的成员们就开始了每日大概两小时的训练，各队参与人数在70人左右。尤其是猎德女子龙舟队，今年吸引了更多村民参与，比往年增加了20人",
          address: "广州海珠湿地公园",
        },
        {
          name: "广州国际龙舟邀请赛",
          // 113.306564,23.112372
          lng: 113.306564,
          lat: 23.112372,
          desc: "广州国际龙舟邀请赛，是中国传统体育运动的五星级赛事，被誉为世界上最好的龙舟赛事之一。每年五月，龙舟风弥漫珠江，吹遍广州各个角落。组织推广龙舟赛，目的是要弘扬民俗文化，宣传“精诚合作、奋勇向前”的龙舟精神。广州国际龙舟邀请赛设传统龙舟、标准龙舟、彩龙和游龙等四个项目，每年吸引超过100条龙舟参加比赛。",
          address: "广州中大北门至广州大桥之间珠江河段",
        },
        {
          name: "增城西洲村龙舟赛",
          lng: 113.589951,
          lat: 23.092686,
          desc: "西洲村是有名的水乡，河道宽阔，赛龙舟的气氛很浓，吃龙舟饭沾“龙”气，看完龙舟去摘荔枝，增城可是出名的“荔枝之乡”呀！来到增城怎能不去摘新鲜荔枝呢？尤其是妃子笑，核小，肉厚，皮薄，非常好吃。吃着‘妃子笑’到妃子笑酒店住一晚，体验一晚的温馨浪漫，不亦乐乎啊......",
          address: "广州东江新塘段",
        },
        {
          name: "中南街海中村第54届龙溪沙溪景龙舟赛",
          // 113.207748,23.058224
          lng: 113.207748,
          lat: 23.058224,
          desc: "民间流传“沙溪龙船飞咁快，老龙龙船用绳拉（指盐步老龙）”的说法，沙溪河边看龙船赛，祠堂边吃龙船饭是这里过端午的标配。",
          address: "广州海中村",
        },
      ],
      isShowHold: false,
      lng: "",
      lat: "",
      currName: ""
    };
  },
  methods: {
    switchIsShowHold(name) {
      this.isShowHold = true;
      this.currName = name
    },
  },
  mounted() {
   
  },
};

</script>
<style scoped>
@media screen and (max-width: 768px) {
  .container {
    margin: 20px auto !important;
  }
}
</style>