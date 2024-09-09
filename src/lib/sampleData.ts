export const sampleNotes: {
  id: string
  title: string
  content: string | null
  userId: string
  createdAt: Date
  updatedAt: Date
}[] = [
  {
    id: '1',
    title: 'Project Kickoff Meeting',
    content:
      'Discussed project goals, deliverables, and timelines. Next meeting scheduled for next week.',
    userId: '101',
    createdAt: new Date('2024-07-15T09:30:00Z'),
    updatedAt: new Date('2024-07-15T09:30:00Z'),
  },
  {
    id: '2',
    title: 'Design Review',
    content:
      'Reviewed design mockups for the new app interface. Agreed on a few minor changes.',
    userId: '102',
    createdAt: new Date('2024-07-18T14:00:00Z'),
    updatedAt: new Date('2024-07-19T09:00:00Z'),
  },
  {
    id: '3',
    title: 'Client Feedback',
    content: null,
    userId: '103',
    createdAt: new Date('2024-07-20T16:30:00Z'),
    updatedAt: new Date('2024-07-20T16:30:00Z'),
  },
  {
    id: '4',
    title: 'Development Update',
    content:
      'Completed initial setup of the backend API. Next step is to integrate the frontend.',
    userId: '104',
    createdAt: new Date('2024-07-25T11:15:00Z'),
    updatedAt: new Date('2024-07-25T11:15:00Z'),
  },
  {
    id: '5',
    title: 'Bug Fixes',
    content:
      'Resolved several bugs related to user authentication and data retrieval.',
    userId: '105',
    createdAt: new Date('2024-07-27T13:45:00Z'),
    updatedAt: new Date('2024-07-28T10:20:00Z'),
  },
  {
    id: '6',
    title: 'Marketing Strategy',
    content:
      'Outlined a strategy for the upcoming product launch. Focusing on social media and email campaigns.',
    userId: '106',
    createdAt: new Date('2024-07-29T08:00:00Z'),
    updatedAt: new Date('2024-07-29T08:00:00Z'),
  },
  {
    id: '7',
    title: 'Team Lunch',
    content:
      'Organized a team lunch to celebrate the successful completion of phase one.',
    userId: '107',
    createdAt: new Date('2024-07-30T12:30:00Z'),
    updatedAt: new Date('2024-07-30T12:30:00Z'),
  },
  {
    id: '8',
    title: 'New Feature Request',
    content:
      'Client requested a new feature to be added in the next sprint. Details to be discussed.',
    userId: '108',
    createdAt: new Date('2024-08-01T10:00:00Z'),
    updatedAt: new Date('2024-08-01T10:00:00Z'),
  },
  {
    id: '9',
    title: 'Code Review',
    content:
      'Conducted a code review session to ensure coding standards are being met.',
    userId: '109',
    createdAt: new Date('2024-08-03T15:30:00Z'),
    updatedAt: new Date('2024-08-03T15:30:00Z'),
  },
  {
    id: '10',
    title: 'Sprint Planning',
    content:
      'Planned the tasks for the upcoming sprint. Focused on completing user authentication module.',
    userId: '110',
    createdAt: new Date('2024-08-05T09:45:00Z'),
    updatedAt: new Date('2024-08-05T09:45:00Z'),
  },
]

export const threads: Thread[] = [
  {
    id: 1,
    user: {
      name: 'Mohammed Falah',
      avatar: 'https://github.com/shadcn.png',
      fallback: 'MF',
    },
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: 'yesterday',
    replies: [
      {
        id: 101,
        user: {
          name: 'John Doe',
          avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
          fallback: 'JD',
        },
        content: 'Totally agree with you, Mohammed!',
        date: 'yesterday',
      },
      {
        id: 102,
        user: {
          name: 'Alex Turner',
          avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
          fallback: 'AT',
        },
        content: 'Interesting point!',
        date: 'yesterday',
      },
    ],
  },
  {
    id: 2,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
      fallback: 'SJ',
    },
    content: 'This is another comment! Great job on the post.',
    date: '2 days ago',
    replies: [
      {
        id: 201,
        user: {
          name: 'Emma Watson',
          avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
          fallback: 'EW',
        },
        content: 'I second that, the post was excellent!',
        date: '1 day ago',
      },
    ],
  },
  {
    id: 3,
    user: {
      name: 'Alex Turner',
      avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
      fallback: 'AT',
    },
    content: 'Here’s some feedback for your project.',
    date: '3 days ago',
    replies: [],
  },
  {
    id: 4,
    user: {
      name: 'Emma Watson',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      fallback: 'EW',
    },
    content: 'I love the design you’ve implemented here!',
    date: '5 days ago',
    replies: [
      {
        id: 401,
        user: {
          name: 'Sarah Johnson',
          avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
          fallback: 'SJ',
        },
        content: 'It really does look great!',
        date: '4 days ago',
      },
    ],
  },
  {
    id: 5,
    user: {
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
      fallback: 'JD',
    },
    content: 'Looking forward to more updates!',
    date: 'a week ago',
    replies: [],
  },
]
