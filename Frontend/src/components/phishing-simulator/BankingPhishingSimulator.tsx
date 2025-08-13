import React, { useState } from 'react';
import { Clock, BookOpen, CheckCircle, XCircle, ArrowRight, ArrowLeft, Award, Mail, AlertTriangle, Eye, Shield, Target, Link, Building2, CreditCard, Lock } from 'lucide-react';

interface BankingPhishingSimulatorProps {
  onComplete: () => void;
  onExit: () => void;
}

const BankingPhishingSimulator: React.FC<BankingPhishingSimulatorProps> = ({ onComplete, onExit }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [showResults, setShowResults] = useState(false);

  const simulationContent = {
    title: 'Banking Phishing Simulation: Financial Security Test',
    duration: '6 minutes',
    slides: [
      {
        type: 'introduction',
        title: 'Banking Phishing Threats',
        content: 'Financial institutions are prime targets for phishing attacks. Cybercriminals use sophisticated tactics to steal banking credentials and financial information.',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2QjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJhbmtpbmcgU2VjdXJpdHkgSWxsdXN0cmF0aW9uPC90ZXh0Pgo8L3N2Zz4K',
        keyPoints: [
          'Banking phishing attacks increased 300% in 2023',
          'Average loss per banking phishing victim: $1,200',
          '85% of banking fraud starts with phishing emails'
        ]
      },
      {
        type: 'email-simulation',
        title: 'Suspicious Banking Email',
        content: 'You receive this email claiming to be from your bank. Analyze it carefully:',
        email: {
          from: 'security@chase-bank-secure.net',
          subject: 'URGENT: Your Chase account has been temporarily suspended',
          body: `Dear Valued Chase Customer,

We have detected suspicious activity on your Chase Bank account (ending in ****1234). For your security, your account has been temporarily suspended.

To restore access to your account immediately, please click the link below and verify your identity:

[VERIFY ACCOUNT NOW]

This is a time-sensitive matter. If you do not verify within 24 hours, your account will be permanently closed.

Thank you for your prompt attention to this matter.

Chase Bank Security Team
Customer Protection Department`,
          timestamp: '2:34 PM'
        },
        analysis: [
          { element: 'Sender Address', issue: 'Fake domain (chase-bank-secure.net)', severity: 'high' },
          { element: 'Subject Line', issue: 'Creates false urgency', severity: 'high' },
          { element: 'Greeting', issue: 'Generic "Valued Customer"', severity: 'medium' },
          { element: 'Account Number', issue: 'Shows partial account info to seem legitimate', severity: 'medium' },
          { element: 'Call to Action', issue: 'Demands immediate action', severity: 'high' },
          { element: 'Threat', issue: 'Threatens account closure', severity: 'high' }
        ]
      },
      {
        type: 'interactive',
        title: 'What Would You Do?',
        content: 'You receive the email above. How do you respond?',
        choices: [
          {
            text: 'Click the link immediately to restore my account access',
            outcome: 'DANGEROUS! This would lead to a fake login page designed to steal your credentials.',
            correct: false,
            risk: 'high'
          },
          {
            text: 'Call the phone number in the email to verify the situation',
            outcome: 'Risky - phone numbers in phishing emails are often fake or controlled by scammers.',
            correct: false,
            risk: 'medium'
          },
          {
            text: 'Log into my Chase account directly through chase.com to check',
            outcome: 'EXCELLENT! Always access your accounts through official websites, never through email links.',
            correct: true,
            risk: 'none'
          },
          {
            text: 'Forward the email to Chase\'s security team',
            outcome: 'Good intention, but better to report through official channels on chase.com.',
            correct: false,
            risk: 'low'
          }
        ]
      },
      {
        type: 'quiz',
        title: 'Banking Security Knowledge',
        question: 'Your bank sends you an email about a suspicious transaction. What\'s the safest way to respond?',
        options: [
          'Click the "Review Transaction" link in the email',
          'Reply to the email with your account details',
          'Call the number provided in the email',
          'Log into your account directly through the bank\'s official website'
        ],
        correct: 3,
        explanation: 'Always access your banking accounts directly through the official website or mobile app. Never use links from emails, even if they look legitimate.'
      },
      {
        type: 'tips',
        title: 'Banking Security Best Practices',
        content: 'Protect your financial accounts with these essential security measures:',
        tips: [
          {
            category: 'Email Security',
            practices: [
              'Never click links in banking emails',
              'Check sender addresses carefully',
              'Be suspicious of urgent requests',
              'Report suspicious emails to your bank'
            ]
          },
          {
            category: 'Account Access',
            practices: [
              'Use official banking apps and websites',
              'Enable two-factor authentication',
              'Use strong, unique passwords',
              'Monitor account activity regularly'
            ]
          },
          {
            category: 'Phone Security',
            practices: [
              'Never give personal info to callers',
              'Call back using official numbers',
              'Be wary of caller ID spoofing',
              'Hang up on suspicious calls'
            ]
          },
          {
            category: 'General Protection',
            practices: [
              'Keep banking apps updated',
              'Use secure Wi-Fi networks',
              'Enable account alerts',
              'Review statements monthly'
            ]
          }
        ]
      }
    ]
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answer });
  };

  const handleQuizSubmit = () => {
    setShowResults(true);
  };

  const handleNext = () => {
    if (currentSlide < simulationContent.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setShowResults(false);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setShowResults(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'none': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderSlideContent = () => {
    const slide = simulationContent.slides[currentSlide];

    switch (slide.type) {
      case 'introduction':
        return (
          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src={slide.image} 
                alt="Banking Security" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed font-medium">{slide.content}</p>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-3xl border border-red-100">
              <h4 className="font-bold text-red-900 mb-6 text-lg flex items-center">
                <Building2 className="h-6 w-6 mr-3 text-red-600" />
                Banking Phishing Statistics:
              </h4>
              <ul className="space-y-4">
                {slide.keyPoints?.map((point, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="bg-red-500 p-2 rounded-xl shadow-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-red-800 font-medium leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'email-simulation':
        return (
          <div className="space-y-8">
            <p className="text-xl text-gray-700 leading-relaxed font-medium">{slide.content}</p>
            
            {/* Email Display */}
            <div className="bg-white border-2 border-gray-300 rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gray-100 p-4 border-b-2 border-gray-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900">From: {slide.email?.from}</p>
                    <p className="text-gray-600">Subject: {slide.email?.subject}</p>
                  </div>
                  <span className="text-gray-500 text-sm">{slide.email?.timestamp}</span>
                </div>
              </div>
              <div className="p-6">
                <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm leading-relaxed">
                  {slide.email?.body}
                </pre>
              </div>
            </div>

            {/* Analysis */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-3xl border border-orange-100">
              <h4 className="font-bold text-orange-900 mb-6 text-lg flex items-center">
                <Eye className="h-6 w-6 mr-3 text-orange-600" />
                Phishing Red Flags Analysis:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slide.analysis?.map((item, index) => (
                  <div key={index} className={`border-2 rounded-2xl p-4 ${getRiskColor(item.severity)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-bold">{item.element}</h5>
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase ${
                        item.severity === 'high' ? 'bg-red-200 text-red-800' :
                        'bg-yellow-200 text-yellow-800'
                      }`}>
                        {item.severity} risk
                      </span>
                    </div>
                    <p className="text-sm">{item.issue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'interactive':
        return (
          <div className="space-y-8">
            <p className="text-xl text-gray-700 leading-relaxed font-medium">{slide.content}</p>
            
            <div className="space-y-4">
              {slide.choices?.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentSlide, index.toString())}
                  className={`w-full text-left p-6 border-2 rounded-3xl transition-all duration-300 transform hover:scale-102 ${
                    selectedAnswers[currentSlide] === index.toString()
                      ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md'
                  }`}
                >
                  <span className="text-lg">{choice.text}</span>
                </button>
              ))}
            </div>

            {selectedAnswers[currentSlide] && (
              <div className={`p-6 rounded-3xl border-2 ${getRiskColor(slide.choices?.[parseInt(selectedAnswers[currentSlide])]?.risk || 'none')}`}>
                <div className="flex items-center mb-4">
                  {slide.choices?.[parseInt(selectedAnswers[currentSlide])]?.correct ? (
                    <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600 mr-3" />
                  )}
                  <span className={`font-bold text-xl ${
                    slide.choices?.[parseInt(selectedAnswers[currentSlide])]?.correct
                      ? 'text-green-900'
                      : 'text-red-900'
                  }`}>
                    {slide.choices?.[parseInt(selectedAnswers[currentSlide])]?.correct ? 'Excellent choice!' : 'Let\'s reconsider...'}
                  </span>
                </div>
                <p className={`text-lg leading-relaxed ${
                  slide.choices?.[parseInt(selectedAnswers[currentSlide])]?.correct
                    ? 'text-green-800'
                    : 'text-red-800'
                }`}>
                  {slide.choices?.[parseInt(selectedAnswers[currentSlide])]?.outcome}
                </p>
              </div>
            )}
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-8">
              <h4 className="font-bold text-blue-900 mb-4 text-lg flex items-center">
                <Shield className="h-6 w-6 mr-3 text-blue-600" />
                Banking Security Test:
              </h4>
              <p className="text-blue-800 text-lg leading-relaxed">{slide.question}</p>
            </div>
            
            <div className="space-y-4">
              {slide.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentSlide, index.toString())}
                  className={`w-full text-left p-6 border-2 rounded-3xl transition-all duration-300 transform hover:scale-102 ${
                    selectedAnswers[currentSlide] === index.toString()
                      ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md'
                  }`}
                >
                  <span className="flex items-center">
                    <span className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl w-10 h-10 flex items-center justify-center text-lg font-bold mr-4">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-lg">{option}</span>
                  </span>
                </button>
              ))}
            </div>

            {selectedAnswers[currentSlide] && !showResults && (
              <button
                onClick={handleQuizSubmit}
                className="btn-primary text-lg"
              >
                Submit Answer
              </button>
            )}

            {showResults && (
              <div className={`p-6 rounded-3xl border-2 ${
                parseInt(selectedAnswers[currentSlide]) === slide.correct
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                  : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200'
              }`}>
                <div className="flex items-center mb-4">
                  {parseInt(selectedAnswers[currentSlide]) === slide.correct ? (
                    <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600 mr-3" />
                  )}
                  <span className={`font-bold text-xl ${
                    parseInt(selectedAnswers[currentSlide]) === slide.correct
                      ? 'text-green-900'
                      : 'text-red-900'
                  }`}>
                    {parseInt(selectedAnswers[currentSlide]) === slide.correct ? 'Correct!' : 'Not quite right'}
                  </span>
                </div>
                <p className={`text-lg leading-relaxed ${
                  parseInt(selectedAnswers[currentSlide]) === slide.correct
                    ? 'text-green-800'
                    : 'text-red-800'
                }`}>
                  {slide.explanation}
                </p>
              </div>
            )}
          </div>
        );

      case 'tips':
        return (
          <div className="space-y-8">
            <p className="text-xl text-gray-700 leading-relaxed font-medium">{slide.content}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {slide.tips?.map((category, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8">
                  <h4 className="font-bold text-green-900 mb-6 text-xl flex items-center">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl mr-3">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                    {category.category}
                  </h4>
                  <ul className="space-y-3">
                    {category.practices.map((practice, practiceIndex) => (
                      <li key={practiceIndex} className="flex items-start group">
                        <div className="bg-green-500 p-2 rounded-xl shadow-lg mr-4 group-hover:scale-110 transition-transform duration-200">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-green-800 font-medium leading-relaxed">{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="card-elevated p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{simulationContent.title}</h1>
              <div className="flex items-center space-x-6 text-gray-600">
                <span className="flex items-center bg-blue-100 px-4 py-2 rounded-2xl">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="font-medium">{simulationContent.duration}</span>
                </span>
                <span className="flex items-center bg-green-100 px-4 py-2 rounded-2xl">
                  <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                  <span className="font-medium">{simulationContent.slides.length} sections</span>
                </span>
              </div>
            </div>
            <button
              onClick={onExit}
              className="btn-secondary"
            >
              Exit Simulation
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex justify-between text-lg text-gray-600 mb-4">
              <span className="font-medium">Progress</span>
              <span className="font-bold">{currentSlide + 1} of {simulationContent.slides.length}</span>
            </div>
            <div className="progress-modern h-4">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${((currentSlide + 1) / simulationContent.slides.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="card-elevated p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            {simulationContent.slides[currentSlide].title}
          </h2>
          
          {renderSlideContent()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t-2 border-gray-100">
            <button
              onClick={handlePrevious}
              disabled={currentSlide === 0}
              className={`flex items-center px-6 py-3 rounded-2xl font-medium text-lg transition-all duration-200 ${
                currentSlide === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:shadow-md transform hover:scale-105'
              }`}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Previous
            </button>

            <div className="flex space-x-3">
              {simulationContent.slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 scale-125 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                ></div>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={
                (simulationContent.slides[currentSlide].type === 'quiz' && !showResults) ||
                (simulationContent.slides[currentSlide].type === 'interactive' && !selectedAnswers[currentSlide])
              }
              className={`flex items-center px-6 py-3 rounded-2xl font-medium text-lg transition-all duration-200 ${
                (simulationContent.slides[currentSlide].type === 'quiz' && !showResults) ||
                (simulationContent.slides[currentSlide].type === 'interactive' && !selectedAnswers[currentSlide])
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {currentSlide === simulationContent.slides.length - 1 ? 'Complete Simulation' : 'Continue'}
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingPhishingSimulator; 