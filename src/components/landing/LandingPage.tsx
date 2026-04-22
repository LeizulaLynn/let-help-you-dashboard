import React from 'react';
import { 
  Sprout, 
  ArrowRight, 
  LayoutDashboard, 
  MapPin, 
  Sprout as SproutIcon, 
  TrendingUp, 
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { guestPreviews } from '@/lib/mockData';

const iconMap: Record<string, any> = {
  LayoutDashboard,
  MapPin,
  Sprout: SproutIcon,
  TrendingUp
};

export const LandingPage = ({ onStart, onLogin }: { onStart: () => void, onLogin: () => void }) => {
  const scrollToPreviews = () => {
    const element = document.getElementById('previews');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-offwhite dark:bg-background overflow-hidden font-body">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 agri-gradient rounded-xl flex items-center justify-center shadow-lg shadow-leaf/20">
              <Sprout className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-heading font-bold text-soil dark:text-offwhite tracking-tight">SmartSeason</span>
          </div>
          
          <div className="hidden md:flex gap-10 items-center">
            {['Features', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-bold text-soil/60 dark:text-offwhite/60 hover:text-leaf transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={onLogin} 
              className="font-bold text-soil dark:text-offwhite hover:bg-soil/5 dark:hover:bg-white/5"
            >
              Login
            </Button>
            <Button 
              onClick={onStart} 
              className="bg-leaf hover:bg-leaf/90 text-white rounded-xl font-bold px-6 shadow-lg shadow-leaf/20 h-11"
            >
              Create Account
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/hero-bg-6b3207d6-1776888781093.webp" 
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-offwhite to-offwhite dark:via-background dark:to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="px-4 py-1.5 rounded-full bg-leaf/10 text-leaf border-leaf/20 font-bold uppercase tracking-widest text-[10px] mb-6">
                Global Agricultural Intelligence
              </Badge>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-soil dark:text-offwhite leading-[1.05] tracking-tight">
                Monitor Crop Growth <br />
                <span className="text-leaf">Across Every Field</span> in Real Time
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              SmartSeason helps coordinators and field agents track crop progress, monitor risks, and manage agricultural operations efficiently.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-5 justify-center pt-8"
            >
              <Button 
                size="lg" 
                onClick={onStart}
                className="h-16 px-10 rounded-2xl bg-leaf hover:bg-leaf/90 text-white text-lg font-bold shadow-2xl shadow-leaf/40 group"
              >
                Get Started <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={scrollToPreviews}
                className="h-16 px-10 rounded-2xl border-2 border-soil/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-lg font-bold text-soil dark:text-offwhite"
              >
                Explore Platform
              </Button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-24 max-w-6xl mx-auto"
          >
             <div className="relative rounded-[40px] overflow-hidden border-[12px] border-white dark:border-card shadow-[0_32px_64px_-12px_rgba(78,59,49,0.2)]">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/admin-dashboard-preview-681b7fb0-1776888780472.webp" 
                  className="w-full aspect-video object-cover"
                  alt="Platform Dashboard"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-soil/20 to-transparent" />
             </div>
          </motion.div>
        </div>
      </section>

      {/* Guest Preview Sections */}
      <section id="previews" className="py-32 bg-white dark:bg-card/50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-soil dark:text-offwhite">The Future of Field Management</h2>
            <p className="text-lg text-muted-foreground">Experience our suite of tools designed for precision farming and real-time operational excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {guestPreviews.map((preview, idx) => {
              const Icon = iconMap[preview.icon] || LayoutDashboard;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col gap-8 group"
                >
                  <div className="space-y-6 order-2 md:order-none">
                    <div className="w-14 h-14 rounded-2xl bg-leaf/10 flex items-center justify-center text-leaf">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-soil dark:text-offwhite group-hover:text-leaf transition-colors">{preview.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {preview.description}
                    </p>
                    <Button variant="link" className="p-0 h-auto text-leaf font-bold gap-2 group/btn">
                      Learn how it works <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                  <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-soil/10 border border-border/50 order-1 md:order-none">
                    <img 
                      src={preview.image} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt={preview.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-soil/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-32 bg-offwhite dark:bg-background">
         <div className="container mx-auto px-4">
            <div className="bg-soil rounded-[48px] p-12 md:p-24 relative overflow-hidden text-center">
               <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/hero-bg-6b3207d6-1776888781093.webp" className="w-full h-full object-cover" />
               </div>
               <div className="relative z-10 max-w-4xl mx-auto space-y-10">
                  <h2 className="text-4xl md:text-6xl font-heading font-bold text-white">Ready to transform your farm operations?</h2>
                  <p className="text-xl text-offwhite/70">Join 500+ agricultural networks optimizing their fields with SmartSeason.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <Button 
                       size="lg" 
                       onClick={onStart}
                       className="h-16 px-12 rounded-2xl bg-leaf hover:bg-leaf/90 text-white text-xl font-bold shadow-xl shadow-leaf/20"
                     >
                        Get Started Now
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-border/50">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
               <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 agri-gradient rounded-lg flex items-center justify-center">
                      <Sprout className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-heading font-bold text-soil dark:text-offwhite">SmartSeason</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Leading the digital transformation of agriculture through real-time field intelligence and workforce coordination.
                  </p>
               </div>
               {[ 
                 { title: 'Platform', links: ['Dashboard', 'Mobile App', 'Analytics', 'Integrations'] },
                 { title: 'Company', links: ['About Us', 'Sustainability', 'Careers', 'Contact'] },
                 { title: 'Resources', links: ['Documentation', 'Help Center', 'API Status', 'Privacy Policy'] }
               ].map((col, i) => (
                 <div key={i} className="space-y-6">
                    <h4 className="font-bold text-soil dark:text-offwhite">{col.title}</h4>
                    <ul className="space-y-4">
                       {col.links.map(link => (
                         <li key={link}><a href="#" className="text-sm text-muted-foreground hover:text-leaf transition-colors">{link}</a></li>
                       ))}
                    </ul>
                 </div>
               ))}
            </div>
            <div className="mt-20 pt-10 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
               <p className="text-sm text-muted-foreground">\\u00a9 2024 SmartSeason. All rights reserved.</p>
               <div className="flex gap-6">
                  <Globe size={20} className="text-muted-foreground cursor-pointer hover:text-leaf" />
                  <div className="text-sm font-bold text-soil/60 dark:text-offwhite/60">English (US)</div>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};