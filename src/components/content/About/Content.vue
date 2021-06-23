<template>
	<template-slot>
		<template v-slot:leftContainer><h3 class="cell" style="color: var(--color-height-text)">端午节介绍</h3>
			<el-divider></el-divider>
			<img alt='' class='content-img' src='@/assets/images/About/1.webp'>
			<p>端午节，又称端阳节、龙舟节、天中节等，源于自然天象崇拜，由上古时代祭龙演变而来。仲夏端午，苍龙七宿飞升于正南中天，处于全年最“正中”之位，即如《易经·乾卦》第五爻的爻辞曰：“飞龙在天”。</p>
			<p>其起源涵盖了古老星象文化、人文哲学等方面内容，蕴含着深邃丰厚的文化内涵，在传承发展中杂糅了多种民俗为一体，节俗内容丰富。扒龙舟与食粽是端午节的两大礼俗，这两大礼俗在中国自古传承，至今不辍。</p>
			<p>端午节，本是上古先民创立用于拜祭龙祖、祈福辟邪的节日。因传说战国时期的楚国诗人屈原在五月五日跳汨罗江自尽，后来人们亦将端午节作为纪念屈原的节日；也有纪念伍子胥、曹娥及介子推等说法。</p>
			<p>由于屈原深受百姓爱戴，渔民唯恐屈原尸身沉入江底遭食人鱼吞噬，于是拼命用舟桨奋力拍打水面吓走鱼儿。其他村民则用芦叶包裹大米，蒸熟后扔进江里喂食鱼儿，希望因此而保全屈原尸身免受鱼儿侵袭。</p>
			<p>总的来说，端午节起源于上古先民择“飞龙在天”吉日拜祭龙祖、祈福辟邪，注入夏季时令“祛病防疫"风尚；把端午视为“恶月恶日”起于北方中原，附会纪念屈原等历史人物纪念内容。</p>
		</template>
		<template v-slot:rightContainer>
			<el-table
				:data="tableData"
				:header-cell-style='tableHeaderColor'
				class="mt"
				stripe
				style="width: 100%; height: 100%">
				<el-table-column
					label='更多内容'
					prop="key">
				</el-table-column>
				<el-table-column
					prop="value">
				</el-table-column>
			</el-table>
			<el-collapse v-model="activeNames">
				<el-collapse-item name="1" title="您知道吗？">
					<div>自2008年起，端午节被列为国家法定节假日。2009年9月，联合国教科文组织正式批准将其列入《人类非物质文化遗产代表作名录》，端午节成为中国首个入选世界非遗的节日。</div>
			
				</el-collapse-item>
			</el-collapse>
		</template>
	</template-slot>
</template>
<script>
import TemplateSlot from '@/components/content/About/TemplateSlot'

export default {
	name: "Content",
	components: {
		TemplateSlot
	},
	data() {
		return {
			tableData: [{
				key: '中文名',
				value: '端午节'
			}, {
				key: '外文名',
				value: 'Dragon Boat Festival'
			}, {
				key: '别名',
				value: '端阳节、龙节、正阳节、龙舟节、天中节等'
			}, {
				key: '节日时间',
				value: '农历五月初五'
			}, {
				key: "节日起源",
				value:"天象崇拜，龙图腾祭祀",
				
			}, {
				key:"纪念人物",
				value:  "屈原、伍子胥、曹娥、介子推等"
			}, {
				key: "节日意义",
				value: "传承与弘扬非物质文化"
			}],
			activeNames: ['1']
		}
	},
	methods: {
		// 修改table header的背景色
		tableHeaderColor({rowIndex}) {
			if (rowIndex === 0) {
				return 'color: var(--color-text); font-size:18px;padding-bottom: 23px;'
			}
		}
	}
}
</script>
<style scoped>

</style>