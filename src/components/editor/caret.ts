import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    multipleCarets: {
      updateCarets: (
        carets: Array<{ position: number; name: string; color: string }>,
      ) => ReturnType
      setCurrentUserActive: (isActive: boolean) => ReturnType
    }
  }
}

export const MultipleCarets = Extension.create({
  name: 'multipleCarets',

  addOptions() {
    return {
      carets: [], // Array of caret objects: { position, name, color }
    }
  },

  addProseMirrorPlugins() {
    const pluginKey = new PluginKey('multipleCarets')

    return [
      new Plugin({
        key: pluginKey,
        state: {
          init: () => DecorationSet.empty,
          apply: (tr, old) => {
            const carets = this.options.carets
            const decorations = carets.map(({ position, name, color }: any) =>
              Decoration.widget(position, () => {
                const caretElement = document.createElement('span')
                caretElement.className = 'custom-caret'
                caretElement.style.setProperty('--caret-color', color)
                caretElement.setAttribute('data-name', name)
                return caretElement
              }),
            )
            return DecorationSet.create(tr.doc, decorations)
          },
        },
        props: {
          decorations(state) {
            return pluginKey.getState(state)
          },
        },
      }),
    ]
  },
  addStorage() {
    return {
      isCurrentUserActive: false,
    }
  },

  addCommands() {
    return {
      updateCarets:
        (carets: any) =>
        ({ editor }: any) => {
          this.options.carets = carets
          editor.view.dispatch(editor.state.tr)
          editor.storage.multipleCarets.isCurrentUserActive = carets.isActive
          return true
        },
    }
  },
})
