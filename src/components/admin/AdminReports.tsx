import React from 'react';
import { FileDown, Calendar, Filter, TrendingUp, Target, ShieldAlert, CheckCircle2, ChevronRight, BarChart3, PieChart as PieIcon, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, PieChart, Pie, LineChart, Line } from 'recharts';
import { mockReports } from '@/lib/mockData';

export const AdminReportsModule = () => {
  const stageData = [
    { name: 'Planted', value: 35, color: '#A4BE7B' },
    { name: 'Growing', value: 45, color: '#5C8D4E' },
    { name: 'Ready', value: 15, color: '#4CAF50' },
    { name: 'Harvested', value: 5, color: '#8D99AE' },
  ];

  const trendData = [
    { month: 'Jan', active: 40, risk: 5 },
    { month: 'Feb', active: 55, risk: 8 },
    { month: 'Mar', active: 75, risk: 12 },
    { month: 'Apr', active: 90, risk: 10 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-soil dark:text-offwhite">Reports & Insights</h1>
          <p className="text-muted-foreground">Analytical overview of agricultural operations.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="h-12 rounded-xl border-soil/10 dark:border-white/10 bg-white dark:bg-card">
            <Calendar size={18} className="mr-2" /> Date Range
          </Button>
          <Button variant="outline" className="h-12 rounded-xl border-soil/10 dark:border-white/10 bg-white dark:bg-card">
            <Filter size={18} className="mr-2" /> Crop Type
          </Button>
          <div className="flex bg-white dark:bg-card rounded-xl border border-soil/10 dark:border-white/10 p-1">
            {['PDF', 'CSV', 'Excel'].map((format) => (
              <Button key={format} variant="ghost" className="h-10 px-4 rounded-lg text-xs font-bold hover:bg-offwhite dark:hover:bg-white/5">
                {format}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Reports', value: '42', icon: FileDown, color: 'text-soil', bg: 'bg-soil/10' },
          { label: 'Active Fields', value: '85%', icon: Target, color: 'text-leaf', bg: 'bg-leaf/10' },
          { label: 'At Risk Area', value: '12%', icon: ShieldAlert, color: 'text-status-atrisk', bg: 'bg-status-atrisk/10' },
          { label: 'Completed Harvests', value: '24', icon: CheckCircle2, color: 'text-status-active', bg: 'bg-status-active/10' },
        ].map((stat, idx) => (
          <Card key={idx} className="agri-card border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}><stat.icon size={20} /></div>
                <div>
                  <div className="text-2xl font-bold text-soil dark:text-offwhite">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="agri-card border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 size={20} className="text-leaf" /> Field Stage Distribution
            </CardTitle>
            <CardDescription>Percentage of fields in each lifecycle stage</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#F8F5F0', opacity: 0.5 }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="agri-card border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp size={20} className="text-leaf" /> Crop Growth Trends
            </CardTitle>
            <CardDescription>Operational growth vs risk detection</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="active" stroke="#5C8D4E" strokeWidth={3} dot={{ r: 4, fill: '#5C8D4E' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="risk" stroke="#E67E22" strokeWidth={3} dot={{ r: 4, fill: '#E67E22' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Field Performance', icon: Target, items: ['Top 5 yielding blocks', 'Delayed stage alerts', 'Harvest readiness score'] },
          { title: 'Agent Activity', icon: Activity, items: ['Submission frequency', 'Photo audit logs', 'Response time metrics'] },
          { title: 'Risk Analysis', icon: ShieldAlert, items: ['Pest outbreak trends', 'Drought vulnerability', 'Disease hotspot map'] },
          { title: 'Seasonal Harvest', icon: Calendar, items: ['Actual vs Predicted yield', 'Quality audit results', 'Logistics planning'] },
        ].map((type, idx) => (
          <Card key={idx} className="agri-card border-none shadow-md hover:translate-y-[-4px] transition-transform cursor-pointer">
            <CardHeader className="pb-2">
              <div className="w-10 h-10 rounded-xl bg-offwhite dark:bg-white/5 flex items-center justify-center text-leaf mb-2">
                <type.icon size={20} />
              </div>
              <CardTitle className="text-sm font-bold">{type.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {type.items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                  <ChevronRight size={10} className="text-leaf" /> {item}
                </div>
              ))}
              <Button variant="link" className="p-0 h-auto text-xs font-bold text-leaf hover:no-underline pt-2">Generate Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="agri-card border-none shadow-xl overflow-hidden">
        <CardHeader className="bg-offwhite dark:bg-soil/20 py-4 px-6 border-b border-border/30">
          <CardTitle className="text-lg">Recent Reports</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="border-border/30">
              <TableHead className="font-bold">Report Name</TableHead>
              <TableHead className="font-bold">Type</TableHead>
              <TableHead className="font-bold">Generated By</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="text-right font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockReports.map((report) => (
              <TableRow key={report.id} className="border-border/20 group hover:bg-offwhite/30 dark:hover:bg-white/5 transition-colors">
                <TableCell className="font-bold text-soil dark:text-offwhite">{report.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[10px] font-bold uppercase dark:border-white/10">{report.type}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground font-medium">{report.generatedBy}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{new Date(report.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" className="h-8 rounded-lg gap-2 text-leaf font-bold hover:bg-leaf/10">
                    <FileDown size={14} /> Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};