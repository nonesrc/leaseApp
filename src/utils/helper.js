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
    const { code: _CODE, success: _SUCCESS, msg: _MSG, data: _DATA } = res
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
