import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import AddTransaction from '../views/AddTransaction.vue'
import MonthlySummary from '@/views/MonthlySummary.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/add', component: AddTransaction },
  { path: '/monthly-summary', component: MonthlySummary }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
