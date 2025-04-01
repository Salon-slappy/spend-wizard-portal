
import React from 'react';
import { NavLink } from 'react-router-dom';
import { PieChart, BarChart, CreditCard, Wallet, Calendar, Activity } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Overview', path: '/', icon: PieChart },
    { name: 'Transactions', path: '/transactions', icon: CreditCard },
    { name: 'Budget', path: '/budget', icon: Wallet },
    { name: 'Reports', path: '/reports', icon: BarChart },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Activity', path: '/activity', icon: Activity },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-primary">Expense Tracker</h2>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
                   ${isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-gray-600 hover:bg-gray-100'
                   }`
                }
              >
                <item.icon size={18} />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="bg-secondary p-4 rounded-md">
          <h3 className="font-medium text-sm">Monthly Budget</h3>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-3/4"></div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>$3,240 spent</span>
            <span>$4,000 budget</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
