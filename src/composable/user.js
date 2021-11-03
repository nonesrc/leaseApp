import { ref } from 'vue'
import { userLogin_API } from '../api'
import { axiosDataResolveHandle } from '../utils/helper'
import { shopUser } from '../model'

export default function () {
  // 用户登录
  const userLogin = async code => {
    const { success, data } = axiosDataResolveHandle(await userLogin_API(code))
  }
}
