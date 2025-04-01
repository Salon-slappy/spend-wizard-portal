
import React from 'react';
import { NavLink } from 'react-router-dom';
import { PieChart, BarChart, CreditCard, Wallet, Calendar, Activity, UserCog, Users, Settings } from 'lucide-react';

const Sidebar = () => {
  // In a real application, this would come from an authentication context
  const userRole = 'super-admin'; // Options: 'user', 'admin', 'super-admin'

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: PieChart, roles: ['user', 'admin', 'super-admin'] },
    { name: 'Transactions', path: '/transactions', icon: CreditCard, roles: ['user', 'admin', 'super-admin'] },
    { name: 'Budget', path: '/budget', icon: Wallet, roles: ['user', 'admin', 'super-admin'] },
    { name: 'Reports', path: '/reports', icon: BarChart, roles: ['user', 'admin', 'super-admin'] },
    { name: 'Calendar', path: '/calendar', icon: Calendar, roles: ['user', 'admin', 'super-admin'] },
    { name: 'Activity', path: '/activity', icon: Activity, roles: ['user', 'admin', 'super-admin'] },
    { name: 'Admin Dashboard', path: '/admin', icon: UserCog, roles: ['admin', 'super-admin'] },
    { name: 'User Management', path: '/admin/users', icon: Users, roles: ['admin', 'super-admin'] },
    { name: 'System Settings', path: '/admin/settings', icon: Settings, roles: ['super-admin'] },
  ];

  // Filter nav items based on user role
  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-primary">XpenseS</h2>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {filteredNavItems.map((item) => (
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
