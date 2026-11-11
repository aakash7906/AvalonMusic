import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AuthScreen: React.FC = () => {
  const navigate = useNavigate();
  const { login, signup, showToast } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'Bride / Groom' | 'Event Host' | 'Event Planner' | 'Corporate Coordinator'>('Bride / Groom');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email', 'warning');
      return;
    }
    login(email, role);
    navigate('/');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      showToast('Please provide your name and email', 'warning');
      return;
    }
    signup({
      name,
      email,
      phone: phone || '(832) 723-8886',
      role,
      eventDate: 'Upcoming 2027'
    });
    navigate('/');
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email address', 'warning');
      return;
    }
    showToast(`Password reset link sent to ${email}`, 'success');
    setMode('login');
  };

  const handleGuest = () => {
    login('guest@avalonmusic.com', 'Event Host');
    navigate('/');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between p-6 bg-background text-foreground overflow-y-auto">
      {/* Top Brand Logo */}
      <div className="pt-4 flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-secondary/80 border border-primary/30 p-2 shadow-lg flex items-center justify-center mb-3">
          <img src="/logo.png" alt="Avalon Music" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-xl font-extrabold font-display text-foreground tracking-tight">
          AVALON MUSIC
        </h1>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Houston's Live Music Concierge & Booking App
        </p>
      </div>

      {/* Auth Card Container */}
      <div className="my-auto py-4 w-full max-w-sm sm:max-w-md mx-auto">
        {/* Mode Selector Tabs */}
        {mode !== 'forgot' && (
          <div className="flex bg-secondary/80 p-1 rounded-2xl border border-border mb-6">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                mode === 'login'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-secondary/60 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-[11px] text-primary hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-secondary/60 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-xs shadow-[0_4px_20px_var(--primary-glow)] hover:bg-primary-hover active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>Sign In to Avalon</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Signup Form */}
        {mode === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Your Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Haley Hughes"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary/60 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary/60 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="tel"
                  placeholder="(832) 555-0192"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary/60 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                I am booking as:
              </label>
              <select
                value={role}
                onChange={e => setRole(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-secondary/60 border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
              >
                <option value="Bride / Groom">Bride / Groom (Wedding)</option>
                <option value="Corporate Coordinator">Corporate Event Planner</option>
                <option value="Event Host">Private Host / Birthday / Gala</option>
                <option value="Event Planner">Certified Event Coordinator</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Create Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary/60 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-xs shadow-[0_4px_20px_var(--primary-glow)] hover:bg-primary-hover active:scale-95 transition-all flex items-center justify-center gap-2 mt-3"
            >
              <span>Register & Access Concierge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Forgot Password */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgot} className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-base font-bold text-foreground">Reset Password</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Enter your email address and we will send instructions to reset your password.
              </p>
            </div>

            <div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-secondary/60 border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-xs shadow-md hover:bg-primary-hover active:scale-95 transition-all"
            >
              Send Reset Link
            </button>

            <button
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-xs text-muted-foreground hover:text-foreground text-center"
            >
              Return to Sign In
            </button>
          </form>
        )}

        {/* Quick Guest Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <span className="relative px-3 bg-background text-[11px] text-muted-foreground uppercase tracking-wider">
            Or Explore Now
          </span>
        </div>

        <button
          type="button"
          onClick={handleGuest}
          className="w-full py-3 px-4 rounded-2xl bg-secondary/60 hover:bg-secondary text-foreground text-xs font-semibold border border-border transition-colors flex items-center justify-center gap-2 active:scale-95"
        >
          <User className="w-3.5 h-3.5 text-primary" />
          <span>Continue as Guest</span>
        </button>
      </div>

      {/* Trust Footer */}
      <div className="pb-4 text-center">
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Houston's #1 Live Music Agency Since 1993</span>
        </div>
      </div>
    </div>
  );
};
