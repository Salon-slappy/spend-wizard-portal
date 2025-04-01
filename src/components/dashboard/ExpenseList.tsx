
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Plus } from 'lucide-react';

interface Expense {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
}

const ExpenseList: React.FC = () => {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', name: 'Grocery Shopping', category: 'Food', amount: 85.50, date: '2023-06-15' },
    { id: '2', name: 'Phone Bill', category: 'Utilities', amount: 45.00, date: '2023-06-12' },
    { id: '3', name: 'Netflix Subscription', category: 'Entertainment', amount: 14.99, date: '2023-06-10' },
    { id: '4', name: 'Uber Ride', category: 'Transport', amount: 22.50, date: '2023-06-08' },
    { id: '5', name: 'Restaurant', category: 'Food', amount: 65.30, date: '2023-06-05' },
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

  const handleAddClick = () => {
    setFormMode('add');
    setCurrentExpense({
      id: '',
      name: '',
      category: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0]
    });
    setIsDialogOpen(true);
  };

  const handleEditClick = (expense: Expense) => {
    setFormMode('edit');
    setCurrentExpense(expense);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    toast({
      title: "Expense Deleted",
      description: "The expense has been successfully removed.",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!currentExpense) return;

    if (formMode === 'add') {
      // In a real app, we would submit to a backend and get a real ID
      const newExpense = {
        ...currentExpense,
        id: Date.now().toString()
      };
      setExpenses([newExpense, ...expenses]);
      toast({
        title: "Expense Added",
        description: "Your new expense has been added successfully.",
      });
    } else {
      setExpenses(expenses.map(expense => 
        expense.id === currentExpense.id ? currentExpense : expense
      ));
      toast({
        title: "Expense Updated",
        description: "The expense has been successfully updated.",
      });
    }
    
    setIsDialogOpen(false);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Food': 'bg-blue-500',
      'Transport': 'bg-yellow-500',
      'Entertainment': 'bg-purple-500',
      'Utilities': 'bg-red-500',
      'Shopping': 'bg-pink-500',
    };
    
    return colors[category] || 'bg-gray-400';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Recent Expenses</CardTitle>
        <Button size="sm" onClick={handleAddClick}>
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </CardHeader>
      <CardContent className="px-0 overflow-auto max-h-[400px]">
        <div className="space-y-1">
          {expenses.map((expense) => (
            <div 
              key={expense.id} 
              className="flex items-center justify-between p-3 hover:bg-muted transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${getCategoryColor(expense.category)}`} />
                <div>
                  <p className="text-sm font-medium">{expense.name}</p>
                  <p className="text-xs text-muted-foreground">{expense.category} • {expense.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-red-500">
                  -रू{expense.amount.toFixed(2)}
                </span>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditClick(expense)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteClick(expense.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formMode === 'add' ? 'Add New Expense' : 'Edit Expense'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Description</Label>
              <Input 
                id="name" 
                value={currentExpense?.name || ''}
                onChange={(e) => setCurrentExpense(curr => curr ? {...curr, name: e.target.value} : null)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category" 
                value={currentExpense?.category || ''}
                onChange={(e) => setCurrentExpense(curr => curr ? {...curr, category: e.target.value} : null)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (रू)</Label>
              <Input 
                id="amount" 
                type="number"
                step="0.01"
                min="0"
                value={currentExpense?.amount || ''}
                onChange={(e) => setCurrentExpense(curr => curr ? {...curr, amount: parseFloat(e.target.value)} : null)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date" 
                type="date"
                value={currentExpense?.date || ''}
                onChange={(e) => setCurrentExpense(curr => curr ? {...curr, date: e.target.value} : null)}
                required 
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{formMode === 'add' ? 'Add Expense' : 'Update Expense'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ExpenseList;
