
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ExpenseChartProps {
  data?: {
    name: string;
    value: number;
    color: string;
  }[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ 
  data = [
    { name: 'Housing', value: 1200, color: '#38A169' },
    { name: 'Food', value: 800, color: '#3182CE' },
    { name: 'Transport', value: 400, color: '#ECC94B' },
    { name: 'Entertainment', value: 300, color: '#805AD5' },
    { name: 'Shopping', value: 200, color: '#D53F8C' },
    { name: 'Others', value: 100, color: '#718096' },
  ] 
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="w-full h-[200px] md:h-[220px] md:w-3/5">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`$${value}`, 'Expense']}
                  labelFormatter={() => ''}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="md:w-2/5">
            <h4 className="text-sm font-medium mb-2">Categories</h4>
            <div className="space-y-2">
              {data.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="text-sm font-medium">
                    ${item.value}
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({Math.round((item.value / total) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
