import useControler from './modules/controler'

export const coreState = (() => ({
  controler: useControler(),
}))()

export const coreStateKey = Symbol('coreState')
