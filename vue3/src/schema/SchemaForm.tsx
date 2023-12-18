import { defineComponent, ref, type PropType } from 'vue'

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Record<string, any>>,
      required: true
    }
  },
  setup(props) {
    return () => {
      console.log('SchemaForm: ', props.schema)
      return (
        <div>
          {props.schema.type === 'number' ? (
            <input
              type="number"
              placeholder={props.schema.description}
              value={props.schema.default}
            />
          ) : null}
        </div>
      )
    }
  }
})
