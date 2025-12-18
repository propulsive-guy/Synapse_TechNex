import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { ProcessedFund } from '../utils/fundApi';
import CandleChart from './CandleChart';

interface FundDetailViewProps {
  fund: ProcessedFund;
  onClose: () => void;
}

interface ChatMessage {
  role: 'user' | 'sarthi';
  content: string;
  timestamp?: string;
}

const FundDetailView: React.FC<FundDetailViewProps> = ({ fund, onClose }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'1y' | '3y' | '5y' | 'all'>('1y');
  const [sipAmount, setSipAmount] = useState<string>('');
  const [fundSizeInput, setFundSizeInput] = useState<string>(fund.fundSizeCr?.toString() || '');
  const [categoryInput, setCategoryInput] = useState<string>(fund.category || '');
  const [subCategoryInput, setSubCategoryInput] = useState<string>(fund.subCategory || '');
  const [isSubmitted, setIsSubmitted] = useState(true); // Auto-submit on mount
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'sarthi', content: `Welcome! I'm Sarthi, your wealth advisor. I'm here to help you understand the ${fund.name}. Ask me anything about this fund!`, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Detect dark/light mode
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Log when fund modal opens with candlestick chart
  useEffect(() => {
    console.log(`📊 Fund Modal Opened - Scheme Code: ${fund.schemeCode}, Fund: ${fund.name}, Auto-displaying Candlestick Chart`);
  }, [fund.schemeCode, fund.name]);

  const getReturnValue = (period: '1y' | '3y' | '5y'): number => {
    switch (period) {
      case '1y':
        return fund.returns1y;
      case '3y':
        return fund.returns3y;
      case '5y':
        return fund.returns5y;
      default:
        return fund.returns3y;
    }
  };

  const getRiskColor = (risk: string): string => {
    switch (risk) {
      case 'Low':
        return '#00FF41';
      case 'Moderate':
        return '#FFB800';
      case 'High':
        return '#FF6B00';
      case 'Very High':
        return '#FF0000';
      default:
        return '#FFFFFF';
    }
  };

  const handleSubmitParameters = () => {
    if (!sipAmount.trim()) {
      alert('Please enter SIP Amount');
      return;
    }
    setIsSubmitted(true);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInputValue('');
    setIsTyping(true);

    // Build investment context from user inputs
    const investmentContext = {
      schemeCode: fund.schemeCode,
      schemeName: fund.name,
      sipAmount: sipAmount ? parseFloat(sipAmount) : null,
      fundSize: fundSizeInput ? parseFloat(fundSizeInput) : fund.fundSizeCr,
      category: categoryInput,
      subCategory: subCategoryInput,
      selectedPeriod,
      userQuery: userMessage
    };

    // Simulate Sarthi response with user context
    setTimeout(() => {
      const responses = [
        `The ${fund.name} has shown excellent performance with ${getReturnValue(selectedPeriod).toFixed(2)}% returns over the ${selectedPeriod} period. This fund's category is ${categoryInput}. For your SIP of ₹${sipAmount || 'any amount'}, you'll benefit from rupee-cost averaging.`,
        `With an expense ratio of ${fund.expenseRatio.toFixed(2)}%, this is a competitive offering in the ${subCategoryInput} segment. The fund's alpha of ${fund.alpha.toFixed(2)}% indicates outperformance vs benchmarks.`,
        `For a fund size of ₹${fundSizeInput || fund.fundSizeCr}Cr, ${fund.name} offers good liquidity. Your SIP amount of ₹${sipAmount || 'N/A'} would accumulate nicely with the fund's ${fund.risk} risk profile.`,
        `Given your interest in the ${categoryInput} category, specifically ${subCategoryInput}, this fund is well-positioned. The Sharpe ratio and other metrics suggest good risk-adjusted returns for your profile.`,
        `The AMC ${fund.amc} manages this fund with a ${fund.rating}/5 rating. With your investment parameters (SIP: ₹${sipAmount || 'N/A'}, Fund Size: ₹${fundSizeInput || fund.fundSizeCr}Cr), this appears to be a solid choice.`
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, { 
        role: 'sarthi', 
        content: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
      <div className="glass border border-white/20 rounded-[32px] w-full max-w-[92vw] max-h-[95vh] overflow-hidden relative flex bg-black/60">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-all z-20"
        >
          <X size={24} className="text-white" />
        </button>

        {/* LEFT PANEL - Returns & Metrics & Chatbot */}
        <div className="w-1/2 p-5 flex flex-col gap-4 bg-gradient-to-br from-gray-950 to-black overflow-y-auto fund-detail-scroll">
          {/* Returns Output */}
          {isSubmitted && (
            <div className="space-y-2.5">
              <h3 className="text-xs text-gray-200 font-black uppercase tracking-widest">Expected Returns</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="glass border border-white/20 rounded-[10px] p-2.5 bg-white/5">
                  <div className="text-[7px] text-gray-400 font-black uppercase tracking-widest mb-1">1Y Return</div>
                  <div className="text-lg font-black text-green-400">{fund.returns1y.toFixed(2)}%</div>
                </div>
                <div className="glass border border-white/20 rounded-[10px] p-2.5 bg-white/5">
                  <div className="text-[7px] text-gray-400 font-black uppercase tracking-widest mb-1">3Y Return</div>
                  <div className="text-lg font-black text-green-400">{fund.returns3y.toFixed(2)}%</div>
                </div>
                <div className="glass border border-white/20 rounded-[10px] p-2.5 bg-white/5">
                  <div className="text-[7px] text-gray-400 font-black uppercase tracking-widest mb-1">5Y Return</div>
                  <div className="text-lg font-black text-green-400">{fund.returns5y.toFixed(2)}%</div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="glass border border-white/20 rounded-[10px] p-2.5 bg-white/5">
                  <div className="text-[7px] text-gray-400 font-black uppercase tracking-widest mb-1">Alpha</div>
                  <div className="text-lg font-black text-white">+{fund.alpha.toFixed(2)}%</div>
                </div>
                <div className="glass border border-white/20 rounded-[10px] p-2.5 bg-white/5">
                  <div className="text-[7px] text-gray-400 font-black uppercase tracking-widest mb-1">Beta</div>
                  <div className="text-lg font-black text-white">{fund.beta.toFixed(2)}</div>
                </div>
                <div className="glass border border-white/20 rounded-[10px] p-2.5 bg-white/5">
                  <div className="text-[7px] text-gray-400 font-black uppercase tracking-widest mb-1">Expense Ratio</div>
                  <div className="text-lg font-black text-white">{fund.expenseRatio.toFixed(2)}%</div>
                </div>
                <div className="glass border border-white/20 rounded-[10px] p-2.5 bg-white/5">
                  <div className="text-[7px] text-gray-400 font-black uppercase tracking-widest mb-1">Std Dev</div>
                  <div className="text-lg font-black text-white">{fund.stdDev.toFixed(2)}</div>
                </div>
              </div>
            </div>
          )}

          {/* Sarthi Chatbot */}
          <div className="flex-1 flex flex-col gap-2 min-h-0">
            <h3 className="text-xs text-gray-200 font-black uppercase tracking-widest">Sarthi - Fund Advisor</h3>
            
            {/* Chat Messages */}
            <div
              ref={scrollRef}
              className="flex-1 glass border border-white/20 rounded-[12px] p-3 space-y-2 overflow-y-auto bg-white/5 fund-detail-scroll"
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-[10px] px-3 py-1.5 ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white font-semibold'
                        : isDarkMode
                        ? 'glass border border-white/20 bg-white/10 text-white'
                        : 'glass border border-gray-300 bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-[9px] leading-relaxed">{msg.content}</p>
                    {msg.timestamp && (
                      <p className="text-[7px] mt-1 opacity-60">{msg.timestamp}</p>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="glass border border-white/20 rounded-[12px] px-4 py-2.5 bg-white/10">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-white animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about this fund..."
                className={`flex-1 border rounded-[12px] px-4 py-2.5 placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all text-sm font-semibold ${
                  isDarkMode
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-900'
                }`}
              />
              <button
                onClick={handleSendMessage}
                className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-[12px] transition-all font-bold"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Fund Info & Chart */}
        <div className="w-1/2 p-3 space-y-1.5 border-l border-white/20 overflow-y-auto bg-gradient-to-br from-gray-900 to-black flex flex-col fund-detail-scroll">
          {/* Fund Header - Compact */}
          <div className="space-y-1 flex-shrink-0">
            <div className="flex items-start gap-2">
              <div className="w-10 h-10 rounded-[10px] glass border border-white/20 flex items-center justify-center flex-shrink-0 bg-white/5">
                <img
                  src={`https://picsum.photos/seed/${fund.amc}/100`}
                  alt={fund.amc}
                  className="w-6 h-6 object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-sm font-black tracking-tighter uppercase text-white mb-0.5 line-clamp-1">
                  {fund.name}
                </h1>
                <p className="text-[7px] text-gray-300 font-bold uppercase tracking-widest">
                  {fund.amc}
                </p>
              </div>
            </div>

            {/* Key Stats - Compact */}
            <div className="grid grid-cols-3 gap-1">
              <div className="glass border border-white/20 rounded-[10px] p-1.5 bg-white/5">
                <span className="text-[6px] text-gray-400 font-black uppercase tracking-widest block mb-0.5">
                  Current NAV
                </span>
                <span className="text-xs font-black text-white">₹{fund.nav.toFixed(0)}</span>
              </div>

              <div className="glass border border-white/20 rounded-[10px] p-1.5 bg-white/5">
                <span className="text-[6px] text-gray-400 font-black uppercase tracking-widest block mb-0.5">
                  Risk
                </span>
                <span className="text-xs font-black" style={{ color: getRiskColor(fund.risk) }}>
                  {fund.risk.slice(0, 3)}
                </span>
              </div>

              <div className="glass border border-white/20 rounded-[10px] p-1.5 bg-white/5">
                <span className="text-[6px] text-gray-400 font-black uppercase tracking-widest block mb-0.5">
                  Rating
                </span>
                <div className="flex gap-0.25">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-xs ${i < fund.rating ? 'text-yellow-500' : 'text-gray-600'}`}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Growth Trajectory Chart - Candlestick - MAXIMUM HEIGHT */}
          <div className="flex-1 min-h-0 overflow-hidden rounded-[12px] glass border border-white/20 bg-black">
            <CandleChart fund={fund} />
          </div>

          {/* Investment Details Section - Below Chart */}
          <div className="space-y-3 mt-2 pt-3 border-t border-white/20">
            <h3 className="text-xs text-gray-200 font-black uppercase tracking-widest">Investment Details</h3>
            
            {/* SIP Amount */}
            <div>
              <label className="text-[8px] text-gray-400 font-black uppercase tracking-widest block mb-2">
                SIP Amount (₹)
              </label>
              <input
                type="number"
                value={sipAmount}
                onChange={(e) => setSipAmount(e.target.value)}
                placeholder="Enter monthly SIP amount"
                className="w-full bg-white/10 border border-white/20 rounded-[10px] px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all text-sm font-semibold"
              />
            </div>

            {/* Fund Age */}
            <div>
              <label className="text-[8px] text-gray-400 font-black uppercase tracking-widest block mb-2">
                Fund Age (Years)
              </label>
              <input
                type="number"
                value={fundSizeInput}
                onChange={(e) => setFundSizeInput(e.target.value)}
                placeholder={`Default: ${fund.fundAgeYr}`}
                className="w-full bg-white/10 border border-white/20 rounded-[10px] px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all text-sm font-semibold"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-[8px] text-gray-400 font-black uppercase tracking-widest block mb-2">
                Category
              </label>
              <input
                type="text"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                placeholder={fund.category}
                className="w-full bg-white/10 border border-white/20 rounded-[10px] px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all text-sm font-semibold"
              />
            </div>

            {/* Sub Category */}
            <div>
              <label className="text-[8px] text-gray-400 font-black uppercase tracking-widest block mb-2">
                Sub Category
              </label>
              <input
                type="text"
                value={subCategoryInput}
                onChange={(e) => setSubCategoryInput(e.target.value)}
                placeholder={fund.subCategory}
                className="w-full bg-white/10 border border-white/20 rounded-[10px] px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all text-sm font-semibold"
              />
            </div>

            {/* Analyze Fund Button */}
            <div className="flex justify-end pr-20">
              <button
                onClick={handleSubmitParameters}
                className="bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest py-1.5 px-6 rounded-[8px] transition-all text-[10px]"
              >
                Analyze
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundDetailView;
