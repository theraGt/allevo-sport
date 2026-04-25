import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import TalentPage from '../views/TalentPage.vue'
import SistemaPage from '../views/SistemaPage.vue'
import MarcasPage from '../views/MarcasPage.vue'
import BiografiasPage from '../views/BiografiasPage.vue'
import NoticiasPage from '../views/NoticiasPage.vue'
import JoinEcosystem from '../views/JoinEcosystem.vue'
import ContactoPage from '../views/ContactoPage.vue'
import TerminosPage from '../views/TerminosPage.vue'
import PrivacidadPage from '../views/PrivacidadPage.vue'
import Login from '../components/Admin/Login.vue'
import DashboardLayout from '../components/Admin/Dashboard/DashboardLayout.vue'
import DashboardOverview from '../views/Admin/DashboardOverview.vue'
import AtletasDashboard from '../views/Admin/AtletasDashboard.vue'
import SponsorsDashboard from '../views/Admin/SponsorsDashboard.vue'
import InversionistasDashboard from '../views/Admin/InversionistasDashboard.vue'
import ProyectosDashboard from '../views/Admin/ProyectosDashboard.vue'

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
  },
  {
    path: '/se-parte',
    name: 'JoinEcosystem',
    component: JoinEcosystem
  },
  {
    path: '/contacto',
    name: 'Contacto',
    component: ContactoPage
  },
  {
    path: '/terminos',
    name: 'Terminos',
    component: TerminosPage
  },
  {
    path: '/privacidad',
    name: 'Privacidad',
    component: PrivacidadPage
  },
  {
    path: '/noticias',
    name: 'Noticias',
    component: NoticiasPage
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: Login
  },
  {
    path: '/admin/dashboard',
    redirect: '/admin/dashboard/overview'
  },
  {
    path: '/admin/dashboard/overview',
    name: 'DashboardOverview',
    component: DashboardOverview
  },
  {
    path: '/admin/dashboard/atletas',
    name: 'AtletasDashboard',
    component: AtletasDashboard
  },
  {
    path: '/admin/dashboard/sponsors',
    name: 'SponsorsDashboard',
    component: SponsorsDashboard
  },
  {
    path: '/admin/dashboard/inversionistas',
    name: 'InversionistasDashboard',
    component: InversionistasDashboard
  },
  {
    path: '/admin/dashboard/proyectos',
    name: 'ProyectosDashboard',
    component: ProyectosDashboard
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
