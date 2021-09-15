import useControler from './modules/controler'
import useUser from './modules/user'

export const coreState = (() => ({
  controler: useControler(),
  user: useUser(),
}))()

export const coreStateKey = Symbol('coreState')
