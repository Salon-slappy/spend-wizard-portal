
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format, isSameDay } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Plus, CalendarIcon } from 'lucide-react';

interface FinancialEvent {
  id: string;
  title: string;
  date: Date;
  amount: number;
  type: 'income' | 'expense' | 'bill';
  description: string;
}

const Calendar: React.FC = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<FinancialEvent | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  
  const [events, setEvents] = useState<FinancialEvent[]>([
    {
      id: '1',
      title: 'Rent Payment',
      date: new Date(2023, 10, 1),
      amount: 1200,
      type: 'expense',
      description: 'Monthly rent payment'
    },
    {
      id: '2',
      title: 'Salary Deposit',
      date: new Date(2023, 10, 15),
      amount: 3500,
      type: 'income',
      description: 'Bi-weekly salary payment'
    },
    {
      id: '3',
      title: 'Electricity Bill',
      date: new Date(2023, 10, 10),
      amount: 85,
      type: 'bill',
      description: 'Monthly electricity bill'
    },
    {
      id: '4',
      title: 'Internet Bill',
      date: new Date(2023, 10, 12),
      amount: 60,
      type: 'bill',
      description: 'Monthly internet subscription'
    },
    {
      id: '5',
      title: 'Freelance Payment',
      date: new Date(2023, 10, 20),
      amount: 750,
      type: 'income',
      description: 'Website development project'
    }
  ]);

  const handleAddClick = () => {
    setFormMode('add');
    setCurrentEvent({
      id: '',
      title: '',
      date: date,
      amount: 0,
      type: 'expense',
      description: ''
    });
    setIsDialogOpen(true);
  };

  const handleEventClick = (event: FinancialEvent) => {
    setFormMode('edit');
    setCurrentEvent(event);
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = () => {
    if (!currentEvent) return;
    
    setEvents(events.filter(event => event.id !== currentEvent.id));
    toast({
      title: "Event Deleted",
      description: "The financial event has been successfully removed."
    });
    setIsDialogOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!currentEvent) return;

    if (formMode === 'add') {
      const newEvent = {
        ...currentEvent,
        id: Date.now().toString()
      };
      setEvents([...events, newEvent]);
      toast({
        title: "Event Added",
        description: "The new financial event has been added successfully."
      });
    } else {
      setEvents(events.map(event => 
        event.id === currentEvent.id ? currentEvent : event
      ));
      toast({
        title: "Event Updated",
        description: "The financial event has been successfully updated."
      });
    }
    
    setIsDialogOpen(false);
  };

  // Function to get events for the selected date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  };

  const selectedDateEvents = getEventsForDate(date);
  
  // Get current month and day
  const currentMonth = format(date, 'MMMM');
  const currentDay = format(date, 'd');
  const currentYear = format(date, 'yyyy');

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold">Financial Calendar</h1>
            <p className="text-muted-foreground">Schedule and track your financial events</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button onClick={handleAddClick}>
              <Plus className="h-4 w-4 mr-2" /> Add Event
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Calendar</span>
                  <span className="text-base font-normal text-muted-foreground">
                    {currentMonth} {currentYear}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6">
                  <CalendarIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <h2 className="text-2xl font-bold mb-1">{currentDay}</h2>
                  <p className="text-lg text-muted-foreground">{currentMonth} {currentYear}</p>
                  
                  <div className="grid grid-cols-3 gap-2 mt-6 mb-4">
                    {Array.from({ length: 9 }).map((_, i) => {
                      const dayNum = i - 3 + parseInt(currentDay);
                      return (
                        <button
                          key={i}
                          className={`p-2 rounded-md ${i === 3 ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                          onClick={() => {
                            const newDate = new Date(date);
                            newDate.setDate(dayNum);
                            setDate(newDate);
                          }}
                        >
                          {dayNum > 0 ? dayNum : ''}
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-green-100 border border-green-400 rounded-full mr-1"></span>
                      <span className="text-xs">Income</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-100 border border-red-400 rounded-full mr-1"></span>
                      <span className="text-xs">Expense</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-orange-100 border border-orange-400 rounded-full mr-1"></span>
                      <span className="text-xs">Bill</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Events for {format(date, 'MMMM d, yyyy')}</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map((event) => (
                      <div 
                        key={event.id} 
                        className={`p-3 rounded-md cursor-pointer hover:bg-muted transition-colors ${
                          event.type === 'income' ? 'bg-green-50 border border-green-100' :
                          event.type === 'expense' ? 'bg-red-50 border border-red-100' :
                          'bg-orange-50 border border-orange-100'
                        }`}
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="flex justify-between">
                          <h3 className="font-medium">{event.title}</h3>
                          <span className={`text-sm ${
                            event.type === 'income' ? 'text-green-600' :
                            event.type === 'expense' ? 'text-red-600' :
                            'text-orange-600'
                          }`}>
                            {event.type === 'income' ? '+' : '-'}${event.amount.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No events scheduled for this day.</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mt-4"
                      onClick={handleAddClick}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Event
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formMode === 'add' ? 'Add Financial Event' : 'Edit Financial Event'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input 
                id="title" 
                value={currentEvent?.title || ''}
                onChange={(e) => setCurrentEvent(curr => curr ? {...curr, title: e.target.value} : null)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Event Type</Label>
              <select 
                id="type"
                className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md"
                value={currentEvent?.type || 'expense'}
                onChange={(e) => setCurrentEvent(curr => curr ? 
                  {...curr, type: e.target.value as 'income' | 'expense' | 'bill'} : null)}
                required
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="bill">Bill</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input 
                id="amount"
                type="number"
                step="0.01" 
                value={currentEvent?.amount || 0}
                onChange={(e) => setCurrentEvent(curr => curr ? 
                  {...curr, amount: parseFloat(e.target.value)} : null)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                value={format(currentEvent?.date || new Date(), 'yyyy-MM-dd')}
                onChange={(e) => {
                  const newDate = e.target.value ? new Date(e.target.value) : new Date();
                  setCurrentEvent(curr => curr ? {...curr, date: newDate} : null);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input 
                id="description" 
                value={currentEvent?.description || ''}
                onChange={(e) => setCurrentEvent(curr => curr ? {...curr, description: e.target.value} : null)}
              />
            </div>
            <DialogFooter>
              {formMode === 'edit' && (
                <Button 
                  type="button" 
                  variant="destructive"
                  onClick={handleDeleteEvent}
                >
                  Delete
                </Button>
              )}
              <div className="flex-1"></div>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{formMode === 'add' ? 'Add Event' : 'Update Event'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Calendar;
