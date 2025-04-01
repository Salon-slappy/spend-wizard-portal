
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Transaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
}

const RecentTransactions: React.FC = () => {
  const transactions: Transaction[] = [
    { id: '1', name: 'Grocery Store', category: 'Food', date: '2023-06-12', amount: -85.32 },
    { id: '2', name: 'Salary Deposit', category: 'Income', date: '2023-06-10', amount: 2500.00 },
    { id: '3', name: 'Netflix Subscription', category: 'Entertainment', date: '2023-06-08', amount: -14.99 },
    { id: '4', name: 'Gas Station', category: 'Transport', date: '2023-06-07', amount: -45.23 },
    { id: '5', name: 'Restaurant', category: 'Food', date: '2023-06-05', amount: -65.00 },
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Food': 'bg-expense-blue',
      'Income': 'bg-expense-green',
      'Entertainment': 'bg-expense-purple',
      'Transport': 'bg-expense-yellow',
      'Shopping': 'bg-expense-pink',
    };
    
    return colors[category] || 'bg-gray-400';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-1">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-3 hover:bg-muted transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${getCategoryColor(transaction.category)}`} />
                <div>
                  <p className="text-sm font-medium">{transaction.name}</p>
                  <p className="text-xs text-muted-foreground">{transaction.category} • {transaction.date}</p>
                </div>
              </div>
              <span className={`text-sm font-medium ${transaction.amount >= 0 ? 'text-expense-green' : 'text-expense-red'}`}>
                {transaction.amount >= 0 ? '+' : ''}{transaction.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button className="text-primary text-sm font-medium hover:underline">
            View All Transactions
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
