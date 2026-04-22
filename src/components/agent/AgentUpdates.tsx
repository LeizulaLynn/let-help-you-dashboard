import React, { useState } from 'react';
import { Camera, CheckCircle2, History, AlertTriangle, CloudUpload, Info, ChevronRight, Save, ShieldAlert as ShieldAlertIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { mockFields } from '@/lib/mockData';
import { FieldStage } from '@/lib/types';
import { toast } from 'sonner';

export const AgentUpdatesModule = ({ initialFieldId }: { initialFieldId?: string }) => {
  const [selectedFieldId, setSelectedFieldId] = useState(initialFieldId || '');
  const [stage, setStage] = useState<FieldStage>('Growing');
  const [note, setNote] = useState('');
  const [risks, setRisks] = useState<string[]>([]);

  const handleRiskToggle = (risk: string) => {
    setRisks(prev => prev.includes(risk) ? prev.filter(r => r !== risk) : [...prev, risk]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFieldId) {
      toast.error('Please select a field first.');
      return;
    }
    toast.success('Field update submitted successfully!');
    setNote('');
    setRisks([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-soil dark:text-offwhite">Submit Field Update</h1>
        <p className="text-muted-foreground">Quickly log observations and report risks from the field.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="agri-card border-none shadow-xl overflow-hidden">
          <CardHeader className="bg-offwhite dark:bg-soil/20 py-4 px-6 border-b border-border/30">
            <CardTitle className="text-lg flex items-center gap-2"><Info size={20} className="text-leaf" /> Quick Update Form</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="font-bold text-soil dark:text-offwhite ml-1">Select Field</Label>
                <Select value={selectedFieldId} onValueChange={setSelectedFieldId}>
                  <SelectTrigger className="h-14 rounded-2xl bg-offwhite/50 dark:bg-white/5 border-none shadow-inner focus:ring-2 focus:ring-leaf/20">
                    <SelectValue placeholder="Which field are you visiting?" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    {mockFields.map(f => (
                      <SelectItem key={f.id} value={f.id}>{f.name} ({f.cropType})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label className="font-bold text-soil dark:text-offwhite ml-1">Current Crop Stage</Label>
                <Select value={stage} onValueChange={(v) => setStage(v as FieldStage)}>
                  <SelectTrigger className="h-14 rounded-2xl bg-offwhite/50 dark:bg-white/5 border-none shadow-inner focus:ring-2 focus:ring-leaf/20">
                    <SelectValue placeholder="Select current stage" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="Planted">Planted</SelectItem>
                    <SelectItem value="Growing">Growing</SelectItem>
                    <SelectItem value="Ready">Ready to Harvest</SelectItem>
                    <SelectItem value="Harvested">Harvested</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-bold text-soil dark:text-offwhite ml-1">Observation Notes</Label>
              <Textarea 
                placeholder="Describe what you see. E.g., 'Observed slow crop growth in northeast section' or 'Soil moisture levels appear low'..."
                className="min-h-[160px] rounded-2xl bg-offwhite/50 dark:bg-white/5 border-none shadow-inner focus:ring-2 focus:ring-leaf/20 resize-none p-5 text-lg"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <Label className="font-bold text-soil dark:text-offwhite ml-1 flex items-center gap-2">
                <ShieldAlertIcon size={18} className="text-status-warning" /> Report Risks (Select all that apply)
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { id: 'pest', label: 'Pest Activity', icon: AlertTriangle },
                  { id: 'drought', label: 'Drought Signs', icon: AlertTriangle },
                  { id: 'disease', label: 'Disease Symptoms', icon: AlertTriangle },
                  { id: 'irrigation', label: 'Irrigation Issue', icon: Info },
                  { id: 'slow', label: 'Slow Growth', icon: Info },
                ].map((risk) => (
                  <div 
                    key={risk.id}
                    onClick={() => handleRiskToggle(risk.id)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      risks.includes(risk.id) 
                        ? 'bg-status-warning/10 border-status-warning text-status-warning' 
                        : 'bg-white dark:bg-card border-border/20 text-muted-foreground'
                    }`}
                  >
                    <Checkbox id={risk.id} checked={risks.includes(risk.id)} onCheckedChange={() => handleRiskToggle(risk.id)} className="sr-only" />
                    <risk.icon size={20} />
                    <span className="font-bold text-sm uppercase tracking-widest">{risk.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-bold text-soil dark:text-offwhite ml-1">Upload Field Photos</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button type="button" className="aspect-square rounded-2xl border-2 border-dashed border-border/30 flex flex-col items-center justify-center gap-2 hover:bg-offwhite dark:hover:bg-white/5 transition-colors">
                  <Camera size={32} className="text-leaf" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Take Photo</span>
                </button>
                <button type="button" className="aspect-square rounded-2xl border-2 border-dashed border-border/30 flex flex-col items-center justify-center gap-2 hover:bg-offwhite dark:hover:bg-white/5 transition-colors">
                  <CloudUpload size={32} className="text-soil dark:text-offwhite" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Browse Files</span>
                </button>
              </div>
            </div>
          </CardContent>
          <div className="p-8 bg-offwhite dark:bg-soil/10 border-t border-border/30 flex flex-col sm:flex-row gap-4 justify-end">
             <Button variant="ghost" type="button" className="h-14 px-10 rounded-2xl font-bold hover:bg-white dark:hover:bg-card text-muted-foreground">
               <Save size={20} className="mr-2" /> Save Draft
             </Button>
             <Button type="submit" className="h-14 px-16 rounded-2xl bg-leaf hover:bg-leaf/90 font-bold text-lg shadow-xl shadow-leaf/20">
               Submit Update <ChevronRight size={20} className="ml-2" />
             </Button>
          </div>
        </Card>
      </form>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-soil dark:text-offwhite flex items-center gap-2">
          <History size={20} className="text-leaf" /> Recent Submissions
        </h3>
        <div className="space-y-4">
          {[
            { field: 'North Field A', stage: 'Growing', time: '2 hours ago', status: 'Submitted', note: 'Added observation notes about pest activity.' },
            { field: 'South Block 3', stage: 'Planted', time: 'Yesterday', status: 'Draft', note: 'Initial planting phase nearly complete.' },
          ].map((sub, i) => (
            <Card key={i} className="agri-card border-none shadow-md overflow-hidden group">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${sub.status === 'Submitted' ? 'bg-leaf/10 text-leaf' : 'bg-sand/20 text-soil dark:text-offwhite'}`}>
                  {sub.status === 'Submitted' ? <CheckCircle2 size={24} /> : <Save size={24} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-soil dark:text-offwhite group-hover:text-leaf transition-colors">{sub.field}</h4>
                    <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest">{sub.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{sub.note}</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{sub.time}</div>
                  <div className="text-xs font-bold text-leaf uppercase">{sub.stage}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};