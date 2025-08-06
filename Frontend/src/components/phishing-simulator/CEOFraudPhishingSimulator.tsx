import React, { useState } from 'react';
import { Clock, BookOpen, CheckCircle, XCircle, ArrowRight, ArrowLeft, Award, Mail, AlertTriangle, Eye, Shield, Target, Link, Building2, DollarSign, Lock, UserCheck } from 'lucide-react';

interface CEOFraudPhishingSimulatorProps {
  onComplete: () => void;
  onExit: () => void;
}

const CEOFraudPhishingSimulator: React.FC<CEOFraudPhishingSimulatorProps> = ({ onComplete, onExit }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [quizScore, setQuizScore] = useState(0);

  const simulationContent = {
    title: "CEO Fraud (BEC) Phishing Simulation",
    duration: "15-20 minutes",
    slides: [
      {
        type: "introduction",
        title: "CEO Fraud (Business Email Compromise)",
        icon: AlertTriangle,
        content: "Learn to identify and respond to CEO fraud attacks, where cybercriminals impersonate company executives to trick employees into making unauthorized payments or sharing sensitive information."
      },
      {
        type: "email-simulation",
        title: "Suspicious CEO Email",
        email: {
          from: "ceo@company.com",
          to: "finance@company.com",
          subject: "URGENT: Wire Transfer Required",
          body: `Hi Finance Team,

I'm currently in an important meeting and can't call. I need you to process an urgent wire transfer of $50,000 to our new vendor account immediately.

Account Details:
Bank: First National Bank
Account: 1234567890
Routing: 987654321
Account Name: Tech Solutions Inc.

This is confidential and time-sensitive. Please confirm once completed.

Best regards,
John Smith
CEO`
        },
        analysis: {
          redFlags: [
            "Urgency and pressure tactics",
            "Request for immediate action",
            "Confidentiality emphasis",
            "Unusual payment request",
            "CEO asking for wire transfer directly"
          ],
          explanation: "CEO fraud attacks often use urgency, authority, and confidentiality to bypass normal security procedures."
        }
      },
      {
        type: "interactive",
        title: "What Would You Do?",
        scenario: "You receive this email from what appears to be your CEO. The request seems urgent and unusual. What's your response?",
        choices: [
          {
            text: "Process the wire transfer immediately as requested",
            correct: false,
            feedback: "This is exactly what the attacker wants. Never process unusual financial requests without proper verification."
          },
          {
            text: "Call the CEO's known phone number to verify",
            correct: true,
            feedback: "Excellent! Always verify unusual requests through known, trusted channels, not the email itself."
          },
          {
            text: "Reply to the email asking for more details",
            correct: false,
            feedback: "Replying to the email could confirm your email address is active and may lead to more sophisticated attacks."
          },
          {
            text: "Forward to IT security for investigation",
            correct: true,
            feedback: "Good approach! IT security can investigate the email's authenticity and provide guidance."
          }
        ]
      },
      {
        type: "quiz",
        title: "CEO Fraud Awareness Quiz",
        questions: [
          {
            question: "What is the primary goal of CEO fraud attacks?",
            options: [
              "Steal login credentials",
              "Install malware",
              "Obtain unauthorized payments",
              "Gather company information"
            ],
            correct: 2
          },
          {
            question: "Which of these is NOT a red flag for CEO fraud?",
            options: [
              "Urgent payment requests",
              "Requests for confidentiality",
              "Unusual payment methods",
              "Clear, detailed instructions"
            ],
            correct: 3
          },
          {
            question: "What should you do if you receive a suspicious CEO email?",
            options: [
              "Reply immediately to clarify",
              "Call the CEO's known number",
              "Process the request quickly",
              "Ignore it completely"
            ],
            correct: 1
          },
          {
            question: "Which verification method is most secure for CEO requests?",
            options: [
              "Reply to the email",
              "Call the number in the email",
              "Use known contact information",
              "Ask colleagues via email"
            ],
            correct: 2
          }
        ]
      },
      {
        type: "tips",
        title: "CEO Fraud Prevention Tips",
        tips: [
          {
            icon: UserCheck,
            title: "Verify Through Known Channels",
            description: "Always verify unusual requests using known, trusted contact information, not the email itself."
          },
          {
            icon: Shield,
            title: "Question Urgency",
            description: "Be suspicious of urgent requests that bypass normal procedures. Real executives understand security protocols."
          },
          {
            icon: Lock,
            title: "Follow Payment Procedures",
            description: "Stick to established payment authorization procedures, regardless of who makes the request."
          },
          {
            icon: AlertTriangle,
            title: "Report Suspicious Activity",
            description: "Immediately report suspicious emails to IT security for investigation and response."
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

export default CEOFraudPhishingSimulator; 