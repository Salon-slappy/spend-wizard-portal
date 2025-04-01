
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Download } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Reports: React.FC = () => {
  const [range, setRange] = useState<{from?: Date; to?: Date}>({from: undefined, to: undefined});
  
  // Sample data
  const monthlyData = [
    { name: 'Jan', income: 4000, expense: 2400 },
    { name: 'Feb', income: 3500, expense: 1398 },
    { name: 'Mar', income: 5000, expense: 3000 },
    { name: 'Apr', income: 2780, expense: 3908 },
    { name: 'May', income: 1890, expense: 4800 },
    { name: 'Jun', income: 2390, expense: 3800 },
  ];

  const categoryData = [
    { name: 'Food & Drinks', value: 400 },
    { name: 'Housing', value: 1200 },
    { name: 'Transportation', value: 200 },
    { name: 'Entertainment', value: 150 },
    { name: 'Utilities', value: 300 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold">Financial Reports</h1>
            <p className="text-muted-foreground">Analyze your financial data</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[250px] justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {range.from ? (
                    range.to ? (
                      <>
                        {format(range.from, "LLL dd, y")} - {format(range.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(range.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Select date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            <Button>
              <Download className="h-4 w-4 mr-2" /> Export Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="income-expense">
          <TabsList className="mb-4">
            <TabsTrigger value="income-expense">Income vs. Expense</TabsTrigger>
            <TabsTrigger value="category">Category Breakdown</TabsTrigger>
            <TabsTrigger value="summary">Financial Summary</TabsTrigger>
          </TabsList>
          <TabsContent value="income-expense">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Income vs. Expenses</CardTitle>
                <CardDescription>Comparison over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <XAxis dataKey="name" />
                      <YAxis formatter={(value) => `$${value}`} />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, '']}
                        contentStyle={{ 
                          borderRadius: '8px', 
                          border: 'none', 
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="income" fill="#16A34A" name="Income" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expense" fill="#DC2626" name="Expense" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="category">
            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>Breakdown of expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`$${value}`, '']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    {categoryData.map((item, index) => (
                      <div key={item.name}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <span 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></span>
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <span className="text-sm">${item.value}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              width: `${(item.value / categoryData.reduce((acc, curr) => acc + curr.value, 0)) * 100}%`,
                              backgroundColor: COLORS[index % COLORS.length] 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="summary">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Summary</CardTitle>
                  <CardDescription>Key financial metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Total Income</span>
                      <span className="text-green-600">$19,560</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Total Expenses</span>
                      <span className="text-red-600">$16,306</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Net Savings</span>
                      <span className="text-primary">$3,254</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Largest Expense</span>
                      <span>Housing ($1,200)</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Savings Rate</span>
                      <span>16.6%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Insights</CardTitle>
                  <CardDescription>Analysis and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-100 rounded-md">
                      <h4 className="font-medium text-green-800">Positive Trends</h4>
                      <p className="text-sm text-green-700 mt-1">Your income has increased by 12% compared to the previous period.</p>
                    </div>
                    <div className="p-3 bg-red-50 border border-red-100 rounded-md">
                      <h4 className="font-medium text-red-800">Areas of Concern</h4>
                      <p className="text-sm text-red-700 mt-1">Entertainment expenses have increased by 25% this month.</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                      <h4 className="font-medium text-blue-800">Recommendations</h4>
                      <p className="text-sm text-blue-700 mt-1">Consider increasing your savings allocation by reducing discretionary spending.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
