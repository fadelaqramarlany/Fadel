import React, { useState, useEffect, useCallback } from 'react';
import { QuizConfig, Question } from '../types';
import { generateQuizQuestions } from '../services/geminiService';
import { Loader2, CheckCircle2, XCircle, Trophy, AlertTriangle, Clock, HelpCircle, BrainCircuit, School } from 'lucide-react';

interface QuizProps {
  config: QuizConfig;
  onExit: () => void;
}

const Quiz: React.FC<QuizProps> = ({ config, onExit }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]); // Stores index of selected answers
  const [score, setScore] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [quizFinished, setQuizFinished] = useState(false);

  // Initialize Quiz
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        // For demo UX, requesting 5 questions instead of 30 to be faster. 
        // In prod, this would be 30.
        const qs = await generateQuizQuestions(config.level, config.subject, 5);
        setQuestions(qs);
        // Reset answers array
        setAnswers(new Array(qs.length).fill(-1));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Timer Logic
  useEffect(() => {
    if (loading || quizFinished) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, quizFinished]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const finishQuiz = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });
    // Score calculation (simple percentage)
    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    setScore(calculatedScore);
    setQuizFinished(true);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Loader2 className="w-16 h-16 text-king-red animate-spin mb-4" />
        <h2 className="text-2xl font-bold mb-2">Sedang Membuat Soal...</h2>
        <p className="text-gray-400">AI sedang menyusun kuis {config.subject} untuk {config.level}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-20">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold">Gagal memuat soal.</h3>
        <button onClick={onExit} className="mt-4 px-6 py-2 bg-king-gray hover:bg-gray-700 rounded-lg">Kembali</button>
      </div>
    );
  }

  // Result View
  if (quizFinished && score !== null) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 animate-fade-in">
        <div className="bg-king-gray rounded-2xl p-8 border border-king-red/30 shadow-2xl text-center mb-8">
          <Trophy className={`w-24 h-24 mx-auto mb-6 ${score > 70 ? 'text-yellow-400' : 'text-gray-400'}`} />
          <h2 className="text-3xl font-bold mb-2">Hasil Kuis {config.isFestival ? 'Festival' : ''}</h2>
          <p className="text-xl text-gray-300 mb-6">{config.subject} - {config.level}</p>
          
          <div className="text-6xl font-black text-white mb-6">
            {score}<span className="text-2xl text-gray-400">/100</span>
          </div>

          <p className="mb-4 text-gray-400">
            {score === 100 ? "Sempurna! Kamu adalah STEREO KING!" : 
             score > 75 ? "Kerja bagus! Terus tingkatkan!" : 
             "Jangan menyerah, coba lagi!"}
          </p>
          
          {config.schoolName && (
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-full mb-8">
               <School className="w-4 h-4 text-king-red" />
               <span className="text-sm text-gray-300">Poin tercatat untuk: <strong className="text-white">{config.schoolName}</strong></span>
             </div>
          )}

          <div>
             <button 
                onClick={onExit}
                className="w-full md:w-auto px-8 py-3 bg-king-red hover:bg-red-700 text-white font-bold rounded-full transition-colors mb-8"
              >
                Kembali ke Beranda
              </button>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-6 text-center">Pembahasan & Penjelasan AI</h3>
        
        <div className="space-y-6">
          {questions.map((q, idx) => {
            const isCorrect = answers[idx] === q.correctAnswer;
            const isSkipped = answers[idx] === -1;
            
            return (
              <div 
                key={q.id} 
                className={`p-6 rounded-xl border-2 transition-all ${
                  isCorrect 
                    ? 'border-green-500/30 bg-green-900/10' 
                    : 'border-red-500/30 bg-red-900/10'
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className={`p-2 rounded-full ${isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    {isCorrect ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-bold text-gray-500 mb-1 block">Soal {idx + 1}</span>
                    <h4 className="text-lg font-medium text-white">{q.text}</h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pl-0 md:pl-12">
                  <div className={`p-3 rounded-lg border ${
                    isCorrect ? 'border-green-500/50 bg-green-900/20' : 'border-red-500/50 bg-red-900/20'
                  }`}>
                    <span className="text-xs font-bold uppercase tracking-wider block mb-1 text-gray-400">Jawaban Anda</span>
                    <p className={`font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                       {isSkipped ? 'Tidak dijawab' : `${String.fromCharCode(65 + answers[idx])}. ${q.options[answers[idx]]}`}
                    </p>
                  </div>
                  
                  {!isCorrect && (
                    <div className="p-3 rounded-lg border border-green-500/50 bg-green-900/20">
                      <span className="text-xs font-bold uppercase tracking-wider block mb-1 text-gray-400">Jawaban Benar</span>
                      <p className="font-semibold text-green-400">
                        {String.fromCharCode(65 + q.correctAnswer)}. {q.options[q.correctAnswer]}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pl-0 md:pl-12 mt-4 pt-4 border-t border-gray-700/50">
                  <div className="flex items-start gap-2">
                    <BrainCircuit className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1 block">Penjelasan AI</span>
                      <p className="text-gray-300 text-sm leading-relaxed">{q.explanation || "Tidak ada penjelasan tersedia."}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 mb-8">
           <button 
            onClick={onExit}
            className="w-full md:w-auto px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-full transition-colors"
          >
            Selesai Review
          </button>
        </div>
      </div>
    );
  }

  // Active Quiz View
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header Info */}
      <div className="flex justify-between items-center mb-6 bg-king-gray p-4 rounded-xl border border-gray-800">
        <div>
          <h2 className="text-lg font-bold text-white">{config.subject}</h2>
          <span className="text-xs text-king-red font-bold uppercase tracking-wider">{config.level} • {config.type}</span>
        </div>
        <div className="flex items-center gap-4">
          {config.schoolName && (
             <div className="hidden sm:flex items-center gap-2 text-gray-400 text-sm bg-gray-900 px-3 py-1 rounded-lg">
               <School className="w-3 h-3" />
               <span className="truncate max-w-[100px]">{config.schoolName}</span>
             </div>
          )}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${timeLeft < 60 ? 'bg-red-900/50 text-red-400' : 'bg-gray-800'}`}>
            <Clock className="w-4 h-4" />
            <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800 h-2 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-king-red h-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-king-gray p-6 md:p-10 rounded-2xl shadow-xl border border-gray-800 min-h-[400px] flex flex-col">
        <div className="mb-6">
          <span className="text-gray-500 text-sm font-bold mb-2 block">Soal {currentIndex + 1} dari {questions.length}</span>
          <h3 className="text-xl md:text-2xl font-medium leading-relaxed">{currentQuestion.text}</h3>
        </div>

        <div className="grid gap-3 mt-auto">
          {currentQuestion.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`p-4 text-left rounded-lg transition-all border-2 
                ${answers[currentIndex] === idx 
                  ? 'border-king-red bg-red-900/20 text-white' 
                  : 'border-gray-700 hover:border-gray-500 bg-gray-800/50 hover:bg-gray-800'}`}
            >
              <span className="inline-block w-6 font-bold text-gray-500 mr-2">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300"
        >
          Sebelumnya
        </button>
        
        {currentIndex === questions.length - 1 ? (
          <button
            onClick={finishQuiz}
            className="px-8 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-900/20"
          >
            Selesai
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
            className="px-6 py-2 rounded-lg bg-king-red hover:bg-red-700 text-white font-bold shadow-lg shadow-red-900/20"
          >
            Selanjutnya
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;