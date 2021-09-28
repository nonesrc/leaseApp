// 商品详细信息表
export const shopGoodsDetails = {
  ...shopGoodsOverview,
  ...shopGoodsStatus,
  // 商品描述
  description: '',
  // 轮播图 id 数组
  slide_show_array: [],
  // 商品详情图 id 数组
  deatil_imgs: [],
  // 销售类型（0-租赁商品 1-全新商品）
  sale_type: 0,
  // 是否为商品套装
  is_suit: 0,
  // 上架时间
  create_time: new Date().getTime(),
  // 最后编辑时间
  last_edit_time: new Date().getTime(),
}

// 商品大致信息表
export const shopGoodsOverview = {
  // 商品 id(索引)
  goods_id: '',
  // 商品条码值
  goods_code: '',
  // 所属店铺 id
  shop_id: '',
  // 商品名称
  goods_name: '',
  // 单位/量纲
  unit: '',
  // 主图片 id
  main_img: '',
}

// 商品状态表
export const shopGoodsStatus = {
  // 是否上架
  is_show: 0,
  // 浏览量
  view_nums: 0,
  // 销售量
  sales_nums: 0,
}

// 零售商品价目表
export const shopSellGoodsPrice = {
  // 零售-市场单价（分）
  market_price: 0,
  // 零售-商品原单价（分）
  original_price: 0,
  // 零售-商品成本价（分）
  cost_price: 0,
}

// 租赁商品价目表
export const shopRentGoodsPrice = {
  // 产品租赁-押金（分）
  deposit: 0,
  // 租金/天（分）
  rent_money: 0,
  // 产品本金（分）
  original_price: 0,
}

// 商品套装详情表
export const shopGoodsSuitDetails = {
  // 索引 id (自增)
  id: '',
  // 关联商品表 id
  goods_id: '',
  // 所包含子商品 id 的 array
  items_array: [],
}
