'use client'

import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'

// Extend RawCommands to include your custom commands
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fullTextSearch: {
      search: (searchTerm: string) => ReturnType
      clearSearch: () => ReturnType
    }
  }
}

export const TextSearch = Extension.create({
  name: 'fullTextSearch',

  addOptions() {
    return {
      highlightClass: 'search-highlight', // Define default option for the highlight class
    }
  },

  addCommands() {
    return {
      search:
        (searchTerm: string) =>
        ({ state, dispatch }) => {
          if (dispatch) {
            const tr = state.tr.setMeta('fullTextSearch', { searchTerm }) // Set meta with searchTerm

            dispatch(tr)
          }
          return true
        },
      clearSearch:
        () =>
        ({ state, dispatch }) => {
          if (dispatch) {
            const tr = state.tr.setMeta('fullTextSearch', { searchTerm: null }) // Clear search term
            dispatch(tr)
          }
          return true
        },
    }
  },

  addProseMirrorPlugins() {
    const key = new PluginKey('fullTextSearch') // Define a unique PluginKey
    const { highlightClass } = this.options // Capture options here

    return [
      new Plugin({
        key,
        state: {
          init() {
            return { decorations: DecorationSet.empty, searchTerm: null } // Initialize state
          },
          apply(tr, state) {
            const meta = tr.getMeta('fullTextSearch') // Retrieve meta using the key

            const { searchTerm } = state

            const decorations: Decoration[] = []
            const regex = new RegExp(meta?.searchTerm, 'gi') // Create regex to match the search term
            tr.doc.descendants((node, pos) => {
              if (!node.isText) return
              const matches = Array.from(node.text!.matchAll(regex))
              matches.forEach((match) => {
                decorations.push(
                  Decoration.inline(
                    pos + match.index!,
                    pos + match.index! + match[0].length,
                    {
                      class: highlightClass, // Use the highlightClass option here
                    },
                  ),
                )
              })
            })

            return {
              decorations: DecorationSet.create(tr.doc, decorations),
              searchTerm,
            }
          },
        },
        props: {
          decorations(state) {
            return this.getState(state)?.decorations // Return current decorations from state
          },
        },
      }),
    ]
  },
})
