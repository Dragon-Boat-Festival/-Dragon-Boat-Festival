<template>

	<div class="zongzi_category">
		<!-- 模态框 -->
		<el-dialog
			:beforeClose="dialogCanal"
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			:visible.sync="dialogFormVisible"
			center
			title="你最喜欢的是什么粽子?"
			width="100%"
		>
			<el-form :model="form" style="display: flex;justify-content: center;">
				<el-radio v-model="form.radio" label="1">甜粽</el-radio>
				<el-radio v-model="form.radio" label="2">咸粽</el-radio>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button v-if="form.radio === '1'" @click="switchRadio('2')"
				>不，我还是喜欢咸的！
				</el-button>
				<el-button v-else @click="switchRadio('1')"
			>甜的，我还是喜欢甜的！
				</el-button>
				<el-button type="primary" @click="dialogOk" 	style="margin-top: 10px;width: 196px">确 定</el-button>
			</div>
		</el-dialog>
		<div v-show="showContainer" class="container">
			<!-- 左边tabs -->
			<el-tabs
				:tab-position="tabDir"
				:value="form.radio"
				style="height: 100%; padding-top: 10px"
				@tab-click="tabsSwitch"
			>
				<el-tab-pane
					:label="form.radio === '1' ? '甜粽' : '咸粽'"
					:name="form.radio === '1' ? '1' : '2'"
				>
					<!-- 右边内容 -->
					<CategoryCard
						:isShowDetail="switchDatailStutas"
						:isShowDrawer="switchDrawerStatus"
						:zongzis="pageData"
					/>
				</el-tab-pane>
				<el-tab-pane
					:label="form.radio === '1' ? '咸粽' : '甜粽'"
					:name="form.radio === '1' ? '2' : '1'"
				>
					<CategoryCard :isShowDetail="switchDatailStutas" :zongzis="pageData" />
				</el-tab-pane>
				<el-tab-pane label="特殊地区粽" name="3">
					<CategoryCard
						:isShowDetail="switchDatailStutas"
						:isShowDrawer="switchDrawerStatus"
						:zongzis="pageData"
					/>
				</el-tab-pane>
				<el-tab-pane label="土豪粽" name="4">
					<CategoryCard
						:isShowDetail="switchDatailStutas"
						:isShowDrawer="switchDrawerStatus"
						:zongzis="pageData"
					/>
				</el-tab-pane>
				<el-tab-pane label="元气燕窝粽" name="5">
					<CategoryCard
						:isShowDetail="switchDatailStutas"
						:isShowDrawer="switchDrawerStatus"
						:zongzis="pageData"
					/>
				</el-tab-pane>
				<el-tab-pane label="清凉粽" name="6">
					<CategoryCard
						:isShowDetail="switchDatailStutas"
						:isShowDrawer="switchDrawerStatus"
						:zongzis="pageData"
					/>
				</el-tab-pane>
				<el-pagination
					:hide-on-single-page="true"
					:page-size="PAGE_SIZE"
					:total="zongziData.length"
					background
					layout="prev, pager, next"
					style="display: flex; justify-content: center"
					@current-change="changePage"
				>
				</el-pagination>
			</el-tabs>
		</div>
		<!-- Drawer 抽屉 -->
		<el-drawer
			:destroy-on-close="true"
			:size="$store.state.size"
			:title="currZongziName + '做法'"
			:visible.sync="isShowDrawer"
		>
			<Steps></Steps>
		</el-drawer>
		<!-- Drawer 抽屉 -->
		<el-drawer :destroy-on-close="true" :size="$store.state.size" :title="currZongziName" :visible.sync="isShowDetail">
			<Detail :id="currZongziId" />
		</el-drawer>
	</div>
</template>
<script>
/**
 * 粽子分类
 */

import { mapActions, mapState } from "vuex";
import CategoryCard from "@/components/content/Category/CategoryCard";
import Steps from "@/components/content/Category/Steps";
import { saveLs, getLs } from "@/tools/tools";
import Affix from "@/components/common/Affix/Affix";
import Detail from "@/views/Detail";

export default {
	components: {CategoryCard, Steps, Affix, Detail},

	beforeRouteEnter(to, from, next) {
		next((vm) => {
			// 保存上一个路由
			vm.lastRoutPath = from.path
		})
	},

	mounted() {
		// console.log(getLs('myfav'))
		getLs("myfav")
			? (this.showContainer = true)
			: (this.dialogFormVisible = true)
		this.form.radio = getLs("myfav") ? getLs("myfav")  : "1"
		// 初始化值
		this.getZongziData(this.form.radio)
		//  进行数据分页初始化
		this.changePage(1)
		if (window.document.body.clientWidth < 768) {
			this.tabDir = "top"
		
		}
		const _this = this
		window.addEventListener("resize", () => {
			if (window.document.body.clientWidth < 768) {
				return (() => {
					_this.tabDir = "top"
				
				})()
			} else if (window.document.body.clientWidth > 768) {
				return (() => {
					_this.tabDir = "left"
				
				})()
			}
		})
	},

  data() {
    return {
      lastRoutPath: "/", // 上一个路由路径
      dialogFormVisible: false, // 是否显示dialog、
      showContainer: false, // 是否显示内容，当用户选择粽子口味的时候
      form: {
        radio: "1", // 收集表单数据
      },
      // 甜粽子
      zongziData: [],
      // 保存当前页的粽子
      pageData: [],
      // 一个页面所显示的条数
      PAGE_SIZE: 6,
      // 是否显示抽屉
      isShowDrawer: false,
      // 当前用户要查看粽子做法的粽子
      currZongziName: "",
      tabDir: "left",
      isShowDetail: false, //显示详情页
      currZongziId: 1,
    };
  },


	methods: {
		// dialog点击取消
		dialogCanal(done) {
			this.$router.back()
			this.setActiveIndex({key: this.lastRoutPath})
			done()
		},

		// 切换radio
		switchRadio(key) {
			this.form.radio = key
		},

		// dialog ok
		dialogOk() {
			// console.log(this.form);
			// message提醒
      if (this.form.radio) {
        	this.$message({
				message: `您选中了${
					this.form.radio === 1 ? "甜粽" : "咸粽"
				}，粽子正在运输...`,
				type: "success"
			})
			// 隐藏dialog
			this.dialogFormVisible = false
			// 显示分类列表
			this.showContainer = true
			// 保存用户选中的
			saveLs("myfav", this.form.radio)
			// 更细数据
			this.getZongziData(this.form.radio)
			//  进行数据分页初始化
			this.changePage(1)
      }else {
        this.$message({
				message: `请选择您的口味`,
				type: "error"
			})
      }
		
		},
		// 页码切换触发
		changePage(pageNum) {
			// console.log(pageNum)
			this.pageData = this.zongziData.slice(
				(pageNum - 1) * 6,
				this.PAGE_SIZE * pageNum
			)
		},

		// tabs 切换
		tabsSwitch({name}) {
			// console.log(name)
			this.getZongziData(name)
			this.changePage(1)
		},

    // 获取粽子数据
    getZongziData(key) {
      switch (key) {
        case "1":
          // 甜粽
          this.zongziData = [
            {
              id: 1,
              name: "白粽子",
              eName: "BAI ZONGZI",
              img_url: require("@/assets/images/category/sweet/baizongzi.jpg"),
              effect: "补充原糖",
              desc: "对，你没有看错，就是没有任何馅料的白粽子，它是最“百搭”的粽子，可甜可盐~蘸白糖、蘸酱油...想吃什么味儿全凭你心情！",
            },
            {
              id: 2,
              name: "榴莲冰晶粽子",
              eName: "LIULANBINGJING ZONGZI",
              img_url: require("@/assets/images/category/sweet/liulianbingjing.jpg"),
              effect: "维生素C",
              desc: "榴莲爱好者的福音，晶莹剔透的外皮包裹着满满的榴莲果肉，一口咬下去，果肉充满整个口腔，爱吃榴莲的喵友一定不能错过！顺便说一下，放冰箱冷藏一会儿更好吃哦~",
            },
            {
              id: 3,
              name: "榴莲班戟粽子",
              eName: "LIULIANBANJIAN ZONGZI",
              img_url: require("@/assets/images/category/sweet/liulianbanjian.jpg"),
              effect: "维生素C",
              desc: "糯米中包着一个榴莲班戟，不像榴莲冰晶粽那么直接，内涵的它将美味藏在了“心里”，需要一层一层慢慢探索，但请相信，值得！",
            },
            {
              id: 4,
              name: "蜜枣粽子",
              eName: "MIZAO ZONGZI",
              img_url: require("@/assets/images/category/sweet/mizao.jpg"),
              effect: "补脾和胃，益元生津，补血安神",
              desc: "北方人端午必吃的粽子～原料非常简单，白胖胖的糯米加上几颗金丝蜜枣，甜中还带着淡淡的粽叶香气。",
            },
            {
              id: 5,
              name: "红豆粽子",
              eName: "HONGDOU ZONGZI",
              img_url: require("@/assets/images/category/sweet/hongdou.jpg"),
              effect: "滋补五脏，美容养颜,促进骨骼",
              desc: "红豆也叫相思豆，听名字就是甜甜的感觉~红豆粽虽然也是甜粽，但是完全不齁，更适合女孩子。",
            },
            {
              id: 6,
              name: "红豆蜜枣粽子",
              eName: "HONGDOUMIZAO ZONGZI",
              img_url: require("@/assets/images/category/sweet/hongdoumizao.jpg"),
              effect: "养血安神,益元生津,促进骨骼",
              desc: "这款粽子真的是馅料十足了！满满的红豆中夹着一大颗蜜枣，软糯细腻但又有豆子的嚼劲，口感满分。",
            },
            {
              id: 7,
              name: "红豆薏米粽子",
              eName: "HONGDOUYIMI ZONGZI",
              img_url: require("@/assets/images/category/sweet/hongdouyimi.jpg"),
              effect: "利湿健脾、舒筋除痹,美颜",
              desc: "红豆和薏米是非常好的搭配，祛湿气、健脾胃，再加上这款粽子本身甜度不高，吃起来没有甜腻感，非常适合夏季和体内湿气重的人食用。",
            },
            {
              id: 8,
              name: "紫米粽子",
              eName: "ZIMI ZONGZI",
              img_url: require("@/assets/images/category/sweet/zimi.jpg"),
              effect: "滋阴、补肾、补血、益气",
              desc: "原料中只有糯米、紫米和白砂糖，属于淡淡的甜味，口感软糯中又带着些韧劲，不喜欢吃太甜或者太黏粽子的喵友们选这款就没错啦！",
            },
            {
              id: 9,
              name: "紫米蜜枣粽子",
              eName: "ZIMIMIZAO ZONGZI",
              img_url: require("@/assets/images/category/sweet/zimimizao.jpg"),
              effect: "滋阴、补肾、补脾和胃",
              desc: "完美结合了蜜枣粽和紫米粽的优点~甜香不腻，软硬适中。",
            },
            {
              id: 10,
              name: "紫米栗蓉粽子",
              eName: "ZIMILIRONG ZONGZI",
              img_url: require("@/assets/images/category/sweet/zimilirong.jpg"),
              effect: "滋阴、补健脾胃，美容养颜",
              desc: "像栗子这种自然甜香的食物不入料真真是可惜了，将栗子打成蓉，口感软滑更适口，不干不硬刚刚好，色泽也非常诱人。",
            },
            {
              id: 11,
              name: "紫米八宝粽子",
              eName: "ZIMIBABAO ZONGZI",
              img_url: require("@/assets/images/category/sweet/zimibabao.jpg"),
              effect: "健脾养胃、补肾化湿、补充营养",
              desc: "这款粽子不像一般的甜粽那么甜，更多的是食材本身的滋味。8种食材，料多馅足，寓意也非常好，八方进宝，是送礼的不错选择。",
            },
            {
              id: 12,
              name: "紫米紫薯粽子",
              eName: "ZIMIZISHU ZONGZI",
              img_url: require("@/assets/images/category/sweet/zimizishu.jpg"),
              effect: "补血益气、暖脾胃、增强记忆",
              desc: "结合紫米和紫薯的优点，不软不硬口感更好，味道是淡淡的香甜，完全不会齁，即使不喜欢吃甜的喵友也可以一试。",
            },
            {
              id: 13,
              name: "紫薯粽子",
              eName: "ZISHU ZONGZI",
              img_url: require("@/assets/images/category/sweet/zishu.jpg"),
              effect: "抗氧化、抗肿 瘤、增强记忆",
              desc: "这个颜值真的是爱了！满满的少女心（星星眼），不仅如此，紫薯还有丰富的维生素和矿物质，在美味的同时，营养也毫不逊色哦。",
            },
            {
              id: 14,
              name: "豆沙粽子",
              eName: "DOUSHA ZONGZI",
              img_url: require("@/assets/images/category/sweet/dousha.jpg"),
              effect: "增强食饮、降血脂、抗过敏、保护肾脏",
              desc: "作为甜粽代表之一，与蜜枣粽一样，都是北方人端午必吃的粽子。但是比蜜枣粽更贴心的就是没有核啊朋友们！大口吃！完全不用担心会不小心咬到枣核，口感绵软，吃进去甜蜜蜜的，是孩子们的最爱。",
            },
            {
              id: 15,
              name: "鲜花豆沙粽子",
              eName: "XIANHUADOUSHA ZONGZI",
              img_url: require("@/assets/images/category/sweet/xianhuadousha.jpg"),
              effect: "美容、抗氧化、杀菌",
              desc: "豆沙粽中夹杂着点点玫瑰花瓣，花香、豆香缠绵在一起，视觉、嗅觉、味觉的三重享受，是恋爱的感觉没错了~",
            },
            {
              id: 16,
              name: "双豆沙粽子（红豆沙、绿豆沙）",
              eName: "SHUANGDOUSHA ZONGZI",
              img_url: require("@/assets/images/category/sweet/shuangdousha.jpg"),
              effect: "增强食饮、降血脂、美容",
              desc: "巧妙地将红豆沙和绿豆沙结合，颜值在线，软糯香甜，吃腻了单一红豆沙的喵友可以试试哦。",
            },
            {
              id: 17,
              name: "枣泥粽子",
              eName: "ZAONI ZONGZI",
              img_url: require("@/assets/images/category/sweet/zaoni.jpg"),
              effect: "安中，养脾，助十二经，平胃气，通九窍",
              desc: "将红枣去核打成泥状，省去了吐核的烦恼，香甜沙软，枣味浓郁，甜粽爱好者不能错过~",
            },
            {
              id: 18,
              name: "黑芝麻粽子",
              eName: "HEIZHIMA ZONGZI",
              img_url: require("@/assets/images/category/sweet/heizhima.jpg"),
              effect: "补钙、降血压、乌发润发",
              desc: "想象一下，把黑芝麻糊包进粽子~甜甜的沙沙的，比普通是甜粽更多了几丝香气~",
            },
            {
              id: 19,
              name: "芝麻枣泥粽子",
              eName: "ZHIMAZAONI ZONGZI",
              img_url: require("@/assets/images/category/sweet/zhimazaoni.jpg"),
              effect: "提高生育能力、护肤美肤、减肥塑身",
              desc: "在粽子中加入芝麻的不算常见，优点是枣香中夹杂着芝麻香气，不仅滋味层次丰富了，营养也不再单一。",
            },
            {
              id: 20,
              name: "绿豆百合粽子",
              eName: "LVDOUBAIHE ZONGZI",
              img_url: require("@/assets/images/category/sweet/lvdoubaihe.jpg"),
              effect: "镇咳祛痰、镇静、滋阴润肺",
              desc: "淡淡的绿豆和百合的香气，甜度适中，外观晶莹剔透，一抹淡绿沁人心脾，只留下“清新”两个字，也是非常适合夏天的一款粽子。",
            },
            {
              id: 21,
              name: "桂花蜜藕粽子",
              eName: "GUIHUAMIOU ZONGZI",
              img_url: require("@/assets/images/category/sweet/guihuamiou.jpg"),
              effect: "养颜美容 ，舒缓喉咙 ，改善多痰",
              desc: "莲藕吸满了桂花蜜汁，变得软糯清香，甜而不腻，冷吃、热吃都可以，老少皆宜。",
            },
            {
              id: 22,
              name: "桂圆莲子蜜枣粽子",
              eName: "GUIYUANLIANZIMIZAO ZONGZI",
              img_url: require("@/assets/images/category/sweet/guiyuanlianzimizao.jpg"),
              effect: "养心、宁神、健脾、补肾",
              desc: "听着就很“滋补”啊，这些食材不仅做汤、熬粥合适，做成粽子也毫无违和感，口感软糯、甜味儿浓，是甜粽该有的样子！",
            },
            {
              id: 23,
              name: "五谷杂粮粽子",
              eName: "WUGUZALIANG ZONGZI",
              img_url: require("@/assets/images/category/sweet/wuguzaliang.jpg"),
              effect: "养生、预防疾病",
              desc: "这款粽子比一般的甜粽要清淡一些，更多的是香，口感也稍硬一些。大家听到五谷杂粮，马上就会联想到有营养，确实，这款粽子比普通的粽子营养要更均衡些，喜欢五谷杂粮的喵友可以一试。",
            },
            {
              id: 24,
              name: "三米四豆五果粽子",
              eName: "SANMISIDOUWUGUO ZONGZI",
              img_url: require("@/assets/images/category/sweet/sanmisidouwuguo.jpg"),
              effect: "理气宽胸、化痰平咳",
              desc: "这款可以说是原料最最最多的一款粽子了，糯米、黄米、黑米、红豆、绿豆、豌豆、腰果、松子、核桃...足足十多种料混合在一起，“含金量”很高啊！",
            },
           
          ];
          break;
        case "2":
          // 咸粽
          this.zongziData = [
            {
              id: 26,
              name: "鲜肉粽子",
              eName: "XIANROU ZONGZI",
              img_url: require("@/assets/images/category/salty/xianrou.jpg"),
              effect: "补充蛋白质、营养",
              desc: "终于到了南方喵友们爱吃的咸粽，鲜肉粽是最基础也是最经典的咸粽，糯米中包裹着一整块肉肉，滋味咸中带鲜，咸粽入门款选它没错了！",
            },
            {
              id: 27,
              name: "火腿鲜肉粽子",
              eName: "HUOTUIXIANROU ZONGZI",
              img_url: require("@/assets/images/category/salty/huotuixianrou.jpg"),
              effect: "补充蛋白质、营养",
              desc: "加入了火腿的肉粽，肉香味儿更浓，一口火腿一口肉，大写的满足~",
            },
            {
              id: 28,
              name: "板栗肉粽子",
              eName: "BANLIROU ZONGZI",
              img_url: require("@/assets/images/category/salty/banlirou.jpg"),
              effect: "补充蛋白质、营养",
              desc: "板栗绝不仅仅是甜粽的配料，放在肉粽中依旧毫无违和感，板栗吸满了肉的汤汁，咸香中还带着一丝丝清甜，绝对的画龙点睛~~",
            },
            {
              id: 29,
              name: "蛋黄肉粽子",
              eName: "DANHUANGROU ZONGZI",
              img_url: require("@/assets/images/category/salty/danhuangrou.jpg"),
              effect: "补充蛋白质、营养",
              desc: "肉粽中非常畅销的一款，在肉粽的基础上，再裹上一颗完整的咸鸭蛋黄，沙沙酥酥的口感配上猪后腿肉的鲜嫩紧实，不愧是经典中的经典。",
            },
            {
              id: 30,
              name: "双黄肉粽粽子",
              eName: "SHUANGHUANGROU ZONGZI",
              img_url: require("@/assets/images/category/salty/shuanghuangrou.jpg"),
              effect: "补充蛋白质、营养",
              desc: "爱吃咸蛋黄的喵友们一定不能错过！少一个不过瘾，多一个装不下，两个咸蛋黄的组合简直不要太完美，咬一口滋滋流油儿，第二口肉香满分，吃就完了！",
            },
            {
              id: 70,
              name: "蛋黄菌菇粽子",
              eName: "DANHUANGJUNGU ZONGZI",
              img_url: require("@/assets/images/category/salty/danhuangjungu.jpg"),
              effect: "补充蛋白质、营养",
              desc: "这款蛋黄菌菇粽真的是诚意满满，除了香菇、茶树菇、真姬菇、蛹虫草这4种风味不同的菌菇，还加了一整颗咸蛋黄，口味咸、鲜、香，实力圈粉！",
            },
            {
              id: 31,
              name: "蜜汁叉烧粽子",
              eName: "MIZHICHASHAO ZONGZI",
              img_url: require("@/assets/images/category/salty/mizhichashao.jpg"),
              effect: "补充蛋白质、营养",
              desc: "叉烧包作为广州茶楼的经典小吃，热度居高不下。而叉烧粽比叉烧包料更足，更有嚼劲，能看到大块的肉肉，肥而不腻，油润丰腴，这次尝鲜一定不能错过。",
            },
            {
              id: 32,
              name: "香肠粽子",
              eName: "XIANGCHANG ZONGZI",
              img_url: require("@/assets/images/category/salty/xiangchang.jpg"),
              effect: "补充蛋白质、营养",
              desc: "香肠的口感更加Q弹，搭配上糯米的软糯，口感更有嚼劲~",
            },
            {
              id: 33,
              name: "干菜扣肉粽子",
              eName: "GANCAIKOUROU ZONGZI",
              img_url: require("@/assets/images/category/salty/xiangchang.jpg"),
              effect: "补充蛋白质、营养",
              desc: "梅菜扣肉大家都吃过，滋味咸鲜，非常下饭，把梅菜扣肉包进粽子里，糯米吸满了扣肉的汤汁，扣肉中又带着梅干菜的香味，每一口都有滋有味。",
            },
            {
              id: 34,
              name: "红烧排骨粽子",
              eName: "HONGSHAOPAIGU ZONGZI",
              img_url: require("@/assets/images/category/salty/hongshaopaigu.jpg"),
              effect: "补充蛋白质、营养",
              desc: "好吧，我承认，我拜倒在了红烧排骨的粽叶下，红烧汁浸透糯米中，超级入味，排骨炖得软烂，就连小骨头都能嚼碎，根本停不下来，别扶我，我还能再吃十个！",
            },
            {
              id: 35,
              name: "笋尖鸡肉粽子",
              eName: "SUNJIANJIROU ZONGZI",
              img_url: require("@/assets/images/category/salty/sunjianjirou.jpg"),
              effect: "补充蛋白质、营养",
              desc: "脆脆的笋尖和软嫩的鸡肉是一对儿绝佳的搭配，肉汁浸透糯米，鲜香又入味。",
            },
            {
              id: 36,
              name: "藤椒牛肉粽子",
              eName: "TENGJIAONIUROU ZONGZI",
              img_url: require("@/assets/images/category/salty/tengjiaoniurou.jpg"),
              effect: "补充蛋白质、营养",
              desc: "新鲜的藤椒油与紧实的牛肋条肉相互碰撞，一口咬下，酥酥麻麻，麻中带鲜，辣而不燥，喜欢重口味的喵友一定不能错过！",
            },
            {
              id: 37,
              name: "黑椒牛肉粽子",
              eName: "TENGJIAONIUROU ZONGZI",
              img_url: require("@/assets/images/category/salty/heijiaoniurou.jpg"),
              effect: "补充蛋白质、营养",
              desc: "这款粽子最大的特色就是糯米中拌着艾草，比普通的肉粽中清香味更浓，一口咬下去黑椒的香气与牛肉的紧实质感完美碰撞，层次超级丰富~！",
            },
            {
              id: 38,
              name: "黑猪鲜肉粽子",
              eName: "HEIZHUXIANROU ZONGZI",
              img_url: require("@/assets/images/category/salty/heizhuxianrou.jpg"),
              effect: "补充蛋白质、营养",
              desc: "别家猪猪没有的口味，它也有！",
            },
            {
              id: 39,
              name: "蘑香山黑猪肉粽子",
              eName: "MUXIANGSHANHEIZHUROU ZONGZI",
              img_url: require("@/assets/images/category/salty/muxiangshanheizhurou.jpg"),
              effect: "补充蛋白质、营养",
              desc: "别家猪猪没有的口味，它也有！",
            },
            {
              id: 40,
              name: "XO酱黑猪肉粽子",
              eName: "XOJIANGHEIZHUROU ZONGZI",
              img_url: require("@/assets/images/category/salty/XOjiangheizhurou.jpg"),
              effect: "补充蛋白质、营养",
              desc: "别家猪猪没有的口味，它也有！",
            },
            {
              id: 41,
              name: "小龙虾粽子",
              eName: "XIAOLONGXIA ZONGZI",
              img_url: require("@/assets/images/category/salty/xiaolongxia.jpg"),
              effect: "补充蛋白质、营养",
              desc: "不是看不见的小肉碎哦，每个粽子里都有整只的小龙虾，饱满Q弹，鲜美无比，这波安利我先干为敬！",
            },
            {
              id: 42,
              name: "卫龙辣条粽子",
              eName: "WEILONGLATIAO ZONGZI",
              img_url: require("@/assets/images/category/salty/weilonglatiao.jpg"),
              effect: "补充蛋白质、营养",
              desc: "一向会玩儿的卫龙，也把魔爪伸向了粽子。本以为是作妖实验，没想到有意外惊喜！魔芋辣条与蛋黄肉粽的邂逅，麻辣鲜香层层递进，再加上糯米做中和，口味又不会显得太重，今年一定要尝鲜！",
            },
          ];
          break;
        case "3":
          // 特殊地区粽
          this.zongziData = [
            {
              id: 43,
              name: "大黄米粽子",
              eName: "DAHUANGMI ZONGZI",
              img_url: require("@/assets/images/category/special/dahuangmi.jpg"),
              effect: "补充蛋白质、碳水化合物、维生素E",
              desc: "山东特色粽子，据说是粽子中“辈分最大，资历最老”的。不同于一般的粽子，这款粽子用的是黄黏米，里面有两颗红枣，没有蜜枣粽甜，吃的时候可以蘸些白糖~",
            },
            {
              id: 44,
              name: "西安蜂蜜凉粽子",
              eName: "XIANFENGMI ZONGZI",
              img_url: require("@/assets/images/category/special/xianfengmiliang.jpg"),
              effect: "调理胃肠功能、促进消化、提高免疫力",
              desc: "这个是西安的传统吃法，其实就是在白粽子上淋上蜂蜜，一般吃凉的，口感非常清甜，只有淡淡的蜂蜜香味，特别适合夏天吃~",
            },
            {
              id: 45,
              name: "四川麻辣牛肉粽子",
              eName: "SICHUANGMALANIUROU ZONGZI",
              img_url: require("@/assets/images/category/special/sichuanmalaniurou.jpg"),
              effect: "排毒、排汗",
              desc: "四川的麻辣四川的粽，噬辣爱好者一定不能错过！麻辣鲜香，吃到大汗淋漓才过瘾~",
            },
            {
              id: 46,
              name: "台湾风味肉粽子",
              eName: "TAIWANFENGWEIROU ZONGZI",
              img_url: require("@/assets/images/category/special/taiwanfengweirou.jpg"),
              effect: "补充蛋白质、营养",
              desc: "3分肥7肥瘦的完美比例，均匀不油腻，比普通的肉粽多加了香菇和虾米等配料，鲜味更浓！蒸煮完，趁着热乎劲儿咬上一口，那游走在唇齿间的肉香、米香，让人欲罢不能~",
            },
            {
              id: 47,
              name: "云南竹筒粽子",
              eName: "YUNNANZHUTONG ZONGZI",
              img_url: require("@/assets/images/category/special/yunnanzhutong.jpg"),
              effect: "补充蛋白质、营养",
              desc: "这是云南少数民族偏爱的吃法，用新鲜的金竹、香竹、薄竹、甜竹做容器，馅料不限，甜的有红豆、蜜枣...咸的有鲜肉、蛋黄..想吃什么加什么，特点是有淡淡的竹香~用小勺子吃，不脏手。",
            },
            {
              id: 48,
              name: "粤西碱水粽子",
              eName: "YUNNANZHUTONG ZONGZI",
              img_url: require("@/assets/images/category/special/yuexijianshui.jpg"),
              effect: "补充蛋白质、营养",
              desc: "广东粤西的特色粽子，是用泡过碱水的糯米做的，泡后的糯米略黄一些，比普通的糯米更有弹性，米粒不粘不散，常常加入豆沙、蜜枣这些做甜粽辅料。",
            },
            
          ];
          break;

        case "4":
          this.zongziData = [
            {
              id: 50,
              name: "鲍鱼粽子",
              eName: "BAOYU ZONGZI",
              img_url: require("@/assets/images/category/tycoon/baoyu.jpg"),
              effect: "补充蛋白质、碳水化合物、维生素E",
              desc: "城会玩，看到鲍鱼粽的第一反应就是，贵...每一口都是金钱的味道，鲍鱼说：我也想低调，可实力不允许啊。",
            },
            {
              id: 51,
              name: "海参粽子",
              eName: "HAISHEN ZONGZI",
              img_url: require("@/assets/images/category/tycoon/haishen.jpg"),
              effect: "补充蛋白质、碳水化合物、维生素E",
              desc: "鲍鱼都装不下你了是吧，海参也来凑热闹，此刻，只想默默的说一句经典小品的台词：这可是大~补~啊~",
            },
            {
              id: 52,
              name: "海参栗子棕子",
              eName: "HAISHENLIZI ZONGZI",
              img_url: require("@/assets/images/category/tycoon/haishenlizi.jpg"),
              effect: "补充蛋白质、碳水化合物、维生素E",
              desc: "海参粽里加入了栗子，咸鲜中多了几分栗子的甜香~",
            },
            {
              id: 53,
              name: "松茸粽子",
              eName: "SONGRONG ZONGZI",
              img_url: require("@/assets/images/category/tycoon/songrong.jpg"),
              effect: "补充蛋白质、碳水化合物、维生素E",
              desc: "野生松茸产量低、生长在高海拔区域，采摘不易，价格贵，不折不扣的“土豪”~但放在粽子里，总觉得有些大材小用，好在都是吃进肚里了，以什么形式就不重要啦~",
            },
            {
              id: 54,
              name: "蟹肉蛋黄粽子",
              eName: "XIEROUDANHUANG ZONGZI",
              img_url: require("@/assets/images/category/tycoon/xieroudanhuang.jpg"),
              effect: "补充蛋白质、碳水化合物、维生素E",
              desc: "有蟹黄自然就少不了蟹肉，很多人不吃螃蟹其实就是懒得剥，这下好，直接取肉放在粽子了，大口吃蟹肉的感觉真的太爽了！",
            },
          ];
          break;
        case "5":
          this.zongziData = [
            {
              id: 71,
              name: "豆沙燕窝粽子",
              eName: "DOUSHAYANWO ZONGZI",
              img_url: require("@/assets/images/category/nest/doushayanwo.jpg"),
              effect: "补充蛋白质、美颜、维生素E",
              desc: "看得见的燕窝，元气大口吃出来～",
            },
            {
              id: 56,
              name: "黑芝麻燕窝粽子",
              eName: "HEIZHIMAYANWO ZONGZI",
              img_url: require("@/assets/images/category/nest/heizhimayanwo.png"),
              effect: "补充蛋白质、美颜、维生素E",
              desc: "看得见的燕窝，元气大口吃出来～",
            },
            {
              id: 57,
              name: "莲蓉燕窝粽子",
              eName: "LIANGRONGYANWO ZONGZI",
              img_url: require("@/assets/images/category/nest/liangrongyanwo.jpg"),
              effect: "补充蛋白质、美颜、维生素E",
              desc: "看得见的燕窝，元气大口吃出来～",
            },
            {
              id: 58,
              name: "甜橙茉莉燕窝冰粽子",
              eName: "TIANCHENGMOLIYANWOB ZONGZI",
              img_url: require("@/assets/images/category/nest/tianchengmoliyanwobing.jpg"),
              effect: "补充蛋白质、美颜、维生素C",
              desc: "看得见的燕窝，元气大口吃出来～",
            },
            {
              id: 59,
              name: "紫薯燕窝冰粽子",
              eName: "ZISHUYANWOBING ZONGZI",
              img_url: require("@/assets/images/category/nest/zishuyanwobing.jpg"),
              effect: "补充蛋白质、美颜、维生素C",
              desc: "看得见的燕窝，元气大口吃出来～",
            },

            {
              id: 60,
              name: "西番莲菠萝燕窝冰粽子",
              eName: "XIFANLIANGBOLUOYANWO ZONGZI",
              img_url: require("@/assets/images/category/nest/xifanlianboluoyanwobing.jpg"),
              effect: "补充蛋白质、美颜、维生素C",
              desc: "看得见的燕窝，元气大口吃出来～",
            },
            {
              id: 61,
              name: "蜜瓜燕窝冰粽子",
              eName: "MIGUAYANWOBING ZONGZI",
              img_url: require("@/assets/images/category/nest/miguayanwobing.jpg"),
              effect: "补充蛋白质、美颜、维生素C",
              desc: "看得见的燕窝，元气大口吃出来～",
            },
            {
              id: 62,
              name: "红柚燕窝冰粽子",
              eName: "HONGYOUYANWOBING ZONGZI",
              img_url: require("@/assets/images/category/nest/hongyouyanwobing.jpg"),
              effect: "补充蛋白质、美颜、维生素C",
              desc: "看得见的燕窝，元气大口吃出来～",
            },
            {
              id: 63,
              name: "焦糖榛果燕窝冰粽子",
              eName: "JIAOTANGZHENGUOYANWOBING ZONGZI",
              img_url: require("@/assets/images/category/nest/jiaotangzhenguoyanwobing.jpg"),
              effect: "补充蛋白质、美颜、维生素C",
              desc: "看得见的燕窝，元气大口吃出来～",
            },
            {
              id: 64,
              name: "白桃茉莉燕窝冰粽子",
              eName: "BAITAOMOLIYANWOBING ZONGZI",
              img_url: require("@/assets/images/category/nest/baitaomoliyanwobing.jpg"),
              effect: "补充蛋白质、美颜、维生素C",
              desc: "看得见的燕窝，元气大口吃出来～",
            },
            {
              id: 65,
              name: "荔枝燕窝冰粽子",
              eName: "LIZHIYANWOBING ZONGZI",
              img_url: require("@/assets/images/category/nest/lizhiyanwobing.jpg"),
              effect: "补充蛋白质、美颜、维生素C",
              desc: "看得见的燕窝，元气大口吃出来～",
            },
          ];
          break;

        case "6":
          this.zongziData = [
            {
              id: 66,
              name: "草莓雪冰粽子",
              eName: "DOUSHAYANWO ZONGZI",
              img_url: require("@/assets/images/category/cool/caomeixuebing.jpg"),
              effect: "补充蛋白质、美颜、维生素E",
              desc: "想象一下，雪白的糯米皮，包裹着3种口味的冰淇淋，香甜软糯，冰爽沁人，炎炎夏日吃上一口，完美！",
            },
            {
              id: 67,
              name: "草莓雪龙粽子",
              eName: "CAOMEIXUELONG ZONGZI",
              img_url: require("@/assets/images/category/cool/caomeixuelong.jpg"),
              effect: "补充蛋白质、美颜、维生素E",
              desc: "想象一下，雪白的糯米皮，包裹着3种口味的冰淇淋，香甜软糯，冰爽沁人，炎炎夏日吃上一口，完美！",
            },
            {
              id: 68,
              name: "芒果雪龙粽子",
              eName: "MANGGUOXUELONG ZONGZI",
              img_url: require("@/assets/images/category/cool/mangguoxuelong.jpg"),
              effect: "补充蛋白质、美颜、维生素E",
              desc: "想象一下，雪白的糯米皮，包裹着3种口味的冰淇淋，香甜软糯，冰爽沁人，炎炎夏日吃上一口，完美！",
            },
            {
              id: 69,
              name: "香草雪龙粽子",
              eName: "XIANGCHAOXUELONG ZONGZI",
              img_url: require("@/assets/images/category/cool/xiangcaoxuelong.jpg"),
              effect: "补充蛋白质、美颜、维生素E",
              desc: "想象一下，雪白的糯米皮，包裹着3种口味的冰淇淋，香甜软糯，冰爽沁人，炎炎夏日吃上一口，完美！",
            },
          ];
          break;
      }
    },

    // 切换 Drawer
    switchDrawerStatus(name) {
      this.isShowDrawer = true;
      this.currZongziName = name;
    },
    // 切换isShowDetail
    switchDatailStutas(id) {
      this.isShowDetail = true;
      this.currZongziId = id;
    },


		// 切换 Drawer
		switchDrawerStatus(name) {
			this.isShowDrawer = true
			this.currZongziName = name
		},
		// 切换isShowDetail
		switchDatailStutas(id, name) {
			this.isShowDetail = true
			this.currZongziId = id
			this.currZongziName = name
		},

		...mapActions(["setActiveIndex"])
	},

	computed: {
		...mapState(["activeIndex"])
	}
}
</script>
<style scoped>
@media screen and (max-width: 768px) {
	/deep/ .is-left {
		width: 90px;
	}

	/deep/ .el-tabs__item {
		padding: 0 10px !important;
    
	}

	/deep/ .el-tabs {
		padding: 0 !important;
	}
}

.zongzi_category {
	width: 100%;
	height: auto;
}

.container {
	margin: 10px auto;
}
</style>