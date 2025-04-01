
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: LucideIcon;
  iconColor?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  trend,
  icon: Icon,
  iconColor = 'bg-primary/10 text-primary',
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {trend && (
              <p className={`text-xs mt-1 flex items-center ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                <span className="ml-1 text-gray-500">vs last month</span>
              </p>
            )}
          </div>
          
          <div className={`p-2 rounded-full ${iconColor}`}>
            <Icon size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
