import { defineComponent } from 'vue'
import styles from './EditorView.module.scss'

export default defineComponent({
  name: 'EditorView',
  setup() {
    return () => {
      console.log('render EditorView')

      return <div class={styles.editor}>editor</div>
    }
  }
})
