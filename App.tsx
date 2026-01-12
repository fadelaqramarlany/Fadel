import React, { useState } from 'react';
import { CURRICULUM, MOCK_VIDEOS } from './constants';
import { EducationLevel, SubjectType, QuizConfig } from './types';
import Quiz from './components/Quiz';
import AdminPanel from './components/Admin';
import { 
  Zap, 
  Crown, 
  BookOpen, 
  Video, 
  UserCircle, 
  Menu, 
  X,
  PlayCircle,
  BarChart2,
  School
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

enum View {
  HOME,
  QUIZ_SETUP,
  QUIZ_ACTIVE,
  FESTIVAL,
  LEARNING,
  ADMIN
}

const App = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);

  // User Data State
  const [userSchool, setUserSchool] = useState('');
  const [inputError, setInputError] = useState(false);

  // Quiz Setup State
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel | null>(null);
  const [selectedSubjectType, setSelectedSubjectType] = useState<SubjectType>(SubjectType.UMUM);

  // Navigation Handler
  const navigate = (view: View) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleStartRequest = (targetView: View) => {
    if (!userSchool.trim()) {
      setInputError(true);
      // Scroll to top to see error if needed, or focus input
      const inputEl = document.getElementById('school-input');
      if (inputEl) inputEl.focus();
      return;
    }
    navigate(targetView);
  };

  const startQuiz = (subject: string) => {
    if (!selectedLevel) return;
    setQuizConfig({
      level: selectedLevel,
      type: selectedSubjectType,
      subject: subject,
      isFestival: false,
      schoolName: userSchool
    });
    setCurrentView(View.QUIZ_ACTIVE);
  };

  const startFestivalQuiz = () => {
    // Random mock config for Festival demo
    setQuizConfig({
      level: EducationLevel.SMA,
      type: SubjectType.UMUM,
      subject: "Pengetahuan Umum Nasional",
      isFestival: true,
      schoolName: userSchool
    });
    setCurrentView(View.QUIZ_ACTIVE);
  }

  // --- SUB-COMPONENTS (Inside App for simplicity of state sharing) ---

  const Navbar = () => (
    <nav className="sticky top-0 z-50 bg-king-dark/95 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate(View.HOME)}
        >
          <div className="bg-king-red p-1.5 rounded-lg">
            <Crown className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-white">STEREO<span className="text-king-red">KING</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => navigate(View.HOME)} className={`text-sm font-bold hover:text-king-red transition ${currentView === View.HOME ? 'text-king-red' : 'text-gray-300'}`}>BERANDA</button>
          <button onClick={() => handleStartRequest(View.QUIZ_SETUP)} className={`text-sm font-bold hover:text-king-red transition ${currentView === View.QUIZ_SETUP ? 'text-king-red' : 'text-gray-300'}`}>MULAI KUIS</button>
          <button onClick={() => handleStartRequest(View.FESTIVAL)} className={`text-sm font-bold hover:text-king-red transition ${currentView === View.FESTIVAL ? 'text-king-red' : 'text-gray-300'}`}>FESTIVAL</button>
          <button onClick={() => navigate(View.LEARNING)} className={`text-sm font-bold hover:text-king-red transition ${currentView === View.LEARNING ? 'text-king-red' : 'text-gray-300'}`}>BELAJAR</button>
          <button onClick={() => navigate(View.ADMIN)} className={`text-sm font-bold hover:text-king-red transition ${currentView === View.ADMIN ? 'text-king-red' : 'text-gray-300'}`}>ADMIN</button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-king-gray border-b border-gray-800 absolute w-full left-0 top-16 px-4 py-4 flex flex-col gap-4 animate-fade-in">
          <button onClick={() => navigate(View.HOME)} className="text-left font-bold text-gray-300 hover:text-king-red">BERANDA</button>
          <button onClick={() => handleStartRequest(View.QUIZ_SETUP)} className="text-left font-bold text-gray-300 hover:text-king-red">MULAI KUIS</button>
          <button onClick={() => handleStartRequest(View.FESTIVAL)} className="text-left font-bold text-gray-300 hover:text-king-red">FESTIVAL NASIONAL</button>
          <button onClick={() => navigate(View.LEARNING)} className="text-left font-bold text-gray-300 hover:text-king-red">VIDEO BELAJAR</button>
          <button onClick={() => navigate(View.ADMIN)} className="text-left font-bold text-gray-300 hover:text-king-red">ADMIN PANEL</button>
        </div>
      )}
    </nav>
  );

  const Hero = () => (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black -z-10"></div>
      <div className="container mx-auto text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-900/30 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
          <Zap className="w-3 h-3" />
          Kuis Pendidikan No.1 Indonesia
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
          Asah Otak,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">Raih Juara.</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Platform kuis cerdas untuk SD, SMP, dan SMA. Tersedia ribuan soal umum dan agama yang dibuat oleh AI canggih.
        </p>

        {/* School Input Section */}
        <div className="max-w-md mx-auto mb-10">
          <div className={`relative group transition-all ${inputError ? 'animate-pulse' : ''}`}>
            <School className={`absolute left-4 top-3.5 w-6 h-6 transition-colors ${inputError ? 'text-red-500' : 'text-gray-500 group-focus-within:text-king-red'}`} />
            <input 
              id="school-input"
              type="text" 
              value={userSchool}
              onChange={(e) => {
                setUserSchool(e.target.value);
                if (e.target.value.trim()) setInputError(false);
              }}
              placeholder="Masukkan Nama Sekolahmu (Wajib)" 
              className={`w-full bg-white/5 backdrop-blur-sm border-2 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:bg-black/50 transition-all ${inputError ? 'border-red-500 focus:border-red-500' : 'border-gray-700 focus:border-king-red'}`}
            />
          </div>
          {inputError && (
            <p className="text-red-500 text-sm mt-2 font-medium animate-fade-in">
              ⚠️ Mohon isi nama sekolah untuk mulai mencetak poin!
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => handleStartRequest(View.QUIZ_SETUP)}
            className="w-full sm:w-auto px-8 py-4 bg-king-red hover:bg-red-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-red-900/50"
          >
            Mulai Kuis Sekarang
          </button>
          <button 
            onClick={() => handleStartRequest(View.FESTIVAL)}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/10 backdrop-blur-sm transition-all"
          >
            Lihat Festival
          </button>
        </div>
      </div>
    </section>
  );

  const QuizSetup = () => (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Pilih Kuis Kamu</h2>
        <p className="text-gray-400">
          Mewakili: <span className="text-king-red font-bold">{userSchool}</span>
        </p>
      </div>
      
      {/* Step 1: Level */}
      <div className="mb-10">
        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-4">1. Jenjang Pendidikan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[EducationLevel.SD, EducationLevel.SMP, EducationLevel.SMA].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`p-6 rounded-xl border-2 transition-all text-center
                ${selectedLevel === level 
                  ? 'border-king-red bg-red-900/20 text-white shadow-lg shadow-red-900/20' 
                  : 'border-gray-800 bg-king-gray text-gray-400 hover:border-gray-600'}`}
            >
              <span className="text-2xl font-black block mb-2">{level}</span>
              <span className="text-xs text-gray-500">Sekolah {level === 'SD' ? 'Dasar' : level === 'SMP' ? 'Menengah Pertama' : 'Menengah Atas'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Subject Type & List */}
      {selectedLevel && (
        <div className="animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest">2. Mata Pelajaran</h3>
            <div className="flex bg-king-gray rounded-lg p-1 border border-gray-800">
              <button 
                onClick={() => setSelectedSubjectType(SubjectType.UMUM)}
                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${selectedSubjectType === SubjectType.UMUM ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-white'}`}
              >
                Umum
              </button>
              <button 
                onClick={() => setSelectedSubjectType(SubjectType.AGAMA)}
                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${selectedSubjectType === SubjectType.AGAMA ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-white'}`}
              >
                Agama
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {selectedSubjectType === SubjectType.UMUM 
              ? CURRICULUM[selectedLevel].umum.map(subj => (
                  <button
                    key={subj}
                    onClick={() => startQuiz(subj)}
                    className="p-4 bg-king-gray hover:bg-gray-800 border border-gray-800 hover:border-king-red rounded-xl text-left transition-all group"
                  >
                    <span className="font-semibold text-gray-300 group-hover:text-white block truncate">{subj}</span>
                    <span className="text-xs text-gray-600 group-hover:text-red-400">Mulai &rarr;</span>
                  </button>
                ))
              : CURRICULUM[selectedLevel].agama.map(subj => (
                  <button
                    key={subj}
                    onClick={() => startQuiz(subj)}
                    className="p-4 bg-king-gray hover:bg-gray-800 border border-gray-800 hover:border-king-red rounded-xl text-left transition-all group"
                  >
                    <span className="font-semibold text-gray-300 group-hover:text-white block truncate">{subj}</span>
                    <span className="text-xs text-gray-600 group-hover:text-red-400">Mulai &rarr;</span>
                  </button>
                ))
            }
          </div>
        </div>
      )}
    </div>
  );

  const Festival = () => {
    // Mock Data for chart
    const data = [
      { name: 'SDN 1', points: 4000 },
      { name: 'SMP 2', points: 3000 },
      { name: 'SMA 3', points: 2000 },
      { name: 'SDN 5', points: 2780 },
      { name: 'SMA 1', points: 1890 },
    ];

    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold uppercase mb-4 border border-yellow-500/30">
            <Crown className="w-3 h-3" /> Edisi Bulan Ini
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">Festival Nasional</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-2">
             Kompetisi bergengsi antar sekolah se-Indonesia. Kumpulkan poin tertinggi untuk sekolahmu dan menangkan piala STEREO KING!
          </p>
          <p className="text-king-red font-bold">
            Mewakili: {userSchool}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
           <div className="bg-king-gray p-8 rounded-2xl border border-gray-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 bg-red-600 text-white text-xs font-bold rounded-bl-xl">LIVE</div>
              <h3 className="text-2xl font-bold mb-2">Ikuti Kompetisi</h3>
              <p className="text-gray-400 mb-6 text-sm">Jawab soal spesial festival dengan poin ganda. Durasi terbatas.</p>
              <button onClick={startFestivalQuiz} className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition">
                Masuk Arena Festival
              </button>
              <Zap className="absolute -bottom-6 -right-6 w-32 h-32 text-gray-800 opacity-20 group-hover:opacity-30 transition-opacity" />
           </div>

           <div className="bg-king-gray p-8 rounded-2xl border border-gray-800">
             <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
               <BarChart2 className="w-5 h-5 text-king-red" /> Statistik Poin Teratas
             </h3>
             <div className="h-48 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={data}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                   <XAxis dataKey="name" stroke="#666" fontSize={12} />
                   <YAxis stroke="#666" fontSize={12} />
                   <Tooltip 
                      contentStyle={{ backgroundColor: '#1f1f1f', border: '1px solid #333' }}
                      itemStyle={{ color: '#fff' }}
                   />
                   <Bar dataKey="points" fill="#E50914" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
           </div>
        </div>
      </div>
    );
  };

  const Learning = () => (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-2">Video Pembelajaran</h2>
      <p className="text-gray-400 mb-8">Pelajari materi sebelum mengikuti kuis.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_VIDEOS.map((video) => (
          <div key={video.id} className="bg-king-gray rounded-xl overflow-hidden border border-gray-800 group hover:border-gray-600 transition-all cursor-pointer">
            <div className="relative aspect-video">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 p-3 rounded-full backdrop-blur-sm group-hover:bg-red-600 transition-colors">
                  <PlayCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-xs font-mono rounded">
                {video.duration}
              </span>
            </div>
            <div className="p-4">
              <div className="flex gap-2 mb-2">
                <span className="px-2 py-0.5 bg-gray-800 text-gray-300 text-[10px] font-bold uppercase rounded">{video.level}</span>
                <span className="px-2 py-0.5 bg-red-900/30 text-red-400 text-[10px] font-bold uppercase rounded">{video.subject}</span>
              </div>
              <h3 className="font-bold text-lg leading-tight group-hover:text-red-500 transition-colors">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-black border-t border-gray-900 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
               <Crown className="text-king-red w-5 h-5" />
               <span className="text-lg font-black text-white">STEREO<span className="text-king-red">KING</span></span>
             </div>
             <p className="text-gray-500 text-sm">© 2024 FAM WI. All rights reserved.</p>
             <p className="text-gray-600 text-xs mt-1">"Kuis yang punya otak, mendidik generasi Indonesia"</p>
          </div>
          <div className="flex gap-6 text-sm font-medium text-gray-400">
            <button className="hover:text-white">Tentang Kami</button>
            <button className="hover:text-white">Kontak</button>
            <button className="hover:text-white">Privasi</button>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen flex flex-col bg-king-dark text-gray-100 font-sans selection:bg-red-500/30 selection:text-white">
      <Navbar />
      
      <main className="flex-grow">
        {currentView === View.HOME && <Hero />}
        {currentView === View.QUIZ_SETUP && <QuizSetup />}
        {currentView === View.QUIZ_ACTIVE && quizConfig && (
          <Quiz config={quizConfig} onExit={() => setCurrentView(View.HOME)} />
        )}
        {currentView === View.FESTIVAL && <Festival />}
        {currentView === View.LEARNING && <Learning />}
        {currentView === View.ADMIN && <AdminPanel />}
      </main>

      <Footer />
    </div>
  );
};

export default App;