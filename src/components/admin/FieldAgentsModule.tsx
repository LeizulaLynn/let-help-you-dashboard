import React, { useState } from 'react';
import { Search, Filter, Plus, FileDown, MoreHorizontal, UserCircle, MessageSquare, ShieldAlert, History, Mail, Phone, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { mockAgents, mockFields } from '@/lib/mockData';
import { Agent, Field } from '@/lib/types';

export const FieldAgentsModule = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  if (selectedAgent) {
    return <AgentProfile agent={selectedAgent} onBack={() => setSelectedAgent(null)} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-soil dark:text-offwhite">Field Agents</h1>
          <p className="text-muted-foreground">Manage and monitor your agricultural workforce.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="rounded-xl border-soil/10 dark:border-white/10 gap-2 h-12 px-6 font-semibold">
            <FileDown size={18} /> Export Agent Report
          </Button>
          <Button className="bg-leaf hover:bg-leaf/90 rounded-xl gap-2 h-12 px-6 shadow-lg shadow-leaf/20 font-bold">
            <Plus size={18} /> Add New Field Agent
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input placeholder="Search agents by name or email..." className="pl-10 h-12 rounded-xl border-none bg-white dark:bg-card shadow-sm" />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-xl bg-white dark:bg-card border-none shadow-sm gap-2">
            <Filter size={18} /> Status
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-xl bg-white dark:bg-card border-none shadow-sm gap-2 text-status-warning">
            <ShieldAlert size={18} /> Overdue
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Field Agents', value: mockAgents.length, icon: Users, color: 'text-soil', bg: 'bg-soil/10', insight: 'Growing team' },
          { label: 'Active Agents', value: mockAgents.filter(a => a.status === 'active').length, icon: UserCircle, color: 'text-leaf', bg: 'bg-leaf/10', insight: 'High participation' },
          { label: 'Pending Updates', value: 3, icon: History, color: 'text-status-warning', bg: 'bg-status-warning/10', insight: 'Requires attention' },
          { label: 'Managing At Risk', value: mockAgents.filter(a => a.atRiskFields > 0).length, icon: ShieldAlert, color: 'text-status-atrisk', bg: 'bg-status-atrisk/10', insight: 'Critical zones' },
        ].map((stat, idx) => (
          <Card key={idx} className="agri-card border-none overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}><stat.icon size={24} /></div>
                <Badge variant="secondary" className="bg-offwhite/50 dark:bg-white/5 text-[10px] uppercase font-bold tracking-wider">{stat.insight}</Badge>
              </div>
              <div className="text-3xl font-bold text-soil dark:text-offwhite">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-semibold mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="agri-card overflow-hidden border-none shadow-xl">
        <Table>
          <TableHeader className="bg-offwhite dark:bg-soil/20">
            <TableRow className="border-none">
              <TableHead className="font-bold">Agent</TableHead>
              <TableHead className="font-bold text-center">Assigned Fields</TableHead>
              <TableHead className="font-bold text-center">At Risk</TableHead>
              <TableHead className="font-bold">Last Activity</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAgents.map((agent) => (
              <TableRow key={agent.id} className="border-border/30 hover:bg-offwhite/50 dark:hover:bg-white/5 transition-colors group">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 ring-2 ring-leaf/20">
                      <AvatarImage src={agent.avatar} />
                      <AvatarFallback className="bg-sand text-soil font-bold">{agent.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-soil dark:text-offwhite group-hover:text-leaf transition-colors">{agent.name}</span>
                      <span className="text-xs text-muted-foreground">{agent.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary" className="rounded-full px-3 bg-soil/5 dark:bg-white/5 text-soil dark:text-offwhite font-bold">{agent.assignedFieldsCount}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  {agent.atRiskFields > 0 ? (
                    <Badge className="bg-status-atrisk text-white font-bold rounded-full px-3">{agent.atRiskFields} Fields</Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">None</span>
                  )}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground font-medium">
                  {new Date(agent.lastActivity).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-status-active animate-pulse' : 'bg-muted-foreground/30'}`} />
                    <span className="text-xs font-bold uppercase tracking-wider text-soil dark:text-offwhite">{agent.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal size={16} /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl p-1 border-border/50 shadow-xl">
                      <DropdownMenuItem onClick={() => setSelectedAgent(agent)} className="rounded-lg gap-2 cursor-pointer font-medium">
                        <UserCircle size={16} /> View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer font-medium">
                        <Plus size={16} /> Assign Field
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer font-medium">
                        <MessageSquare size={16} /> Message Agent
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer font-medium text-status-warning">
                        <ShieldAlert size={16} /> Suspend Agent
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

const AgentProfile = ({ agent, onBack }: { agent: Agent, onBack: () => void }) => {
  const agentFields = mockFields.filter(f => f.assignedAgentId === agent.id);
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <Button variant="ghost" onClick={onBack} className="gap-2 text-muted-foreground hover:text-soil transition-colors -ml-4">
        <History size={18} /> Back to Directory
      </Button>

      <Card className="agri-card overflow-hidden border-none shadow-xl">
        <div className="h-32 bg-soil dark:bg-soil/50 relative" />
        <CardContent className="relative px-8 pb-8">
          <div className="absolute -top-12 left-8 border-4 border-white dark:border-card rounded-3xl overflow-hidden shadow-2xl">
            <Avatar className="h-24 w-24 rounded-none">
              <AvatarImage src={agent.avatar} />
              <AvatarFallback className="text-2xl font-bold bg-sand">{agent.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="pt-16 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-3xl font-bold text-soil dark:text-offwhite">{agent.name}</h2>
                <Badge className={agent.status === 'active' ? 'bg-status-active' : 'bg-muted-foreground'}>{agent.status}</Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5"><Mail size={14} className="text-leaf" /> {agent.email}</div>
                <div className="flex items-center gap-1.5"><Phone size={14} className="text-leaf" /> {agent.phone}</div>
                <div className="flex items-center gap-1.5"><History size={14} className="text-leaf" /> Joined {new Date(agent.joinDate!).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="rounded-xl gap-2 h-12 px-6 bg-leaf hover:bg-leaf/90 font-bold shadow-lg shadow-leaf/20">Message Agent</Button>
              <Button variant="outline" className="rounded-xl h-12 px-6 border-soil/10 dark:border-white/10 font-semibold bg-white dark:bg-card">Manage Access</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Assigned Fields', value: agent.assignedFieldsCount, icon: Users, color: 'text-soil' },
          { label: 'Completed Seasons', value: 14, icon: ShieldAlert, color: 'text-leaf' },
          { label: 'Overdue Updates', value: 2, icon: History, color: 'text-status-warning' },
          { label: 'Risk Reports', value: agent.atRiskFields, icon: ShieldAlert, color: 'text-status-atrisk' },
        ].map((stat, idx) => (
          <Card key={idx} className="agri-card border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-offwhite dark:bg-white/5 ${stat.color}`}><stat.icon size={20} /></div>
                <div>
                  <div className="text-2xl font-bold text-soil dark:text-offwhite">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-soil dark:text-offwhite flex items-center gap-2">
            <Users size={20} className="text-leaf" /> Assigned Fields
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agentFields.map((field) => (
              <Card key={field.id} className="agri-card group border-none shadow-md overflow-hidden">
                <div className="h-32 relative">
                  <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/drone-field-view-865b4fc8-1776888179181.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={field.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-soil/60 to-transparent" />
                  <Badge className={`absolute top-3 right-3 ${field.status === 'Active' ? 'bg-status-active' : 'bg-status-warning'}`}>{field.status}</Badge>
                </div>
                <CardContent className="p-5">
                  <h4 className="font-bold text-soil dark:text-offwhite mb-1">{field.name}</h4>
                  <div className="flex justify-between text-xs text-muted-foreground mb-3">
                    <span>{field.cropType}</span>
                    <span>Last updated: {new Date(field.lastUpdateDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] font-bold dark:border-white/10">{field.currentStage}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-soil dark:text-offwhite flex items-center gap-2">
            <History size={20} className="text-leaf" /> Recent Activity
          </h3>
          <Card className="agri-card border-none shadow-md">
            <CardContent className="p-6">
              <div className="space-y-6 relative">
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-offwhite dark:bg-white/5" />
                {[
                  { title: 'Updated stage to growing', field: 'North Field A', time: '2 hours ago' },
                  { title: 'Submitted pest warning', field: 'South Block 3', time: 'Yesterday' },
                  { title: 'Added irrigation observation', field: 'East Valley', time: '2 days ago' },
                  { title: 'Logged harvest readiness', field: 'Maize Block 12', time: '3 days ago' },
                ].map((activity, idx) => (
                  <div key={idx} className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-leaf border-4 border-white dark:border-card shadow-sm" />
                    <div className="text-sm font-bold text-soil dark:text-offwhite">{activity.title}</div>
                    <div className="text-xs text-muted-foreground">{activity.field} \u2022 {activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="agri-card bg-leaf/5 border-leaf/20 shadow-none p-6 space-y-4">
            <h4 className="font-bold text-leaf flex items-center gap-2">
              <ShieldAlert size={18} /> Performance Insights
            </h4>
            <div className="space-y-3">
              {[
                { text: 'Strong reporting consistency this month', type: 'success' },
                { text: 'High number of at-risk fields detected recently', type: 'warning' },
                { text: 'Agent has not submitted updates in 3 days', type: 'info' },
              ].map((insight, idx) => (
                <div key={idx} className="flex gap-2 text-xs text-soil dark:text-offwhite">
                  <div className={`w-1 h-full rounded-full ${insight.type === 'success' ? 'bg-leaf' : insight.type === 'warning' ? 'bg-status-warning' : 'bg-soil'}`} />
                  <p className="leading-relaxed">{insight.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};