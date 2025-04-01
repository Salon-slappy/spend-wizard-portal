
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle, Bell, User, LogOut, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Header = () => {
  const { toast } = useToast();
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  
  const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would add the expense to the database
    toast({
      title: "Expense Added",
      description: "Your expense has been added successfully.",
    });
    setIsAddExpenseOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back! Here's your financial summary</p>
      </div>
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>
        
        {/* Add Expense Button */}
        <Button variant="outline" className="hidden md:flex" onClick={() => setIsAddExpenseOpen(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
        
        {/* User Menu */}
        <div className="relative group">
          <Button variant="ghost" size="icon" className="rounded-full">
            <User size={20} />
          </Button>
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
              <User size={16} className="mr-2" />
              Profile
            </Link>
            <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
              <Settings size={16} className="mr-2" />
              Settings
            </Link>
            <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
              <LogOut size={16} className="mr-2" />
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Add Expense Dialog */}
      <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddExpense} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="e.g., Grocery Shopping" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input id="amount" type="number" step="0.01" min="0" placeholder="0.00" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category"
                className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md"
                required
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Utilities">Utilities</option>
                <option value="Shopping">Shopping</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                required 
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddExpenseOpen(false)}>Cancel</Button>
              <Button type="submit">Add Expense</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
