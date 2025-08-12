import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizComponentProps {
  question: QuizQuestion;
  questionIndex: number;
  onAnswerSelect: (questionIndex: number, answer: string, isCorrect: boolean) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  question,
  questionIndex,
  onAnswerSelect
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAnswerClick = (answerIndex: number) => {
    if (hasAnswered) return;
    
    const isCorrect = answerIndex === question.correct;
    setSelectedAnswer(answerIndex.toString());
    setHasAnswered(true);
    onAnswerSelect(questionIndex, answerIndex.toString(), isCorrect);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-8">
        <h4 className="font-bold text-blue-900 mb-4 text-lg flex items-center">
          <CheckCircle className="h-6 w-6 mr-3 text-blue-600" />
          Knowledge Check:
        </h4>
        <p className="text-blue-800 text-lg leading-relaxed">{question.question}</p>
      </div>

      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index.toString();
          const isCorrect = index === question.correct;
          const showCorrect = hasAnswered && isCorrect;
          const showIncorrect = hasAnswered && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              disabled={hasAnswered}
              className={`w-full text-left p-6 border-2 rounded-3xl transition-all duration-300 transform ${
                showCorrect
                  ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg'
                  : showIncorrect
                  ? 'border-red-500 bg-gradient-to-r from-red-50 to-pink-50 shadow-lg'
                  : isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md'
              } ${hasAnswered ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-102'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`rounded-2xl w-10 h-10 flex items-center justify-center text-lg font-bold mr-4 ${
                    showCorrect
                      ? 'bg-green-500 text-white'
                      : showIncorrect
                      ? 'bg-red-500 text-white'
                      : isSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-lg">{option}</span>
                </div>
                
                {hasAnswered && (
                  <div>
                    {showCorrect && (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    )}
                    {showIncorrect && (
                      <XCircle className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {hasAnswered && (
        <div className={`p-6 rounded-3xl border-2 ${
          parseInt(selectedAnswer!) === question.correct
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
            : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200'
        }`}>
          <div className="flex items-center mb-4">
            {parseInt(selectedAnswer!) === question.correct ? (
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            ) : (
              <XCircle className="h-8 w-8 text-red-600 mr-3" />
            )}
            <span className={`font-bold text-xl ${
              parseInt(selectedAnswer!) === question.correct
                ? 'text-green-900'
                : 'text-red-900'
            }`}>
              {parseInt(selectedAnswer!) === question.correct ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          <p className={`text-lg leading-relaxed ${
            parseInt(selectedAnswer!) === question.correct
              ? 'text-green-800'
              : 'text-red-800'
          }`}>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
