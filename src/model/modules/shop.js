// 商品购物车表
export const shopCartDetails = {
  // 索引 id（自增）
  id: '',
  // 顾客 id
  users_id: '',
  // 商品 id
  goods_id: '',
  // 所属店铺 id
  shop_id: '',
  // 加车数量
  count: 0,
  // 销售类型（0-租赁 1-全新）
  sale_type: 0,
  // 租赁期时长（天）
  rent_duration: 0,
  // 开始租赁时间
  rent_start_time: new Date().getTime(),
}
