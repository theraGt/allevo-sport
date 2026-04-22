import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import TalentPage from '../views/TalentPage.vue'
import SistemaPage from '../views/SistemaPage.vue'
import MarcasPage from '../views/MarcasPage.vue'
import BiografiasPage from '../views/BiografiasPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/talentos',
    name: 'Talentos',
    component: TalentPage
  },
  {
    path: '/talento/:slug',
    name: 'Biografia',
    component: BiografiasPage
  },
  {
    path: '/sistema',
    name: 'Sistema',
    component: SistemaPage
  },
  {
    path: '/marcas',
    name: 'Marcas',
    component: MarcasPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
