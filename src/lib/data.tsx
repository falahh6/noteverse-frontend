import FullTextSearchBackground from '@/components/ui/full-text-search'
import { InputIcon } from '@radix-ui/react-icons'
import {
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  ShareIcon,
  ThumbsUpIcon,
} from 'lucide-react'
import StaticVersionHistoryBackground from '@/components/ui/version-history-background'
import FileSharingBackground from '@/components/ui/file-sharing-background'
import UpvoteCommentsBackground from '@/components/ui/upvote-comments-background'
import MultilingualSupportBackground from '@/components/ui/multilingual-support-background'

export const features = [
  {
    Icon: FileTextIcon,
    name: 'Real-time Collaboration',
    description:
      'Work with your team on notes in real-time, with instant updates for everyone.',
    href: '/',
    cta: 'Learn more',
    background: (
      <img
        src="/collaborative.svg"
        className="absolute -right-5 top-20 max-sm:top-5 opacity-60 h-[160px]"
      />
    ),
    className: 'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
    done: true,
  },
  {
    Icon: InputIcon,
    name: 'Full-text Search',
    description:
      'Find any note or document instantly with powerful search across all content.',
    href: '/',
    cta: 'Learn more',
    background: <FullTextSearchBackground />,
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
    done: true,
  },
  {
    Icon: GlobeIcon,
    name: 'Multilingual Support',
    description:
      'Collaborate with team members in over 100+ languages seamlessly.',
    href: '/',
    cta: 'Learn more',
    background: <MultilingualSupportBackground />,
    className: 'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
    done: true,
  },
  {
    Icon: ThumbsUpIcon,
    name: 'Upvote and Comments',
    description:
      'Enable feedback by allowing users to upvote and comment on notes or documents.',
    href: '/',
    cta: 'Learn more',
    background: <UpvoteCommentsBackground />,
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2',
    done: true,
  },
  {
    Icon: ShareIcon,
    name: 'File Sharing',
    description:
      'Easily share notes and documents with others inside or outside your organization.',
    href: '/',
    cta: 'Learn more',
    background: <FileSharingBackground />,
    className: 'lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4',
    done: true,
  },
]
