

 
    
import React, { useState } from 'react';
import { RelationalStyle, QuizResult } from './types';
import { QUIZ_QUESTIONS, STYLE_DETAILS } from './constants';
import { getRelationalAnalysis } from './services/geminiService';

// --- Sub-components ---

const Header: React.FC = () => (
  <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
    <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M12 7v10"/><path d="M8 12h8"/></svg>
        </div>
        <span className="font-bold text-slate-800 text-xl tracking-tight">RelateFlow</span>
      </div>
      <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
        <a href="#about" className="hover:text-indigo-600 transition-colors">Sobre</a>
        <a href="#styles" className="hover:text-indigo-600 transition-colors">Estilos</a>
        <a href="#quiz" className="hover:text-indigo-600 transition-colors">Descobrir</a>
      </nav>
    </div>
  </header>
);

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 px-4">
    <div className="max-w-5xl mx-auto text-center">
      <div className="mb-6 pb-6 border-b border-slate-800">
        <h5 className="text-slate-300 font-bold mb-2 text-xs uppercase tracking-widest">Aviso Legal</h5>
        <p className="text-xs max-w-2xl mx-auto leading-relaxed opacity-60">
  Este aplicativo tem caráter exclusivamente educativo e reflexivo.<br />
  Ele não substitui terapia, psicanálise ou acompanhamento psicológico profissional.<br />
  Os resultados não constituem diagnóstico psicológico ou clínico.<br />
  Não coletamos dados sensíveis dos usuários. Se você estiver enfrentando dificuldades emocionais graves, procure um profissional de saúde mental.
</p>
      </div>
      <p className="text-sm">© 2024 RelateFlow - Abordagem Psicanálise & PNL</p>
      <div className="mt-4 flex justify-center gap-4 text-xs">
        <span>Baseado em Freud, Klein, Bandler e Grinder</span>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'quiz' | 'result'>('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<RelationalStyle[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);


const resetApp = () => {
  
  setView('home');
  setCurrentQuestion(0);
  setAnswers([]);
  setResult(null);
  setChatInput('');
  setAnalysis('');
  setIsAnalyzing(false);
 // 🔴 ESSENCIAL
};

  const startQuiz = () => {
    setView('quiz');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (style: RelationalStyle) => {
    const newAnswers = [...answers, style];
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: RelationalStyle[]) => {
    const scores = finalAnswers.reduce((acc, style) => {
      acc[style] = (acc[style] || 0) + 1;
      return acc;
    }, { [RelationalStyle.VISUAL]: 0, [RelationalStyle.AUDITORY]: 0, [RelationalStyle.KINESTHETIC]: 0 } as Record<RelationalStyle, number>);

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    
    setResult({
      scores,
      primary: sorted[0][0] as RelationalStyle,
      secondary: sorted[1][0] as RelationalStyle
    });
    setView('result');
  };

  const handleConsultAI = async () => {
  if (!result || isAnalyzing) return;

  setIsAnalyzing(true);

  const context =
    chatInput ||
    "Fale mais sobre o meu perfil combinado e como isso afeta minhas relações digitais.";

  const response = await getRelationalAnalysis(
  result.primary,
  result.secondary,
  context
);

setAnalysis(response);
setIsAnalyzing(false);
};
return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {view === 'home' && (
          <div className="animate-in fade-in duration-700">
            {/* Hero */}
            <section className="bg-gradient-to-br from-indigo-50 via-white to-rose-50 py-20 px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="serif text-4xl md:text-6xl text-slate-900 mb-6 leading-tight">
                  Como Descobrir Que Forma <br />
                  <span className="text-indigo-600 italic">Eu Me Relaciono</span>
                </h1>
                <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Uma jornada profunda unindo a <strong>Psicanálise</strong> e a <strong>Programação Neurolinguística (PNL)</strong> para transformar seus vínculos.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={startQuiz}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-indigo-700 transition-all transform hover:-translate-y-1"
                  >
                    Fazer o Teste de Perfil
                  </button>
                  <a 
                    href="#intro"
                    className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold hover:bg-slate-50 transition-all"
                  >
                    Ler Prefácio
                  </a>
                </div>
              </div>
            </section>

            {/* Introduction Content */}
            <section id="intro" className="py-20 px-4 max-w-3xl mx-auto">
              <h2 className="serif text-3xl text-slate-900 mb-8 border-l-4 border-indigo-600 pl-4">Apresentação</h2>
              <div className="prose prose-slate lg:prose-lg space-y-6 text-slate-600 leading-relaxed">
                <p>
                  Relacionar-se é uma arte complexa. Desde os primeiros anos de vida, buscamos no outro uma resposta para nossas necessidades emocionais: ser acolhido, ouvido, visto, reconhecido.
                </p>
                <p>
                  A psicanálise nos ensina que repetimos padrões inconscientes. A PNL nos oferece um mapa prático através dos canais: <strong>Visual, Auditivo e Cinestésico</strong>.
                </p>
                <div className="grid md:grid-cols-3 gap-6 my-12">
                  <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <div className="text-indigo-600 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">Visual</h4>
                    <p className="text-sm">Vive por meio das imagens, detalhes e expressões.</p>
                  </div>
                  <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <div className="text-rose-600 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5.6a4.5 4.5 0 1 0-4.9 8.2l5.1 4 5.1-4a4.5 4.5 0 1 0-4.9-8.2L12 6.5Z"/><path d="m15 2 4 4"/><path d="m20 2-4 4"/></svg>
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">Auditivo</h4>
                    <p className="text-sm">Organiza o mundo através da palavra, música e diálogo.</p>
                  </div>
                  <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                    <div className="text-teal-600 mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/><path d="M12 9v12"/></svg>
                    </div>
                    <h4 className="font-bold text-slate-800 mb-2">Cinestésico</h4>
                    <p className="text-sm">Conecta-se pelo corpo, toque e sensações físicas.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {view === 'quiz' && (
          <section className="py-20 px-4 bg-slate-50 min-h-[60vh]">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-300" 
                    style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium">Questão {currentQuestion + 1} de {QUIZ_QUESTIONS.length}</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 animate-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-2xl font-bold text-slate-800 mb-8">{QUIZ_QUESTIONS[currentQuestion].question}</h3>
                <div className="space-y-4">
                  {QUIZ_QUESTIONS[currentQuestion].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt.style)}
                      className="w-full text-left p-5 rounded-2xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all group flex items-center justify-between"
                    >
                      <span className="text-slate-700 font-medium group-hover:text-indigo-700">{opt.text}</span>
                      <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-indigo-600 flex items-center justify-center transition-colors">
                        <div className="w-2 h-2 rounded-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {view === 'result' && result && (
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              {/* Disclaimer before results */}
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl mb-12 flex gap-4 items-start animate-in fade-in duration-700">
                <div className="text-amber-600 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </div>
                <div className="text-sm text-amber-900">
                  <p className="font-bold mb-1">Informação Importante</p>
                  <p>Este teste tem caráter educativo e reflexivo. Ele ajuda a identificar tendências sensoriais e padrões, mas não substitui uma avaliação profissional de um psicólogo ou psicanalista. Não coletamos nem armazenamos dados sensíveis de sua navegação.</p>
                </div>
              </div>

              <div className="text-center mb-12">
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">Resultado</span>
                <h2 className="serif text-4xl text-slate-900 mt-4">Seu Perfil Relacional é Misto</h2>
                <p className="text-slate-500 mt-2">Você manifesta predominantemente dois estilos que se complementam.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Primary Card */}
                <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"/></svg>
                  </div>
                  <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Predominante</span>
                  <h3 className="text-3xl font-bold mt-2 mb-4">{STYLE_DETAILS[result.primary].title}</h3>
                  <div className="space-y-4 text-indigo-50">
                    <p><strong>PNL:</strong> {STYLE_DETAILS[result.primary].pnl}</p>
                    <p><strong>Psicanálise:</strong> {STYLE_DETAILS[result.primary].psycho}</p>
                  </div>
                </div>

                {/* Secondary Card */}
                <div className="bg-white border-2 border-indigo-100 p-8 rounded-3xl shadow-lg relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform text-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/></svg>
                  </div>
                  <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Secundário</span>
                  <h3 className="text-3xl font-bold mt-2 mb-4 text-slate-800">{STYLE_DETAILS[result.secondary].title}</h3>
                  <div className="space-y-4 text-slate-600">
                    <p><strong>PNL:</strong> {STYLE_DETAILS[result.secondary].pnl}</p>
                    <p><strong>Psicanálise:</strong> {STYLE_DETAILS[result.secondary].psycho}</p>
                  </div>
                </div>
              </div>

              {/* Digital Context Section */}
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 mb-12">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                   No Mundo Digital
                </h4>
                <p className="text-slate-600 italic">"{STYLE_DETAILS[result.primary].digital}"</p>
                <p className="text-slate-500 text-sm mt-4">
                  Como você também é {STYLE_DETAILS[result.secondary].title}, busca equilibrar a visão tecnológica com a {result.secondary === RelationalStyle.KINESTHETIC ? 'proximidade emocional' : 'clareza da fala'}.
                </p>
              </div>

              {/* AI Coaching Integration */}
              <div className="bg-white border-2 border-rose-100 p-8 rounded-3xl shadow-sm mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Analista Relacional (AI)</h4>
                    <p className="text-xs text-slate-500">Aprofunde seu autoconhecimento</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">Pergunte algo específico sobre seus desafios nos relacionamentos atuais:</p>
                  <textarea 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ex: Por que sinto que meu parceiro não me escuta mesmo eu mandando fotos?"
                    className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-rose-200 outline-none transition-all h-24"
                  />
                  <button
                    onClick={handleConsultAI}
                    disabled={isAnalyzing}
                    className="bg-rose-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-rose-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isAnalyzing ? 'Analisando...' : 'Obter Análise Profunda'}
                    {!isAnalyzing && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>}
                  </button>
                </div>
{analysis && (
  <div className="mt-8 p-6 bg-rose-50 border border-rose-100 rounded-2xl text-slate-800 leading-relaxed animate-in fade-in slide-in-from-top-2">

    <div className="flex items-center gap-2 mb-3 text-rose-600 font-bold text-xs uppercase tracking-widest">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2v20" />
      </svg>
      <span>Análise Sistêmica</span>
    </div>

    <p className="whitespace-pre-wrap mb-4">{analysis}</p>

    </div>
)}







              </div>

              <div className="text-center">
                <button 
                  onClick={resetApp}
                  className="text-slate-400 hover:text-indigo-600 font-medium transition-colors"
                >
                  Voltar ao Início
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
