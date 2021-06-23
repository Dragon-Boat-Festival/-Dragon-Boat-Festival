import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push

const About = () => import('@/views/About')
const Category = () => import('@/views/Category')
const Hold = () => import('@/views/Hold')
const News = () => import('@/views/News')
Vue.use(VueRouter)





const routes = [
	{
		path: '/',
		component: About
	},
	{
		path: '/category',
		component: Category
	},
	{
		path: '/hold',
		component: Hold
	},
	{
		path: '/news',
		component: News
	},

]
const router = new VueRouter({
	routes,
	mode: "hash"
})
//  避免到当前位置的冗余导航
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}


export default router
