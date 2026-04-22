import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sprout, 
  LayoutDashboard, 
  Map as MapIcon, 
  Users, 
  FileText, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Plus,
  Search,
  AlertTriangle,
  Clock,
  TrendingUp,
  Leaf,
  Calendar,
  CheckCircle2,
  MoreVertical,
  ArrowRight,
  ShieldCheck,
  Mail,
  Smartphone,
  Info,
  ChevronLeft,
  Camera,
  MapPin,
  Check,
  Filter,
  Eye,
  Globe,
  PieChart as PieIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { toast, Toaster } from 'sonner';
import './globals.css';

// --- Types ---
type UserRole = 'ADMIN' | 'AGENT';
type FieldStage = 'Planted' | 'Growing' | 'Ready' | 'Harvested';
type FieldStatus = 'Active' | 'At Risk' | 'Completed';

interface Observation {
  id: string;
  fieldId: string;
  agentId: string;
  agentName: string;
  date: string;
  stage: FieldStage;
  note: string;
  image?: string;
  isWarning?: boolean;
}

interface Field {
  id: string;
  name: string;
  cropType: string;
  plantingDate: string;
  expectedHarvestDate: string;
  assignedAgentId: string;
  assignedAgentName: string;
  acreage: number;
  currentStage: FieldStage;
  status: FieldStatus;
  lastUpdateDate: string;
  observations: Observation[];
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
}

// --- Mock Data ---
const mockUsers: User[] = [
  { id: '1', name: 'Lynn Coordinator', email: 'admin@smartseason.com', role: 'ADMIN', isVerified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lynn' },
  { id: '2', name: 'James Fieldman', email: 'agent@smartseason.com', role: 'AGENT', isVerified: true, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
];

const mockFields: Field[] = [
  {
    id: 'f1',
    name: 'North Field A',
    cropType: 'Maize',
    plantingDate: '2024-03-01',
    expectedHarvestDate: '2024-06-15',
    assignedAgentId: '2',
    assignedAgentName: 'James Fieldman',
    acreage: 45,
    currentStage: 'Growing',
    status: 'At Risk',
    lastUpdateDate: '2024-03-10',
    observations: [
      { id: 'o1', fieldId: 'f1', agentId: '2', agentName: 'James Fieldman', date: '2024-03-10T10:00:00Z', stage: 'Growing', note: 'Pest activity noticed on lower leaves. Applied organic pesticide.', isWarning: true },
      { id: 'o2', fieldId: 'f1', agentId: '2', agentName: 'James Fieldman', date: '2024-03-01T09:00:00Z', stage: 'Planted', note: 'Initial planting complete. Soil moisture looks good.' }
    ]
  },
  {
    id: 'f2',
    name: 'South Block 3',
    cropType: 'Wheat',
    plantingDate: '2024-02-15',
    expectedHarvestDate: '2024-05-20',
    assignedAgentId: '2',
    assignedAgentName: 'James Fieldman',
    acreage: 30,
    currentStage: 'Growing',
    status: 'Active',
    lastUpdateDate: '2024-03-12',
    observations: []
  },
  {
    id: 'f3',
    name: 'East Valley',
    cropType: 'Soybeans',
    plantingDate: '2024-04-01',
    expectedHarvestDate: '2024-07-10',
    assignedAgentId: '3',
    assignedAgentName: 'Sarah Growers',
    acreage: 60,
    currentStage: 'Planted',
    status: 'Active',
    lastUpdateDate: '2024-04-01',
    observations: []
  }
];

// --- Shared Components ---

const Navbar = ({ onLogin, onSignup }: { onLogin: () => void, onSignup: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/50">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
        <div className="w-10 h-10 agri-gradient rounded-xl flex items-center justify-center shadow-lg shadow-leaf/20">
          <Sprout className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-heading font-bold tracking-tight text-soil">SmartSeason</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {['Features', 'About', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-soil/70 hover:text-leaf transition-colors">
            {item}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={onLogin} className="text-soil">Login</Button>
        <Button onClick={onSignup} className="bg-leaf hover:bg-leaf/90 rounded-xl">Get Started</Button>
      </div>
    </div>
  </nav>
);

const Sidebar = ({ role, activeTab, setActiveTab, user, onLogout }: { role: UserRole, activeTab: string, setActiveTab: (t: string) => void, user: User, onLogout: () => void }) => {
  const items = role === 'ADMIN' ? [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'fields', label: 'Fields', icon: MapIcon },
    { id: 'agents', label: 'Field Agents', icon: Users },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] : [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-fields', label: 'My Fields', icon: MapIcon },
    { id: 'updates', label: 'Updates', icon: Clock },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-soil text-offwhite z-40 hidden lg:flex flex-col p-6 shadow-2xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 agri-gradient rounded-xl flex items-center justify-center shadow-md">
          <Sprout className="text-white w-6 h-6" />
        </div>
        <span className="text-xl font-heading font-bold">SmartSeason</span>
      </div>

      <div className="flex-1 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive ? 'bg-leaf text-white shadow-lg' : 'text-offwhite/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && (
                <motion.div layoutId="active-indicator" className="ml-auto">
                  <ChevronRight size={16} />
                </motion.div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-10 w-10 ring-2 ring-leaf/30 shadow-md">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-sand text-soil">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold truncate">{user.name}</span>
            <span className="text-[10px] text-offwhite/50 uppercase tracking-widest font-bold">{role}</span>
          </div>
        </div>
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-offwhite/60 hover:text-destructive hover:bg-destructive/5 transition-all">
          <LogOut size={20} />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

// --- Landing Page ---

const LandingPage = ({ onLogin, onSignup }: { onLogin: () => void, onSignup: () => void }) => {
  return (
    <div className="min-h-screen bg-offwhite">
      <Navbar onLogin={onLogin} onSignup={onSignup} />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-leaf/10 text-leaf border border-leaf/20"
            >
              <ShieldCheck size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">The Future of Agriculture</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-heading font-bold text-soil leading-tight"
            >
              Monitor Crop Growth Across <br />
              <span className="text-leaf">Every Field</span> in Real Time
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-soil/70 max-w-2xl mx-auto leading-relaxed"
            >
              SmartSeason helps coordinators and field agents track crop progress, 
              monitor risks, and manage agricultural operations efficiently through 
              intelligent data visualization.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button size="lg" onClick={onSignup} className="h-14 px-8 text-lg bg-leaf hover:bg-leaf/90 rounded-2xl shadow-xl shadow-leaf/20 group">
                Explore Platform
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 border-soil/10 rounded-2xl">
                Watch Demo
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="container mx-auto px-4 mt-20 relative"
        >
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl shadow-soil/20 border-8 border-white">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/hero-farm-wide-e33412d6-1776882531579.webp" 
              alt="Smart Farming" 
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-soil/40 to-transparent" />
          </div>
        </motion.div>
      </section>

      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-heading font-bold text-soil">Powerful Agriculture Intelligence</h2>
            <p className="text-soil/60 max-w-2xl mx-auto">Our platform is designed to give you total visibility over your fields, ensuring optimal growth and timely interventions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="rounded-[32px] border-none shadow-lg bg-sand/20 hover:bg-sand/30 transition-colors group overflow-hidden">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-leaf mb-6 shadow-sm">
                  <LayoutDashboard size={28} />
                </div>
                <h3 className="text-xl font-bold text-soil mb-3">Centralized Operations</h3>
                <p className="text-soil/70 text-sm mb-6">Manage all field agents, assign territories, and track overall progress from a single dashboard.</p>
                <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/platform-preview-elements-01f5506c-1776882533376.webp" className="rounded-2xl border border-white/50 shadow-md group-hover:scale-105 transition-transform" />
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border-none shadow-lg bg-leaf/5 hover:bg-leaf/10 transition-colors group overflow-hidden">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-leaf mb-6 shadow-sm">
                  <Smartphone size={28} />
                </div>
                <h3 className="text-xl font-bold text-soil mb-3">Field-Ready Updates</h3>
                <p className="text-soil/70 text-sm mb-6">Lightweight mobile interface for agents to submit updates and photos directly from the field.</p>
                <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/field-agent-tablet-821e6b23-1776882532783.webp" className="rounded-2xl border border-white/50 shadow-md group-hover:scale-105 transition-transform" />
              </CardContent>
            </Card>

            <Card className="rounded-[32px] border-none shadow-lg bg-soil/5 hover:bg-soil/10 transition-colors group overflow-hidden">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-leaf mb-6 shadow-sm">
                  <TrendingUp size={28} />
                </div>
                <h3 className="text-xl font-bold text-soil mb-3">Precision Monitoring</h3>
                <p className="text-soil/70 text-sm mb-6">AI-driven insights alert you to growth delays or anomalies before they become problems.</p>
                <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/crop-monitoring-macro-faed2546-1776882533243.webp" className="rounded-2xl border border-white/50 shadow-md group-hover:scale-105 transition-transform" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-offwhite overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl font-heading font-bold text-soil">Designed for the Modern Farmer</h2>
              <div className="space-y-6">
                {[
                  { title: "Smart Seasonal Tracking", desc: "Automated timelines based on planting dates and crop variety metrics." },
                  { title: "Risk Detection Engine", desc: "Instantly flags fields with delayed updates or abnormal growth patterns." },
                  { title: "Field Agent Coordination", desc: "Seamless assignment and reporting flow designed for rural connectivity." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-6 rounded-2xl bg-white shadow-sm border border-border/50">
                    <div className="w-12 h-12 rounded-xl agri-gradient flex items-center justify-center text-white shrink-0 shadow-md">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-soil">{item.title}</h4>
                      <p className="text-sm text-soil/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -inset-4 agri-gradient opacity-20 blur-3xl rounded-full" />
              <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/platform-preview-elements-01f5506c-1776882533376.webp" className="relative rounded-[32px] shadow-2xl border-4 border-white" alt="App UI" />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-soil py-16 text-offwhite/80">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Sprout className="text-leaf w-8 h-8" />
              <span className="text-2xl font-heading font-bold text-white">SmartSeason</span>
            </div>
            <p className="text-sm">Empowering sustainable and efficient field operations management worldwide.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-leaf cursor-pointer transition-colors">Analytics</li>
              <li className="hover:text-leaf cursor-pointer transition-colors">Monitoring</li>
              <li className="hover:text-leaf cursor-pointer transition-colors">Agent Management</li>
              <li className="hover:text-leaf cursor-pointer transition-colors">API Integration</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-leaf cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-leaf cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-leaf cursor-pointer transition-colors">Sustainability</li>
              <li className="hover:text-leaf cursor-pointer transition-colors">Press</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li className="hover:text-leaf cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-leaf cursor-pointer transition-colors">Contact</li>
              <li className="hover:text-leaf cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-leaf cursor-pointer transition-colors">Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-xs">
          © 2024 SmartSeason Agri-Tech. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

// --- Auth Flow ---

const AuthPage = ({ initialMode = 'login', onAuthSuccess }: { initialMode?: 'login' | 'signup', onAuthSuccess: (u: User) => void }) => {
  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState<UserRole>('AGENT');
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
      setStep(2);
      toast.success('Verification code sent to your email.');
    } else {
      const user = mockUsers.find(u => u.email === email) || mockUsers[0];
      onAuthSuccess(user);
    }
  };

  return (
    <div className="min-h-screen flex bg-offwhite">
      <div className="hidden lg:flex flex-1 relative overflow-hidden soil-gradient items-center justify-center p-20">
        <div className="absolute inset-0 opacity-40">
          <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/hero-farm-wide-e33412d6-1776882531579.webp" className="w-full h-full object-cover grayscale mix-blend-overlay" alt="Agri background" />
        </div>
        <div className="relative z-10 max-w-lg space-y-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl">
              <Sprout className="text-leaf w-8 h-8" />
            </div>
            <span className="text-3xl font-heading font-bold text-white tracking-tight">SmartSeason</span>
          </div>
          <div className="space-y-6">
            <h2 className="text-5xl font-heading font-bold text-white leading-tight">Precision Monitoring for the Next Generation of Farmers.</h2>
            <p className="text-white/70 text-lg leading-relaxed italic">"SmartSeason has transformed how we coordinate our field operations, making our team more responsive and our crops healthier."</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-soil">{mode === 'login' ? 'Welcome Back' : 'Join SmartSeason'}</h1>
                  <p className="text-muted-foreground">{mode === 'login' ? 'Access your agricultural control center.' : 'Start managing your field operations today.'}</p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                  {mode === 'signup' && (
                    <div className="grid grid-cols-2 gap-4 pb-4">
                      <Button type="button" variant={role === 'ADMIN' ? 'default' : 'outline'} onClick={() => setRole('ADMIN')} className={`h-24 flex flex-col gap-2 rounded-2xl border-2 transition-all ${role === 'ADMIN' ? 'bg-leaf border-leaf text-white shadow-lg' : 'border-border text-muted-foreground hover:border-leaf/30'}`}>
                        <ShieldCheck size={28} />
                        <span className="text-xs font-bold uppercase tracking-wider">Admin</span>
                      </Button>
                      <Button type="button" variant={role === 'AGENT' ? 'default' : 'outline'} onClick={() => setRole('AGENT')} className={`h-24 flex flex-col gap-2 rounded-2xl border-2 transition-all ${role === 'AGENT' ? 'bg-leaf border-leaf text-white shadow-lg' : 'border-border text-muted-foreground hover:border-leaf/30'}`}>
                        <Smartphone size={28} />
                        <span className="text-xs font-bold uppercase tracking-wider">Field Agent</span>
                      </Button>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input type="email" placeholder="coordinator@farm.com" className="h-12 rounded-xl border-border/60 focus:ring-leaf focus:border-leaf" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input type="password" placeholder="••••••••" className="h-12 rounded-xl border-border/60 focus:ring-leaf focus:border-leaf" required />
                  </div>
                  <Button type="submit" className="w-full h-12 rounded-xl bg-soil hover:bg-soil/90 text-lg font-bold shadow-lg shadow-soil/10 mt-6">
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                  </Button>
                </form>

                <div className="text-center pt-4">
                  <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-sm font-semibold text-leaf hover:underline decoration-2 underline-offset-4">
                    {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 text-center">
                <div className="w-20 h-20 bg-leaf/10 rounded-3xl flex items-center justify-center text-leaf mx-auto shadow-inner"><Mail size={40} /></div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-soil">Verify Your Email</h1>
                  <p className="text-muted-foreground leading-relaxed">We've sent a 6-digit code to <br /><span className="text-soil font-bold underline decoration-leaf decoration-2">{email}</span></p>
                </div>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <input 
                      key={i} 
                      type="text"
                      className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 border-border focus:border-leaf focus:ring-0 outline-none transition-all" 
                      maxLength={1} 
                      defaultValue={Math.floor(Math.random()*9)} 
                    />
                  ))}
                </div>
                <div className="space-y-4 pt-4">
                  <Button onClick={() => onAuthSuccess({ id: 'new', name: 'New User', email, role, isVerified: true })} className="w-full h-12 rounded-xl bg-leaf hover:bg-leaf/90 shadow-xl shadow-leaf/20 font-bold">Verify & Activate Account</Button>
                  <p className="text-sm text-muted-foreground">Didn't receive code? <button className="text-leaf font-bold hover:underline">Resend OTP</button></p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- Admin Dashboard ---

const AdminDashboard = ({ onNavigate }: { onNavigate: (tab: string, data?: any) => void }) => {
  const barData = [
    { name: 'Planted', value: 30, color: '#A4BE7B' },
    { name: 'Growing', value: 45, color: '#5C8D4E' },
    { name: 'Ready', value: 20, color: '#4CAF50' },
    { name: 'Harvested', value: 15, color: '#8D99AE' },
  ];

  const pieData = [
    { name: 'On Track', value: 85, color: '#5C8D4E' },
    { name: 'At Risk', value: 15, color: '#E67E22' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-soil">Operations Center</h1>
          <p className="text-muted-foreground">Real-time health of your agricultural network.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-soil/10 bg-white shadow-sm h-12 px-6 font-semibold">Reports</Button>
          <Button onClick={() => onNavigate('create-field')} className="bg-leaf hover:bg-leaf/90 rounded-xl gap-2 h-12 px-6 shadow-lg shadow-leaf/20 font-bold">
            <Plus size={18} /> New Field
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Fields', value: '124', icon: MapIcon, color: 'text-leaf', bg: 'bg-leaf/10', trend: '+4%' },
          { label: 'Active', value: '98', icon: CheckCircle2, color: 'text-status-active', bg: 'bg-status-active/10', trend: '+12%' },
          { label: 'At Risk', value: '12', icon: AlertTriangle, color: 'text-status-warning', bg: 'bg-status-warning/10', trend: '-2%' },
          { label: 'Field Agents', value: '24', icon: Users, color: 'text-soil', bg: 'bg-soil/10', trend: 'Stable' },
        ].map((stat, idx) => (
          <Card key={idx} className="agri-card border-none overflow-hidden group">
            <CardContent className="p-6 relative">
              <div className="absolute top-0 right-0 w-24 h-24 agri-gradient opacity-[0.03] -mr-8 -mt-8 rounded-full transition-all group-hover:scale-110" />
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} shadow-sm`}><stat.icon size={24} /></div>
                <Badge variant="secondary" className="bg-white/50 border-none font-bold text-[10px] tracking-wider">{stat.trend}</Badge>
              </div>
              <div className="text-3xl font-bold text-soil">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-semibold mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 agri-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Field Status Distribution</CardTitle>
              <CardDescription>Current crop lifecycle stage breakdown</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="h-8 w-8"><Filter size={14} /></Button>
              <Button size="icon" variant="ghost" className="h-8 w-8"><MoreVertical size={14} /></Button>
            </div>
          </CardHeader>
          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F0FB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#4E3B31' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7E7E7E' }} />
                <RechartsTooltip 
                  cursor={{ fill: '#F8F5F0', radius: 8 }} 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', padding: '12px' }} 
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={50}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="agri-card overflow-hidden">
            <CardHeader className="bg-soil text-white py-4">
              <CardTitle className="text-sm flex items-center gap-2"><PieIcon size={16} /> Portfolio Health</CardTitle>
            </CardHeader>
            <CardContent className="h-[220px] flex items-center justify-center p-0">
               <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-soil">85%</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Stable</span>
              </div>
            </CardContent>
            <div className="p-4 bg-offwhite flex justify-around border-t border-border/50">
              {pieData.map(item => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] font-bold text-soil">{item.name}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="agri-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-status-warning flex items-center gap-2 text-lg"><AlertTriangle size={20} /> Critical Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-4">
              {[
                { field: 'North Field A', issue: 'No update in 10 days', severity: 'High', icon: Clock },
                { field: 'Maize Block 3', issue: 'Pest activity detected', severity: 'High', icon: AlertTriangle },
                { field: 'East Valley', issue: 'Drought symptoms', severity: 'Med', icon: Info },
              ].map((alert, idx) => (
                <div key={idx} className="group flex gap-3 p-4 rounded-2xl bg-offwhite border border-border/30 hover:border-leaf/30 transition-all cursor-pointer hover:bg-white" onClick={() => onNavigate('field-details', alert.field)}>
                  <div className={`p-2 rounded-xl h-fit ${alert.severity === 'High' ? 'bg-status-warning/10 text-status-warning' : 'bg-status-atrisk/10 text-status-atrisk'}`}>
                    <alert.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="font-bold text-sm text-soil truncate group-hover:text-leaf transition-colors">{alert.field}</h4>
                      <Badge className={`text-[9px] h-4 ${alert.severity === 'High' ? 'bg-status-warning' : 'bg-status-atrisk'}`}>{alert.severity}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{alert.issue}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="agri-card overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Updates Feed</CardTitle>
          <Button variant="ghost" size="sm" className="text-leaf font-bold">View History <ArrowRight size={14} className="ml-1" /></Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/30">
            {[
              { agent: 'James Fieldman', field: 'Field A', update: 'Changed stage to Growing', time: '12m ago', icon: Leaf },
              { agent: 'Sarah Growers', field: 'South Block 3', update: 'Added observation: Soil moisture low', time: '2h ago', icon: Info },
              { agent: 'James Fieldman', field: 'Maize Block 3', update: 'Flagged as At Risk (Pests)', time: '5h ago', icon: AlertTriangle },
            ].map((feed, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 px-6 hover:bg-offwhite transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-sand/30 text-soil font-bold text-xs">{feed.agent.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-soil"><span className="text-leaf">{feed.agent}</span> updated <span className="font-bold">{feed.field}</span></p>
                  <p className="text-xs text-muted-foreground">{feed.update}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{feed.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// --- Agent Dashboard ---

const AgentDashboard = ({ user, onNavigate }: { user: User, onNavigate: (tab: string, data?: any) => void }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-soil">Welcome, {user.name}</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-status-active animate-pulse" />
            Active session • <span className="text-soil font-bold">2 fields</span> need updates today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 md:flex-none h-14 rounded-2xl border-soil/10 bg-white gap-2 px-6 shadow-sm font-bold">
            <Globe size={20} className="text-leaf" /> Territory Map
          </Button>
          <Button className="flex-1 md:flex-none h-14 rounded-2xl bg-leaf hover:bg-leaf/90 gap-2 px-8 shadow-xl shadow-leaf/20 font-bold">
            <Camera size={20} /> Quick Update
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Assigned', value: '12', icon: MapIcon, color: 'text-leaf', bg: 'bg-leaf/5' },
          { label: 'Due Today', value: '2', icon: Clock, color: 'text-status-warning', bg: 'bg-status-warning/5' },
          { label: 'Harvesting', value: '3', icon: Leaf, color: 'text-status-active', bg: 'bg-status-active/5' },
          { label: 'At Risk', value: '1', icon: AlertTriangle, color: 'text-status-atrisk', bg: 'bg-status-atrisk/5' },
        ].map((stat, idx) => (
          <Card key={idx} className={`agri-card border-none text-center p-6 ${stat.bg}`}>
            <div className={`p-3 rounded-2xl bg-white mb-3 inline-flex ${stat.color} shadow-sm`}><stat.icon size={24} /></div>
            <div className="text-3xl font-bold text-soil">{stat.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-soil flex items-center gap-2"><MapIcon size={20} className="text-leaf" /> My Priority Fields</h2>
            <Button variant="ghost" className="text-leaf font-bold hover:bg-leaf/5">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockFields.slice(0, 2).map((field) => (
              <Card key={field.id} className="agri-card group overflow-hidden cursor-pointer border-none shadow-md" onClick={() => onNavigate('field-details', field)}>
                <div className="h-44 relative">
                  <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/crop-monitoring-macro-faed2546-1776882533243.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={field.cropType} />
                  <div className="absolute inset-0 bg-gradient-to-t from-soil/80 via-soil/20 to-transparent" />
                  <Badge className={`absolute top-4 right-4 h-6 font-bold ${field.status === 'Active' ? 'bg-status-active' : 'bg-status-warning'}`}>{field.status}</Badge>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-white border-white/30 bg-black/20 backdrop-blur-md text-[10px]">{field.cropType}</Badge>
                    </div>
                    <h3 className="font-bold text-xl text-white">{field.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <span>Growth Progress</span>
                      <span className="text-leaf">65%</span>
                    </div>
                    <div className="relative h-2 bg-offwhite rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        className="absolute inset-y-0 left-0 bg-leaf rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border/30">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
                      <Clock size={14} /> {new Date(field.lastUpdateDate).toLocaleDateString()}
                    </div>
                    <Button variant="secondary" size="sm" className="rounded-xl h-9 px-4 bg-sand/20 text-soil font-bold hover:bg-sand/40">
                      Update <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <Card className="agri-card soil-gradient text-white border-none p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 agri-gradient opacity-10 -mr-16 -mt-16 rounded-full group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 relative z-10"><TrendingUp size={24} className="text-leaf" /> Smart Insights</h3>
            <div className="space-y-4 relative z-10">
              <p className="text-offwhite/80 text-sm leading-relaxed">
                "3 fields have not been updated recently. Consider prioritizing <span className="text-leaf font-bold">North Field A</span> as growth delay was detected."
              </p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-xs font-bold text-leaf uppercase tracking-widest mb-1">Weather Alert</p>
                <p className="text-xs text-white/60">Rain expected in 48h. Optimal window for fertilizer application in South Block.</p>
              </div>
            </div>
            <Button className="w-full mt-8 bg-white text-soil hover:bg-offwhite rounded-xl font-bold h-12 shadow-xl shadow-black/10 transition-transform hover:-translate-y-1">Review Schedule</Button>
          </Card>
          
          <Card className="agri-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Recent Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 px-4">
              {[
                { type: 'note', text: 'Pest activity noted in Maize Block', date: '2h ago', status: 'Warning' },
                { type: 'photo', text: 'Uploaded 4 photos of South Block', date: '5h ago', status: 'Info' },
                { type: 'stage', text: 'Moved East Valley to Growing', date: '1d ago', status: 'Success' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                    item.status === 'Warning' ? 'bg-status-warning/10 text-status-warning' : 
                    item.status === 'Success' ? 'bg-leaf/10 text-leaf' : 'bg-sand/20 text-soil'
                  }`}>
                    {item.status === 'Warning' ? <AlertTriangle size={18} /> : item.status === 'Success' ? <CheckCircle2 size={18} /> : <FileText size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-soil font-semibold truncate">{item.text}</p>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{item.date}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// --- Field Details ---

const FieldDetails = ({ field: fieldIdOrObj, onBack }: { field: any, onBack: () => void }) => {
  const field = typeof fieldIdOrObj === 'string' ? mockFields[0] : fieldIdOrObj;
  
  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="rounded-full w-12 h-12 p-0 bg-white shadow-sm border border-border/50 hover:bg-offwhite"><ChevronLeft size={24} /></Button>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-soil">{field.name}</h1>
            <Badge className={`h-6 ${field.status === 'Active' ? 'bg-status-active' : 'bg-status-warning'}`}>{field.status}</Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin size={14} className="text-leaf" /> {field.acreage} Acres
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users size={14} className="text-leaf" /> <span className="text-soil font-bold">{field.assignedAgentName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Timeline Visualization */}
          <Card className="agri-card border-none shadow-md overflow-hidden">
            <CardHeader className="bg-offwhite py-4 border-b border-border/30">
              <CardTitle className="text-lg">Crop Lifecycle Progression</CardTitle>
            </CardHeader>
            <CardContent className="pt-12 pb-16 px-6 md:px-12">
              <div className="relative flex justify-between items-center">
                <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-sand/20 -translate-y-1/2 rounded-full" />
                {['Planted', 'Growing', 'Ready', 'Harvested'].map((stage, idx) => {
                  const stages = ['Planted', 'Growing', 'Ready', 'Harvested'];
                  const currentIdx = stages.indexOf(field.currentStage);
                  const isPast = idx < currentIdx;
                  const isCurrent = idx === currentIdx;
                  
                  return (
                    <div key={stage} className="relative z-10 flex flex-col items-center gap-4">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-all duration-700 ${
                        isPast ? 'bg-leaf text-white' : 
                        isCurrent ? 'bg-status-active text-white scale-125 ring-4 ring-status-active/20' : 
                        'bg-white text-muted-foreground border-sand/30'
                      }`}>
                        {isPast ? <Check size={28} strokeWidth={3} /> : <span className="text-lg font-bold">{idx + 1}</span>}
                      </div>
                      <div className="absolute -bottom-10 flex flex-col items-center min-w-[100px]">
                        <span className={`text-xs font-bold uppercase tracking-widest ${isCurrent ? 'text-leaf' : 'text-muted-foreground'}`}>{stage}</span>
                        {isCurrent && <span className="text-[10px] font-bold text-muted-foreground mt-0.5 whitespace-nowrap">Current Stage</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="agri-card shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Activity & Observations</CardTitle>
                <CardDescription>Historical logs from field visits</CardDescription>
              </div>
              <Button className="bg-soil rounded-xl gap-2 font-bold shadow-lg shadow-soil/10">
                <Plus size={18} /> Add Entry
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-8 relative">
                <div className="absolute left-[23px] top-2 bottom-0 w-1 bg-offwhite rounded-full" />
                {field.observations.length > 0 ? field.observations.map((obs: any, idx: number) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: idx * 0.1 }}
                    key={obs.id} 
                    className="relative pl-14"
                  >
                    <div className={`absolute left-0 top-0 w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-white shadow-md z-10 transition-colors ${
                      obs.isWarning ? 'bg-status-warning text-white' : 'bg-leaf text-white'
                    }`}>
                      {obs.isWarning ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
                    </div>
                    <div className="bg-white p-6 rounded-[24px] border border-border/50 shadow-sm hover:shadow-md transition-all group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-[10px] bg-sand font-bold">{obs.agentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-bold text-soil">{obs.agentName}</span>
                        </div>
                        <Badge variant="outline" className="text-[10px] font-bold bg-offwhite/50">{new Date(obs.date).toLocaleDateString()}</Badge>
                      </div>
                      <p className="text-sm text-soil/70 leading-relaxed mb-4">{obs.note}</p>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-leaf/10 text-leaf border-none text-[10px] font-bold uppercase">{obs.stage}</Badge>
                        {obs.isWarning && <Badge className="bg-status-warning/10 text-status-warning border-none text-[10px] font-bold uppercase">Attention Needed</Badge>}
                      </div>
                    </div>
                  </motion.div>
                )) : (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 bg-offwhite rounded-full flex items-center justify-center text-muted-foreground mx-auto">
                      <FileText size={32} />
                    </div>
                    <p className="text-muted-foreground font-medium italic">No observations logged yet for this season.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="agri-card overflow-hidden border-none shadow-lg">
            <div className="h-56 relative group">
              <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/hero-farm-wide-e33412d6-1776882531579.webp" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
              <div className="absolute inset-0 bg-soil/20 backdrop-blur-[2px] flex items-center justify-center">
                <div className="p-4 bg-white/90 rounded-full shadow-2xl text-leaf scale-110"><MapPin size={32} /></div>
              </div>
            </div>
            <CardContent className="p-8 space-y-6">
              <h3 className="text-xl font-bold text-soil flex items-center gap-2 border-b border-border/30 pb-4">
                <Sprout size={20} className="text-leaf" /> Field Profile
              </h3>
              <div className="space-y-5">
                {[
                  { label: 'Crop Type', value: field.cropType, icon: Leaf },
                  { label: 'Total Acreage', value: `${field.acreage} Acres`, icon: Globe },
                  { label: 'Planting Date', value: new Date(field.plantingDate).toLocaleDateString(), icon: Calendar },
                  { label: 'Expected Harvest', value: new Date(field.expectedHarvestDate).toLocaleDateString(), icon: CheckCircle2, accent: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center group">
                    <div className="flex items-center gap-3 text-muted-foreground font-medium group-hover:text-soil transition-colors">
                      <item.icon size={18} className="text-leaf" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <span className={`text-sm font-bold ${item.accent ? 'text-leaf' : 'text-soil'}`}>{item.value}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-offwhite text-soil hover:bg-sand/30 border border-border/50 h-12 rounded-xl font-bold">Edit Profile</Button>
            </CardContent>
          </Card>

          <Card className="agri-card bg-sand/10 border-sand/30 shadow-none">
            <CardHeader><CardTitle className="text-base">Internal Coordination</CardTitle></CardHeader>
            <CardContent>
              <p className="text-xs text-soil/60 mb-4 leading-relaxed">Add coordination notes that are only visible to administrators and the assigned field agent.</p>
              <textarea placeholder="e.g., Prioritize this field for irrigation checks tomorrow morning..." className="w-full h-40 bg-white/80 rounded-2xl p-4 text-sm border-border/40 focus:ring-1 focus:ring-leaf resize-none shadow-inner" />
              <Button className="w-full mt-4 bg-soil hover:bg-soil/90 h-12 rounded-xl font-bold shadow-lg shadow-soil/10">Post Coordination Note</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// --- Create Field ---

const CreateField = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="rounded-full w-12 h-12 p-0 bg-white shadow-sm border border-border/50"><ChevronLeft size={24} /></Button>
        <div>
          <h1 className="text-3xl font-bold text-soil">Register New Field</h1>
          <p className="text-muted-foreground">Define agricultural parameters and assign field management.</p>
        </div>
      </div>

      <Card className="agri-card p-1 md:p-10 border-none shadow-xl">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => { e.preventDefault(); toast.success('Field created successfully!'); onBack(); }}>
          <div className="space-y-3">
            <Label className="font-bold text-soil ml-1">Field Name</Label>
            <Input placeholder="e.g., North Block Sector 7" className="rounded-2xl h-14 bg-offwhite/50 border-none shadow-inner focus:ring-2 focus:ring-leaf/20" required />
          </div>
          <div className="space-y-3">
            <Label className="font-bold text-soil ml-1">Crop Variety</Label>
            <Select>
              <SelectTrigger className="rounded-2xl h-14 bg-offwhite/50 border-none shadow-inner focus:ring-2 focus:ring-leaf/20">
                <SelectValue placeholder="Select crop type" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="maize">Maize (White/Yellow)</SelectItem>
                <SelectItem value="wheat">Spring Wheat</SelectItem>
                <SelectItem value="soybeans">Non-GMO Soybeans</SelectItem>
                <SelectItem value="cotton">Upland Cotton</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label className="font-bold text-soil ml-1">Total Acreage</Label>
            <div className="relative">
              <Input type="number" placeholder="0.00" className="rounded-2xl h-14 bg-offwhite/50 border-none shadow-inner focus:ring-2 focus:ring-leaf/20 pr-16" />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">ACRES</span>
            </div>
          </div>
          <div className="space-y-3">
            <Label className="font-bold text-soil ml-1">Assign Field Agent</Label>
            <Select>
              <SelectTrigger className="rounded-2xl h-14 bg-offwhite/50 border-none shadow-inner focus:ring-2 focus:ring-leaf/20">
                <SelectValue placeholder="Select coordinator" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="james">James Fieldman</SelectItem>
                <SelectItem value="sarah">Sarah Growers</SelectItem>
                <SelectItem value="sarah">Michael Harvest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label className="font-bold text-soil ml-1">Planting Date</Label>
            <Input type="date" className="rounded-2xl h-14 bg-offwhite/50 border-none shadow-inner focus:ring-2 focus:ring-leaf/20" required />
          </div>
          <div className="space-y-3">
            <Label className="font-bold text-soil ml-1">Expected Harvest Date</Label>
            <Input type="date" className="rounded-2xl h-14 bg-offwhite/50 border-none shadow-inner focus:ring-2 focus:ring-leaf/20" required />
          </div>
          <div className="md:col-span-2 space-y-3 pt-4">
            <Label className="font-bold text-soil ml-1">Initial Project Description</Label>
            <textarea placeholder="Enter specific cultivation instructions or goals for this season..." className="w-full h-40 bg-offwhite/50 rounded-2xl p-5 text-sm border-none shadow-inner focus:ring-2 focus:ring-leaf/20 resize-none" />
          </div>
          <div className="md:col-span-2 flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-border/30">
            <Button type="button" variant="ghost" onClick={onBack} className="rounded-2xl h-14 px-10 font-bold hover:bg-offwhite">Discard Draft</Button>
            <Button type="submit" className="bg-leaf hover:bg-leaf/90 rounded-2xl h-14 px-16 font-bold text-lg shadow-xl shadow-leaf/20 transition-transform active:scale-95">Complete Registration</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

// --- App Root ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthPage, setIsAuthPage] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedField, setSelectedField] = useState<any>(null);

  const navigate = (tab: string, data?: any) => {
    if (tab === 'field-details') {
      setSelectedField(data);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!user && !isAuthPage) {
    return <LandingPage onLogin={() => { setIsAuthPage(true); setAuthMode('login'); }} onSignup={() => { setIsAuthPage(true); setAuthMode('signup'); }} />;
  }

  if (isAuthPage && !user) {
    return <AuthPage initialMode={authMode} onAuthSuccess={(u) => { setUser(u); setIsAuthPage(false); }} />;
  }

  return (
    <div className="min-h-screen bg-offwhite flex">
      <Sidebar role={user!.role} activeTab={activeTab} setActiveTab={setActiveTab} user={user!} onLogout={() => { setUser(null); setActiveTab('dashboard'); }} />
      
      <main className="flex-1 lg:ml-64 p-4 md:p-8 lg:p-12 relative">
        <div className="max-w-7xl mx-auto pb-20">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && (user!.role === 'ADMIN' ? <AdminDashboard onNavigate={navigate} /> : <AgentDashboard user={user!} onNavigate={navigate} />)}
              {activeTab === 'fields' && (
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-soil">Field Directory</h1>
                      <p className="text-muted-foreground">Manage and monitor all cultivation blocks.</p>
                    </div>
                    <Button onClick={() => setActiveTab('create-field')} className="bg-leaf rounded-xl gap-2 h-12 px-6 font-bold shadow-lg shadow-leaf/20"><Plus size={18} /> Register Field</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockFields.map(f => (
                      <Card key={f.id} className="agri-card group cursor-pointer border-none shadow-md overflow-hidden" onClick={() => navigate('field-details', f)}>
                        <div className="h-40 relative">
                           <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/hero-farm-wide-e33412d6-1776882531579.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={f.cropType} />
                           <div className="absolute inset-0 bg-gradient-to-t from-soil/60 to-transparent" />
                           <Badge className={`absolute top-4 right-4 h-6 ${f.status === 'Active' ? 'bg-status-active' : 'bg-status-warning'}`}>{f.status}</Badge>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl group-hover:text-leaf transition-colors">{f.name}</CardTitle>
                          <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{f.cropType} • {f.acreage} Acres</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                              <span>Lifecycle: {f.currentStage}</span>
                              <span>{f.currentStage === 'Planted' ? '25%' : f.currentStage === 'Growing' ? '65%' : '100%'}</span>
                            </div>
                            <Progress value={f.currentStage === 'Planted' ? 25 : f.currentStage === 'Growing' ? 65 : 100} className="h-1.5" />
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold pt-2 border-t border-border/30">
                             <Users size={14} /> {f.assignedAgentName}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'field-details' && <FieldDetails field={selectedField} onBack={() => setActiveTab(user!.role === 'ADMIN' ? 'dashboard' : 'dashboard')} />}
              {activeTab === 'create-field' && <CreateField onBack={() => setActiveTab('fields')} />}
              {['agents', 'reports', 'alerts', 'my-fields', 'updates', 'settings'].includes(activeTab) && (
                <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
                  <div className="w-24 h-24 bg-sand/10 rounded-full flex items-center justify-center text-leaf shadow-inner">
                    <Info size={48} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-soil capitalize">{activeTab.replace('-', ' ')} Module</h2>
                    <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">This section is currently being calibrated with precision sensors for deeper agricultural insights.</p>
                  </div>
                  <Button variant="outline" onClick={() => setActiveTab('dashboard')} className="rounded-2xl h-12 px-8 font-bold border-soil/20">Return to Operations</Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      {/* Mobile Navigation (Bottom) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border/50 h-20 px-6 flex items-center justify-between z-50 backdrop-blur-md bg-white/90">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-leaf' : 'text-muted-foreground'}`}>
          <LayoutDashboard size={20} />
          <span className="text-[10px] font-bold uppercase">Home</span>
        </button>
        <button onClick={() => setActiveTab('fields')} className={`flex flex-col items-center gap-1 ${activeTab === 'fields' ? 'text-leaf' : 'text-muted-foreground'}`}>
          <MapIcon size={20} />
          <span className="text-[10px] font-bold uppercase">Fields</span>
        </button>
        <div className="relative -top-6">
          <Button onClick={() => setActiveTab('create-field')} className="w-14 h-14 rounded-full agri-gradient shadow-xl shadow-leaf/30 p-0 flex items-center justify-center">
            <Plus size={24} className="text-white" />
          </Button>
        </div>
        <button onClick={() => setActiveTab('reports')} className={`flex flex-col items-center gap-1 ${activeTab === 'reports' ? 'text-leaf' : 'text-muted-foreground'}`}>
          <FileText size={20} />
          <span className="text-[10px] font-bold uppercase">Docs</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center gap-1 ${activeTab === 'settings' ? 'text-leaf' : 'text-muted-foreground'}`}>
          <Settings size={20} />
          <span className="text-[10px] font-bold uppercase">Admin</span>
        </button>
      </div>

      <Toaster position="top-right" richColors closeButton theme="light" />
    </div>
  );
}