'use client'

import { useState } from 'react'
import { GlobeIcon, LanguagesIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const LanguageCard = ({ language, region, x, y, color }: any) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="absolute w-44 transition-all duration-300 ease-in-out hover:shadow-lg"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        background: `linear-gradient(135deg, ${color}, #ffffff20)`,
        transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.08)' : 'scale(1)'}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <h3 className="text-md font-semibold mb-2">{language}</h3>
        <p className="text-sm text-muted-foreground">{region}</p>
      </CardContent>
    </Card>
  )
}

const ConnectionLine = ({ startX, startY, endX, endY, color }: any) => (
  <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
    <line
      x1={`${startX}%`}
      y1={`${startY}%`}
      x2={`${endX}%`}
      y2={`${endY}%`}
      stroke={color}
      strokeWidth="1.5"
      className="opacity-70"
    />
  </svg>
)

export default function MultilingualSupportBackground() {
  return (
    <div className="fixed inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 overflow-hidden opacity-10">
      <div className="relative w-full h-full">
        {/* Language Nodes with vibrant colors */}
        <ConnectionLine
          startX={15}
          startY={20}
          endX={50}
          endY={30}
          color="#ff6b6b"
        />
        <LanguageCard
          language="English"
          region="Global"
          x={15}
          y={20}
          color="#6bc5ff"
        />

        <ConnectionLine
          startX={50}
          startY={30}
          endX={85}
          endY={40}
          color="#feca57"
        />
        <LanguageCard
          language="Español"
          region="Latin America, Spain"
          x={50}
          y={30}
          color="#ff9f43"
        />

        <ConnectionLine
          startX={15}
          startY={20}
          endX={30}
          endY={60}
          color="#1dd1a1"
        />
        <LanguageCard
          language="中文"
          region="China"
          x={30}
          y={60}
          color="#ff6b6b"
        />

        <ConnectionLine
          startX={50}
          startY={30}
          endX={70}
          endY={70}
          color="#54a0ff"
        />
        <LanguageCard
          language="العربية"
          region="Middle East"
          x={70}
          y={70}
          color="#48dbfb"
        />

        <ConnectionLine
          startX={85}
          startY={40}
          endX={40}
          endY={80}
          color="#ee5253"
        />
        <LanguageCard
          language="Français"
          region="Europe, Africa"
          x={40}
          y={80}
          color="#ff9f43"
        />

        {/* Icons */}
        <div className="absolute top-1/4 right-1/4 opacity-5">
          <GlobeIcon className="w-10 h-10 text-blue-400" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 opacity-5">
          <LanguagesIcon className="w-10 h-10 text-pink-400" />
        </div>

        {/* Labels */}
        <div className="absolute top-[15%] left-[10%] text-xs font-bold text-blue-600">
          Supported Languages
        </div>
        <div className="absolute top-[50%] left-[60%] text-xs font-semibold text-purple-600">
          Global Collaboration
        </div>
      </div>
    </div>
  )
}
