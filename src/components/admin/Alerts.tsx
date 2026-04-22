import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Search, Filter, Clock, MoreVertical, MapPin, User, ChevronRight, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockAlerts } from '@/lib/mockData';
import { Alert } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminAlertsModule = () => {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const stats = [
    { label: 'Total Alerts', value: mockAlerts.length, color: 'text-soil', icon: ShieldAlert },
    { label: 'Unresolved', value: mockAlerts.filter(a => a.status === 'unresolved').length, color: 'text-status-warning', icon: Clock },
    { label: 'Critical', value: mockAlerts.filter(a => a.severity === 'Critical').length, color: 'text-status-warning', icon: AlertTriangle },
    { label: 'Resolved', value: mockAlerts.filter(a => a.status === 'resolved').length, color: 'text-leaf', icon: CheckCircle2 },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[calc(100vh-12rem)]">
      <div className="flex-1 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-soil dark:text-offwhite">Alert Center</h1>
            <p className="text-muted-foreground">Monitor and manage urgent field issues.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-12 rounded-xl border-soil/10 dark:border-white/10 bg-white dark:bg-card">
              <Filter size={18} className="mr-2" /> All Severities
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="agri-card border-none shadow-md">
              <CardContent className="p-4 flex flex-col items-center text-center space-y-1">
                <stat.icon size={20} className={stat.color} />
                <div className="text-2xl font-bold text-soil dark:text-offwhite">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input placeholder="Search alerts by field name or issue..." className="pl-10 h-12 rounded-xl border-none bg-white dark:bg-card shadow-sm" />
        </div>

        <div className="space-y-4">
          {mockAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              layoutId={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className={`agri-card border-none shadow-md overflow-hidden cursor-pointer group hover:ring-2 hover:ring-leaf/20 transition-all ${
                selectedAlert?.id === alert.id ? 'ring-2 ring-leaf' : ''
              }`}
            >
              <CardContent className="p-5 flex items-start gap-4">
                <div className={`p-3 rounded-2xl shrink-0 ${
                  alert.severity === 'Critical' ? 'bg-status-warning/10 text-status-warning' : 
                  alert.severity === 'Warning' ? 'bg-status-atrisk/10 text-status-atrisk' : 'bg-leaf/10 text-leaf'
                }`}>
                  {alert.severity === 'Critical' ? <AlertTriangle size={24} /> : alert.severity === 'Warning' ? <Zap size={24} /> : <CheckCircle2 size={24} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-soil dark:text-offwhite truncate group-hover:text-leaf transition-colors">{alert.title}</h3>
                    <Badge className={
                      alert.severity === 'Critical' ? 'bg-status-warning' : 
                      alert.severity === 'Warning' ? 'bg-status-atrisk' : 'bg-status-active'
                    }>
                      {alert.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><MapPin size={12} className="text-leaf" /> {alert.fieldName}</span>
                    <span className="flex items-center gap-1"><User size={12} className="text-leaf" /> Reported by {alert.reportedBy}</span>
                  </div>
                  <p className="text-sm text-soil/70 dark:text-offwhite/70 line-clamp-1">{alert.description}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase whitespace-nowrap">{new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${alert.status === 'unresolved' ? 'text-status-warning' : 'text-leaf'}`}>
                    {alert.status}
                  </div>
                </div>
              </CardContent>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-96 space-y-6">
        <AnimatePresence mode="wait">
          {selectedAlert ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              key="details"
            >
              <Card className="agri-card border-none shadow-xl sticky top-24 overflow-hidden">
                <div className={`h-2 ${selectedAlert.severity === 'Critical' ? 'bg-status-warning' : 'bg-status-atrisk'}`} />
                <CardHeader>
                  <CardTitle className="text-xl">{selectedAlert.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Clock size={14} /> Reported {new Date(selectedAlert.timestamp).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedAlert.images && selectedAlert.images.length > 0 && (
                    <div className="aspect-video rounded-2xl overflow-hidden border border-border/50">
                      <img src={selectedAlert.images[0]} className="w-full h-full object-cover" alt="Alert detail" />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-bold text-soil dark:text-offwhite uppercase tracking-wider">Observations</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-offwhite dark:bg-white/5 p-4 rounded-xl border border-border/30 italic">
                      "{selectedAlert.description}"
                    </p>
                  </div>

                  {selectedAlert.recommendedActions && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-soil dark:text-offwhite uppercase tracking-wider">Recommended Actions</h4>
                      <div className="space-y-2">
                        {selectedAlert.recommendedActions.map((action, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-leaf/5 border border-leaf/10 text-xs font-bold text-soil dark:text-offwhite">
                            <div className="w-1.5 h-1.5 rounded-full bg-leaf" /> {action}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t border-border/30 flex flex-col gap-3">
                    <Button className="w-full h-12 rounded-xl bg-leaf hover:bg-leaf/90 font-bold shadow-lg shadow-leaf/20">Acknowledge & Notify Agent</Button>
                    <Button variant="outline" className="w-full h-12 rounded-xl border-soil/10 dark:border-white/10 font-bold">Mark as Resolved</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key="empty"
              className="h-full flex flex-col items-center justify-center py-20 text-center space-y-4"
            >
              <div className="w-20 h-20 bg-offwhite dark:bg-white/5 rounded-full flex items-center justify-center text-muted-foreground/30">
                <ShieldAlert size={40} />
              </div>
              <div>
                <h3 className="font-bold text-soil dark:text-offwhite">No Alert Selected</h3>
                <p className="text-xs text-muted-foreground max-w-[200px]">Select an alert from the feed to view detailed observations and images.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Card className="agri-card bg-soil text-white border-none p-6 space-y-4 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 agri-gradient opacity-10 -mr-12 -mt-12 rounded-full" />
          <h4 className="font-bold flex items-center gap-2 text-leaf">
            <Zap size={18} /> Smart Alert Insights
          </h4>
          <div className="space-y-3">
            {[
              '3 fields have not been updated recently',
              'Possible pest outbreak across maize fields',
              'Water shortage risk increasing in East Valley'
            ].map((insight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-offwhite/80 border-l border-white/20 pl-3">
                <p>{insight}</p>
              </div>
            ))}
          </div>
          <Button variant="link" className="p-0 h-auto text-xs text-leaf font-bold hover:no-underline">Explore trends <ChevronRight size={14} /></Button>
        </Card>
      </div>
    </div>
  );
};