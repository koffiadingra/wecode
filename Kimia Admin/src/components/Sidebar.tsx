import React from 'react';
import { Users, Sparkles, TrendingUp, Menu, X, LogOut } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
  isMobileOpen: boolean;
  onMobileToggle: () => void;
  onLogout?: () => void;
}

const navItems = [
  { id: 'users', label: 'Users Management', icon: Users },
  { id: 'meditation', label: 'Meditation', icon: Sparkles },
  { id: 'progression', label: 'Progression', icon: TrendingUp }
];

export function Sidebar({ activePage, onPageChange, isMobileOpen, onMobileToggle, onLogout }: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[var(--bleu-nuit)] text-[var(--ocre-doux)] flex flex-col transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo & Close Button */}
        <div className="p-6 border-b border-[var(--sidebar-border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--terre-brique)] flex items-center justify-center">
              <Sparkles className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-white">KIMIA Admin</h1>
              <p className="text-xs opacity-70">Dashboard</p>
            </div>
          </div>
          
          <button
            onClick={onMobileToggle}
            className="lg:hidden text-[var(--ocre-doux)] hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  if (isMobileOpen) onMobileToggle();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-[var(--terre-brique)] text-white shadow-lg scale-105'
                    : 'text-[var(--ocre-doux)] hover:bg-[var(--bleu-nuit-light)] hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        {/* Footer */}
        <div className="p-6 border-t border-[var(--sidebar-border)]">
          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--ocre-doux)] hover:bg-[var(--bleu-nuit-light)] hover:text-white transition-all duration-300 mb-4"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          )}
          <div className="bg-[var(--bleu-nuit-light)] rounded-xl p-4">
            <p className="text-sm opacity-80">Need help?</p>
            <p className="text-xs opacity-60 mt-1">Contact support for assistance</p>
          </div>
        </div>
      </aside>
    </>
  );
}