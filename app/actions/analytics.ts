'use server';

import prisma from '@/lib/prisma';

export async function getTotalPageViews() {
  try {
    const totalPageViews = await prisma.pageView.count();
    return totalPageViews;
  } catch (error) {
    console.error('Error fetching total page views:', error);
    throw new Error('Failed to fetch total page views');
  }
}

export async function getRealtimeVisitors() {
  try {
    // For real-time visitors, we'll count page views within the last 5 minutes as an example.
    // In a production environment, this might involve a more sophisticated real-time system.
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const realtimeVisitors = await prisma.pageView.count({
      where: {
        timestamp: {
          gte: fiveMinutesAgo,
        },
      },
    });
    return realtimeVisitors;
  } catch (error) {
    console.error('Error fetching real-time visitors:', error);
    throw new Error('Failed to fetch real-time visitors');
  }
}

export async function getGoalsCompleted() {
  try {
    const totalGoalsCompleted = await prisma.goalCompletion.count();
    return totalGoalsCompleted;
  } catch (error) {
    console.error('Error fetching goals completed:', error);
    throw new Error('Failed to fetch goals completed');
  }
}

