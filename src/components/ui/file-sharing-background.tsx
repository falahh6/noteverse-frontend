'use client'

import { useState } from 'react'
import { ShareIcon, FileIcon, UserIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const FileCard = ({ name, fileType, x, y }: any) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="absolute w-40 transition-all duration-300 ease-in-out hover:shadow-lg"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.05)' : 'scale(1)'}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground">{fileType}</p>
      </CardContent>
    </Card>
  )
}

const ConnectionLine = ({ startX, startY, endX, endY }: any) => (
  <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
    <line
      x1={`${startX}%`}
      y1={`${startY}%`}
      x2={`${endX}%`}
      y2={`${endY}%`}
      stroke="currentColor"
      strokeWidth="1"
      className="text-muted-foreground/30"
    />
  </svg>
)

export default function FileSharingBackground() {
  return (
    <div className="fixed inset-0 bg-background overflow-hidden opacity-10">
      <div className="relative w-full h-full">
        {/* Shared Files */}
        <ConnectionLine startX={20} startY={30} endX={50} endY={30} />
        <FileCard name="Project Report" fileType="PDF" x={20} y={30} />
        <FileCard name="Design Mockup" fileType="Sketch" x={50} y={30} />

        <ConnectionLine startX={50} startY={30} endX={80} endY={50} />
        <FileCard name="Meeting Notes" fileType="Doc" x={80} y={50} />

        <ConnectionLine startX={20} startY={30} endX={40} endY={60} />
        <FileCard name="Team Budget" fileType="Spreadsheet" x={40} y={60} />

        {/* Icons */}
        <div className="absolute top-1/4 right-1/4 opacity-5">
          <ShareIcon className="w-10 h-10" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 opacity-5">
          <FileIcon className="w-10 h-10" />
        </div>
        <div className="absolute top-3/4 right-1/3 opacity-5">
          <UserIcon className="w-10-10" />
        </div>

        {/* Labels */}
        <div className="absolute top-[15%] left-[15%] text-xs font-bold">
          Shared with Team
        </div>
        <div className="absolute top-[55%] left-[50%] text-xs font-semibold text-muted-foreground">
          Recent Files
        </div>
      </div>
    </div>
  )
}
