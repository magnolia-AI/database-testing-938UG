'use server';

import prisma from '@/lib/prisma';

export async function getMetrics() {
  try {
    // Fetch total revenue (sum of all metric values where name is 'revenue')
    const totalRevenueResult = await prisma.metric.aggregate({
      _sum: {
        value: true,
      },
      where: {
        name: 'revenue',
      },
    });
    const totalRevenue = totalRevenueResult._sum?.value || 0;

    // Fetch total users (count of unique users)
    const totalUsers = await prisma.user.count();

    // Fetch conversion rate (example: based on goals completed vs. total users)
    // This is a simplified example; a real conversion rate might involve more complex logic
    const totalGoalsCompleted = await prisma.goalCompletion.count();
    const conversionRate = totalUsers > 0 ? (totalGoalsCompleted / totalUsers) * 100 : 0;

    return {
      totalRevenue: totalRevenue.toFixed(2),
      totalUsers,
      conversionRate: conversionRate.toFixed(2),
    };
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw new Error('Failed to fetch metrics');
  }
}


