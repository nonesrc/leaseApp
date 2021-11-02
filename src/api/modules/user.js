import { ARFactory } from '../config'

/**
 * 获取用户信息
 * @param {string} code 用户码
 * @returns
 */
export function userLogin_API(code) {
  return ARFactory({
    url: DEV_MODE ? '/api/public/user/login' : '',
    method: 'POST',
    data: {
      code,
    },
  })
}
