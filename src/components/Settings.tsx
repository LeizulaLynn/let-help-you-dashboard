import React, { useState } from 'react';
import { User, Shield, Bell, Palette, Smartphone, LogOut, Camera, Check, Moon, Sun, Monitor, Laptop, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserType } from '@/lib/types';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export const SettingsModule = ({ user, onLogout }: { user: UserType, onLogout: () => void }) => {
  const { theme, setTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-soil dark:text-offwhite">Settings</h1>
        <p className="text-muted-foreground">Customize your account and system preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full justify-start h-14 bg-white dark:bg-card border-none shadow-md p-1 rounded-2xl mb-8 overflow-x-auto">
          <TabsTrigger value="profile" className="rounded-xl px-6 font-bold gap-2 data-[state=active]:bg-soil data-[state=active]:text-white">
            <User size={18} /> Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl px-6 font-bold gap-2 data-[state=active]:bg-soil data-[state=active]:text-white">
            <Shield size={18} /> Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-xl px-6 font-bold gap-2 data-[state=active]:bg-soil data-[state=active]:text-white">
            <Bell size={18} /> Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="rounded-xl px-6 font-bold gap-2 data-[state=active]:bg-soil data-[state=active]:text-white">
            <Palette size={18} /> Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="agri-card border-none shadow-xl">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information and profile picture.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-border/30">
                <div className="relative group">
                  <Avatar className="h-28 w-28 ring-4 ring-offwhite dark:ring-white/5 shadow-2xl transition-transform group-hover:scale-105">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-3xl font-bold bg-sand">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 p-2 bg-leaf text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                    <Camera size={18} />
                  </button>
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-soil dark:text-offwhite">{user.name}</h3>
                  <Badge variant="secondary" className="uppercase tracking-widest text-[10px] font-bold">{user.role}</Badge>
                  <p className="text-sm text-muted-foreground">Joined {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-bold text-soil dark:text-offwhite ml-1">Full Name</Label>
                  <Input defaultValue={user.name} className="h-12 rounded-xl bg-offwhite/50 dark:bg-white/5 border-none shadow-inner" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-soil dark:text-offwhite ml-1">Email Address</Label>
                  <div className="relative">
                    <Input defaultValue={user.email} className="h-12 rounded-xl bg-offwhite/50 dark:bg-white/5 border-none shadow-inner pl-10" />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-soil dark:text-offwhite ml-1">Phone Number</Label>
                  <div className="relative">
                    <Input defaultValue={user.phone || '+1 (555) 000-0000'} className="h-12 rounded-xl bg-offwhite/50 dark:bg-white/5 border-none shadow-inner pl-10" />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button onClick={() => toast.success('Profile updated successfully')} className="bg-leaf hover:bg-leaf/90 rounded-xl h-12 px-10 font-bold shadow-lg shadow-leaf/20">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="agri-card border-none shadow-xl">
            <CardHeader>
              <CardTitle>Security & Authentication</CardTitle>
              <CardDescription>Manage your password and account security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-soil dark:text-offwhite uppercase tracking-widest">Change Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-bold text-soil dark:text-offwhite ml-1">Current Password</Label>
                    <div className="relative">
                      <Input type={showPassword ? 'text' : 'password'} className="h-12 rounded-xl bg-offwhite/50 dark:bg-white/5 border-none shadow-inner pl-10" />
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-soil dark:text-offwhite ml-1">New Password</Label>
                    <div className="relative">
                      <Input type={showPassword ? 'text' : 'password'} className="h-12 rounded-xl bg-offwhite/50 dark:bg-white/5 border-none shadow-inner pl-10" />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-soil"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="rounded-xl font-bold border-soil/10">Update Password</Button>
              </div>

              <div className="pt-8 border-t border-border/30 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-soil dark:text-offwhite">Two-Factor Authentication</h4>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-soil dark:text-offwhite">Login Sessions</h4>
                    <p className="text-xs text-muted-foreground">Review and manage your active devices.</p>
                  </div>
                  <Button variant="link" className="text-leaf font-bold">Manage</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="agri-card border-none shadow-xl">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified about agricultural events.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                {[
                  { title: 'Critical Risk Alerts', desc: 'Receive immediate notifications for pests or drought detection.', active: true },
                  { title: 'Field Update Reminders', desc: 'Get reminded if a field has not been updated in 5+ days.', active: true },
                  { title: 'Weekly Operation Summaries', desc: 'A curated report of team activity and field health.', active: false },
                  { title: 'Harvest Readiness', desc: 'Notifications when crops are reaching optimal harvest stage.', active: true },
                  { title: 'Internal Messages', desc: 'Alerts when coordinators or agents message you.', active: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <div className="space-y-1">
                      <h4 className="font-bold text-soil dark:text-offwhite group-hover:text-leaf transition-colors">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.active} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="agri-card border-none shadow-xl">
            <CardHeader>
              <CardTitle>System Appearance</CardTitle>
              <CardDescription>Switch between themes and customize the visual experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button 
                  onClick={() => setTheme('light')}
                  className={`relative p-6 rounded-2xl border-4 transition-all text-left space-y-4 ${
                    theme === 'light' ? 'border-leaf bg-leaf/5 shadow-xl' : 'border-offwhite dark:border-white/5 bg-offwhite/50 dark:bg-white/5 opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="p-3 bg-white rounded-xl text-yellow-500 shadow-sm"><Sun size={24} /></div>
                    {theme === 'light' && <Check size={20} className="text-leaf" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-soil">Light Mode</h4>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Warm sand & Soft greens</p>
                  </div>
                </button>

                <button 
                  onClick={() => setTheme('dark')}
                  className={`relative p-6 rounded-2xl border-4 transition-all text-left space-y-4 ${
                    theme === 'dark' ? 'border-leaf bg-soil shadow-xl' : 'border-offwhite dark:border-white/5 bg-offwhite/50 dark:bg-white/5 opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="p-3 bg-card rounded-xl text-sand shadow-sm"><Moon size={24} /></div>
                    {theme === 'dark' && <Check size={20} className="text-leaf" />}
                  </div>
                  <div>
                    <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-soil dark:text-offwhite'}`}>Dark Mode</h4>
                    <p className={`text-[10px] uppercase tracking-widest font-bold ${theme === 'dark' ? 'text-offwhite/50' : 'text-muted-foreground'}`}>Deep earthy & Olive</p>
                  </div>
                </button>
              </div>

              <div className="pt-8 border-t border-border/30 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-soil dark:text-offwhite">High Contrast Text</h4>
                    <p className="text-xs text-muted-foreground">Improve readability for outdoor field use.</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-soil dark:text-offwhite">Compact View</h4>
                    <p className="text-xs text-muted-foreground">Show more data on dashboards with less white space.</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="agri-card border-none shadow-md overflow-hidden bg-status-warning/10 border-status-warning/20">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-card rounded-xl text-status-warning shadow-sm"><LogOut size={24} /></div>
                <div>
                  <h4 className="font-bold text-status-warning">Sign Out</h4>
                  <p className="text-xs text-muted-foreground">Securely exit your session.</p>
                </div>
              </div>
              <Button onClick={onLogout} variant="ghost" className="text-status-warning font-bold hover:bg-status-warning/10 rounded-xl px-6 h-12">Log Out Now</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};