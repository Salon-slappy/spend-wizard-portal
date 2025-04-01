
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface BudgetItem {
  id: string;
  category: string;
  allocated: number;
  spent: number;
}

const Budget: React.FC = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentBudget, setCurrentBudget] = useState<BudgetItem | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  
  const [budgets, setBudgets] = useState<BudgetItem[]>([
    { id: '1', category: 'Food & Drinks', allocated: 500, spent: 350 },
    { id: '2', category: 'Housing', allocated: 1200, spent: 1200 },
    { id: '3', category: 'Transportation', allocated: 200, spent: 150 },
    { id: '4', category: 'Entertainment', allocated: 150, spent: 75 },
    { id: '5', category: 'Utilities', allocated: 300, spent: 280 },
  ]);

  // Calculate totals
  const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocated, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  
  const handleAddClick = () => {
    setFormMode('add');
    setCurrentBudget({
      id: '',
      category: '',
      allocated: 0,
      spent: 0
    });
    setIsDialogOpen(true);
  };

  const handleEditClick = (budget: BudgetItem) => {
    setFormMode('edit');
    setCurrentBudget(budget);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
    toast({
      title: "Budget Deleted",
      description: "The budget category has been successfully removed."
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!currentBudget) return;

    if (formMode === 'add') {
      const newBudget = {
        ...currentBudget,
        id: Date.now().toString()
      };
      setBudgets([...budgets, newBudget]);
      toast({
        title: "Budget Added",
        description: "The new budget category has been added successfully."
      });
    } else {
      setBudgets(budgets.map(budget => 
        budget.id === currentBudget.id ? currentBudget : budget
      ));
      toast({
        title: "Budget Updated",
        description: "The budget category has been successfully updated."
      });
    }
    
    setIsDialogOpen(false);
  };

  const getProgressColor = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold">Budget Planning</h1>
            <p className="text-muted-foreground">Manage your monthly budget allocations</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button onClick={handleAddClick}>
              <Plus className="h-4 w-4 mr-2" /> Add Budget Category
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Budget Overview</CardTitle>
              <CardDescription>Current Month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Total Budget</span>
                    <span className="text-sm font-medium">${totalAllocated.toFixed(2)}</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Total Spent</span>
                    <span className="text-sm font-medium">${totalSpent.toFixed(2)}</span>
                  </div>
                  <Progress 
                    value={(totalSpent / totalAllocated) * 100} 
                    className="h-2" 
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Remaining</span>
                    <span className="text-sm font-medium">${(totalAllocated - totalSpent).toFixed(2)}</span>
                  </div>
                  <Progress 
                    value={((totalAllocated - totalSpent) / totalAllocated) * 100} 
                    className="h-2 bg-green-200" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Budget Health</CardTitle>
              <CardDescription>Your budget status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Good - Under 50% spent</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm">Warning - Between 50% and 80% spent</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm">Danger - Over 80% spent</span>
                </div>
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    You have spent {((totalSpent / totalAllocated) * 100).toFixed(1)}% of your total budget this month.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {budgets.map((budget) => (
                <div key={budget.id} className="bg-muted/50 p-4 rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{budget.category}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${budget.spent.toFixed(2)} of ${budget.allocated.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditClick(budget)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteClick(budget.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Progress 
                    value={(budget.spent / budget.allocated) * 100} 
                    className={`h-2 ${getProgressColor(budget.spent, budget.allocated)}`}
                  />
                  <div className="mt-1 flex justify-between text-xs">
                    <span>
                      {((budget.spent / budget.allocated) * 100).toFixed(0)}% spent
                    </span>
                    <span>
                      ${(budget.allocated - budget.spent).toFixed(2)} remaining
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formMode === 'add' ? 'Add Budget Category' : 'Edit Budget Category'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category Name</Label>
              <Input 
                id="category" 
                value={currentBudget?.category || ''}
                onChange={(e) => setCurrentBudget(curr => curr ? {...curr, category: e.target.value} : null)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="allocated">Allocated Amount ($)</Label>
              <Input 
                id="allocated"
                type="number"
                step="0.01" 
                value={currentBudget?.allocated || 0}
                onChange={(e) => setCurrentBudget(curr => curr ? 
                  {...curr, allocated: parseFloat(e.target.value)} : null)}
                required 
              />
            </div>
            {formMode === 'edit' && (
              <div className="space-y-2">
                <Label htmlFor="spent">Spent Amount ($)</Label>
                <Input 
                  id="spent"
                  type="number"
                  step="0.01" 
                  value={currentBudget?.spent || 0}
                  onChange={(e) => setCurrentBudget(curr => curr ? 
                    {...curr, spent: parseFloat(e.target.value)} : null)}
                  required 
                />
              </div>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{formMode === 'add' ? 'Add Budget' : 'Update Budget'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Budget;
