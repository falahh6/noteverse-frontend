'use client'

import { useState } from 'react'
import { GitBranch, GitMerge, GitCommit } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const VersionCard = ({ version, description, x, y }: any) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="absolute w-48 transition-all duration-300 ease-in-out hover:shadow-lg"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.05)' : 'scale(1)'}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">v{version}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

const BranchLine = ({ startX, startY, endX, endY }: any) => (
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

export default function CardVersionHistoryBackground() {
  return (
    <div className="fixed inset-0 bg-background overflow-hidden opacity-10">
      <div className="relative w-full h-full">
        {/* Main branch */}
        <BranchLine startX={10} startY={20} endX={90} endY={20} />
        <VersionCard
          version="1.0"
          description="Initial release"
          x={10}
          y={20}
        />
        <VersionCard version="1.1" description="Bug fixes" x={30} y={20} />
        <VersionCard version="2.0" description="Major update" x={50} y={20} />
        <VersionCard
          version="2.1"
          description="Performance improvements"
          x={70}
          y={20}
        />
        <VersionCard version="3.0" description="New features" x={90} y={20} />

        {/* Feature branches */}
        <BranchLine startX={30} startY={20} endX={40} endY={40} />
        <BranchLine startX={40} startY={40} endX={50} endY={20} />
        <VersionCard
          version="1.2"
          description="Experimental feature"
          x={40}
          y={40}
        />

        <BranchLine startX={50} startY={20} endX={60} endY={60} />
        <BranchLine startX={60} startY={60} endX={70} endY={20} />
        <VersionCard version="2.2" description="Beta release" x={60} y={60} />

        {/* Icons */}
        <div className="absolute top-1/4 right-1/4 opacity-5">
          <GitBranch className="w-10 h-10" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 opacity-5">
          <GitMerge className="w-10 h-10" />
        </div>
        <div className="absolute top-3/4 right-1/3 opacity-5">
          <GitCommit className="w-10-10" />
        </div>

        {/* Labels */}
        <div className="absolute top-[10%] left-[10%] text-xs font-bold">
          Main Branch
        </div>
        <div className="absolute top-[35%] left-[35%] text-xs font-semibold text-muted-foreground">
          Feature Branch
        </div>
        <div className="absolute top-[55%] left-[55%] text-xs font-semibold text-muted-foreground">
          Feature Branch
        </div>
      </div>
    </div>
  )
}
