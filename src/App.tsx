/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Trophy, 
  Compass, 
  Sparkles,
  ChevronRight,
  User,
  Gamepad2
} from 'lucide-react';
import { GAME_DATA, Phase } from './constants';

type GameState = 'INTRO' | 'PLAYING' | 'RESULTS';
type Position = 'LEFT' | 'CENTER' | 'RIGHT';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('INTRO');
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentComparisonIndex, setCurrentComparisonIndex] = useState(0);
  const [scores, setScores] = useState({ A: 0, B: 0 });
  const [charPosition, setCharPosition] = useState<Position>('CENTER');
  const [isConfirming, setIsConfirming] = useState(false);

  const currentPhase = GAME_DATA.phases[currentPhaseIndex];
  const currentComparison = currentPhase?.comparisons[currentComparisonIndex];

  const handleMove = useCallback((direction: 'LEFT' | 'RIGHT') => {
    if (gameState !== 'PLAYING' || isConfirming) return;
    setCharPosition(direction);
  }, [gameState, isConfirming]);

  const handleConfirm = useCallback(() => {
    if (gameState !== 'PLAYING' || isConfirming || charPosition === 'CENTER') return;

    setIsConfirming(true);
    
    // Simulate a brief "selection" animation delay
    setTimeout(() => {
      const choice = charPosition === 'LEFT' ? 'A' : 'B';
      setScores(prev => ({ ...prev, [choice]: prev[choice] + 1 }));

      // Move to next comparison or phase
      if (currentComparisonIndex < currentPhase.comparisons.length - 1) {
        setCurrentComparisonIndex(prev => prev + 1);
        setCharPosition('CENTER');
        setIsConfirming(false);
      } else if (currentPhaseIndex < GAME_DATA.phases.length - 1) {
        setCurrentPhaseIndex(prev => prev + 1);
        setCurrentComparisonIndex(0);
        setCharPosition('CENTER');
        setIsConfirming(false);
      } else {
        setGameState('RESULTS');
      }
    }, 600);
  }, [gameState, isConfirming, charPosition, currentComparisonIndex, currentPhaseIndex, currentPhase]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') handleMove('LEFT');
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') handleMove('RIGHT');
      if (e.key === ' ' || e.key === 'Enter') handleConfirm();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove, handleConfirm]);

  const resetGame = () => {
    setGameState('INTRO');
    setCurrentPhaseIndex(0);
    setCurrentComparisonIndex(0);
    setScores({ A: 0, B: 0 });
    setCharPosition('CENTER');
    setIsConfirming(false);
  };

  if (gameState === 'INTRO') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 overflow-hidden font-sans text-slate-100">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full text-center space-y-8"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 opacity-20"
            >
              <Compass size={120} className="text-blue-400 mx-auto" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent relative z-10">
              A Bússola das Carreiras
            </h1>
          </div>
          
          <p className="text-xl text-slate-400 leading-relaxed max-w-lg mx-auto">
            Uma jornada interdimensional para descobrir sua verdadeira vocação. 
            Caminhe entre realidades e escolha o seu futuro.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-500">
            <div className="flex flex-col items-center space-y-2 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <Gamepad2 className="text-blue-400" />
              <span>Use as setas ou A/D para andar</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <Sparkles className="text-purple-400" />
              <span>Espaço ou Enter para confirmar</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
              <User className="text-emerald-400" />
              <span>Siga sua intuição</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameState('PLAYING')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-900/20 transition-colors flex items-center gap-2 mx-auto"
          >
            Iniciar Jornada <ChevronRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'RESULTS') {
    const winner = scores.A > scores.B ? 'A' : 'B';
    const total = scores.A + scores.B;
    const percentageA = Math.round((scores.A / total) * 100);
    const percentageB = 100 - percentageA;

    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans text-slate-100">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-3xl -mr-32 -mt-32 rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/10 blur-3xl -ml-32 -mb-32 rounded-full" />

          <div className="relative z-10 space-y-8">
            <div className="text-center space-y-2">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Seu Perfil Profissional</h2>
              <p className="text-slate-400">A jornada revelou sua essência</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
              <div className={`p-6 rounded-2xl border-2 transition-all ${winner === 'A' ? 'bg-blue-900/20 border-blue-500 shadow-lg shadow-blue-900/20' : 'bg-slate-800/50 border-transparent opacity-60'}`}>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  Perfil Estruturado {winner === 'A' && <CheckCircle2 className="text-blue-400" size={20} />}
                </h3>
                <p className="text-sm text-slate-400 mb-4">Foco em processos, sistemas complexos, lógica e gestão organizacional.</p>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentageA}%` }}
                    className="bg-blue-500 h-full"
                  />
                </div>
                <span className="text-xs mt-2 block text-right font-mono">{percentageA}%</span>
              </div>

              <div className={`p-6 rounded-2xl border-2 transition-all ${winner === 'B' ? 'bg-emerald-900/20 border-emerald-500 shadow-lg shadow-emerald-900/20' : 'bg-slate-800/50 border-transparent opacity-60'}`}>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  Perfil Explorador {winner === 'B' && <CheckCircle2 className="text-emerald-400" size={20} />}
                </h3>
                <p className="text-sm text-slate-400 mb-4">Foco em investigação, criatividade, cuidado humano e inovação social.</p>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentageB}%` }}
                    className="bg-emerald-500 h-full"
                  />
                </div>
                <span className="text-xs mt-2 block text-right font-mono">{percentageB}%</span>
              </div>
            </div>

            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <h4 className="font-bold mb-2 text-blue-400">Análise da Bússola:</h4>
              <p className="text-slate-300 leading-relaxed">
                {winner === 'A' 
                  ? "Você demonstra uma forte inclinação para carreiras que exigem precisão técnica, organização e visão sistêmica. Sua mente trabalha melhor quando há estruturas claras e desafios lógicos a serem resolvidos."
                  : "Sua jornada indica uma afinidade natural com o novo, o humano e o criativo. Você se destaca em ambientes que valorizam a empatia, a descoberta constante e a capacidade de pensar fora da caixa."
                }
              </p>
            </div>

            <button
              onClick={resetGame}
              className="w-full py-4 bg-slate-100 hover:bg-white text-slate-900 rounded-xl font-bold transition-all transform hover:scale-[1.02]"
            >
              Reiniciar Jornada
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans text-slate-100 overflow-hidden select-none">
      {/* Header / Progress */}
      <div className="p-6 flex justify-between items-center bg-slate-900/50 border-b border-slate-800 backdrop-blur-md z-20">
        <div className="space-y-1">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">{currentPhase.name}</h2>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {GAME_DATA.phases.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-8 h-1 rounded-full transition-colors ${i <= currentPhaseIndex ? 'bg-blue-500' : 'bg-slate-800'}`} 
                />
              ))}
            </div>
            <span className="text-xs font-mono text-slate-400">FASE {currentPhaseIndex + 1}/{GAME_DATA.phases.length}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Progresso</div>
          <div className="text-lg font-mono font-bold text-blue-400">
            {currentComparisonIndex + 1} / {currentPhase.comparisons.length}
          </div>
        </div>
      </div>

      {/* Game Stage */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Background Split */}
        <div className="absolute inset-0 flex">
          <div className={`flex-1 transition-colors duration-700 ${charPosition === 'LEFT' ? 'bg-blue-900/20' : 'bg-slate-950'}`} />
          <div className={`flex-1 transition-colors duration-700 ${charPosition === 'RIGHT' ? 'bg-emerald-900/20' : 'bg-slate-950'}`} />
        </div>

        {/* Center Divider Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-800/50 z-0" />

        {/* Choices */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-2 gap-8 px-8 z-10">
          {/* Choice A */}
          <motion.div 
            animate={{ 
              scale: charPosition === 'LEFT' ? 1.05 : 0.95,
              opacity: charPosition === 'LEFT' ? 1 : 0.4
            }}
            className={`relative group p-8 rounded-3xl border-2 transition-all duration-500 flex flex-col items-center justify-center text-center min-h-[300px] ${
              charPosition === 'LEFT' ? 'border-blue-500 bg-blue-900/10 shadow-2xl shadow-blue-500/20' : 'border-slate-800 bg-slate-900/30'
            }`}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest">Caminho A</div>
            <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">{currentComparison.A}</h3>
            {charPosition === 'LEFT' && !isConfirming && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-blue-400 text-sm font-bold"
              >
                <CheckCircle2 size={16} /> Pressione ESPAÇO para escolher
              </motion.div>
            )}
          </motion.div>

          {/* Choice B */}
          <motion.div 
            animate={{ 
              scale: charPosition === 'RIGHT' ? 1.05 : 0.95,
              opacity: charPosition === 'RIGHT' ? 1 : 0.4
            }}
            className={`relative group p-8 rounded-3xl border-2 transition-all duration-500 flex flex-col items-center justify-center text-center min-h-[300px] ${
              charPosition === 'RIGHT' ? 'border-emerald-500 bg-emerald-900/10 shadow-2xl shadow-emerald-500/20' : 'border-slate-800 bg-slate-900/30'
            }`}
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest">Caminho B</div>
            <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">{currentComparison.B}</h3>
            {charPosition === 'RIGHT' && !isConfirming && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-emerald-400 text-sm font-bold"
              >
                <CheckCircle2 size={16} /> Pressione ESPAÇO para escolher
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Character */}
        <motion.div 
          animate={{ 
            x: charPosition === 'LEFT' ? -300 : charPosition === 'RIGHT' ? 300 : 0,
            scale: isConfirming ? 1.5 : 1,
            opacity: isConfirming ? 0 : 1
          }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30"
        >
          <div className="relative">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-500 ${
              charPosition === 'LEFT' ? 'bg-blue-500' : charPosition === 'RIGHT' ? 'bg-emerald-500' : 'bg-slate-700'
            }`}>
              <User size={32} className="text-white" />
            </div>
            {/* Pulsing ring */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute inset-0 rounded-full border-2 ${
                charPosition === 'LEFT' ? 'border-blue-400' : charPosition === 'RIGHT' ? 'border-emerald-400' : 'border-slate-500'
              }`}
            />
          </div>
        </motion.div>

        {/* Floating Controls Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8 text-slate-500 text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-300"><ArrowLeft size={12} /></kbd>
            <span>Andar</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-300">Espaço</kbd>
            <span>Escolher</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-slate-300"><ArrowRight size={12} /></kbd>
            <span>Andar</span>
          </div>
        </div>
      </div>

      {/* Transition Overlay */}
      <AnimatePresence>
        {isConfirming && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-4"
            >
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">Processando Decisão...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
