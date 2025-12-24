import React, { useState } from 'react';
import { Search, Bell, Menu, Moon, Sun, LogOut } from 'lucide-react';
import { NaturalInput } from './NaturalInput';

interface TopbarProps {
  onMobileMenuToggle: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  onLogout?: () => void;
}

export function Topbar({ onMobileMenuToggle, isDarkMode, onThemeToggle, onLogout }: TopbarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  
  const notifications = [
    { id: 1, text: 'New user registered', time: '5 min ago', unread: true },
    { id: 2, text: 'Meditation session completed', time: '15 min ago', unread: true },
    { id: 3, text: 'Weekly report is ready', time: '1 hour ago', unread: false }
  ];
  
  const unreadCount = notifications.filter(n => n.unread).length;
  
  return (
    <header className="sticky top-0 z-30 bg-card border-b border-border px-4 lg:px-6 py-4">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] hover:text-[var(--terre-brique)] transition-colors"
        >
          <Menu size={24} />
        </button>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <NaturalInput
            type="search"
            placeholder="Search users, meditations, or sessions..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            icon={<Search size={20} />}
            className="w-full"
          />
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-xl text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] hover:bg-[var(--ocre-doux)] dark:hover:bg-[var(--bleu-nuit-light)] transition-all duration-300 hover:scale-110"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] hover:bg-[var(--ocre-doux)] dark:hover:bg-[var(--bleu-nuit-light)] transition-all duration-300 hover:scale-110"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--terre-brique)] rounded-full" />
              )}
            </button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-card rounded-2xl shadow-xl border border-border z-50 animate-slide-up">
                  <div className="p-4 border-b border-border">
                    <h3 className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-border hover:bg-[var(--ocre-doux)] dark:hover:bg-[var(--bleu-nuit-light)] transition-colors cursor-pointer ${
                          notification.unread ? 'bg-[var(--ocre-doux)] bg-opacity-50' : ''
                        }`}
                      >
                        <p className="text-sm text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">
                          {notification.text}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-border">
                    <button className="text-sm text-[var(--terre-brique)] hover:underline">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* User Avatar */}
          <div className="relative group">
            <button className="flex items-center gap-3 p-1 rounded-xl hover:bg-[var(--ocre-doux)] dark:hover:bg-[var(--bleu-nuit-light)] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--terre-brique)] to-[var(--vert-feuille)] flex items-center justify-center text-white overflow-hidden">
                <span>AD</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">Admin User</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </button>
            {onLogout && (
              <div className="absolute right-0 top-10 w-40 bg-card rounded-2xl shadow-xl border border-border z-50 animate-slide-up">
                <div className="p-3 text-center">
                  <button
                    className="text-sm text-[var(--terre-brique)] hover:underline"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}