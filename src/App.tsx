import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  LayoutDashboard, 
  Map as MapIcon, 
  Users, 
  FileText, 
  Bell, 
  Settings, 
  LogOut, 
  Plus, 
  ChevronRight, 
  ShieldCheck, 
  Smartphone, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Toaster, toast } from 'sonner';
import { ThemeProvider, useTheme } from 'next-themes';
import { ThemeToggle } from './components/ThemeToggle';
import { FieldAgentsModule } from './components/admin/FieldAgentsModule';
import { AdminReportsModule } from './components/admin/AdminReports';
import { AdminAlertsModule } from './components/admin/Alerts';
import { MyFieldsModule } from './components/agent/MyFields';
import { AgentUpdatesModule } from './components/agent/AgentUpdates';
import { SettingsModule } from './components/Settings';
import { mockFields } from './lib/mockData';
import { User, UserRole, Field } from './lib/types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { LandingPage } from './components/landing/LandingPage';
import { AuthFlow } from './components/auth/AuthFlow';
import './globals.css';

// --- Shared Layout Components ---

const Sidebar = ({ role, activeTab, setActiveTab, user, onLogout }: { role: UserRole, activeTab: string, setActiveTab: (t: string) => void, user: User, onLogout: () => void }) => {
  const items = role === 'ADMIN' ? [
    { id: 'dashboard', label: 'Operations', icon: LayoutDashboard },
    { id: 'fields', label: 'Field Directory', icon: MapIcon },
    { id: 'agents', label: 'Field Agents', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'alerts', label: 'Alert Center', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] : [
    { id: 'dashboard', label: 'My Hub', icon: LayoutDashboard },
    { id: 'my-fields', label: 'My Fields', icon: MapIcon },
    { id: 'updates', label: 'Submit Updates', icon: Plus },
    { id: 'reports', label: 'Performance', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-soil dark:bg-card text-offwhite z-40 hidden lg:flex flex-col p-6 shadow-2xl border-r border-white/5">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 agri-gradient rounded-xl flex items-center justify-center shadow-lg">
          <Sprout className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-heading font-bold tracking-tight">SmartSeason</span>
      </div>

      <div className="flex-1 space-y-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold text-sm ${
                isActive ? 'bg-leaf text-white shadow-lg shadow-leaf/20' : 'text-offwhite/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} strokeWidth={2.5} />
              <span>{item.label}</span>
              {isActive && <motion.div layoutId="active-indicator" className="ml-auto"><ChevronRight size={14} /></motion.div>}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
        <div className="flex items-center gap-3 px-2 py-2 rounded-2xl bg-white/5">
          <Avatar className="h-10 w-10 ring-2 ring-leaf/30">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-sand text-soil font-bold">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold truncate">{user.name}</span>
            <span className="text-[10px] text-leaf font-bold uppercase tracking-widest">{role}</span>
          </div>
          <div className="ml-auto"><ThemeToggle /></div>
        </div>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-offwhite/40 hover:text-status-warning hover:bg-status-warning/10 transition-all font-bold text-sm">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

const AdminDashboard = ({ onNavigate }: { onNavigate: (t: string) => void }) => {
  const barData = [
    { name: 'Planted', value: 30, color: '#A4BE7B' },
    { name: 'Growing', value: 45, color: '#5C8D4E' },
    { name: 'Ready', value: 20, color: '#4CAF50' },
    { name: 'Harvested', value: 15, color: '#8D99AE' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-soil dark:text-offwhite">Operations Center</h1>
          <p className="text-muted-foreground">Real-time health of your agricultural network.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-soil/10 dark:border-white/10 bg-white dark:bg-card h-12 px-6 font-bold shadow-sm">View Map</Button>
          <Button onClick={() => onNavigate('create-field')} className="bg-leaf hover:bg-leaf/90 rounded-xl gap-2 h-12 px-6 shadow-lg shadow-leaf/20 font-bold">
            <Plus size={18} /> New Field
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Fields', value: '124', icon: MapIcon, color: 'text-leaf', bg: 'bg-leaf/10' },
          { label: 'Active', value: '98', icon: CheckCircle2, color: 'text-status-active', bg: 'bg-status-active/10' },
          { label: 'At Risk', value: '12', icon: AlertTriangle, color: 'text-status-warning', bg: 'bg-status-warning/10' },
          { label: 'Field Agents', value: '24', icon: Users, color: 'text-soil dark:text-offwhite', bg: 'bg-soil/10 dark:bg-white/10' },
        ].map((stat, idx) => (
          <Card key={idx} className="agri-card border-none overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}><stat.icon size={24} /></div>
                <Badge variant="secondary" className="text-[10px] font-bold">+4% Trend</Badge>
              </div>
              <div className="text-3xl font-bold text-soil dark:text-offwhite">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-semibold mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 agri-card border-none shadow-xl">
          <CardHeader>
            <CardTitle>Field Lifecycle Distribution</CardTitle>
            <CardDescription>Current crop stages across all regions</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <RechartsTooltip cursor={{ fill: '#F8F5F0', opacity: 0.4 }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={50}>
                  {barData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="agri-card border-none shadow-xl bg-soil text-white overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 agri-gradient opacity-10 -mr-16 -mt-16 rounded-full" />
             <CardHeader>
               <CardTitle className="text-leaf flex items-center gap-2"><ShieldCheck size={20} /> Smart Insights</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <p className="text-sm text-offwhite/80 leading-relaxed italic">"3 fields have not been updated recently. Consider prioritizing <span className="text-leaf font-bold">North Field A</span> as growth delay was detected."</p>
                <Button variant="outline" className="w-full rounded-xl border-white/20 hover:bg-white/10 text-white font-bold">Run Full Audit</Button>
             </CardContent>
          </Card>
          
          <Card className="agri-card border-none shadow-xl">
             <CardHeader className="pb-2">
               <CardTitle className="text-lg flex items-center gap-2"><Bell size={20} className="text-status-warning" /> Critical Alerts</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               {[
                 { field: 'North Field A', issue: 'Pest activity', time: '2h ago' },
                 { field: 'East Valley', issue: 'Irrigation failure', time: '5h ago' },
               ].map((alert, i) => (
                 <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-offwhite dark:bg-white/5 border border-border/20 group cursor-pointer hover:border-leaf/30 transition-all">
                   <div className="p-2 bg-status-warning/10 text-status-warning rounded-lg"><AlertTriangle size={18} /></div>
                   <div className="flex-1">
                     <div className="text-sm font-bold text-soil dark:text-offwhite">{alert.field}</div>
                     <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{alert.issue}</div>
                   </div>
                   <div className="text-[10px] text-muted-foreground">{alert.time}</div>
                 </div>
               ))}
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const AppContent = ({ user, setUser, setIsAuth, activeTab, setActiveTab, selectedFieldId, setSelectedFieldId, handleUpdateField }: any) => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen bg-offwhite dark:bg-background flex flex-col lg:flex-row">
      <Sidebar 
        role={user!.role} 
        activeTab={activeTab} 
        setActiveTab={(t: string) => { setActiveTab(t); setSelectedFieldId(undefined); }} 
        user={user!} 
        onLogout={() => { setUser(null); setIsAuth(false); setActiveTab('dashboard'); }}
      />

      <main className="flex-1 lg:ml-64 p-4 md:p-8 lg:p-12 relative">
        <div className="max-w-7xl mx-auto pb-24 lg:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && (user!.role === 'ADMIN' ? <AdminDashboard onNavigate={setActiveTab} /> : <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h1 className="text-3xl font-bold text-soil dark:text-offwhite">Welcome back, {user?.name.split(' ')[0]}</h1>
                    <p className="text-muted-foreground flex items-center gap-2"><CheckCircle2 size={16} className="text-leaf" /> Your tasks are up to date for today.</p>
                  </div>
                  <Button onClick={() => setActiveTab('updates')} className="h-14 rounded-2xl bg-leaf hover:bg-leaf/90 font-bold px-8 shadow-xl shadow-leaf/20 gap-2">
                    <Plus size={20} /> Quick Update
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'My Fields', value: '12', icon: MapIcon, color: 'text-leaf', bg: 'bg-leaf/10' },
                    { label: 'Due Today', value: '2', icon: Clock, color: 'text-status-warning', bg: 'bg-status-warning/10' },
                    { label: 'Harvesting', value: '3', icon: Sprout, color: 'text-status-active', bg: 'bg-status-active/10' },
                    { label: 'Notifications', value: '5', icon: Bell, color: 'text-soil', bg: 'bg-soil/10' },
                  ].map((stat, i) => (
                    <Card key={i} className="agri-card border-none shadow-md text-center p-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${stat.bg} ${stat.color}`}><stat.icon size={24} /></div>
                      <div className="text-2xl font-bold text-soil dark:text-offwhite">{stat.value}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                    </Card>
                  ))}
                </div>
                <MyFieldsModule onUpdateField={handleUpdateField} />
              </div>)}
              
              {activeTab === 'agents' && <FieldAgentsModule />}
              {activeTab === 'reports' && (user!.role === 'ADMIN' ? <AdminReportsModule /> : <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                 <div>
                  <h1 className="text-3xl font-bold text-soil dark:text-offwhite">Performance Reports</h1>
                  <p className="text-muted-foreground">Review your field submission quality and frequency.</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: 'Updates Submitted', value: '154', color: 'text-leaf' },
                      { label: 'Average Accuracy', value: '98%', color: 'text-status-active' },
                      { label: 'On-Time Rate', value: '92%', color: 'text-status-active' },
                    ].map((s, i) => (
                      <Card key={i} className="agri-card border-none shadow-md p-6">
                         <div className="text-3xl font-bold text-soil dark:text-offwhite mb-1">{s.value}</div>
                         <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{s.label}</div>
                      </Card>
                    ))}
                 </div>
                 <Card className="agri-card border-none shadow-xl">
                    <CardHeader><CardTitle>My Report History</CardTitle></CardHeader>
                    <CardContent>
                       <div className="divide-y divide-border/20">
                          {[
                            { field: 'North Field A', type: 'Growth Update', date: 'Mar 15, 2024', status: 'Approved' },
                            { field: 'South Block 3', type: 'Risk Report', date: 'Mar 12, 2024', status: 'Reviewed' },
                            { field: 'East Valley', type: 'Soil Test', date: 'Mar 10, 2024', status: 'Approved' },
                          ].map((r, i) => (
                            <div key={i} className="py-4 flex items-center justify-between group cursor-pointer">
                              <div>
                                <div className="font-bold text-soil dark:text-offwhite group-hover:text-leaf transition-colors">{r.field}</div>
                                <div className="text-xs text-muted-foreground">{r.type} \u2022 {r.date}</div>
                              </div>
                              <Badge className="bg-offwhite dark:bg-white/5 text-soil dark:text-offwhite font-bold">{r.status}</Badge>
                            </div>
                          ))}
                       </div>
                    </CardContent>
                 </Card>
              </div>)}

              {activeTab === 'alerts' && <AdminAlertsModule />}
              {activeTab === 'my-fields' && <MyFieldsModule onUpdateField={handleUpdateField} />}
              {activeTab === 'updates' && <AgentUpdatesModule initialFieldId={selectedFieldId} />}
              {activeTab === 'settings' && <SettingsModule user={user!} onLogout={() => { setUser(null); setIsAuth(false); setActiveTab('dashboard'); }} />}
              
              {activeTab === 'fields' && (
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-soil dark:text-offwhite">Field Directory</h1>
                      <p className="text-muted-foreground">Manage and monitor all cultivation blocks.</p>
                    </div>
                    <Button onClick={() => setActiveTab('create-field')} className="bg-leaf rounded-xl gap-2 h-12 px-6 font-bold shadow-lg shadow-leaf/20"><Plus size={18} /> Register Field</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockFields.map(f => (
                      <Card key={f.id} className="agri-card group cursor-pointer border-none shadow-md overflow-hidden" onClick={() => handleUpdateField(f)}>
                        <div className="h-40 relative">
                           <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/drone-field-view-865b4fc8-1776888179181.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={f.cropType} />
                           <div className="absolute inset-0 bg-gradient-to-t from-soil/60 to-transparent" />
                           <Badge className={`absolute top-4 right-4 h-6 ${f.status === 'Active' ? 'bg-status-active' : 'bg-status-warning'}`}>{f.status}</Badge>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl group-hover:text-leaf transition-colors">{f.name}</CardTitle>
                          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{f.cropType} \u2022 {f.acreage} Acres</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                              <span>Lifecycle: {f.currentStage}</span>
                              <span>65%</span>
                            </div>
                            <Progress value={65} className="h-1.5" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-white dark:bg-card border-t border-border/50 flex items-center justify-around z-50 px-6">
         {[ 
           { id: 'dashboard', icon: LayoutDashboard },
           { id: user!.role === 'ADMIN' ? 'fields' : 'my-fields', icon: MapIcon },
           { id: 'updates', icon: Plus, fab: true },
           { id: 'reports', icon: FileText },
           { id: 'settings', icon: Settings },
         ].map(item => (
           <button 
            key={item.id} 
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all ${item.fab ? 'relative -top-6' : ''} ${activeTab === item.id ? 'text-leaf' : 'text-muted-foreground'}`}
           >
              {item.fab ? (
                <div className="w-16 h-16 rounded-full agri-gradient shadow-xl shadow-leaf/30 flex items-center justify-center text-white scale-110 active:scale-95 transition-transform">
                  <Plus size={32} />
                </div>
              ) : (
                <item.icon size={24} className={activeTab === item.id ? 'scale-110' : ''} />
              )}
              {!item.fab && <span className="text-[10px] font-bold uppercase tracking-widest">{item.id.replace('dashboard', 'home')}</span>}
           </button>
         ))}
      </div>
      <Toaster position="top-center" richColors theme={theme as any} />
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuth, setIsAuth] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState<string | undefined>(undefined);

  const handleUpdateField = (field: Field) => {
    setSelectedFieldId(field.id);
    setActiveTab('updates');
  };

  if (!user && !isAuth) {
    return <LandingPage onStart={() => setIsAuth(true)} onLogin={() => setIsAuth(true)} />;
  }

  if (isAuth && !user) {
    return <AuthFlow onComplete={setUser} onBack={() => setIsAuth(false)} />;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AppContent 
        user={user} 
        setUser={setUser} 
        setIsAuth={setIsAuth} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        selectedFieldId={selectedFieldId} 
        setSelectedFieldId={setSelectedFieldId} 
        handleUpdateField={handleUpdateField} 
      />
    </ThemeProvider>
  );
}