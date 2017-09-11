import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/home.vue'
import Hello from './components/hello.vue'
import About from './components/about.vue'
import Category from './components/category.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/category/:action',
      name: 'Category',
      component: Category
    },
    {
      path: '/category/:action/:id',
      name: 'Category',
      component: Category
    }
  ],

  mode: 'history'
})
