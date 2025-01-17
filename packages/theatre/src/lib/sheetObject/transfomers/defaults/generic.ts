import { types } from '@theatre/core'
import { isPrimitive } from '../../sync/utils/isPrimitive'
import { createTransformer } from '../createTransformer'

export const generic = createTransformer({
  transform(value) {
    if (isPrimitive(value)) {
      if (typeof value === 'number') {
        return types.number(value === Infinity ? Number.MAX_VALUE : value)
      } else if (typeof value === 'string') {
        return types.string(value)
      } else if (typeof value === 'boolean') {
        return types.boolean(value)
      }
    }
    return types.compound({
      ...value
    })
  },
  apply(target, path, value) {
    if (isPrimitive(target[path])) {
      target[path] = value
    } else {
      Object.assign(target[path], value)
    }
  }
})
