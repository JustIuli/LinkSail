import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import LinkAnalyticsView from '../views/LinkAnalyticsView.vue';
import RedirectView from '../views/RedirectView.vue';
import CreatedLinkView from '../views/CreatedLinkView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/a',
    name: 'linkAnalytics',
    component: LinkAnalyticsView    
  },
  {
    path: '/a/:linkId',
    name: 'createdLinkAnalytics',
    component: CreatedLinkView
  },
  {
    path: '/l/:linkId',
    name: 'analytics',
    component: RedirectView    
  }
  /*
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about"  '../views/AboutView.vue')
  }

  */
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
