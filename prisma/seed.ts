const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const cryptoo = require('crypto')

async function main() {
  // Create Categories
  const categories = await prisma.category.createMany({
    data: [
      { title: 'Technology', description: 'Latest tech news and updates' },
      { title: 'Health', description: 'Health and wellness tips' },
      { title: 'Education', description: 'Learning and educational resources' },
      { title: 'Entertainment', description: 'Movies, music, and more' },
    ],
  })

  // Fetch created categories
  const [technology, health, education, entertainment] =
    await prisma.category.findMany()

  // Create Subcategories
  const subcategories = await prisma.subCategory.createMany({
    data: [
      {
        title: 'Artificial Intelligence',
        description: 'AI news and updates',
        thumbnail: 'path/to/ai-thumbnail.jpg',
        categoryId: technology.id,
      },
      {
        title: 'Web Development',
        description: 'Frontend and backend development',
        thumbnail: 'path/to/web-thumbnail.jpg',
        categoryId: technology.id,
      },
      {
        title: 'Fitness',
        description: 'Physical fitness tips and tricks',
        thumbnail: 'path/to/fitness-thumbnail.jpg',
        categoryId: health.id,
      },
      {
        title: 'Mental Health',
        description: 'Mental well-being and mindfulness',
        thumbnail: 'path/to/mental-thumbnail.jpg',
        categoryId: health.id,
      },
    ],
  })

  // Fetch created subcategories
  const [ai, webDev, fitness, mentalHealth] =
    await prisma.subCategory.findMany()

  // Create Tags
  const tags = await prisma.tag.createMany({
    data: [
      { name: 'Tech' },
      { name: 'Health' },
      { name: 'Education' },
      { name: 'Entertainment' },
    ],
  })

  // Fetch created tags
  const [tagTech, tagHealth, tagEducation, tagEntertainment] =
    await prisma.tag.findMany()

  // Generate hashed passwords
  const password1 = await bcrypt.hash('password123', 10)
  const password2 = await bcrypt.hash('securepassword', 10)
  const password3 = await bcrypt.hash('mypassword', 10)
  const password4 = await bcrypt.hash('adminpassword', 10)

  // Create Users with Authentication Fields
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'user1@example.com',
        username: 'user1',
        password: password1,
        emailVerified: false,
        verificationToken: cryptoo.randomBytes(32).toString('hex'),
        authToken: cryptoo.randomBytes(64).toString('hex'),
      },
      {
        email: 'user2@example.com',
        username: 'user2',
        password: password2,
        emailVerified: true,
        verificationToken: null,
        authToken: cryptoo.randomBytes(64).toString('hex'),
      },
      {
        email: 'user3@example.com',
        username: 'user3',
        password: password3,
        emailVerified: false,
        verificationToken: cryptoo.randomBytes(32).toString('hex'),
        authToken: cryptoo.randomBytes(64).toString('hex'),
      },
      {
        email: 'user4@example.com',
        username: 'user4',
        password: password4,
        emailVerified: true,
        verificationToken: null,
        authToken: cryptoo.randomBytes(64).toString('hex'),
      },
    ],
  })

  console.log('Users created with authentication fields, including authToken!')

  // Fetch created users
  const [user1, user2, user3, user4] = await prisma.user.findMany()

  // Create Notes
  const note1 = await prisma.note.create({
    data: {
      title: 'Introduction to AI',
      description: 'An introductory guide to AI.',
      data: 'Artificial Intelligence is the simulation of human intelligence in machines.',
      ownerId: user1.id,
      categoryId: technology.id,
      subcategoryId: ai.id,
      visibility: 'Private',
    },
  })

  const note2 = await prisma.note.create({
    data: {
      title: 'Getting Fit',
      description: 'Tips for staying healthy and active.',
      data: 'Fitness involves regular physical activity and proper nutrition.',
      ownerId: user2.id,
      categoryId: health.id,
      subcategoryId: fitness.id,
      visibility: 'Private',
    },
  })

  const note3 = await prisma.note.create({
    data: {
      title: 'Learn JavaScript',
      description: 'Basics of JavaScript programming.',
      data: 'JavaScript is a versatile language used for web development.',
      ownerId: user3.id,
      categoryId: technology.id,
      subcategoryId: webDev.id,
      visibility: 'Private',
    },
  })

  const note4 = await prisma.note.create({
    data: {
      title: 'Mindfulness Practices',
      description: 'Improving mental health with mindfulness.',
      data: 'Mindfulness involves being present and aware in the moment.',
      ownerId: user4.id,
      categoryId: health.id,
      subcategoryId: mentalHealth.id,
      visibility: 'Private',
    },
  })

  // Create Shared Status
  const sharedStatuses = await prisma.sharedStatus.createMany({
    data: [
      {
        sharedById: user1.id,
        sharedWithId: user2.id,
        permissions: 'View',
        noteId: note1.id,
      },
      {
        sharedById: user2.id,
        sharedWithId: user3.id,
        permissions: 'Edit',
        noteId: note2.id,
      },
      {
        sharedById: user3.id,
        sharedWithId: user4.id,
        permissions: 'View',
        noteId: note3.id,
      },
      {
        sharedById: user4.id,
        sharedWithId: user1.id,
        permissions: 'Edit',
        noteId: note4.id,
      },
    ],
  })

  // Create Comments
  const comments = await prisma.comment.createMany({
    data: [
      { noteId: note1.id, userId: user2.id, text: 'This is fascinating!' },
      {
        noteId: note2.id,
        userId: user3.id,
        text: 'Great tips for staying fit.',
      },
      {
        noteId: note3.id,
        userId: user4.id,
        text: 'Helpful for beginners in JavaScript.',
      },
      {
        noteId: note4.id,
        userId: user1.id,
        text: 'Mindfulness is so important.',
      },
    ],
  })

  console.log('Database seeded successfully with multiple records!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
