import { ARFactory } from '../config'
const DEV_MODE = import.meta.env.VITE_MODE === 'DEV'
/**
 * 获取用户信息
 * @param {string} code 用户码
 * @returns
 */
export function userLogin_API(code) {
  return ARFactory({
    // url: DEV_MODE ? '/api/public/user/login' : '',
    url: DEV_MODE ? 'http://192.168.43.48:8888/api/public/user/login' : '',
    method: 'POST',
    data: {
      code,
    },
  })
}
