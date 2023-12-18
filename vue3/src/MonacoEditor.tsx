import { defineComponent, onBeforeUnmount, onMounted, ref, type PropType } from 'vue'

import * as monaco from 'monaco-editor'

// 工具函数
const format = (value: string | number) => {
  return /^\d+$/.test(value as string) ? `${value}px` : value
}

const MonacoEditorProps = {
  title: {
    type: String,
    required: true
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: '100%'
  },
  height: {
    type: [String, Number] as PropType<string | number>,
    default: '100vh'
  },
  value: {
    type: String,
    default: ''
  },
  onChange: {
    type: Function as PropType<(value: string) => void>,
    default: () => {}
  },
  options: {
    type: Object as PropType<monaco.editor.IEditorConstructionOptions>
  }
} as const

export default defineComponent({
  name: 'MonacoEditor',
  props: MonacoEditorProps,
  setup(props) {
    const editorContainer = ref<HTMLElement | null>(null)
    let editorInstance: monaco.editor.IStandaloneCodeEditor | null = null

    onMounted(() => {
      editorInstance = monaco.editor.create(editorContainer.value!, {
        value: props.value,
        language: 'json',
        theme: 'vs',
        minimap: {
          enabled: false
        },
        formatOnPaste: true,
        tabSize: 2,
        ...props.options
      })

      editorInstance.onDidChangeModelContent(() => {
        props.onChange(editorInstance!.getValue())
      })
    })

    onBeforeUnmount(() => {
      editorInstance!.dispose()
    })

    return () => {
      return (
        <div>
          <h2
            style={{
              margin: '10px'
            }}
          >
            {props.title}
          </h2>
          <div
            style={{
              width: format(props.width),
              height: format(props.height),
              border: '5px solid #ccc',
              borderRadius: '5px',
              margin: '10px'
            }}
            ref={editorContainer}
          ></div>
        </div>
      )
    }
  }
})
