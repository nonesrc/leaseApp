import Entrance from '../../views/entrance.vue'
import Home from '../../components/lease/home.vue'
import Sort from '../../components/lease/sort.vue'
import Mine from '../../components/lease/mine.vue'

// 登录页
const entrance = {
  path: '/',
  name: 'entrance',
  component: Entrance,
  meta: {
    tag: 'entrance',
  },
  children: [
    {
      path: 'home',
      name: 'lease_home',
      component: Home,
    },
    {
      path: 'sort',
      name: 'lease_sort',
      component: Sort,
    },
    {
      path: 'mine',
      name: 'lease_mine',
      component: Mine,
    },
  ],
}

export default [entrance]
