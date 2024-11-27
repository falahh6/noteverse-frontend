'use client'

import { useState } from 'react'
import { ThumbsUpIcon, MessageSquareIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'

const CommentCard = ({ user, comment, x, y }: any) => {
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
      <CardContent className="p-3">
        <h3 className="text-sm font-semibold mb-1">{user}</h3>
        <p className="text-xs text-muted-foreground">{comment}</p>
      </CardContent>
    </Card>
  )
}

const ConnectionLine = ({ startX, startY, endX, endY }: any) => (
  <svg className="absolute top-0 left-0 w-full h-full">
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

const FloatingIcon = ({ Icon, x, y }: any) => (
  <motion.div
    className="absolute opacity-50"
    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    animate={{ y: [0, -5, 0] }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    <Icon className="w-4 h-4 text-muted-foreground" />
  </motion.div>
)

export default function UpvoteCommentsBackground() {
  return (
    <div className="relative rounded-lg bg-background p-4 overflow opacity-15 top-4 shadow-sm">
      {/* Connection Lines */}
      <ConnectionLine startX={15} startY={30} endX={45} endY={30} />
      <ConnectionLine startX={45} startY={30} endX={70} endY={50} />
      <ConnectionLine startX={15} startY={30} endX={30} endY={70} />

      {/* Comment Cards */}
      <CommentCard user="Alice" comment="Nice insights!" x={15} y={30} />
      <CommentCard user="Bob" comment="I agree with this." x={45} y={30} />
      <CommentCard user="Charlie" comment="Let's go deeper." x={70} y={50} />
      <CommentCard user="Dana" comment="Could use data here." x={30} y={70} />

      {/* Floating Icons */}
      <FloatingIcon Icon={ThumbsUpIcon} x={20} y={20} />
      <FloatingIcon Icon={MessageSquareIcon} x={60} y={40} />
      <FloatingIcon Icon={ThumbsUpIcon} x={50} y={80} />
      <FloatingIcon Icon={MessageSquareIcon} x={40} y={60} />
    </div>
  )
}
