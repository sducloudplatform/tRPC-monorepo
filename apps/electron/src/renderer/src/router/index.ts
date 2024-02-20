import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'

const routes = [


  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/todo',
        name: 'Todo',
        component: () => import( "../views/Todo.vue")
      },
      {
        path: '/finished',
        name: 'Finished',
        component: () => import( "../views/Finished.vue")
      },
      {
        path: '/add',
        name: 'Add',
        component: () => import('../views/Add.vue')
      }

    ]
    
  },
  {
    path: "/login",
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: "/register",
        name: 'Register',
        component: () => import('../views/Register.vue')
      },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router