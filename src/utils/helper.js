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
  } catch (error) {
    throw new Error('发生错误')
  }
  success ? successHandle() : failHandle()
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
