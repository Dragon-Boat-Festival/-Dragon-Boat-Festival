import Vue from 'vue'

import {
	Button,
	Icon,
	Drawer,
	Image,
	Collapse,
	CollapseItem,
	Carousel,
	CarouselItem,
	Loading,
	Card,
	RadioGroup,
	Steps,
	Step,
	Dialog,
	Tabs,
	TableColumn,
	Table,
	Divider,
	TabPane,
	Menu,
	MenuItem,
	Message,
	Avatar,
	Pagination,
	Form,
	InputNumber,
	Radio,
	Row,
	Col,
	RadioButton
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.use(Button)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Image)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Card)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Dialog)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(TableColumn)
Vue.use(TabPane)
Vue.use(Divider)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Avatar)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Col)
Vue.use(Loading)
Vue.use(RadioGroup)
Vue.use(RadioButton)

Vue.config.productionTip = false
Vue.use(Loading.directive)
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
