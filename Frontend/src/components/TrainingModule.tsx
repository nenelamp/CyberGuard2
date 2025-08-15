import React, { useState, useEffect } from 'react';
import { Award, Clock, CheckCircle, PlayCircle } from 'lucide-react';
import PhishingAwarenessModule from './training/PhishingAwarenessModule';
import PasswordSecurityModule from './training/PasswordSecurityModule';
import SocialEngineeringModule from './training/SocialEngineeringModule';
import MFAModule from './training/MFAModule';
import RansomwareModule from './training/RansomwareModule';
import DataPrivacyModule from './training/DataPrivacyModule';

interface TrainingModuleProps {
  onNavigate: (view: string) => void;
  userId: string;
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

const TrainingModule: React.FC<TrainingModuleProps> = ({ onNavigate, userId }) => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [userDashboard, setUserDashboard] = useState<UserDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = 'https://securemind-backend.onrender.com/api/training';

  const trainingModules = [
    {
      id: 'phishing',
      title: 'Phishing Awareness',
      description: 'Learn to identify and avoid phishing attacks',
      duration: '4 minutes',
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop',
    },
    {
      id: 'password',
      title: 'Password Security',
      description: 'Master the art of creating and managing secure passwords',
      duration: '4 minutes',
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop',
    },
    {
      id: 'social-engineering',
      title: 'Social Engineering',
      description: 'Recognize and defend against human-based attacks',
      duration: '5 minutes',
      difficulty: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop',
    },
    {
      id: 'mfa',
      title: 'Multi-Factor Authentication',
      description: 'Understand and implement additional security layers',
      duration: '3 minutes',
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=300&h=200&fit=crop',
    },
    {
      id: 'ransomware',
      title: 'Ransomware Protection',
      description: 'Defend against digital extortion and malware',
      duration: '4 minutes',
      difficulty: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=200&fit=crop',
    },
    {
      id: 'data-privacy',
      title: 'Data Privacy Laws',
      description: 'Navigate compliance requirements and regulations',
      duration: '6 minutes',
      difficulty: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=200&fit=crop',
    }
  ];

  // Fetch user dashboard data
  const fetchUserDashboard = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch dashboard');
      
      const data = await response.json();
      setUserDashboard(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load training data');
    } finally {
      setLoading(false);
    }
  };

  // Create or update training progress
  const updateTrainingProgress = async (moduleId: string, progress: {
    completion_status: string;
    score?: number;
    max_score?: number;
    completion_percentage?: number;
    time_spent_seconds?: number;
    answers?: Record<string, any>;
    started_at?: string;
    completed_at?: string;
  }) => {
    try {
      const module = trainingModules.find(m => m.id === moduleId);
      if (!module) return;

      const token = localStorage.getItem('access_token');

      const response = await fetch(`${API_BASE_URL}/progress/module/${moduleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...progress,
          updated_at: new Date().toISOString()
        }),
      });

      if (!response.ok) throw new Error('Failed to update progress');
      
      // Refresh dashboard
      await fetchUserDashboard();
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  // Create initial training progress
  const createTrainingProgress = async (moduleId: string) => {
    try {
      const module = trainingModules.find(m => m.id === moduleId);
      if (!module) return;

      const token = localStorage.getItem('access_token');

      const response = await fetch(`${API_BASE_URL}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          module_id: moduleId,
          module_title: module.title
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create progress');
      }
      
      // Refresh dashboard
      await fetchUserDashboard();
    } catch (err) {
      console.error('Error creating progress:', err);
      throw err;
    }
  };

  // Submit training score
  const submitTrainingScore = async (moduleId: string, score: number, maxScore: number, answers: Record<string, any>) => {
    try {
      const module = trainingModules.find(m => m.id === moduleId);
      if (!module) return;

      const token = localStorage.getItem('access_token');

      const response = await fetch(`${API_BASE_URL}/scores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: userId,
          module_id: moduleId,
          module_title: module.title,
          score,
          max_score: maxScore,
          answers
        }),
      });

      if (!response.ok) throw new Error('Failed to submit score');
      
      // Update progress to completed
      await updateTrainingProgress(moduleId, {
        completion_status: 'completed',
        score,
        max_score: maxScore,
        completion_percentage: 100,
        completed_at: new Date().toISOString()
      });
    } catch (err) {
      console.error('Error submitting score:', err);
    }
  };

  useEffect(() => {
    fetchUserDashboard();
  }, [userId]);

  const handleModuleStart = async (moduleId: string) => {
    const existingProgress = userDashboard?.all_modules.find(
      m => m.module_id === moduleId
    );

    if (!existingProgress) {
      await createTrainingProgress(moduleId);
    } else if (existingProgress.completion_status === 'not_started') {
      await updateTrainingProgress(moduleId, {
        completion_status: 'in_progress',
        started_at: new Date().toISOString()
      });
    }

    setSelectedModule(moduleId);
  };

  const handleModuleComplete = async (moduleId: string, score: number = 100, maxScore: number = 100, answers: Record<string, any> = {}) => {
    await submitTrainingScore(moduleId, score, maxScore, answers);
    setSelectedModule(null);
  };

  const handleModuleExit = () => {
    setSelectedModule(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleProgress = (moduleId: string) => {
    return userDashboard?.all_modules.find(m => m.module_id === moduleId);
  };

  const renderSelectedModule = () => {
    const handleModuleCompleteWrapper = (score: number = 0, maxScore: number = 0) => {
      if (selectedModule) {
        const defaultAnswers = {};
        handleModuleComplete(selectedModule, score, maxScore, defaultAnswers);
      }
    };

    const moduleProps = {
      onComplete: handleModuleCompleteWrapper,
      onExit: handleModuleExit
    };

    switch (selectedModule) {
      case 'phishing':
        return <PhishingAwarenessModule {...moduleProps} />;
      case 'password':
        return <PasswordSecurityModule {...moduleProps} />;
      case 'social-engineering':
        return <SocialEngineeringModule {...moduleProps} />;
      case 'mfa':
        return <MFAModule {...moduleProps} />;
      case 'ransomware':
        return <RansomwareModule {...moduleProps} />;
      case 'data-privacy':
        return <DataPrivacyModule {...moduleProps} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your training progress...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={fetchUserDashboard} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (selectedModule) {
    return renderSelectedModule();
  }

  const allCompleted = userDashboard?.summary.completed_modules === trainingModules.length;

  if (allCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-elevated p-12 text-center">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Award className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Security Expert Achieved!</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Congratulations! You've completed all cybersecurity training modules with an average score of {userDashboard?.summary?.average_score ?? 0}%.
            </p>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-8 mb-8">
              <h3 className="font-bold text-blue-900 mb-6 text-xl">Your Achievements:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {trainingModules.map((module) => {
                  const progress = getModuleProgress(module.id);
                  return (
                    <div key={module.id} className="text-center">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2 ${
                        progress?.completion_status === 'completed' 
                          ? 'bg-green-100' 
                          : 'bg-gray-100'
                      }`}>
                        {progress?.completion_status === 'completed' ? (
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        ) : (
                          <Clock className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <p className="text-sm font-medium text-blue-800">{module.title}</p>
                      {progress?.score && (
                        <p className="text-xs text-green-600">{progress.score}/{progress.max_score}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => onNavigate('employee')}
                className="btn-primary text-lg"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredRecentScores = userDashboard?.recent_scores
    ? Object.values(
        userDashboard.recent_scores
          .reduce((acc, score) => {
            const trimmedTitle = score.module_title.trim();
            if (!acc[trimmedTitle]) {
              acc[trimmedTitle] = score;
            } else {
              if (acc[trimmedTitle].max_score === 0 && score.max_score > 0) {
                acc[trimmedTitle] = score;
              } else if (acc[trimmedTitle].max_score === 0 && score.max_score === 0) {
                if (new Date(score.submitted_at) > new Date(acc[trimmedTitle].submitted_at)) {
                  acc[trimmedTitle] = score;
                }
              } else if (new Date(score.submitted_at) > new Date(acc[trimmedTitle].submitted_at)) {
                acc[trimmedTitle] = score;
              }
            }
            return acc;
          }, {} as Record<string, typeof userDashboard.recent_scores[0]>)
      )
          .filter(score => {
            const exclude = score.max_score === 0 || (score.module_title.includes(':') && score.max_score === 0);
            return !exclude;
          })
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">Security Training Center</h1>
                  <p className="text-green-100 text-lg mb-4">Build your cybersecurity knowledge with interactive training modules</p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-yellow-300" />
              <span className="font-medium">
                {userDashboard?.summary?.completed_modules ?? 0}/{trainingModules.length} modules completed
              </span>
            </div>
            {userDashboard?.summary?.average_score && userDashboard.summary.average_score > 0 && (
              <div className="flex items-center">
                <span className="font-medium">Avg Score: {userDashboard.summary.average_score}%</span>
              </div>
            )}
          </div>
                </div>
                <button
                  onClick={() => onNavigate('employee')}
                  className="btn-secondary bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Training Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainingModules.map((module) => {
            const progress = getModuleProgress(module.id);
            const isCompleted = progress?.completion_status === 'completed';
            const isInProgress = progress?.completion_status === 'in_progress';
            
            return (
              <div key={module.id} className="card-elevated overflow-hidden group hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <img 
                    src={module.thumbnail} 
                    alt={module.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  {isCompleted && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-xl shadow-lg">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  )}
                  {isInProgress && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-white p-2 rounded-xl shadow-lg">
                      <PlayCircle className="h-5 w-5" />
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                    <span className={`px-3 py-1 rounded-xl text-sm font-bold ${getDifficultyColor(module.difficulty)}`}>
                      {module.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{module.description}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-gray-500 font-medium">{module.duration}</span>
                    {progress && (
                      <span className={`text-sm font-bold flex items-center ${
                        isCompleted ? 'text-green-600' : isInProgress ? 'text-yellow-600' : 'text-gray-600'
                      }`}>
                        {isCompleted ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Completed
                          </>
                        ) : isInProgress ? (
                          <>
                            <PlayCircle className="h-4 w-4 mr-1" />
                            In Progress
                          </>
                        ) : (
                          'Not Started'
                        )}
                      </span>
                    )}
                  </div>

                  {progress && progress.completion_percentage > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{progress.completion_percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${progress.completion_percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => handleModuleStart(module.id)}
                    className={`w-full py-3 px-6 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                      isCompleted 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : isInProgress
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'btn-primary'
                    }`}
                  >
                    {isCompleted ? 'Review Module' : isInProgress ? 'Continue Training' : 'Start Training'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Summary */}
        <div className="mt-12 card-elevated p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h3>
          <div className="progress-modern h-6 mb-4">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${((userDashboard?.summary.completed_modules || 0) / trainingModules.length) * 100}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{userDashboard?.summary.completed_modules || 0}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{userDashboard?.summary.in_progress_modules || 0}</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{userDashboard?.summary.not_started_modules || 0}</p>
              <p className="text-sm text-gray-600">Not Started</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{userDashboard?.summary.average_score || 0}%</p>
              <p className="text-sm text-gray-600">Average Score</p>
            </div>
          </div>
        </div>

        {/* Recent Scores */}
        {filteredRecentScores && filteredRecentScores.length > 0 && (
          <div className="mt-8 card-elevated p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Scores</h3>
            <div className="space-y-4">
              {filteredRecentScores
                .slice(0, 6)
                .map((score) => (
                <div key={score.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">{score.module_title}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(score.submitted_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{score.percentage}%</p>
                    <p className="text-sm text-green-600">
                      {score.max_score === 0 ? 'N/A' : `${score.score}/${score.max_score}`}
                    </p>
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

export default TrainingModule;
