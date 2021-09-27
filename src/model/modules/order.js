export const shopOrder = {
  // 订单 id
  order_id: '',
  // 顾客 id
  user_id: '',
  // 配送方式（0-自提 1-上门 2-快递）
  delivery_type: 0,
  // 订单商品实际总价格
  total_price: 0,
  // 配送费
  delivery_price: 0,
  // 订单状态
  order_status: 0,
  // 订单创建时间戳
  create_time: new Date().getTime(),
  // 订单取消时间戳
  cancel_time: new Date().getTime(),
}

// 子订单详情表
export const shopOrderDetails = {
  // 子订单 id（自增）
  child_order_id: '',
  // 关联父订单 id
  parent_order_id: '',
  // 商品名称
  goods_name: '',
  // 商品 id
  goods_id: '',
  // 下单数量
  count: 0,
  // 指导单价（分）
  unit_price: 0,
  // 实际单价（分）
  real_price: 0,
  // 实际总价（分）
  total_price: 0,
  // 押金总金额（分）
  total_deposit: 0,
  // 理论租金总金额（未超时）（分）
  rent_money: 0,
  // json 格式的 sku 数据
  sku_info: new Object(),
  // 销售类型（0-租赁 1-全新）
  sale_type: 0,
  // 租赁期时长（天）
  rent_duration: 0,
  // 开始租赁时间
  rent_start_time: new Date().getTime(),
  // 子订单状态
  status: 0,
}

// 商品订单上门配送表
export const shopOrderDtdDelivery = {
  // 索引 id（自增）
  id: '',
  // 订单 id
  order_id: '',
  // 所属商铺 id
  shop_id: '',
  // 顾客 id
  user_id: '',
  // 安排上门派送时间戳
  give_time: new Date().getTime(),
  // 安排上门回收时间戳
  return_time: new Date().getTime(),
  // 实际送达时间戳
  give_reach_time: new Date().getTime(),
  // 实际归还时间戳
  return_reach_time: new Date().getTime(),
  //; 商品配送状态（0-待准备 1-配送中 2-已送达 3-已取消）
  status: 0,
}

// 商品订单自提管理表
export const shopOrderSelfDelivery = {
  // 索引 id（自增）
  id: '',
  // 关联订单 id
  order_id: '',
  // 所属商铺 id
  shop_id: '',
  // 自提到店取货时间
  pickup_time: new Date().getTime(),
  // 自提到店归还时间
  return_time: new Date().getTime(),
  //自提状态
  status: 0,
}

// 商城订单支付表
export const shopOrderPayment = {
  // 索引 id（自增）
  id: '',
  // 订单 id
  order_id: '',
  // 微信支付系统生成的订单号
  transaction_id: '',
  // 交易状态描述
  trade_state_desc: '',
  // 支付完成时间
  success_time: new Date().getTime(),
  // 实际支付金额（分）
  payer_total: 0,
  //交易状态
  trade_state: 0,
  //订单类型（0-租赁 1-全新）
  order_type: 0,
}
