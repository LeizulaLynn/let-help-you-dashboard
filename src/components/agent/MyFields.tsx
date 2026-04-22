import React, { useState } from 'react';
import { Search, Filter, MoreVertical, MapPin, Clock, ArrowRight, Sprout, Target, ShieldAlert, History, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockFields } from '@/lib/mockData';
import { Field } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export const MyFieldsModule = ({ onUpdateField }: { onUpdateField: (f: Field) => void }) => {
  const [selectedField, setSelectedField] = useState<Field | null>(null);

  if (selectedField) {
    return <FieldDetailsView field={selectedField} onBack={() => setSelectedField(null)} onUpdate={() => onUpdateField(selectedField)} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-soil dark:text-offwhite">My Assigned Fields</h1>
          <p className="text-muted-foreground">Monitor and update your assigned agricultural blocks.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input placeholder="Search fields by name or crop..." className="pl-10 h-14 rounded-2xl border-none bg-white dark:bg-card shadow-md text-lg" />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none h-14 rounded-2xl bg-white dark:bg-card border-none shadow-md gap-2 font-bold">
            <Filter size={18} /> Stage
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none h-14 rounded-2xl bg-white dark:bg-card border-none shadow-md gap-2 font-bold">
            <Target size={18} /> Status
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockFields.map((field) => (
          <Card key={field.id} className="agri-card group border-none shadow-xl overflow-hidden cursor-pointer" onClick={() => setSelectedField(field)}>
            <div className="h-48 relative">
              <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/drone-field-view-865b4fc8-1776888179181.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={field.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-soil/80 via-soil/20 to-transparent" />
              <Badge className={`absolute top-4 right-4 h-8 px-4 font-bold text-xs uppercase tracking-widest ${field.status === 'Active' ? 'bg-status-active' : 'bg-status-warning shadow-lg shadow-status-warning/20'}`}>
                {field.status}
              </Badge>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-white border-white/30 bg-black/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest">
                    {field.cropType}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{field.name}</h3>
              </div>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Planting Date</span>
                  <div className="text-sm font-bold text-soil dark:text-offwhite">{new Date(field.plantingDate).toLocaleDateString()}</div>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Current Stage</span>
                  <div className="text-sm font-bold text-leaf">{field.currentStage}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span>Growth Progress</span>
                  <span className="text-leaf">65%</span>
                </div>
                <Progress value={65} className="h-2 rounded-full" />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold uppercase tracking-tighter">
                  <Clock size={14} className="text-leaf" /> Updated {new Date(field.lastUpdateDate).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="h-10 rounded-xl px-4 text-xs font-bold text-soil dark:text-offwhite">View Details</Button>
                  <Button 
                    size="sm" 
                    className="h-10 rounded-xl px-6 bg-leaf hover:bg-leaf/90 shadow-lg shadow-leaf/20 font-bold"
                    onClick={(e) => { e.stopPropagation(); onUpdateField(field); }}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const FieldDetailsView = ({ field, onBack, onUpdate }: { field: Field, onBack: () => void, onUpdate: () => void }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="rounded-2xl w-14 h-14 p-0 bg-white dark:bg-card shadow-md border-none hover:bg-offwhite"><History size={24} className="rotate-180" /></Button>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-soil dark:text-offwhite">{field.name}</h1>
            <Badge className={field.status === 'Active' ? 'bg-status-active' : 'bg-status-warning'}>{field.status}</Badge>
          </div>
          <p className="text-muted-foreground flex items-center gap-2"><MapPin size={16} className="text-leaf" /> {field.acreage} Acres \u2022 {field.cropType}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="agri-card border-none shadow-xl overflow-hidden">
            <CardHeader className="bg-offwhite dark:bg-soil/20 py-4 px-6">
              <CardTitle className="text-lg flex items-center gap-2"><Target size={20} className="text-leaf" /> Crop Lifecycle Timeline</CardTitle>
            </CardHeader>
            <CardContent className="py-12 px-6">
              <div className="relative flex justify-between items-center px-4">
                <div className="absolute top-1/2 left-8 right-8 h-1 bg-offwhite dark:bg-white/5 -translate-y-1/2 rounded-full" />
                {['Planted', 'Growing', 'Ready', 'Harvested'].map((stage, idx) => {
                  const stages = ['Planted', 'Growing', 'Ready', 'Harvested'];
                  const currentIdx = stages.indexOf(field.currentStage);
                  const isPast = idx < currentIdx;
                  const isCurrent = idx === currentIdx;
                  
                  return (
                    <div key={stage} className="relative z-10 flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white dark:border-card shadow-lg transition-all duration-700 ${
                        isPast ? 'bg-leaf text-white' : 
                        isCurrent ? 'bg-status-active text-white scale-110 ring-4 ring-status-active/20' : 
                        'bg-white dark:bg-card text-muted-foreground'
                      }`}>
                        {isPast ? <CheckCircle2 size={24} /> : <span className="text-sm font-bold">{idx + 1}</span>}
                      </div>
                      <span className={`absolute -bottom-8 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${isCurrent ? 'text-leaf' : 'text-muted-foreground'}`}>
                        {stage}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="agri-card border-none shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2"><History size={20} className="text-leaf" /> Observations History</CardTitle>
              <Button onClick={onUpdate} className="bg-soil rounded-xl gap-2 font-bold shadow-lg shadow-soil/10">Log New Visit</Button>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              {field.observations.map((obs) => (
                <div key={obs.id} className="p-6 rounded-2xl bg-offwhite/50 dark:bg-white/5 border border-border/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-[10px] bg-sand font-bold">JF</AvatarFallback>
                      </Avatar>
                      <span className="font-bold text-soil dark:text-offwhite text-sm">{obs.agentName}</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-bold">{new Date(obs.date).toLocaleDateString()}</Badge>
                  </div>
                  <p className="text-sm text-soil/70 dark:text-offwhite/70 leading-relaxed">{obs.note}</p>
                  <div className="flex gap-2">
                    <Badge className="bg-leaf/10 text-leaf border-none text-[10px] font-bold uppercase">{obs.stage}</Badge>
                    {obs.isWarning && <Badge className="bg-status-warning/10 text-status-warning border-none text-[10px] font-bold uppercase">Critical</Badge>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="agri-card bg-sand/10 border-none shadow-md overflow-hidden">
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Sprout size={20} className="text-leaf" /> Assigned Tasks</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: 'Soil Moisture Check', due: 'Today', status: 'Pending' },
                { title: 'Fertilizer Application', due: 'In 2 days', status: 'Upcoming' },
                { title: 'Pest Scans', due: 'Every Monday', status: 'Routine' },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-card rounded-xl shadow-sm border border-border/10">
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-soil dark:text-offwhite">{task.title}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{task.due}</div>
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold text-leaf border-leaf/20">{task.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="agri-card border-none shadow-md overflow-hidden">
            <div className="h-40 bg-soil flex items-center justify-center text-white">
              <MapPin size={48} className="text-leaf" />
            </div>
            <CardContent className="p-6">
              <h4 className="font-bold text-soil dark:text-offwhite mb-4">Field Access Details</h4>
              <div className="space-y-3 text-xs text-muted-foreground">
                <p><strong>Primary Access:</strong> North Gate Road B4</p>
                <p><strong>Storage:</strong> Shed 3 (Key #102)</p>
                <p><strong>Emergency Contact:</strong> +1 (555) 000-1111</p>
              </div>
              <Button variant="outline" className="w-full mt-6 rounded-xl font-bold border-soil/10">View Terrain Map</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};