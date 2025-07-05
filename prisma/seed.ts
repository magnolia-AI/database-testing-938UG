import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clean up existing data
  await prisma.metric.deleteMany({});
  await prisma.goalCompletion.deleteMany({});
  await prisma.pageView.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Cleaned up existing data.');

  // Create a user
  const user = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      name: 'Demo User',
    },
  });
  console.log(`Created user with id: ${user.id}`);

  // Create Page Views
  await prisma.pageView.createMany({
    data: [
      {
        path: '/',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        userId: user.id,
      },
      {
        path: '/about',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        userId: user.id,
      },
      {
        path: '/',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        userId: user.id,
      },
      {
        path: '/pricing',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        userId: user.id,
      },
    ],
  });
  console.log('Created page views');

  // Create Goal Completions
  await prisma.goalCompletion.createMany({
    data: [
      { goalName: 'signup', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), userId: user.id },
      { goalName: 'contact-form', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), userId: user.id },
      { goalName: 'signup', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), userId: user.id },
    ],
  });
  console.log('Created goal completions');

  // Create Metrics
  await prisma.metric.createMany({
    data: [
      { name: 'totalRevenue', value: 1250.0, category: 'sales', userId: user.id },
      { name: 'totalRevenue', value: 850.5, category: 'sales', userId: user.id },
      { name: 'newUser', value: 1, category: 'users', userId: user.id },
      { name: 'newUser', value: 1, category: 'users', userId: user.id },
      { name: 'totalSales', value: 50, category: 'sales', userId: user.id },
      { name: 'totalSales', value: 35, category: 'sales', userId: user.id },
    ],
  });
  console.log('Created metrics');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });





