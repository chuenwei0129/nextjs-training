import { type PropType, defineComponent } from 'vue'

export type SchemaTypes = 'number' | 'integer' | 'string' | 'object' | 'array' | 'boolean'

export interface Schema {
  type?: SchemaTypes | string
}
