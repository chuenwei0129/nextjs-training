import { defineComponent } from 'vue'
import EditorView from '@/views/EditorView'

export default defineComponent({
  name: 'App',
  setup() {
    return () => {
      console.log('render App')

      return (
        <div>
          <EditorView />
        </div>
      )
    }
  }
})
