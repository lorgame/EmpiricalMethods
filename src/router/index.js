import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import error from '@/views/404error.vue'
import LaboratoryFirst from '@/views/LaboratoryFirst.vue'
import LaboratorySecond from '@/views/LaboratorySecond.vue'
import LaboratoryThird from '@/views/LaboratoryThird.vue'
import LaboratoryFourth from '@/views/LaboratoryFourth.vue'
import LaboratoryFifth from '@/views/LaboratoryFifth.vue'
import LaboratorySixth from '@/views/LaboratorySixth.vue'
import LaboratorySeventh from '@/views/LaboratorySeventh.vue'
import LaboratoryEighth from '@/views/LaboratoryEighth.vue'
import LaboratoryNinth from '@/views/LaboratoryNinth.vue'
import LaboratoryTenth from '@/views/LaboratoryTenth.vue'
import LaboratoryEleventh from '@/views/LaboratoryEleventh.vue'
import LaboratoryTwelfth from '@/views/LaboratoryTwelfth.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/laboratoryNumber1',
    name: 'laboratoryFirst',
    component: LaboratoryFirst
  },
  {
    path: '/laboratoryNumber2',
    name: 'LaboratorySecond',
    component: LaboratorySecond
  },
  {
    path: '/laboratoryNumber3',
    name: 'LaboratoryThird',
    component: LaboratoryThird
  },
  {
    path: '/laboratoryNumber4',
    name: 'LaboratoryFourth',
    component: LaboratoryFourth
  },
  {
    path: '/laboratoryNumber5',
    name: 'LaboratoryFifth',
    component: LaboratoryFifth
  },
  {
    path: '/laboratoryNumber6',
    name: 'LaboratorySixth',
    component: LaboratorySixth
  },
  {
    path: '/laboratoryNumber7',
    name: 'LaboratorySeventh',
    component: LaboratorySeventh
  },
  {
    path: '/laboratoryNumber8',
    name: 'LaboratoryEighth',
    component: LaboratoryEighth
  },
  {
    path: '/laboratoryNumber9',
    name: 'LaboratoryNinth',
    component: LaboratoryNinth
  },
  {
    path: '/laboratoryNumber10',
    name: 'LaboratoryTenth',
    component: LaboratoryTenth
  },
  {
    path: '/laboratoryNumber11',
    name: 'LaboratoryEleventh',
    component: LaboratoryEleventh
  },
  {
    path: '/laboratoryNumber12',
    name: 'LaboratoryTwelfth',
    component: LaboratoryTwelfth
  },
  {
    path: '/:catchAll(.*)',
    component: error
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
