
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Calendar as CalendarIcon, ArrowDownCircle, ArrowUpCircle, CreditCard, Filter, ChevronDown, Eye, Clock, AlertCircle } from 'lucide-react';
import { format, subDays } from 'date-fns';

interface ActivityItem {
  id: string;
  type: 'transaction' | 'system' | 'alert';
  category?: 'income' | 'expense' | 'transfer';
  title: string;
  description: string;
  amount?: number;
  date: Date;
  status?: 'completed' | 'pending' | 'failed';
  read: boolean;
}

const Activity: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'transactions' | 'system' | 'alerts'>('all');

  const now = new Date();
  
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'transaction',
      category: 'expense',
      title: 'Grocery Shopping',
      description: 'Weekly grocery shopping at Whole Foods',
      amount: 86.42,
      date: subDays(now, 0.2),
      status: 'completed',
      read: true
    },
    {
      id: '2',
      type: 'transaction',
      category: 'income',
      title: 'Salary Deposit',
      description: 'Monthly salary payment',
      amount: 3500,
      date: subDays(now, 1),
      status: 'completed',
      read: true
    },
    {
      id: '3',
      type: 'system',
      title: 'Budget Limit Reached',
      description: 'You have reached 80% of your Entertainment budget for this month.',
      date: subDays(now, 2),
      read: false
    },
    {
      id: '4',
      type: 'alert',
      title: 'Unusual Activity Detected',
      description: 'A large transaction of $499.99 was made at Amazon.com which is higher than your usual spending pattern.',
      date: subDays(now, 3),
      read: false
    },
    {
      id: '5',
      type: 'transaction',
      category: 'expense',
      title: 'Netflix Subscription',
      description: 'Monthly subscription fee',
      amount: 14.99,
      date: subDays(now, 5),
      status: 'completed',
      read: true
    },
    {
      id: '6',
      type: 'transaction',
      category: 'transfer',
      title: 'Transfer to Savings',
      description: 'Monthly savings transfer',
      amount: 500,
      date: subDays(now, 7),
      status: 'completed',
      read: true
    },
    {
      id: '7',
      type: 'system',
      title: 'New Feature Available',
      description: 'Check out our new budget planning tool to help you manage your finances better.',
      date: subDays(now, 8),
      read: true
    }
  ]);

  const handleActivityClick = (activity: ActivityItem) => {
    // Mark as read if not already
    if (!activity.read) {
      setActivities(activities.map(a => 
        a.id === activity.id ? { ...a, read: true } : a
      ));
    }
    
    setSelectedActivity(activity);
    setIsDialogOpen(true);
  };

  const getActivityIcon = (activity: ActivityItem) => {
    switch (activity.type) {
      case 'transaction':
        if (activity.category === 'income') return <ArrowUpCircle className="h-5 w-5 text-green-500" />;
        if (activity.category === 'expense') return <ArrowDownCircle className="h-5 w-5 text-red-500" />;
        return <CreditCard className="h-5 w-5 text-blue-500" />;
      case 'system':
        return <Clock className="h-5 w-5 text-purple-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      default:
        return null;
    }
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type === filter.slice(0, -1); // Remove 's' from the end for singular type
  });

  const unreadCount = activities.filter(a => !a.read).length;

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold">Activity Log</h1>
            <p className="text-muted-foreground">
              Track your financial activities and system notifications
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-2">
            {unreadCount > 0 && (
              <Badge className="bg-primary text-white">
                {unreadCount} unread
              </Badge>
            )}
            <div className="relative">
              <Button variant="outline" className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10 hidden">
                <div className="py-1">
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" 
                    onClick={() => setFilter('all')}
                  >
                    All Activities
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" 
                    onClick={() => setFilter('transactions')}
                  >
                    Transactions
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" 
                    onClick={() => setFilter('system')}
                  >
                    System Notifications
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" 
                    onClick={() => setFilter('alerts')}
                  >
                    Alerts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className={`flex items-start p-3 rounded-md cursor-pointer transition-colors ${
                      activity.read ? 'hover:bg-muted/50' : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                    onClick={() => handleActivityClick(activity)}
                  >
                    <div className="mr-4 mt-1">
                      {getActivityIcon(activity)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`font-medium ${!activity.read ? 'font-bold' : ''}`}>
                            {activity.title}
                            {!activity.read && (
                              <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {activity.description}
                          </p>
                        </div>
                        {activity.amount !== undefined && (
                          <span className={`font-medium ${
                            activity.category === 'income' ? 'text-green-600' : 
                            activity.category === 'expense' ? 'text-red-600' : 'text-blue-600'
                          }`}>
                            {activity.category === 'income' ? '+' : 
                             activity.category === 'expense' ? '-' : ''}
                            ${activity.amount.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          {format(activity.date, "MMM d, yyyy 'at' h:mm a")}
                        </span>
                        {activity.status && (
                          <Badge variant="outline" className={
                            activity.status === 'completed' ? 'text-green-600 border-green-200 bg-green-50' :
                            activity.status === 'pending' ? 'text-yellow-600 border-yellow-200 bg-yellow-50' :
                            'text-red-600 border-red-200 bg-red-50'
                          }>
                            {activity.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No activities found for the selected filter.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activity Details</DialogTitle>
          </DialogHeader>
          {selectedActivity && (
            <div className="space-y-4">
              <div className="flex items-center">
                {getActivityIcon(selectedActivity)}
                <h2 className="text-xl font-semibold ml-2">{selectedActivity.title}</h2>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p>{selectedActivity.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Date & Time</h3>
                  <p>{format(selectedActivity.date, "MMMM d, yyyy 'at' h:mm a")}</p>
                </div>
                
                {selectedActivity.type === 'transaction' && (
                  <>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Amount</h3>
                      <p className={`font-medium ${
                        selectedActivity.category === 'income' ? 'text-green-600' : 
                        selectedActivity.category === 'expense' ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {selectedActivity.category === 'income' ? '+' : 
                         selectedActivity.category === 'expense' ? '-' : ''}
                        ${selectedActivity.amount?.toFixed(2)}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                      <p className="capitalize">{selectedActivity.category}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                      <Badge variant="outline" className={
                        selectedActivity.status === 'completed' ? 'text-green-600 border-green-200 bg-green-50' :
                        selectedActivity.status === 'pending' ? 'text-yellow-600 border-yellow-200 bg-yellow-50' :
                        'text-red-600 border-red-200 bg-red-50'
                      }>
                        {selectedActivity.status}
                      </Badge>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="w-full" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Activity;
