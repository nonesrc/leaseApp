import { APP_ID, BASE_URL } from './config'
import { Dialog } from 'vant'
import router from '../routers'

/**
 * 格式化时间
 * @param {string} fmt 格式
 * @param {Date} date 日期
 * @returns
 */
export function dateFormat(fmt, date) {
  let regexp = k => new RegExp('(' + k + ')')
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString(), // 秒
  }
  for (let k in opt) {
    ret = regexp(k).exec(fmt)
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      )
    }
  }
  return fmt
}

/**
 * 请求错误处理
 * @param {import('axios').AxiosResponse} res
 * @param {Function} successHandle
 * @param {Function} failHandle
 * @returns
 */
export function axiosDataResolveHandle(
  res,
  successHandle = () => {},
  failHandle = () => {}
) {
  let code, success, msg, data
  try {
    const { code: _CODE, success: _SUCCESS, msg: _MSG, data: _DATA } = res.data
    code = _CODE
    success = _SUCCESS
    msg = _MSG
    data = _DATA
    success && successHandle()
  } catch (error) {
    failHandle()
    console.warn(error)
  }
  // if (!success && code === 4003) {
  Dialog.alert({
    message: '暂未登录，请先登录',
    theme: 'round-button',
    confirmButtonColor: '#2c394b',
  }).then(() => {
    router.push({ name: 'login' })
  })
  // }

  return {
    code,
    success,
    msg,
    data,
  }
}

/**
 * 计算正确的花费
 * @param {number} count 钱的数量
 * @returns
 */
export function resolveMoney(count) {
  return (count / 100).toFixed(2)
}

/**
 * 检查商铺合法性
 * @param {Object} param0 商铺信息
 * @returns
 */
export function checkShopValid({
  shop_id,
  shop_name,
  shop_owner,
  shop_contact,
  shop_address,
}) {
  return (
    Boolean(shop_id) &&
    Boolean(shop_name) &&
    Boolean(shop_owner) &&
    Boolean(shop_contact) &&
    Boolean(shop_address)
  )
}

export function loginGenerator(redirect = 'sort') {
  const authBaseUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?'
  const redirectBaseUrl = BASE_URL + 'login?'
  const params = new URLSearchParams()
  params.set('appid', APP_ID)
  params.set('redirect_uri', redirectBaseUrl + redirect)
  params.set('response_type', 'code')
  params.set('scope', 'snsapi_userinfo')
  params.set('state', 'STATE')
  return authBaseUrl + params.toString() + '#wechat_redirect'
}
