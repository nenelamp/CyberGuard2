import React, { useState } from 'react';
import { Clock, BookOpen, CheckCircle, XCircle, ArrowRight, ArrowLeft, Award, Mail, AlertTriangle, Eye, Shield, Target, Link, Settings, Phone, Lock, Smartphone } from 'lucide-react';

interface ITSupportPhishingSimulatorProps {
  onComplete: () => void;
  onExit: () => void;
}

const ITSupportPhishingSimulator: React.FC<ITSupportPhishingSimulatorProps> = ({ onComplete, onExit }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [showResults, setShowResults] = useState(false);

  const simulationContent = {
    title: 'IT Support Phishing Simulation: Technical Support Scams',
    duration: '5 minutes',
    slides: [
      {
        type: 'introduction',
        title: 'IT Support Phishing Threats',
        content: 'Technical support scams are among the most dangerous phishing attacks. Scammers impersonate IT support staff to gain access to your computer and steal sensitive information.',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2QjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPklUIFN1cHBvcnQgU2NhbXMgSWxsdXN0cmF0aW9uPC90ZXh0Pgo8L3N2Zz4K',
        keyPoints: [
          'IT support scams cost victims $347 million in 2022',
          'Scammers often target elderly and less tech-savvy users',
          'Remote access tools are commonly used to steal data'
        ]
      },
      {
        type: 'email-simulation',
        title: 'Suspicious IT Support Email',
        content: 'You receive this email claiming to be from Microsoft Support. Analyze it carefully:',
        email: {
          from: 'microsoft-support@microsoft-security-alert.com',
          subject: 'URGENT: Your Windows computer has been infected with malware',
          body: `Dear Windows User,

Our security system has detected that your Windows computer (IP: 192.168.1.105) has been infected with multiple viruses and malware.

CRITICAL SECURITY ALERT:
- 47 viruses detected
- 23 malware threats active
- Your personal data is at risk
- Banking information compromised

IMMEDIATE ACTION REQUIRED:
Please call our support team immediately at: 1-800-MICROSOFT (this number is fake)

Our certified technicians will:
1. Remove all viruses remotely
2. Secure your computer
3. Protect your personal data
4. Install security software

This is a time-sensitive matter. If you do not respond within 2 hours, your computer will be permanently locked for security reasons.

Best regards,
Microsoft Security Team
Windows Support Division`,
          timestamp: '11:23 AM'
        },
        analysis: [
          { element: 'Sender Address', issue: 'Fake domain (microsoft-security-alert.com)', severity: 'high' },
          { element: 'Subject Line', issue: 'Creates false urgency about malware', severity: 'high' },
          { element: 'Technical Details', issue: 'Shows fake IP address to seem legitimate', severity: 'medium' },
          { element: 'Threats', issue: 'Threatens computer lockout', severity: 'high' },
          { element: 'Phone Number', issue: 'Fake support number', severity: 'high' },
          { element: 'Remote Access', issue: 'Offers remote access to your computer', severity: 'high' }
        ]
      },
      {
        type: 'interactive',
        title: 'What Would You Do?',
        content: 'You receive the email above. How do you respond?',
        choices: [
          {
            text: 'Call the number immediately to get help removing the viruses',
            outcome: 'DANGEROUS! This would connect you to scammers who will try to gain remote access to your computer.',
            correct: false,
            risk: 'high'
          },
          {
            text: 'Click any links in the email to download security software',
            outcome: 'Risky - links in phishing emails often download malware instead of security software.',
            correct: false,
            risk: 'high'
          },
          {
            text: 'Ignore the email and run my own antivirus scan',
            outcome: 'EXCELLENT! Always use your own trusted security software, never respond to unsolicited support emails.',
            correct: true,
            risk: 'none'
          },
          {
            text: 'Reply to the email asking for more details',
            outcome: 'Risky - this confirms your email is active and may lead to more aggressive scams.',
            correct: false,
            risk: 'medium'
          }
        ]
      },
      {
        type: 'quiz',
        title: 'IT Support Security Knowledge',
        question: 'You receive a call from someone claiming to be from Microsoft Support. What should you do?',
        options: [
          'Give them remote access to your computer to fix the problem',
          'Provide your credit card information for support services',
          'Hang up immediately and call Microsoft\'s official support number',
          'Follow their instructions to install software they recommend'
        ],
        correct: 2,
        explanation: 'Never give remote access or personal information to unsolicited callers. Always verify by calling the official company number yourself.'
      },
      {
        type: 'tips',
        title: 'IT Support Security Best Practices',
        content: 'Protect yourself from technical support scams with these essential security measures:',
        tips: [
          {
            category: 'Email Security',
            practices: [
              'Never respond to unsolicited IT support emails',
              'Check sender addresses carefully',
              'Be suspicious of urgent security alerts',
              'Report suspicious emails to your IT department'
            ]
          },
          {
            category: 'Phone Security',
            practices: [
              'Never give remote access to unsolicited callers',
              'Hang up on suspicious support calls',
              'Call back using official company numbers',
              'Never provide payment information over the phone'
            ]
          },
          {
            category: 'Computer Security',
            practices: [
              'Use legitimate antivirus software',
              'Keep your operating system updated',
              'Enable Windows Defender',
              'Regularly backup important data'
            ]
          },
          {
            category: 'General Protection',
            practices: [
              'Be skeptical of urgent security threats',
              'Verify support requests through official channels',
              'Never install software from unsolicited sources',
              'Educate family members about support scams'
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
                alt="IT Support Security" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed font-medium">{slide.content}</p>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-3xl border border-red-100">
              <h4 className="font-bold text-red-900 mb-6 text-lg flex items-center">
                <Settings className="h-6 w-6 mr-3 text-red-600" />
                IT Support Scam Statistics:
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
                IT Support Security Test:
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

export default ITSupportPhishingSimulator; 