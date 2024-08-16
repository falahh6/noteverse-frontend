'use client'

import React, { useEffect } from 'react'

import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks'
import { useEditorReadOnly } from '@udecode/plate-common'

import { Icons, iconVariants } from '@/components/icons'

import { InsertDropdownMenu } from './insert-dropdown-menu'
import { MarkToolbarButton } from './mark-toolbar-button'
import { ModeDropdownMenu } from './mode-dropdown-menu'
import { ToolbarGroup } from './toolbar'
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu'
import {
  MARK_BG_COLOR,
  MARK_COLOR,
  useColorDropdownMenu,
} from '@udecode/plate-font'
import { ListStyleType } from '@udecode/plate-indent-list'
import { ELEMENT_IMAGE } from '@udecode/plate-media'
import { ColorDropdownMenu } from './color-dropdown-menu'
import { AlignDropdownMenu } from './align-dropdown-menu'
import { LineHeightDropdownMenu } from './line-height-dropdown-menu'
import { MoreDropdownMenu } from './more-dropdown-menu'
import { IndentListToolbarButton } from './indent-list-toolbar-button'
import { OutdentToolbarButton } from './outdent-toolbar-button'
import { IndentToolbarButton } from './indent-toolbar-button'
import { LinkToolbarButton } from './link-toolbar-button'
import { MediaToolbarButton } from './media-toolbar-button'
import { TableDropdownMenu } from './table-dropdown-menu'
import { EmojiDropdownMenu } from './emoji-dropdown-menu'

export function FixedToolbarButtons() {
  const readOnly = useEditorReadOnly()

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex flex-wrap"
        style={{
          transform: 'translateX(calc(-1px))',
        }}
      >
        {!readOnly && (
          <>
            <ToolbarGroup noSeparator>
              <InsertDropdownMenu />
              <TurnIntoDropdownMenu />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton nodeType={MARK_BOLD} tooltip="Bold (⌘+B)">
                <Icons.bold />
              </MarkToolbarButton>
              <MarkToolbarButton nodeType={MARK_ITALIC} tooltip="Italic (⌘+I)">
                <Icons.italic />
              </MarkToolbarButton>
              <MarkToolbarButton
                nodeType={MARK_UNDERLINE}
                tooltip="Underline (⌘+U)"
              >
                <Icons.underline />
              </MarkToolbarButton>

              <MarkToolbarButton
                nodeType={MARK_STRIKETHROUGH}
                tooltip="Strikethrough (⌘+⇧+M)"
              >
                <Icons.strikethrough />
              </MarkToolbarButton>
              <MarkToolbarButton nodeType={MARK_CODE} tooltip="Code (⌘+E)">
                <Icons.code />
              </MarkToolbarButton>
            </ToolbarGroup>
            <ToolbarGroup>
              <ColorDropdownMenu nodeType={MARK_COLOR} tooltip="Text Color">
                <Icons.color className={iconVariants({ variant: 'toolbar' })} />
              </ColorDropdownMenu>
              <ColorDropdownMenu
                nodeType={MARK_BG_COLOR}
                tooltip="Highlight Color"
              >
                <Icons.bg className={iconVariants({ variant: 'toolbar' })} />
              </ColorDropdownMenu>
            </ToolbarGroup>

            <ToolbarGroup>
              <AlignDropdownMenu />

              <LineHeightDropdownMenu />

              <IndentListToolbarButton nodeType={ListStyleType.Disc} />
              <IndentListToolbarButton nodeType={ListStyleType.Decimal} />

              <OutdentToolbarButton />
              <IndentToolbarButton />
            </ToolbarGroup>

            <ToolbarGroup>
              <LinkToolbarButton />

              <MediaToolbarButton nodeType={ELEMENT_IMAGE} />

              <TableDropdownMenu />

              <EmojiDropdownMenu />

              <MoreDropdownMenu />
            </ToolbarGroup>
          </>
        )}

        {readOnly && (
          <ToolbarGroup noSeparator>
            <p className="ml-2 text-sm max-sm:text-xs">
              Your are currently viewing this notes.
            </p>
          </ToolbarGroup>
        )}

        <div className="grow" />

        <ToolbarGroup noSeparator>
          <ModeDropdownMenu />
        </ToolbarGroup>
      </div>
    </div>
  )
}
