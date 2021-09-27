// 商城租赁押金退换情况
export const shopRentRefund = {
  // 索引 id（自增）
  id: '',
  // 对应子订单 id
  child_order_id: '',
  // 商铺 id
  shop_id: '',
  // 实缴押金
  deposit_paid: 0,
  // 实缴租金
  rent_paid: 0,
  // 最终退换押金
  deposit_back: 0,
  // 退换状态
  status: 0,
  // 退换情况备注
  note: '',
  // 操作人后台账户 id
  operator_id: '',
  // 完成时间戳
  finished_time: new Date().getTime(),
}

// 商城自提店铺基本信息
export const shopStoreInfo = {
  // 索引 id（自增）
  id: '',
  // 店铺 id
  shop_id: '',
  // 店铺名称
  shop_name: '',
  // 联系电话
  contact_phone: '',
  // 店铺地址
  address: '',
  // 创建时间
  create_time: new Date().getTime(),
  // 自提点备注
  note: '',
  // 当前是否营业（打烊功能）
  is_open: 0,
}
