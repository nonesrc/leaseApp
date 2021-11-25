import { ref } from 'vue'
import { shopUser } from '../../model'

export default function () {
  // states
  // 当前用户信息
  const currentUser = ref({ ...shopUser })
  // 用户选择的店铺
  const userSelectedShop = ref({
    shop_id: '',
    shop_name: '',
    shop_owner: '',
    shop_contact: '',
    in_business: true,
    shop_address: '',
  })

  // mutations
  const reUserSelectdedShop = shop => {
    userSelectedShop.value = shop
  }
  const reCurrentUser = user => {
    currentUser.value = user
  }
  // actions

  return {
    state: { currentUser, userSelectedShop },
    mutations: { reCurrentUser, reUserSelectdedShop },
    actions: {},
  }
}
