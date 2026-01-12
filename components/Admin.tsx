import React, { useState } from 'react';
import { Lock, User, LogIn, LayoutDashboard, Settings, Trophy, Database } from 'lucide-react';
import { MOCK_LEADERBOARD } from '../constants';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock validation
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Username atau password salah!');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-king-gray p-8 rounded-2xl border border-gray-800 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-king-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-king-red" />
            </div>
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <p className="text-gray-400 text-sm">Akses khusus pengelola STEREO KING</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-king-red"
                  placeholder="Masukkan username"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-king-red"
                  placeholder="Masukkan password"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full bg-king-red hover:bg-red-700 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <LogIn className="w-4 h-4" /> Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-[60vh]">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-king-gray p-4 rounded-xl border border-gray-800 h-fit">
        <div className="mb-6 px-2">
          <h3 className="font-bold text-lg text-white">Dashboard</h3>
          <p className="text-xs text-gray-500">Administrator</p>
        </div>
        <nav className="space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-king-red/10 text-king-red">
            <LayoutDashboard className="w-4 h-4" /> Overview
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
            <Trophy className="w-4 h-4" /> Festival Nasional
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
            <Database className="w-4 h-4" /> Kelola Soal
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white">
            <Settings className="w-4 h-4" /> Pengaturan
          </button>
        </nav>
        <button onClick={() => setIsLoggedIn(false)} className="mt-8 w-full border border-gray-700 text-gray-400 hover:text-white py-2 rounded-lg text-sm transition-colors">
          Keluar
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-king-gray p-6 rounded-xl border border-gray-800">
            <h4 className="text-gray-400 text-sm font-medium mb-1">Total Sekolah</h4>
            <p className="text-3xl font-bold text-white">1,240</p>
            <span className="text-green-500 text-xs flex items-center mt-2">+12% bulan ini</span>
          </div>
          <div className="bg-king-gray p-6 rounded-xl border border-gray-800">
            <h4 className="text-gray-400 text-sm font-medium mb-1">Kuis Diselesaikan</h4>
            <p className="text-3xl font-bold text-white">45.2K</p>
            <span className="text-green-500 text-xs flex items-center mt-2">+5.4% minggu ini</span>
          </div>
          <div className="bg-king-gray p-6 rounded-xl border border-gray-800">
            <h4 className="text-gray-400 text-sm font-medium mb-1">Status Server</h4>
            <p className="text-3xl font-bold text-green-500">Online</p>
            <span className="text-gray-500 text-xs flex items-center mt-2">Latency: 24ms</span>
          </div>
        </div>

        <div className="bg-king-gray p-6 rounded-xl border border-gray-800">
          <h3 className="text-lg font-bold mb-4">Peringkat Sekolah (Live)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 text-sm">
                  <th className="py-3 px-2">Rank</th>
                  <th className="py-3 px-2">Sekolah</th>
                  <th className="py-3 px-2">Jenjang</th>
                  <th className="py-3 px-2 text-right">Poin</th>
                  <th className="py-3 px-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {MOCK_LEADERBOARD.map((school) => (
                  <tr key={school.rank} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-3 px-2 font-mono text-king-red">#{school.rank}</td>
                    <td className="py-3 px-2 font-medium">{school.schoolName}</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 rounded text-xs bg-gray-800 text-gray-300 border border-gray-700">{school.level}</span>
                    </td>
                    <td className="py-3 px-2 text-right font-bold">{school.points.toLocaleString()}</td>
                    <td className="py-3 px-2 text-right">
                      <button className="text-blue-400 hover:text-blue-300 text-xs underline">Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
