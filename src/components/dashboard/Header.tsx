
import React from 'react';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back! Here's your financial summary</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="hidden md:flex">
          Export Data
        </Button>
        <Button>Add Expense</Button>
      </div>
    </header>
  );
};

export default Header;
