import React, { useState } from 'react';
import { ProcessedFund } from '../utils/fundApi';

interface CandleChartProps {
  fund: ProcessedFund;
}

// Symbol mapping for mutual funds to TradingView tickers
const FUND_TRADINGVIEW_SYMBOLS: Record<string, string> = {
  'QUANT SMALL CAP': 'NSE:NIFTY50',
  'ICICI PRU BLUECHIP FUND': 'NSE:ICICIPRUGRO',
  'ICICI PRU EQUITY & DEBT FUND': 'NSE:ICICIPRUGRO',
  'ADITYA BIRLA SL CREDIT RISK FUND': 'NSE:ADANIPORTS',
  'HDFC EQUITY FUND': 'NSE:HDFCBANK',
  'HDFC TAX SAVER FUND': 'NSE:HDFCBANK',
  'RELIANCE EQUITY FUND': 'NSE:RELIANCE',
  'AXIS LONG TERM EQUITY FUND': 'NSE:AXISBANK',
  'AXIS EQUITY FUND': 'NSE:AXISBANK',
  'INVESCO INDIA TAX PLAN': 'NSE:TCS',
  'ADITYA BIRLA': 'NSE:ADANIPORTS',
  'NIPPON INDIA': 'NSE:TCS',
  'KOTAK EQUITY': 'NSE:KOTAKBANK',
  'FRANKLIN INDIA': 'NSE:BAJAJFINSV',
  'SBI BLUECHIP': 'NSE:SBIN',
  'MIRAE ASSET': 'NSE:MARUTI',
  'HSBC EQUITY': 'NSE:HDFCBANK',
  'CANARA ROBECO': 'NSE:CANBK',
};

// Helper to generate TradingView widget HTML
function getTradingViewWidgetHtml(symbol: string, interval: string) {
  return (
    '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
    '<style>body { background: #000; margin: 0; padding: 0; } #tradingview_widget { width: 100%; height: 100%; }</style>' +
    '</head>' +
    '<body>' +
    '<div id="tradingview_widget"></div>' +
    '<script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>' +
    '<script type="text/javascript">' +
    'try {' +
    '  new TradingView.widget({' +
    '    container_id: "tradingview_widget",' +
    '    width: "100%",' +
    '    height: "100%",' +
    '    symbol: "' + symbol + '",' +
    '    interval: "' + interval + '",' +
    '    timezone: "Asia/Kolkata",' +
    '    theme: "dark",' +
    '    style: "1",' +
    '    locale: "en",' +
    '    backgroundColor: "#000",' +
    '    gridColor: "#fff",' +
    '    hide_top_toolbar: true,' +
    '    hide_legend: true,' +
    '    hide_side_toolbar: true,' +
    '    withdateranges: true,' +
    '    allow_symbol_change: false,' +
    '    save_image: false,' +
    '    studies: [],' +
    '    support_host: "https://www.tradingview.com"' +
    '  });' +
    '} catch(e) { console.error("Widget error:", e); }' +
    '</script>' +
    '</body>' +
    '</html>'
  );
}

const timeRanges = ['1M', '6M', '1Y', '3Y', '5Y', 'ALL'];
const intervalMap: Record<string, string> = {
  '1M': 'D', // Daily
  '6M': 'W', // Weekly
  '1Y': 'M', // Monthly
  '3Y': 'M',
  '5Y': 'M',
  'ALL': 'M',
};

const CandleChart: React.FC<CandleChartProps> = ({ fund }) => {
  const [selectedRange, setSelectedRange] = useState<string>('1Y');
  const [chartKey, setChartKey] = useState(0); // Force iframe reload

  // Get symbol from fund name
  const fundNameUpper = fund.name.toUpperCase();
  let tradingViewSymbol = FUND_TRADINGVIEW_SYMBOLS[fundNameUpper];
  
  // If no exact match, try partial matching
  if (!tradingViewSymbol) {
    for (const [key, symbol] of Object.entries(FUND_TRADINGVIEW_SYMBOLS)) {
      if (fundNameUpper.includes(key)) {
        tradingViewSymbol = symbol;
        break;
      }
    }
  }
  
  // Default to NIFTY if still no match
  if (!tradingViewSymbol) {
    tradingViewSymbol = 'NIFTY';
  }

  const tradingViewInterval = intervalMap[selectedRange] || 'M';

  // When time range changes, reload the chart
  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
    setChartKey((k) => k + 1); // Force iframe reload
  };

  return (
    <div className="w-full h-full">
      {/* TradingView Chart Container - Full height */}
      <div className="w-full h-full overflow-hidden">
        <iframe
          key={chartKey}
          srcDoc={getTradingViewWidgetHtml(tradingViewSymbol, tradingViewInterval)}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '16px',
            backgroundColor: '#000000',
            display: 'block',
          }}
          title="TradingView Chart"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

export default CandleChart;
