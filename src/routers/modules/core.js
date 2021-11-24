import Entrance from '../../views/entrance.vue'
import Home from '../../components/lease/home.vue'
import Sort from '../../components/lease/sort.vue'
import Mine from '../../components/lease/mine.vue'

// 登录页
const entrance = {
  path: '/',
  component: Entrance,
  meta: {
    tag: 'entrance',
  },
  children: [
    {
      path: '',
      redirect: '/home',
    },
    {
      path: 'home',
      name: 'lease_home',
      component: Home,
      meta: {
        tag: 'home',
      },
    },
    {
      path: 'sort/:sortType',
      name: 'lease_sort',
      component: Sort,
      meta: {
        tag: 'sort',
      },
    },
    {
      path: 'mine',
      name: 'lease_mine',
      component: Mine,
      meta: {
        tag: 'mine',
      },
    },
  ],
}

export default [entrance]
