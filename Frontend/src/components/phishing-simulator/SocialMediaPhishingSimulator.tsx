import React, { useState } from 'react';
import { Clock, BookOpen, CheckCircle, XCircle, ArrowRight, ArrowLeft, Award, Mail, AlertTriangle, Eye, Shield, Target, Link, Users, Share2, Lock, Smartphone } from 'lucide-react';

interface SocialMediaPhishingSimulatorProps {
  onComplete: () => void;
  onExit: () => void;
}

const SocialMediaPhishingSimulator: React.FC<SocialMediaPhishingSimulatorProps> = ({ onComplete, onExit }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizScore, setQuizScore] = useState(0);

  const simulationContent = {
    title: "Social Media Phishing Simulation",
    duration: "15-20 minutes",
    slides: [
      {
        type: "introduction",
        title: "Social Media Phishing Attacks",
        icon: Users,
        content: "Learn to identify and respond to social media phishing attacks, where cybercriminals use fake profiles, urgent messages, and social engineering to steal personal information and credentials."
      },
      {
        type: "email-simulation",
        title: "Suspicious Social Media Message",
        email: {
          from: "support@instagram.verify.com",
          to: "user@email.com",
          subject: "Your Instagram Account Has Been Flagged",
          body: `Hi there,

We've detected suspicious activity on your Instagram account. Your account has been temporarily restricted due to multiple login attempts from unknown locations.

To restore access to your account immediately, please click the link below and verify your identity:

[VERIFY NOW] https://instagram-verify.secure-login.com/account/restore

This is urgent - if you don't verify within 24 hours, your account will be permanently deleted.

Best regards,
Instagram Security Team`
        },
        analysis: {
          redFlags: [
            "Urgency and time pressure",
            "Suspicious domain name",
            "Request for immediate action",
            "Threat of account deletion",
            "Generic greeting and poor grammar"
          ],
          explanation: "Social media phishing often uses urgency and fake security alerts to trick users into clicking malicious links."
        }
      },
      {
        type: "interactive",
        title: "What Would You Do?",
        scenario: "You receive this message about your Instagram account being restricted. The link looks suspicious but the message seems urgent. What's your response?",
        choices: [
          {
            text: "Click the link immediately to verify your account",
            correct: false,
            feedback: "This is exactly what the attacker wants. Never click links in suspicious messages, especially from unknown domains."
          },
          {
            text: "Log into Instagram directly through the official app",
            correct: true,
            feedback: "Excellent! Always access your accounts through official apps or by typing the URL directly in your browser."
          },
          {
            text: "Reply to the message asking for more details",
            correct: false,
            feedback: "Replying to phishing messages confirms your email is active and may lead to more sophisticated attacks."
          },
          {
            text: "Forward the message to Instagram's official support",
            correct: true,
            feedback: "Good approach! Report suspicious messages to the platform's official support channels."
          }
        ]
      },
      {
        type: "quiz",
        title: "Social Media Phishing Awareness Quiz",
        questions: [
          {
            question: "What is the primary goal of social media phishing?",
            options: [
              "Steal account credentials",
              "Spread malware",
              "Gather personal information",
              "All of the above"
            ],
            correct: 3
          },
          {
            question: "Which of these is NOT a red flag for social media phishing?",
            options: [
              "Urgent action required",
              "Suspicious domain names",
              "Official-looking logos",
              "Requests for personal information"
            ],
            correct: 2
          },
          {
            question: "What should you do if you receive a suspicious social media message?",
            options: [
              "Click the link to investigate",
              "Reply to ask for clarification",
              "Access the platform directly",
              "Ignore it completely"
            ],
            correct: 2
          },
          {
            question: "Which verification method is most secure for social media accounts?",
            options: [
              "Clicking links in messages",
              "Using the official app",
              "Replying to support emails",
              "Following social media links"
            ],
            correct: 1
          }
        ]
      },
      {
        type: "tips",
        title: "Social Media Phishing Prevention Tips",
        tips: [
          {
            icon: Smartphone,
            title: "Use Official Apps",
            description: "Always access social media accounts through official apps or by typing URLs directly in your browser."
          },
          {
            icon: Shield,
            title: "Enable Two-Factor Authentication",
            description: "Use 2FA on all your social media accounts to add an extra layer of security."
          },
          {
            icon: Lock,
            title: "Be Skeptical of Urgency",
            description: "Real security alerts rarely require immediate action. Take time to verify through official channels."
          },
          {
            icon: AlertTriangle,
            title: "Report Suspicious Activity",
            description: "Report phishing attempts to the platform's official support and your IT security team."
          }
        ]
      }
    ]
  };

  const renderSlideContent = (slide: any) => {
    switch (slide.type) {
      case "introduction":
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <slide.icon className="w-16 h-16 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{slide.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{slide.content}</p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{simulationContent.duration}</span>
            </div>
          </div>
        );

      case "email-simulation":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
              <div className="space-y-2 mb-4">
                <div><strong>From:</strong> {slide.email.from}</div>
                <div><strong>To:</strong> {slide.email.to}</div>
                <div><strong>Subject:</strong> {slide.email.subject}</div>
              </div>
              <div className="border-t pt-4">
                <pre className="whitespace-pre-wrap text-sm text-gray-700">{slide.email.body}</pre>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Red Flags Analysis</h3>
              <ul className="space-y-1">
                {slide.analysis.redFlags.map((flag: string, index: number) => (
                  <li key={index} className="flex items-center text-sm text-yellow-700">
                    <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {flag}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-yellow-700 mt-3">{slide.analysis.explanation}</p>
            </div>
          </div>
        );

      case "interactive":
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Scenario</h3>
              <p className="text-blue-700">{slide.scenario}</p>
            </div>
            
            <div className="space-y-3">
              {slide.choices.map((choice: any, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedChoice(index);
                    setShowFeedback(true);
                  }}
                  className={`w-full p-4 text-left rounded-lg border transition-colors ${
                    selectedChoice === index
                      ? choice.correct
                        ? 'bg-green-50 border-green-300 text-green-800'
                        : 'bg-red-50 border-red-300 text-red-800'
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{choice.text}</span>
                    {selectedChoice === index && (
                      choice.correct ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )
                    )}
                  </div>
                  {selectedChoice === index && (
                    <div className="mt-2 text-sm">
                      {choice.feedback}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case "quiz":
        return (
          <div className="space-y-6">
            {slide.questions.map((question: any, qIndex: number) => (
              <div key={qIndex} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Question {qIndex + 1}: {question.question}
                </h3>
                <div className="space-y-2">
                  {question.options.map((option: string, oIndex: number) => (
                    <label key={oIndex} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={oIndex}
                        onChange={(e) => {
                          const newAnswers = { ...quizAnswers };
                          newAnswers[qIndex] = parseInt(e.target.value);
                          setQuizAnswers(newAnswers);
                        }}
                        className="text-blue-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            
            <button
              onClick={() => {
                let score = 0;
                slide.questions.forEach((question: any, index: number) => {
                  if (quizAnswers[index] === question.correct) {
                    score++;
                  }
                });
                setQuizScore(score);
              }}
              className="btn-primary w-full"
            >
              Submit Quiz
            </button>
            
            {quizScore > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <h3 className="font-semibold text-green-800 mb-2">Quiz Results</h3>
                <p className="text-green-700">
                  You scored {quizScore} out of {slide.questions.length} correct!
                </p>
              </div>
            )}
          </div>
        );

      case "tips":
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {slide.tips.map((tip: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                  <div className="flex items-start space-x-3">
                    <tip.icon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">{tip.title}</h3>
                      <p className="text-gray-600 text-sm">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentSlideData = simulationContent.slides[currentSlide];
  const isLastSlide = currentSlide === simulationContent.slides.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{simulationContent.title}</h1>
              <p className="text-gray-600">Slide {currentSlide + 1} of {simulationContent.slides.length}</p>
            </div>
            <button
              onClick={onExit}
              className="btn-secondary"
            >
              Exit Simulation
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentSlide + 1) / simulationContent.slides.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {renderSlideContent(currentSlideData)}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          {isLastSlide ? (
            <button
              onClick={onComplete}
              className="btn-primary"
            >
              <Award className="w-4 h-4 mr-2" />
              Complete Simulation
            </button>
          ) : (
            <button
              onClick={() => setCurrentSlide(currentSlide + 1)}
              className="btn-primary"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaPhishingSimulator; 