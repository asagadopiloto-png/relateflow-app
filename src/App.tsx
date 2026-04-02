import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Info, Shield, ChevronRight, ArrowLeft, Send, Sparkles, Menu, X, Eye, ArrowUp } from 'lucide-react';
import { questions } from './data/quizQuestions';
import { profileTexts } from './data/profileTexts';

// --- Components ---

const Header = () => (
  <header className="bg-white py-4 px-6">
    <div className="max-w-5xl mx-auto">
      <Link to="/" className="text-slate-900 font-bold text-lg tracking-tight">
        EMO VÍNCULO
      </Link>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-[#0f172a] text-white py-12 px-6">
    <div className="max-w-2xl mx-auto text-center space-y-4">
      <h3 className="font-bold text-sm tracking-widest uppercase">AVISO LEGAL</h3>
      <div className="text-[10px] md:text-xs text-slate-400 leading-relaxed space-y-2">
        <p>Este aplicativo tem caráter exclusivamente educativo e reflexivo.</p>
        <p>Ele não substitui terapia, psicanálise ou acompanhamento psicológico profissional.</p>
        <p>Os resultados não constituem diagnóstico psicológico ou clínico.</p>
        <p>Não coletamos dados sensíveis dos usuários. Se você estiver enfrentando dificuldades emocionais graves, procure um profissional de saúde mental.</p>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const Home = () => (
  <div className="max-w-4xl mx-auto px-6 py-16">
    <section className="text-center mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-serif text-[#0f172a] mb-2">
          Como Descobrir Que Forma
        </h1>
        <h2 className="text-4xl md:text-6xl font-serif italic text-indigo-600 mb-8">
          Eu Me Relaciono
        </h2>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Um espaço estruturado de reflexão educativa para ampliar a percepção sobre vínculos e interações ao longo da vida.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/quiz" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg shadow-indigo-100"
          >
            Fazer o Teste de Perfil
          </Link>
          <Link 
            to="/apresentacao" 
            className="bg-white border border-slate-200 text-slate-600 px-10 py-4 rounded-full font-bold hover:bg-slate-50 transition-all"
          >
            Ler Prefácio
          </Link>
        </div>
      </motion.div>
    </section>

    <section className="mb-24">
      <div className="flex gap-4 mb-8">
        <div className="w-1 bg-indigo-600 rounded-full" />
        <h2 className="text-3xl font-serif text-[#0f172a]">Apresentação</h2>
      </div>
      
      <div className="space-y-8 text-slate-600 leading-relaxed text-lg">
        <p>
          Relacionar-se é uma arte complexa. Desde os primeiros anos de vida, buscamos no outro uma resposta para nossas necessidades emocionais: ser acolhido, ouvido, visto, reconhecido.
        </p>
        <p>
          Estudos teóricos da Psicanálise e da Programação Neurolinguística (PNL) descrevem padrões de percepção e comunicação que ajudam a compreender estilos de interação: <span className="font-bold text-slate-800">Visual, Auditivo e Cinestésico.</span>
        </p>
      </div>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
      <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
          <Eye className="text-indigo-600 w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-900 mb-4">Visual</h3>
        <p className="text-sm text-slate-500 leading-relaxed">Vive por meio das imagens, detalhes e expressões.</p>
      </div>
      
      <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center mb-6">
          <Heart className="text-pink-500 w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-900 mb-4">Auditivo</h3>
        <p className="text-sm text-slate-500 leading-relaxed">Organiza o mundo através da palavra, música e diálogo.</p>
      </div>
      
      <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
          <ArrowUp className="text-emerald-600 w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-900 mb-4">Cinestésico</h3>
        <p className="text-sm text-slate-500 leading-relaxed">Conecta-se pelo corpo, toque e sensações físicas.</p>
      </div>
    </section>
  </div>
);

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate result
      const counts: any = { visual: 0, auditory: 0, kinesthetic: 0 };
      newAnswers.forEach(a => counts[a]++);
      
      const sorted = Object.entries(counts).sort((a: any, b: any) => b[1] - a[1]);
      const profile = sorted[0][0];
      const secondary = sorted[1][0];
      
      navigate('/resultado', { state: { profile, secondary } });
    }
  };

  const question = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Questão {currentStep + 1} de {questions.length}</span>
        <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500" 
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-slate-900">{question.text}</h2>
          
          <div className="grid grid-cols-1 gap-4">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.type)}
                className="p-6 text-left bg-white border border-slate-200 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 group-hover:text-indigo-900">{option.text}</span>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600" />
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<string>('');
  const [secondary, setSecondary] = useState<string>('');
  const [userText, setUserText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const state = location.state as { profile: string; secondary: string };
    if (state) {
      setProfile(state.profile);
      setSecondary(state.secondary);
    } else {
      navigate('/');
    }
  }, [location, navigate]);

  const getAnalysis = async () => {
    if (!userText.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, secondary, userText })
      });
      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return null;

  const mainProfile = (profileTexts as any)[profile];
  const secProfile = (profileTexts as any)[secondary];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Resultado</h1>
        <p className="text-slate-600">Seu Perfil Relacional é Misto</p>
        <p className="text-sm text-slate-400">Você manifesta predominantemente dois estilos que se complementam.</p>
      </header>

      <div className="space-y-6 mb-12">
        <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Predominante</span>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{mainProfile.title}</h2>
          <p className="text-slate-700 mb-4">{mainProfile.pnl}</p>
          <p className="text-slate-600 italic border-l-2 border-indigo-200 pl-4">{mainProfile.psicanalise}</p>
        </div>

        <div className="p-8 bg-white rounded-3xl border border-slate-200">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Secundário</span>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{secProfile.title}</h2>
          <p className="text-slate-700 mb-4">{secProfile.pnl}</p>
          <p className="text-slate-600 italic border-l-2 border-slate-200 pl-4">{secProfile.psicanalise}</p>
        </div>
      </div>

      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="text-indigo-400 w-6 h-6" />
          <h3 className="text-xl font-bold">Obter Reflexão Educacional</h3>
        </div>
        <p className="text-slate-300 mb-6">
          Escreva abaixo sobre como você se sente em seus relacionamentos ou uma dúvida específica. Nossa IA, baseada nos conceitos do EMO VÍNCULO, trará uma reflexão para você.
        </p>
        <textarea
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          placeholder="Ex: Sinto que às vezes não sou compreendido quando falo..."
          className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none mb-4 min-h-[120px]"
        />
        <button
          onClick={getAnalysis}
          disabled={loading || !userText.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {loading ? "Processando..." : <><Send className="w-4 h-4" /> Gerar Reflexão</>}
        </button>

        {analysis && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-slate-800 rounded-2xl border border-indigo-500/30"
          >
            <div className="flex items-center gap-2 mb-4 text-indigo-400 text-sm font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Reflexão Educacional</span>
            </div>
            <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">{analysis}</p>
          </motion.div>
        )}
      </section>

      <div className="mt-12 text-center">
        <button 
          onClick={() => navigate('/')}
          className="text-slate-400 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao Início
        </button>
      </div>
    </div>
  );
};

const Apresentacao = () => (
  <div className="max-w-3xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-serif font-light text-slate-900 mb-8">Apresentação do <span className="text-indigo-600">emovinculo.org</span></h1>
    
    <div className="space-y-12 text-slate-700 leading-relaxed">
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Ética e Missão</h2>
        <p>O EMO VÍNCULO nasce da necessidade de oferecer um espaço seguro e ético para a reflexão sobre a comunicação emocional. Nossa missão é divulgar conhecimento sem prometer o que não é, mantendo um posicionamento claro e forte sobre os limites da tecnologia e da educação.</p>
        <p className="mt-4">Explicando para o leigo: imagine um mapa que ajuda você a entender como você "ouve" e "vê" o mundo nas suas relações, antes de decidir o próximo passo.</p>
      </section>

      <section className="bg-slate-50 p-8 rounded-3xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Por que o EMO VÍNCULO é necessário hoje?</h2>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 shrink-0" />
            <span><strong>Falta de autoconhecimento:</strong> Sem acesso ao autoconhecimento, as pessoas ficam presas em padrões repetitivos.</span>
          </li>
          <li className="flex gap-3">
            <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 shrink-0" />
            <span><strong>Profissionais sobrecarregados:</strong> Pouco tempo de escuta em consultas rápidas gera a necessidade de uma preparação prévia do sujeito.</span>
          </li>
          <li className="flex gap-3">
            <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 shrink-0" />
            <span><strong>Excesso de informações rasas:</strong> Pessoas vulneráveis ficam ainda mais vulneráveis com conteúdos sem base teórica na internet.</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Como funciona o emovinculo.org</h2>
        <p className="mb-4">Atuamos na organização da comunicação emocional e na preparação para a busca por ajuda profissional. É um diferencial importante: não entregamos respostas prontas, entregamos reflexões que evitam o fechamento do pensamento.</p>
        <div className="p-6 border-l-4 border-emerald-500 bg-emerald-50 rounded-r-2xl">
          <h3 className="font-bold text-emerald-900 mb-2">Impacto Social</h3>
          <p className="text-emerald-800">Alcançamos pessoas comuns em sofrimento relacional que muitas vezes não vivem uma crise clínica, mas precisam de clareza, especialmente em comunidades com pouco acesso à saúde mental.</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">O que o EMO VÍNCULO NÃO É</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <li className="p-4 bg-red-50 text-red-800 rounded-xl border border-red-100">Não é psicanálise clínica</li>
          <li className="p-4 bg-red-50 text-red-800 rounded-xl border border-red-100">Não é terapia</li>
          <li className="p-4 bg-red-50 text-red-800 rounded-xl border border-red-100">Não é atendimento médico ou psiquiátrico</li>
          <li className="p-4 bg-red-50 text-red-800 rounded-xl border border-red-100">Não é ferramenta de crise (risco iminente)</li>
        </ul>
      </section>
    </div>
  </div>
);

const PoliticaPrivacidade = () => (
  <div className="max-w-3xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold text-slate-900 mb-8">Política de Privacidade</h1>
    <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
      <section>
        <h2 className="text-xl font-bold text-slate-900">1. Segurança e Desempenho</h2>
        <p>Nosso compromisso é com a integridade do usuário. O aplicativo foi desenvolvido com foco em segurança e desempenho, sem fins publicitários ou de rastreamento do indivíduo.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">6. Segurança das Informações</h2>
        <p>Adotamos medidas técnicas e organizacionais para proteger as informações contra acesso não autorizado, perda ou uso indevido.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">7. Público-Alvo</h2>
        <p>O aplicativo é destinado ao público adulto. Caso o usuário esteja passando por sofrimento emocional intenso, recomenda-se buscar um profissional de saúde mental.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">8. Alterações nesta Política</h2>
        <p>Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que o usuário revise regularmente.</p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900">9. Contato</h2>
        <p>Em caso de dúvidas sobre esta Política de Privacidade, entre em contato pelo site oficial do projeto.</p>
      </section>

      <p className="pt-8 text-sm text-slate-400"><strong>Última atualização:</strong> 2025</p>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/resultado" element={<Result />} />
            <Route path="/apresentacao" element={<Apresentacao />} />
            <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

