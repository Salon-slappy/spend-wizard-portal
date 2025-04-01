
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Save } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const { toast } = useToast();

  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'XpenseS',
    contactEmail: 'admin@xpenses.com',
    dateFormat: 'MM/DD/YYYY',
    currencySymbol: '$',
  });

  const [securitySettings, setSecuritySettings] = useState({
    requireMfa: true,
    passwordExpiry: 90,
    sessionTimeout: 30,
    allowMultipleDevices: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    loginAlerts: true,
    weeklyReports: true,
    budgetAlerts: true,
  });

  const [apiSettings, setApiSettings] = useState({
    apiKey: 'sk_test_51NrhKDGIGdsiudhES98DJSK42',
    enableApi: false,
    rateLimit: 100,
    ipRestriction: '',
  });

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully."
    });
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Security settings have been updated successfully."
    });
  };

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Notification settings have been updated successfully."
    });
  };

  const handleApiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Saved",
      description: "API settings have been updated successfully."
    });
  };

  const regenerateApiKey = () => {
    const newApiKey = 'sk_test_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiSettings({...apiSettings, apiKey: newApiKey});
    toast({
      title: "API Key Regenerated",
      description: "A new API key has been generated. Make sure to update your applications."
    });
  };

  return (
    <DashboardLayout>
      <div className="grid gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold">System Settings</h1>
            <p className="text-muted-foreground">Configure application settings and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage basic application settings</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGeneralSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input 
                        id="companyName" 
                        value={generalSettings.companyName}
                        onChange={(e) => setGeneralSettings({...generalSettings, companyName: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input 
                        id="contactEmail" 
                        type="email"
                        value={generalSettings.contactEmail}
                        onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <select 
                        id="dateFormat"
                        className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md"
                        value={generalSettings.dateFormat}
                        onChange={(e) => setGeneralSettings({...generalSettings, dateFormat: e.target.value})}
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currencySymbol">Currency Symbol</Label>
                      <select 
                        id="currencySymbol"
                        className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md"
                        value={generalSettings.currencySymbol}
                        onChange={(e) => setGeneralSettings({...generalSettings, currencySymbol: e.target.value})}
                      >
                        <option value="$">$ (Dollar)</option>
                        <option value="€">€ (Euro)</option>
                        <option value="£">£ (Pound)</option>
                        <option value="¥">¥ (Yen)</option>
                        <option value="₹">₹ (Rupee)</option>
                      </select>
                    </div>
                  </div>
                  <Button type="submit" className="mt-4">
                    <Save className="h-4 w-4 mr-2" /> Save General Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security and authentication settings</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSecuritySubmit} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Require Multi-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Require all users to set up MFA for their accounts
                      </p>
                    </div>
                    <Switch 
                      checked={securitySettings.requireMfa}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requireMfa: checked})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                    <Input 
                      id="passwordExpiry" 
                      type="number"
                      min="0"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: parseInt(e.target.value)})}
                    />
                    <p className="text-xs text-muted-foreground">
                      Set to 0 for passwords that never expire
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="sessionTimeout" 
                      type="number"
                      min="5"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Allow Multiple Device Login</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow users to remain signed in on multiple devices simultaneously
                      </p>
                    </div>
                    <Switch 
                      checked={securitySettings.allowMultipleDevices}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, allowMultipleDevices: checked})}
                    />
                  </div>

                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" /> Save Security Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure system notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNotificationSubmit} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Send important notifications via email
                      </p>
                    </div>
                    <Switch 
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Login Alerts</h3>
                      <p className="text-sm text-muted-foreground">
                        Notify users of new logins to their account
                      </p>
                    </div>
                    <Switch 
                      checked={notificationSettings.loginAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, loginAlerts: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Weekly Reports</h3>
                      <p className="text-sm text-muted-foreground">
                        Send weekly financial summary reports
                      </p>
                    </div>
                    <Switch 
                      checked={notificationSettings.weeklyReports}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, weeklyReports: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Budget Alerts</h3>
                      <p className="text-sm text-muted-foreground">
                        Send alerts when budget thresholds are reached
                      </p>
                    </div>
                    <Switch 
                      checked={notificationSettings.budgetAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, budgetAlerts: checked})}
                    />
                  </div>

                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" /> Save Notification Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>Manage API access and configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleApiSubmit} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Enable API Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow external applications to access data via API
                      </p>
                    </div>
                    <Switch 
                      checked={apiSettings.enableApi}
                      onCheckedChange={(checked) => setApiSettings({...apiSettings, enableApi: checked})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex">
                      <Input 
                        id="apiKey" 
                        value={apiSettings.apiKey}
                        readOnly
                        className="rounded-r-none"
                      />
                      <Button 
                        type="button"
                        onClick={regenerateApiKey}
                        className="rounded-l-none"
                      >
                        Regenerate
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This API key provides full access to your account. Keep it secure.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rateLimit">Rate Limit (requests per minute)</Label>
                    <Input 
                      id="rateLimit" 
                      type="number"
                      min="10"
                      value={apiSettings.rateLimit}
                      onChange={(e) => setApiSettings({...apiSettings, rateLimit: parseInt(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ipRestriction">IP Restriction (optional)</Label>
                    <Input 
                      id="ipRestriction" 
                      placeholder="e.g., 192.168.1.1,10.0.0.1"
                      value={apiSettings.ipRestriction}
                      onChange={(e) => setApiSettings({...apiSettings, ipRestriction: e.target.value})}
                    />
                    <p className="text-xs text-muted-foreground">
                      Restrict API access to specific IP addresses, separated by commas
                    </p>
                  </div>

                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" /> Save API Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettings;
