import Vue from 'vue'
import Router from 'vue-router'
import Root from './views/Root.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Revision from './views/Revision.vue'
import Decks from './views/Decks.vue'
import Card from './views/Card.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Root
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/revision',
      name: 'revision',
      component: Revision
    },
    {
      path: '/collection/:id',
      name: 'collection',
      component: Decks
    },
    {
      path: '/deck/:id',
      name: 'deck',
      component: Card
    }
  ]
})
