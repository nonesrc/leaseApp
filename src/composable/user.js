import { ref } from 'vue'
import { userLogin_API } from '../api'
import { axiosDataResolveHandle } from '../utils/helper'
import { shopUser } from '../model'
import {coreState} from '../state'

export default function () {
    
  // 当前用户基本信息
  const user = ref({ ...shopUser })

  // 用户登录
  const userLogin = async code => {
    const { success, data } = axiosDataResolveHandle(await userLogin_API(code))
    
  }
}
