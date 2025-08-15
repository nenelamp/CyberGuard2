import React, { useState, useEffect } from 'react';
import { Trophy, Target, BookOpen, Clock, Award, TrendingUp, Calendar, CheckCircle, AlertTriangle, Play, Zap, Star, ChevronRight, Users, Shield } from 'lucide-react';

interface EmployeeDashboardProps {
  onNavigate: (view: string) => void;
}

interface TrainingProgress {
  id: string;
  module_id: string;
  module_title: string;
  completion_status: 'not_started' | 'in_progress' | 'completed';
  score?: number;
  max_score?: number;
  completion_percentage: number;
  time_spent_seconds: number;
  started_at?: string;
  completed_at?: string;
  updated_at: string;
}

interface TrainingScore {
  id: string;
  module_title: string;
  score: number;
  max_score: number;
  percentage: number;
  submitted_at: string;
}

interface UserDashboard {
  user_id: string;
  summary: {
    total_modules: number;
    completed_modules: number;
    in_progress_modules: number;
    not_started_modules: number;
    average_score: number;
    total_time_spent: number;
    last_activity?: string;
  };
  recent_scores: TrainingScore[];
  all_modules: TrainingProgress[];
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  department: string;
  avatar: string;
  isCurrentUser: boolean;
}

const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);
  const [leaderboard, setLeaderboard] = useState<Array<LeaderboardEntry>>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState<string | null>(null);
  const [userDashboard, setUserDashboard] = useState<UserDashboard | null>(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
  

  useEffect(() => {
    setIsVisible(true);
    fetchUserDashboard();
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserEmail) {
      fetchLeaderboard();
    }
  }, [currentUserEmail]);

  useEffect(() => {
    if (activeTab === 'leaderboard') {
      fetchLeaderboard();
    }
  }, [activeTab]);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUserEmail(payload.sub || '');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const fetchUserDashboard = async () => {
    setLoadingDashboard(true);
    setDashboardError(null);
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('https://securemind-backend.onrender.com/api/training/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard');
      }
      const data = await response.json();
      setUserDashboard(data);
    } catch (error: any) {
      setDashboardError(error.message || 'Error fetching dashboard');
    } finally {
      setLoadingDashboard(false);
    }
  };

  const fetchLeaderboard = async () => {
    setLoadingLeaderboard(true);
    setLeaderboardError(null);
    try {
      const response = await fetch('http://localhost:8000/api/training/leaderboard');
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      const data = await response.json();
      
      // Sort data by score in descending order to get correct ranking
      const sortedData = [...data].sort((a, b) => b.average_percentage - a.average_percentage);
      
      // Map backend data to frontend leaderboard format with correct ranks
      const mappedData = sortedData.map((entry: any, index: number) => ({
        rank: index + 1, // This will be the correct rank based on sorted position
        name: entry.user_id.split('@')[0], // Show username instead of email
        score: entry.average_percentage,
        department: 'Security Team', // Default department
        avatar: `https://ui-avatars.com/api/?name=${entry.user_id}&background=random&size=40`,
        isCurrentUser: entry.user_id === currentUserEmail
      }));
      
      setLeaderboard(mappedData);
    } catch (error: any) {
      console.error('Error fetching leaderboard:', error);
      setLeaderboardError(error.message || 'Error fetching leaderboard');
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  // Calculate security score based on training performance
  const calculateSecurityScore = () => {
    if (!userDashboard) return 0;
    const { completed_modules, total_modules, average_score } = userDashboard.summary;
    if (total_modules === 0) return 0;
    
    const completionRate = (completed_modules / total_modules) * 100;
    const scoreContribution = average_score * 0.7;
    const completionContribution = completionRate * 0.3;
    
    return Math.round(scoreContribution + completionContribution);
  };

  // Get recent activities from training scores
  const getRecentActivities = () => {
    if (!userDashboard) return [];
    
    return userDashboard.recent_scores.slice(0, 4).map(score => ({
      type: 'training' as const,
      title: score.module_title,
      completed: true,
      date: new Date(score.submitted_at).toLocaleDateString(),
      points: Math.round(score.percentage)
    }));
  };

  // Get upcoming training from not started modules
  const getUpcomingTraining = () => {
    if (!userDashboard) return [];
    
    const notStartedModules = userDashboard.all_modules.filter(
      m => m.completion_status === 'not_started'
    ).slice(0, 3);

    const trainingModules = [
      { 
        title: 'Ransomware Awareness', 
        duration: '3 min', 
        dueDate: 'Due in 2 days', 
        priority: 'high' as const,
        progress: 0,
        thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=200&fit=crop'
      },
      { 
        title: 'Social Engineering Tactics', 
        duration: '4 min', 
        dueDate: 'Due in 1 week', 
        priority: 'medium' as const,
        progress: 0,
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop'
      },
      { 
        title: 'Remote Work Security', 
        duration: '5 min', 
        dueDate: 'Due in 2 weeks', 
        priority: 'low' as const,
        progress: 0,
        thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop'
      }
    ];

    // Map actual not started modules to training modules
    return notStartedModules.map((module, index) => ({
      ...trainingModules[index % trainingModules.length],
      title: module.module_title,
      progress: module.completion_percentage || 0
    }));
  };

  // Get badges based on training achievements
  const getBadges = () => {
    if (!userDashboard) return [];
    
    const completedCount = userDashboard.summary.completed_modules;
    
    return [
      { name: 'Phishing Detective', icon: '🕵️', earned: completedCount >= 1, description: 'Completed first training module', rarity: 'common' },
      { name: 'Security Champion', icon: '🏆', earned: completedCount >= 5, description: 'Completed 5+ training modules', rarity: 'rare' },
      { name: 'Password Pro', icon: '🔐', earned: completedCount >= 3, description: 'Mastered password security', rarity: 'common' },
      { name: 'MFA Master', icon: '🛡️', earned: completedCount >= 4, description: 'Complete MFA training', rarity: 'epic' },
      { name: 'Compliance Expert', icon: '📋', earned: completedCount >= 6, description: 'Pass all compliance modules', rarity: 'legendary' }
    ];
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-500';
      case 'epic': return 'from-purple-400 to-purple-500';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  if (loadingDashboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (dashboardError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{dashboardError}</p>
          <button onClick={fetchUserDashboard} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

const securityScore = calculateSecurityScore();
const recentActivities = getRecentActivities();
const upcomingTraining = getUpcomingTraining();
const badges = getBadges();
  const userRank = userDashboard && leaderboard.length > 0
    ? leaderboard.find(entry => entry.isCurrentUser)?.rank ?? leaderboard.length + 1
    : 0;
  const totalUsers = Math.max(leaderboard.length, 1);
  const currentUserLeaderboardScore = leaderboard.find(entry => entry.isCurrentUser)?.score ?? securityScore;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        {/* Welcome Header */}
<div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
    <div className="relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {currentUserEmail.split('@')[0]}! 👋</h1>
          <p className="text-blue-100 text-lg">Keep up the great work on your cybersecurity journey</p>
          <div className="flex items-center mt-4 space-x-6">
            <div className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-300" />
              <span className="font-medium">{userDashboard?.summary.completed_modules || 0} modules completed</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-300" />
              <span className="font-medium">Avg: {userDashboard?.summary.average_score || 0}%</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold mb-1">{leaderboard.find(entry => entry.isCurrentUser)?.score ?? securityScore}</div>
            <div className="text-sm text-blue-100">Security Score</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Quick Stats */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[{
            title: 'Security Score',
            value: currentUserLeaderboardScore,
            change: `${userDashboard?.summary.average_score || 0}% avg score`,
            icon: TrendingUp,
            color: 'from-emerald-500 to-green-500',
            bgColor: 'bg-emerald-50',
            progress: securityScore
          }, {
            title: 'Training Progress',
            value: `${userDashboard?.summary.completed_modules ?? 0}/6`,
            change: `${userDashboard?.summary.in_progress_modules ?? 0} in progress`,
            icon: BookOpen,
            color: 'from-blue-500 to-indigo-500',
            bgColor: 'bg-blue-50',
            progress: userDashboard?.summary.completed_modules && userDashboard.summary.completed_modules > 0 
              ? (userDashboard.summary.completed_modules / 6) * 100 
              : 0
          }, {
            title: 'Modules Completed',
            value: userDashboard?.summary.completed_modules ?? 0,
            change: `${userDashboard?.summary.not_started_modules ?? 0} remaining`,
            icon: CheckCircle,
            color: 'from-orange-500 to-red-500',
            bgColor: 'bg-orange-50',
            progress: userDashboard?.summary.total_modules && userDashboard.summary.total_modules > 0 
              ? (userDashboard.summary.completed_modules / userDashboard.summary.total_modules) * 100 
              : 0
          }, {
            title: 'Leaderboard Rank',
            value: `#${userRank}`,
            change: `of ${totalUsers} users`,
            icon: Trophy,
            color: 'from-purple-500 to-violet-500',
            bgColor: 'bg-purple-50',
            progress: totalUsers > 1 ? ((totalUsers - userRank) / (totalUsers - 1)) * 100 : 0
          }].map((stat, index) => {
            const Icon = stat.icon;
            return <div key={index} className={`card-elevated p-6 group hover:scale-105 transition-all duration-300 ${stat.bgColor} border-0`} style={{
              animationDelay: `${index * 100}ms`
            }}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-2xl shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.title}</div>
                  </div>
                </div>
                <div className="progress-modern mb-2">
                  <div className="progress-fill" style={{
                  width: `${stat.progress}%`
                }}></div>
                </div>
                <p className="text-sm text-gray-600">{stat.change}</p>
              </div>;
          })}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 p-2">
          <nav className="flex space-x-2">
            {[{
              id: 'overview',
              label: 'Overview',
              icon: Shield
            }, {
              id: 'training',
              label: 'Training',
              icon: BookOpen
            }, {
              id: 'badges',
              label: 'Badges',
              icon: Award
            }, {
              id: 'leaderboard',
              label: 'Leaderboard',
              icon: Trophy
            }].map(tab => {
              const Icon = tab.icon;
              return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${activeTab === tab.id ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>;
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="card-elevated p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivities.length > 0 ? recentActivities.map((activity, index) => <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className={`p-3 rounded-xl ${activity.type === 'training' ? 'bg-blue-100' : 'bg-orange-100'}`}>
                      {activity.type === 'training' && <BookOpen className="h-5 w-5 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {activity.points && <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg text-xs font-medium">
                          +{activity.points} pts
                        </span>}
                      {activity.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {!activity.completed && <Clock className="h-5 w-5 text-orange-500" />}
                    </div>
                  </div>) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No recent activities yet. Start your training journey!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Training */}
            <div className="card-elevated p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Upcoming Training
              </h3>
              <div className="space-y-4">
                {upcomingTraining.length > 0 ? upcomingTraining.map((training, index) => <div key={index} className="group border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
                    <div className="flex items-start space-x-4">
                      <img src={training.thumbnail} alt={training.title} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{training.title}</h4>
                          <span className={`px-2 py-1 text-xs rounded-lg font-medium ${training.priority === 'high' ? 'bg-red-100 text-red-800' : training.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                            {training.priority === 'high' ? 'High Priority' : training.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                          <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{training.duration}</span>
                          <span>{training.dueDate}</span>
                        </div>
                        {training.progress > 0 && <div className="progress-modern mb-3">
                            <div className="progress-fill" style={{ width: `${training.progress}%` }}></div>
                          </div>}
                        <button onClick={() => onNavigate('training')} className="w-full btn-primary flex items-center justify-center">
                          <Play className="h-4 w-4 mr-2" />
                          {training.progress > 0 ? 'Continue' : 'Start Training'}
                        </button>
                      </div>
                    </div>
                  </div>) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No upcoming training. Great job completing all modules!</p>
                  </div>
                )}
              </div>
            </div>
          </div>}

        {activeTab === 'training' && <div className="card-elevated p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Your Training Path</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userDashboard?.all_modules.map((module, index) => {
                const thumbnails = [
                  'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop',
                  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop',
                  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
                  'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=300&h=200&fit=crop',
                  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=200&fit=crop',
                  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=200&fit=crop'
                ];
                
                return (
                  <div key={index} className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-300">
                    <img src={thumbnails[index % thumbnails.length]} alt={module.module_title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{module.module_title}</h4>
                        {module.completion_status === 'completed' && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </div>
                      <div className="progress-modern mb-3">
                        <div className="progress-fill" style={{ width: `${module.completion_percentage}%` }}></div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">{Math.round(module.time_spent_seconds / 60)} min</span>
                        <span className="text-sm font-medium text-blue-600">{module.completion_percentage}% complete</span>
                      </div>
                      <button onClick={() => onNavigate('training')} className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 ${module.completion_status === 'completed' ? 'btn-secondary' : 'btn-primary'}`}>
                        {module.completion_status === 'completed' ? 'Review' : 'Continue'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>}

        {activeTab === 'badges' && <div className="card-elevated p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Achievement Badges</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge, index) => <div key={index} className={`border rounded-2xl p-6 text-center transition-all duration-300 ${badge.earned ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transform hover:scale-105' : 'border-gray-200 bg-gray-50 opacity-60'}`}>
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${getRarityColor(badge.rarity)} flex items-center justify-center text-2xl shadow-lg`}>
                    {badge.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{badge.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' : badge.rarity === 'epic' ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-white' : badge.rarity === 'rare' ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white' : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'}`}>
                    {badge.rarity.toUpperCase()}
                  </span>
                  {badge.earned ? <div className="mt-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Earned
                      </span>
                    </div> : <div className="mt-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        <Clock className="h-3 w-3 mr-1" />
                        In Progress
                      </span>
                    </div>}
                </div>)}
            </div>
          </div>}

        {activeTab === 'leaderboard' && (
          <div className="card-elevated p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
              Security Champions Leaderboard
            </h3>
            <div className="space-y-4">
              {leaderboard.map((user, index) => (
                <div key={index} className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 hover:shadow-lg ${user.isCurrentUser ? 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 ring-2 ring-blue-500 ring-opacity-20' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${user.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg' : user.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 shadow-lg' : user.rank === 3 ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg' : 'bg-gray-100 text-gray-600'}`}>
                      {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : user.rank}
                    </div>
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-md" />
                    <div>
                      <p className={`font-semibold ${user.isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                        {user.name}
                        {user.isCurrentUser && <span className="ml-2 text-blue-600">(You)</span>}
                      </p>
                      <p className="text-sm text-gray-600">{user.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{user.score}</p>
                    <p className="text-sm text-gray-600">Security Score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
