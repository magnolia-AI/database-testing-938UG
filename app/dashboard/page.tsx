import { DashboardCard } from '@/components/dashboard-card';
import { ThemeToggle } from '@/components/theme-toggle';
import { getMetrics } from '@/app/actions/metrics';
import { getTotalPageViews, getRealtimeVisitors, getGoalsCompleted } from '@/app/actions/analytics';

const DashboardPage = async () => {
  const metrics = await getMetrics();
  const totalPageViews = await getTotalPageViews();
  const realtimeVisitors = await getRealtimeVisitors();
  const goalsCompleted = await getGoalsCompleted();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Analytics Dashboard</h1>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Total Revenue">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${metrics.totalRevenue}</p>
          <p className="text-sm text-green-500">+10% from last month</p>
        </DashboardCard>
        <DashboardCard title="Total Users">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{metrics.totalUsers}</p>
          <p className="text-sm text-red-500">-2% from last month</p>
        </DashboardCard>
        <DashboardCard title="Conversion Rate">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{metrics.conversionRate}%</p>
          <p className="text-sm text-green-500">+0.5% from last month</p>
        </DashboardCard>
        <DashboardCard title="Real-time Visitors">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{realtimeVisitors}</p>
          <p className="text-sm text-gray-500">Currently active</p>
        </DashboardCard>
        <DashboardCard title="Goals Completed">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{goalsCompleted}</p>
          <p className="text-sm text-gray-500">Total completed</p>
        </DashboardCard>
        <DashboardCard title="Page Views">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalPageViews}</p>
          <p className="text-sm text-green-500">Total views</p>
        </DashboardCard>
      </div>
    </div>
  );
};

export default DashboardPage;

