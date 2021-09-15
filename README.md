**基于Vue3和vite构建的小型商城平台**

```typescript
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10)
// 用户表
interface User {
  // 用户唯一标识（不同于微信）
  uid: string
  // 用户名
  username: string
  // 用户地址
  address: string
  // 用户联系电话
  phone: string
  // 用户QQ
  qq: string
  // 用户状态 0:正常 1:封禁 2:其它
  status: 0 | 1 | 2
  // 信用分（v2.0）
  credit: 0
  // 用户创建时间
  create: Date
  // 用户创建时ip
  ip: string
}

// 购物车
interface ShoppingCart {}

interface ItemOrder extends ItemOvervier {
  // 购买数量
  count: number
  // 交易方式 0:自取还 1:上门取还
  transport_type: 0 | 1
}

// 商品
interface Item extends ItemOvervier {
  // 性别分类，0:男装 1:女装
  sex_sort: 0 | 1
  // 具体分类 0:上衣 1:领带 2:裤子 3:鞋子 4: 5: 6:。。。。
  type_sort: 0 | 1 | 2 | 3 | 4 | 5 | 6
  // 商品详情图
  details_img: string[]
  // 商品是否展示
  display: boolean
  // 是否为租赁商品
  isLease: boolean
  // 量纲
  dimension: string
  // 浏览数
  views: number
  // 分享数
  shares: number
  // 库存数
  stock: number
  // 库存预警（0为关闭预警）,受showStock影响
  stock_alert: number
  // 否显示库存
  show_stock: boolean
  // 销量
  sales: number
  // 评论数
  comment_count: number
  // 创建日期
  create: Date
  // 修改日期
  edit: Date
}

interface ItemOvervier {
  // 商品唯一标识
  gid: string
  // 商品名称
  name: string
  // 商品图片
  banner_img: string[]
  // 描述
  describe: string
  // 原价
  original_price: number
  // 现价
  present_price: number
}

```