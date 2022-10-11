import Vue from 'vue'
import Router from 'vue-router'
import Root from './views/Root.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Revision from './views/Revision.vue'
import CollectionView from './views/CollectionView.vue'
import Collections from './views/Collections.vue'
import DeckView from './views/DeckView.vue'
import DeckPage from './views/DeckPage.vue'
import RevisionPage from './views/RevisionPage.vue'

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
      path: '/revise/:id',
      name: 'revise',
      component: Revision
    },
    {
      path: '/collection/:id',
      name: 'collection',
      component: CollectionView
    },
    {
      path: '/collections',
      name: 'collections',
      component: Collections
    },
    {
      path: '/deck/:id',
      name: 'deck',
      component: DeckView
    },
    {
      path: '/decks',
      name: 'decks',
      component: DeckPage
    },
    {
      path: '/revisionPage',
      name: 'revisionPage',
      component: RevisionPage
    }
  ]
})
