
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SummaryCard from '@/components/dashboard/SummaryCard';
import ExpenseChart from '@/components/dashboard/ExpenseChart';
import SpendingTrend from '@/components/dashboard/SpendingTrend';
import ExpenseList from '@/components/dashboard/ExpenseList';
import WeeklyChart from '@/components/dashboard/WeeklyChart';
import { Wallet, ArrowDownCircle, ArrowUpCircle, PieChart } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-4 md:gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Balance"
            value="$12,560.80"
            icon={Wallet}
            iconColor="bg-primary/10 text-primary"
          />
          <SummaryCard
            title="Total Expenses"
            value="$3,840.50"
            trend={{ value: 12.5, isPositive: false }}
            icon={ArrowDownCircle}
            iconColor="bg-red-100 text-red-600"
          />
          <SummaryCard
            title="Total Income"
            value="$5,680.20"
            trend={{ value: 8.2, isPositive: true }}
            icon={ArrowUpCircle}
            iconColor="bg-green-100 text-green-600"
          />
          <SummaryCard
            title="Total Savings"
            value="$1,840.30"
            trend={{ value: 3.1, isPositive: true }}
            icon={PieChart}
            iconColor="bg-blue-100 text-blue-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            <WeeklyChart />
          </div>
          <div>
            <ExpenseChart />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <div>
            <SpendingTrend />
          </div>
          <div>
            <ExpenseList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
