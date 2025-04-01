
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Trash2, PenLine, Plus, Search, Download } from 'lucide-react';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
}

const categories = [
  'Food & Drinks',
  'Shopping',
  'Housing',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Education',
  'Salary',
  'Investment',
  'Gift',
  'Other'
];

const Transactions: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      title: 'Grocery Shopping',
      amount: 85.75,
      type: 'expense',
      category: 'Food & Drinks',
      date: new Date(2023, 10, 25)
    },
    {
      id: '2',
      title: 'Salary',
      amount: 3500,
      type: 'income',
      category: 'Salary',
      date: new Date(2023, 10, 20)
    },
    {
      id: '3',
      title: 'Electric Bill',
      amount: 120.50,
      type: 'expense',
      category: 'Utilities',
      date: new Date(2023, 10, 15)
    },
    {
      id: '4',
      title: 'Netflix Subscription',
      amount: 14.99,
      type: 'expense',
      category: 'Entertainment',
      date: new Date(2023, 10, 10)
    },
    {
      id: '5',
      title: 'Freelance Work',
      amount: 750,
      type: 'income',
      category: 'Other',
      date: new Date(2023, 10, 5)
    }
  ]);

  const handleAddClick = () => {
    setFormMode('add');
    setCurrentTransaction({
      id: '',
      title: '',
      amount: 0,
      type: 'expense',
      category: 'Other',
      date: new Date()
    });
    setIsDialogOpen(true);
  };

  const handleEditClick = (transaction: Transaction) => {
    setFormMode('edit');
    setCurrentTransaction(transaction);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
    toast({
      title: "Transaction Deleted",
      description: "The transaction has been successfully removed."
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!currentTransaction) return;

    if (formMode === 'add') {
      const newTransaction = {
        ...currentTransaction,
        id: Date.now().toString()
      };
      setTransactions([...transactions, newTransaction]);
      toast({
        title: "Transaction Added",
        description: "The new transaction has been added successfully."
      });
    } else {
      setTransactions(transactions.map(transaction => 
        transaction.id === currentTransaction.id ? currentTransaction : transaction
      ));
      toast({
        title: "Transaction Updated",
        description: "The transaction has been successfully updated."
      });
    }
    
    setIsDialogOpen(false);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold">Transactions</h1>
            <p className="text-muted-foreground">Manage your income and expenses</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <Button onClick={handleAddClick}>
              <Plus className="h-4 w-4 mr-2" /> Add Transaction
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Transaction History</CardTitle>
              <div className="relative">
                <Search className="h-4 w-4 absolute top-3 left-3 text-gray-400" />
                <Input 
                  className="pl-9 w-[250px]" 
                  placeholder="Search transactions..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Title</th>
                    <th className="py-3 px-4 text-left font-medium">Category</th>
                    <th className="py-3 px-4 text-left font-medium">Date</th>
                    <th className="py-3 px-4 text-left font-medium">Amount</th>
                    <th className="py-3 px-4 text-left font-medium">Type</th>
                    <th className="py-3 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="bg-card hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">{transaction.title}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block rounded-full px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">{format(transaction.date, 'MMM dd, yyyy')}</td>
                      <td className="py-3 px-4 font-medium">${transaction.amount.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditClick(transaction)}>
                          <PenLine className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteClick(transaction.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formMode === 'add' ? 'Add New Transaction' : 'Edit Transaction'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={currentTransaction?.title || ''}
                onChange={(e) => setCurrentTransaction(curr => curr ? {...curr, title: e.target.value} : null)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input 
                id="amount"
                type="number"
                step="0.01" 
                value={currentTransaction?.amount || 0}
                onChange={(e) => setCurrentTransaction(curr => curr ? 
                  {...curr, amount: parseFloat(e.target.value)} : null)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Transaction Type</Label>
              <select 
                id="type"
                className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md"
                value={currentTransaction?.type || 'expense'}
                onChange={(e) => setCurrentTransaction(curr => curr ? 
                  {...curr, type: e.target.value as 'income' | 'expense'} : null)}
                required
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select 
                id="category"
                className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md"
                value={currentTransaction?.category || 'Other'}
                onChange={(e) => setCurrentTransaction(curr => curr ? 
                  {...curr, category: e.target.value} : null)}
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                value={format(currentTransaction?.date || new Date(), 'yyyy-MM-dd')}
                onChange={(e) => {
                  const newDate = e.target.value ? new Date(e.target.value) : new Date();
                  setCurrentTransaction(curr => curr ? {...curr, date: newDate} : null);
                }}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{formMode === 'add' ? 'Add Transaction' : 'Update Transaction'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Transactions;
