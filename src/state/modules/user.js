import { ref } from 'vue'

export default function () {
  // states
  const userSelectedShop = ref({
    shop_id: '',
    shop_name: '',
    shop_owner: '',
    shop_contact: '',
    in_business: true,
    shop_address: '',
  })
  // mutations
  const reUserSelectdeShop = shop => {
    userSelectedShop.value = shop
  }
  // actions

  return {
    state: { userSelectedShop },
    mutations: { reUserSelectdeShop },
    actions: {},
  }
}
