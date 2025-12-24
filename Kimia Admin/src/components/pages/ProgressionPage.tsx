import React, { useState, useEffect } from 'react';
import { Calendar, Filter, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { NaturalCard, NaturalCardHeader, NaturalCardTitle, NaturalCardContent } from '../NaturalCard';
import { NaturalSelect } from '../NaturalInput';
import { NaturalTag } from '../NaturalTag';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ProgressionEntry {
  id: number;
  userId: number;
  userName: string;
  meditationId: number;
  meditationTitle: string;
  date: string;
  duration: number;
  completed: boolean;
}

const mockProgressions: ProgressionEntry[] = [
  { id: 1, userId: 1, userName: 'Sophie Martin', meditationId: 1, meditationTitle: 'Morning Awakening', date: '2024-01-15', duration: 15, completed: true },
  { id: 2, userId: 2, userName: 'Lucas Bernard', meditationId: 2, meditationTitle: 'Deep Sleep Journey', date: '2024-01-14', duration: 28, completed: false },
  { id: 3, userId: 3, userName: 'Emma Dubois', meditationId: 3, meditationTitle: 'Stress Relief', date: '2024-01-16', duration: 10, completed: true },
  { id: 4, userId: 1, userName: 'Sophie Martin', meditationId: 4, meditationTitle: 'Focus & Concentration', date: '2024-01-16', duration: 20, completed: true },
  { id: 5, userId: 4, userName: 'Thomas Petit', meditationId: 1, meditationTitle: 'Morning Awakening', date: '2024-01-13', duration: 12, completed: false },
  { id: 6, userId: 5, userName: 'Julie Moreau', meditationId: 5, meditationTitle: 'Loving Kindness', date: '2024-01-15', duration: 15, completed: true },
  { id: 7, userId: 3, userName: 'Emma Dubois', meditationId: 6, meditationTitle: 'Body Scan Relaxation', date: '2024-01-15', duration: 25, completed: true },
  { id: 8, userId: 2, userName: 'Lucas Bernard', meditationId: 3, meditationTitle: 'Stress Relief', date: '2024-01-16', duration: 10, completed: true },
  { id: 9, userId: 5, userName: 'Julie Moreau', meditationId: 2, meditationTitle: 'Deep Sleep Journey', date: '2024-01-14', duration: 30, completed: true },
  { id: 10, userId: 1, userName: 'Sophie Martin', meditationId: 6, meditationTitle: 'Body Scan Relaxation', date: '2024-01-14', duration: 22, completed: false }
];

// Generate chart data
const weeklyData = [
  { day: 'Mon', sessions: 12, minutes: 180 },
  { day: 'Tue', sessions: 15, minutes: 225 },
  { day: 'Wed', sessions: 18, minutes: 270 },
  { day: 'Thu', sessions: 14, minutes: 210 },
  { day: 'Fri', sessions: 20, minutes: 300 },
  { day: 'Sat', sessions: 25, minutes: 375 },
  { day: 'Sun', sessions: 22, minutes: 330 }
];

const categoryData = [
  { name: 'Mindfulness', value: 35, color: '#6B9B7C' },
  { name: 'Sleep', value: 25, color: '#C85A3C' },
  { name: 'Relaxation', value: 20, color: '#E8A05D' },
  { name: 'Productivity', value: 12, color: '#8B7B6B' },
  { name: 'Compassion', value: 8, color: '#9DACA1' }
];

export function ProgressionPage() {
  const [progressions, setProgressions] = useState<ProgressionEntry[]>(mockProgressions);
  const [filterUser, setFilterUser] = useState('all');
  const [filterCompleted, setFilterCompleted] = useState('all');
  const [totalSessions, setTotalSessions] = useState(0);
  const [avgDuration, setAvgDuration] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);
  
  // Animate counters
  useEffect(() => {
    const completed = progressions.filter(p => p.completed).length;
    const total = progressions.length;
    const avgDur = progressions.reduce((acc, p) => acc + p.duration, 0) / total;
    const rate = (completed / total) * 100;
    
    let sessionCounter = 0;
    let durationCounter = 0;
    let rateCounter = 0;
    
    const interval = setInterval(() => {
      if (sessionCounter < total) {
        sessionCounter += 1;
        setTotalSessions(sessionCounter);
      }
      if (durationCounter < avgDur) {
        durationCounter += 0.5;
        setAvgDuration(Math.min(durationCounter, avgDur));
      }
      if (rateCounter < rate) {
        rateCounter += 2;
        setCompletionRate(Math.min(rateCounter, rate));
      }
      
      if (sessionCounter >= total && durationCounter >= avgDur && rateCounter >= rate) {
        clearInterval(interval);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [progressions]);
  
  // Filter progressions
  const filteredProgressions = progressions.filter(progression => {
    const matchesUser = filterUser === 'all' || progression.userId.toString() === filterUser;
    const matchesCompleted = filterCompleted === 'all' || 
      (filterCompleted === 'completed' && progression.completed) ||
      (filterCompleted === 'incomplete' && !progression.completed);
    return matchesUser && matchesCompleted;
  });
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] mb-2">Progression Tracking</h1>
          <p className="text-muted-foreground">Monitor user meditation progress and analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="text-[var(--terre-brique)]" size={20} />
          <span className="text-sm text-muted-foreground">Last 7 days</span>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NaturalCard className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Sessions</p>
              <h1 className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">{Math.round(totalSessions)}</h1>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp className="text-[var(--vert-feuille)]" size={16} />
                <span className="text-sm text-[var(--vert-feuille)]">+12% this week</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--vert-feuille)] to-[var(--vert-feuille-light)] flex items-center justify-center shadow-lg">
              <CheckCircle className="text-white" size={28} />
            </div>
          </div>
        </NaturalCard>
        
        <NaturalCard className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg. Duration</p>
              <h1 className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">{Math.round(avgDuration)} min</h1>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="text-[var(--terre-brique)]" size={16} />
                <span className="text-sm text-[var(--terre-brique)]">+5 min avg</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--terre-brique)] to-[var(--terre-brique-hover)] flex items-center justify-center shadow-lg">
              <Clock className="text-white" size={28} />
            </div>
          </div>
        </NaturalCard>
        
        <NaturalCard className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Completion Rate</p>
              <h1 className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">{Math.round(completionRate)}%</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-2 bg-[var(--ocre-doux)] dark:bg-[var(--bleu-nuit-light)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--vert-feuille)] rounded-full transition-all duration-1000"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--ocre-doux)] to-[var(--ocre-doux-dark)] flex items-center justify-center shadow-lg">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </NaturalCard>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart - Weekly Sessions */}
        <NaturalCard className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <NaturalCardHeader>
            <NaturalCardTitle>Weekly Activity</NaturalCardTitle>
            <p className="text-sm text-muted-foreground mt-1">Sessions and minutes over the past week</p>
          </NaturalCardHeader>
          <NaturalCardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="var(--terre-brique)"
                  strokeWidth={3}
                  dot={{ fill: 'var(--terre-brique)', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </NaturalCardContent>
        </NaturalCard>
        
        {/* Pie Chart - Category Distribution */}
        <NaturalCard className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <NaturalCardHeader>
            <NaturalCardTitle>Category Distribution</NaturalCardTitle>
            <p className="text-sm text-muted-foreground mt-1">Popular meditation categories</p>
          </NaturalCardHeader>
          <NaturalCardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </NaturalCardContent>
        </NaturalCard>
      </div>
      
      {/* Bar Chart - Minutes per Day */}
      <NaturalCard className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <NaturalCardHeader>
          <NaturalCardTitle>Daily Meditation Minutes</NaturalCardTitle>
          <p className="text-sm text-muted-foreground mt-1">Total minutes spent meditating each day</p>
        </NaturalCardHeader>
        <NaturalCardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '12px'
                }}
              />
              <Bar dataKey="minutes" fill="var(--vert-feuille)" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </NaturalCardContent>
      </NaturalCard>
      
      {/* Filters */}
      <NaturalCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NaturalSelect
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            label="Filter by User"
          >
            <option value="all">All Users</option>
            <option value="1">Sophie Martin</option>
            <option value="2">Lucas Bernard</option>
            <option value="3">Emma Dubois</option>
            <option value="4">Thomas Petit</option>
            <option value="5">Julie Moreau</option>
          </NaturalSelect>
          
          <NaturalSelect
            value={filterCompleted}
            onChange={(e) => setFilterCompleted(e.target.value)}
            label="Filter by Status"
          >
            <option value="all">All Sessions</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </NaturalSelect>
        </div>
      </NaturalCard>
      
      {/* Sessions Table */}
      <NaturalCard>
        <NaturalCardHeader>
          <NaturalCardTitle>Recent Sessions</NaturalCardTitle>
        </NaturalCardHeader>
        <NaturalCardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm text-muted-foreground">User</th>
                  <th className="text-left py-4 px-4 text-sm text-muted-foreground">Meditation</th>
                  <th className="text-left py-4 px-4 text-sm text-muted-foreground">Date</th>
                  <th className="text-left py-4 px-4 text-sm text-muted-foreground">Duration</th>
                  <th className="text-left py-4 px-4 text-sm text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProgressions.map((progression, index) => (
                  <tr
                    key={progression.id}
                    className="border-b border-border hover:bg-[var(--ocre-doux)] dark:hover:bg-[var(--bleu-nuit-light)] transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--terre-brique)] to-[var(--vert-feuille)] flex items-center justify-center text-white">
                          {progression.userName.charAt(0)}
                        </div>
                        <span className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">
                          {progression.userName}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{progression.meditationTitle}</td>
                    <td className="py-4 px-4 text-muted-foreground">{progression.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-[var(--terre-brique)]" />
                        <span className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">
                          {progression.duration} min
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {progression.completed ? (
                        <NaturalTag variant="success" size="sm">
                          <CheckCircle size={14} />
                          Completed
                        </NaturalTag>
                      ) : (
                        <NaturalTag variant="primary" size="sm">
                          <XCircle size={14} />
                          Incomplete
                        </NaturalTag>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </NaturalCardContent>
      </NaturalCard>
    </div>
  );
}
