import React, { useState } from 'react';
import { 
  Sprout, 
  ShieldCheck, 
  Smartphone, 
  Mail, 
  Lock, 
  User as UserIcon, 
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'sonner';
import { User, UserRole } from '@/lib/types';
import { mockUsers } from '@/lib/mockData';

interface AuthFlowProps {
  onComplete: (user: User) => void;
  onBack: () => void;
}

type AuthState = 'login' | 'signup' | 'otp';

export const AuthFlow = ({ onComplete, onBack }: AuthFlowProps) => {
  const [state, setState] = useState<AuthState>('login');
  const [role, setRole] = useState<UserRole>('AGENT');
  const [email, setEmail] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Welcome back!');
    // For demo, we just log in as the matching role from mockUsers
    const user = mockUsers.find(u => u.role === (email.includes('admin') ? 'ADMIN' : 'AGENT')) || mockUsers[1];
    onComplete(user);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setState('otp');
    toast.info('OTP sent to your email');
  };

  const handleVerifyOTP = () => {
    if (otpValue.length !== 6) return;
    
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      toast.success('Account verified successfully!');
      const user = role === 'ADMIN' ? mockUsers[0] : mockUsers[1];
      onComplete(user);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-body bg-offwhite">
      {/* Left Side: Visuals & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden agri-gradient">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a6fcaede-760c-49da-94a5-af4faff960d9/hero-bg-6b3207d6-1776888781093.webp" 
            className="w-full h-full object-cover"
            alt="Branding Background"
          />
        </div>
        <div className="relative z-10 w-full p-16 flex flex-col justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <Sprout className="text-white w-7 h-7" />
            </div>
            <span className="text-2xl font-heading font-bold text-white">SmartSeason</span>
          </div>

          <div className="space-y-8">
            <blockquote className="text-4xl font-heading font-bold text-white leading-tight">
              "The ultimate goal of farming is not the growing of crops, but the cultivation and perfection of human beings."
            </blockquote>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: ShieldCheck, label: 'Secure Monitoring' },
                { icon: Smartphone, label: 'Field Ready' },
                { icon: CheckCircle2, label: 'Real-time Analytics' }
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-white text-sm font-bold">
                  <benefit.icon size={16} />
                  {benefit.label}
                </div>
              ))}
            </div>
          </div>

          <div className="text-white/60 text-sm">
            \\u00a9 2024 SmartSeason Operational Intelligence Platform.
          </div>
        </div>
      </div>

      {/* Right Side: Auth Forms */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-12 bg-white dark:bg-background">
        <div className="max-w-md w-full mx-auto space-y-10">
          <AnimatePresence mode="wait">
            {state === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-4xl font-heading font-bold text-soil dark:text-offwhite">Welcome Back</h2>
                  <p className="text-muted-foreground">Enter your credentials to access your dashboard.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="name@company.com" 
                          className="pl-10 h-12 rounded-xl"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="password">Password</Label>
                        <button type="button" className="text-xs text-leaf font-bold hover:underline">Forgot password?</button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
                        <Input id="password" type="password" placeholder="••••••••" className="pl-10 h-12 rounded-xl" required />
                      </div>
                    </div>
                  </div>

                  <Button className="w-full h-12 rounded-xl bg-leaf hover:bg-leaf/90 text-white font-bold shadow-lg shadow-leaf/20">
                    Sign In
                  </Button>
                </form>

                <div className="text-center">
                  <span className="text-muted-foreground">Don't have an account? </span>
                  <button 
                    onClick={() => setState('signup')} 
                    className="text-leaf font-bold hover:underline"
                  >
                    Create one for free
                  </button>
                </div>
              </motion.div>
            )}

            {state === 'signup' && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-4xl font-heading font-bold text-soil dark:text-offwhite">Create Account</h2>
                  <p className="text-muted-foreground">Join the platform to start monitoring your fields.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setRole('ADMIN')} 
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                      role === 'ADMIN' ? 'border-leaf bg-leaf/5' : 'border-border hover:border-leaf/50'
                    }`}
                  >
                    <ShieldCheck className={role === 'ADMIN' ? 'text-leaf' : 'text-muted-foreground'} size={24} />
                    <span className="text-sm font-bold">Coordinator</span>
                  </button>
                  <button 
                    onClick={() => setRole('AGENT')} 
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${
                      role === 'AGENT' ? 'border-leaf bg-leaf/5' : 'border-border hover:border-leaf/50'
                    }`}
                  >
                    <Smartphone className={role === 'AGENT' ? 'text-leaf' : 'text-muted-foreground'} size={24} />
                    <span className="text-sm font-bold">Field Agent</span>
                  </button>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input id="name" placeholder="John Doe" className="pl-10 h-12 rounded-xl" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Work Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input id="signup-email" type="email" placeholder="name@company.com" className="pl-10 h-12 rounded-xl" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Create Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input id="signup-password" type="password" placeholder="••••••••" className="pl-10 h-12 rounded-xl" required />
                    </div>
                  </div>

                  <Button className="w-full h-12 rounded-xl bg-leaf hover:bg-leaf/90 text-white font-bold shadow-lg shadow-leaf/20">
                    Create Account
                  </Button>
                </form>

                <div className="text-center">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <button 
                    onClick={() => setState('login')} 
                    className="text-leaf font-bold hover:underline"
                  >
                    Sign in here
                  </button>
                </div>
              </motion.div>
            )}

            {state === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-10 text-center"
              >
                <button 
                  onClick={() => setState('signup')} 
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-leaf font-bold transition-colors"
                >
                  <ArrowLeft size={16} /> Back to signup
                </button>

                <div className="space-y-4">
                  <div className="w-20 h-20 agri-gradient rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-leaf/20">
                    <Mail className="text-white w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-heading font-bold text-soil dark:text-offwhite">Verify Account</h2>
                    <p className="text-muted-foreground">
                      We've sent a 6-digit code to your email. <br />
                      Please enter it below to activate your account.
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <InputOTP 
                    maxLength={6} 
                    value={otpValue} 
                    onChange={setOtpValue}
                    onComplete={handleVerifyOTP}
                  >
                    <InputOTPGroup className="gap-3">
                      {[0, 1, 2, 3, 4, 5].map(i => (
                        <InputOTPSlot key={i} index={i} className="w-12 h-14 rounded-xl border-2 text-2xl font-bold border-border focus:border-leaf" />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handleVerifyOTP} 
                    disabled={otpValue.length !== 6 || isVerifying}
                    className="w-full h-12 rounded-xl bg-leaf hover:bg-leaf/90 text-white font-bold disabled:opacity-50"
                  >
                    {isVerifying ? 'Verifying...' : 'Verify & Continue'}
                  </Button>
                  
                  <div className="flex flex-col gap-2">
                    <button className="text-sm text-muted-foreground hover:text-leaf font-bold">Resend code</button>
                    <button className="text-sm text-muted-foreground hover:text-leaf font-bold">Change email address</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};