
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, UserPlus, Check, X } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'admin' | 'user';
  status: 'active' | 'inactive';
}

export function UserList() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'super-admin', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin', status: 'active' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'user', status: 'active' },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'user', status: 'inactive' },
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

  const handleAddClick = () => {
    setFormMode('add');
    setCurrentUser({
      id: '',
      name: '',
      email: '',
      role: 'user',
      status: 'active'
    });
    setIsDialogOpen(true);
  };

  const handleEditClick = (user: User) => {
    setFormMode('edit');
    setCurrentUser(user);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "User Deleted",
      description: "The user has been successfully removed.",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!currentUser) return;

    if (formMode === 'add') {
      // In a real app, we would submit to a backend and get a real ID
      const newUser = {
        ...currentUser,
        id: Date.now().toString()
      };
      setUsers([...users, newUser]);
      toast({
        title: "User Added",
        description: "The new user has been added successfully.",
      });
    } else {
      setUsers(users.map(user => 
        user.id === currentUser.id ? currentUser : user
      ));
      toast({
        title: "User Updated",
        description: "The user has been successfully updated.",
      });
    }
    
    setIsDialogOpen(false);
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'super-admin':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Input 
            className="pl-8 w-64" 
            placeholder="Search users..." 
          />
          <div className="absolute left-2 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <Button onClick={handleAddClick}>
          <UserPlus className="h-4 w-4 mr-2" /> Add User
        </Button>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="py-3 px-4 text-left font-medium">Name</th>
              <th className="py-3 px-4 text-left font-medium">Email</th>
              <th className="py-3 px-4 text-left font-medium">Role</th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
              <th className="py-3 px-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id} className="bg-card hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                    {user.role.replace('-', ' ')}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status === 'active' ? (
                      <Check className="mr-1 h-3 w-3" />
                    ) : (
                      <X className="mr-1 h-3 w-3" />
                    )}
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEditClick(user)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteClick(user.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formMode === 'add' ? 'Add New User' : 'Edit User'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                value={currentUser?.name || ''}
                onChange={(e) => setCurrentUser(curr => curr ? {...curr, name: e.target.value} : null)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                value={currentUser?.email || ''}
                onChange={(e) => setCurrentUser(curr => curr ? {...curr, email: e.target.value} : null)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select 
                id="role"
                className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md"
                value={currentUser?.role || 'user'}
                onChange={(e) => setCurrentUser(curr => curr ? 
                  {...curr, role: e.target.value as 'super-admin' | 'admin' | 'user'} : null)}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="super-admin">Super Admin</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select 
                id="status"
                className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md"
                value={currentUser?.status || 'active'}
                onChange={(e) => setCurrentUser(curr => curr ? 
                  {...curr, status: e.target.value as 'active' | 'inactive'} : null)}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{formMode === 'add' ? 'Add User' : 'Update User'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
