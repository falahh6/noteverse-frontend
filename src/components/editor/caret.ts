import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

// Create a proper Tiptap extension for Caret decorations
export const CaretDecoration = (users: any) =>
  Extension.create({
    name: 'caretDecoration',

    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey('caretDecoration'),
          state: {
            init(_, { doc }) {
              return DecorationSet.empty
            },
            apply(tr, oldDecorations) {
              oldDecorations = oldDecorations.map(tr.mapping, tr.doc)

              const decorations: Decoration[] = []
              users.forEach((user: any) => {
                const caretPos = user.caretPosition
                if (caretPos) {
                  // Add a decoration (caret) for each user
                  const caretElement = document.createElement('span')
                  caretElement.style.borderLeft = `2px solid ${user.color}`
                  caretElement.style.height = '1em'
                  caretElement.style.position = 'absolute'
                  caretElement.style.zIndex = '90'
                  decorations.push(Decoration.widget(caretPos, caretElement))
                }
              })
              return DecorationSet.create(tr.doc, decorations)
            },
          },
        }),
      ]
    },
  })

export const MultipleCarets = Extension.create({
  name: 'multipleCarets',

  addOptions() {
    return {
      carets: [], // Array of caret objects: { position, name, color }
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations: (state) => {
            const { doc } = state
            const decorations: any = []

            console.log('THIS : ', this.options.carets)

            this.options.carets.forEach(({ position, name, color }: any) => {
              const caretDecoration = Decoration.widget(position, () => {
                const caretElement = document.createElement('span')
                caretElement.className = 'custom-caret'
                caretElement.setAttribute('style', `--caret-color: ${color};`)
                caretElement.setAttribute('data-name', name)
                return caretElement
              })
              decorations.push(caretDecoration)
            })

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  },
})
