
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SummaryCard from '@/components/dashboard/SummaryCard';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import ExpenseChart from '@/components/dashboard/ExpenseChart';
import SpendingTrend from '@/components/dashboard/SpendingTrend';
import { Wallet, CreditCard, PieChart, ArrowUpDown } from 'lucide-react';

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
            icon={CreditCard}
            iconColor="bg-red-100 text-expense-red"
          />
          <SummaryCard
            title="Total Income"
            value="$5,680.20"
            trend={{ value: 8.2, isPositive: true }}
            icon={ArrowUpDown}
            iconColor="bg-green-100 text-expense-green"
          />
          <SummaryCard
            title="Total Savings"
            value="$1,840.30"
            trend={{ value: 3.1, isPositive: true }}
            icon={PieChart}
            iconColor="bg-blue-100 text-expense-blue"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            <SpendingTrend />
          </div>
          <div>
            <ExpenseChart />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <RecentTransactions />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
