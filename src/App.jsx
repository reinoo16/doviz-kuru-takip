import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState('');
  const [currency1, setCurrency1] = useState('TRY');
  const [currency2, setCurrency2] = useState('EUR');
  const [result, setResult] = useState(null)

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => setRates(data.rates));
  }, []);

  const handleConvert = () => {
    if (amount && currency1 && currency2 && rates[currency1] && rates[currency2]) {
      const convertedAmount = (amount / rates[currency1]) * rates[currency2];
      setResult(convertedAmount.toFixed(2));
    }
  }

  return (
    <div className='flex items-center justify-center w-full h-screen px-[20px]'>
      <div className='flex flex-col items-center gap-[50px] w-full'>
        <h1 className='hidden md:inline-block text-[40px] font-bold text-center'>Döviz Kuru Takip Uygulaması</h1>
        <div className='relative flex flex-col items-center gap-[50px] mx-auto w-full md:w-[646px]'>
          <div className='flex items-center justify-center w-full h-[317px] rounded-[18px] bg-black'>
            <ul className='flex flex-col gap-[14px]'>
              <li className='text-[20px] text-white70 font-medium'><span className='text-green'>USD/EUR:</span> {rates['EUR'] ? rates['EUR'].toFixed(2) : 'Yükleniyor...'} EUR</li>
              <li className='text-[20px] text-white70 font-medium'><span className='text-green'>USD/TRY:</span> {rates['TRY'] ? rates['TRY'].toFixed(2) : 'Yükleniyor...'} TRY</li>
              <li className='text-[20px] text-white70 font-medium'><span className='text-green'>EUR/TRY:</span> {rates['TRY'] && rates['EUR'] ? (rates['TRY'] / rates['EUR']).toFixed(2) : 'Yükleniyor...'} TRY</li>
              <li className='text-[20px] text-white70 font-medium'><span className='text-green'>GBP/USD:</span> {rates['GBP'] ? (1 / rates['GBP']).toFixed(2) : 'Yükleniyor...'} USD</li>
              <li className='text-[20px] text-white70 font-medium'><span className='text-green'>EUR/GBP:</span> {rates['EUR'] && rates['GBP'] ? (rates['GBP'] / rates['EUR']).toFixed(2) : 'Yükleniyor...'} GBP</li>
            </ul>
          </div>
          <div className='flex flex-col sm:flex-row items-center gap-[12px] justify-between w-full'>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Miktar' className='text-white text-[16px] placeholder:text-white50 outline-none bg-black px-[18px] w-full lg:w-[220px] h-[48px] rounded-[24px]' type="number" />
            <div className='flex items-center justify-between w-full gap-[12px]'>
              <div className='relative w-full'>
                <div onClick={() => setDropdown1(!dropdown1)} className='flex items-center justify-center rounded-[24px] cursor-pointer px-[18px] bg-black h-[48px] w-full sm:w-[110px]'>
                  <div className='flex items-center justify-between w-full'>
                    <span className='font-medium text-[16px]'>{currency1}</span>
                    <svg className={`transition-all duration-300 ${dropdown1 ? 'rotate-180' : null}`} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.4403 4.06524C1.48094 4.0245 1.52922 3.99217 1.58237 3.97011C1.63552 3.94806 1.6925 3.93671 1.75005 3.93671C1.8076 3.93671 1.86458 3.94806 1.91773 3.97011C1.97088 3.99217 2.01916 4.0245 2.0598 4.06524L7.00005 9.00636L11.9403 4.06524C11.981 4.02456 12.0293 3.99229 12.0824 3.97028C12.1356 3.94827 12.1925 3.93694 12.25 3.93694C12.3076 3.93694 12.3645 3.94827 12.4177 3.97028C12.4708 3.99229 12.5191 4.02456 12.5598 4.06524C12.6005 4.10592 12.6327 4.15421 12.6548 4.20735C12.6768 4.2605 12.6881 4.31746 12.6881 4.37499C12.6881 4.43251 12.6768 4.48948 12.6548 4.54262C12.6327 4.59577 12.6005 4.64406 12.5598 4.68474L7.3098 9.93474C7.26916 9.97548 7.22088 10.0078 7.16773 10.0299C7.11458 10.0519 7.0576 10.0633 7.00005 10.0633C6.9425 10.0633 6.88552 10.0519 6.83237 10.0299C6.77922 10.0078 6.73094 9.97548 6.6903 9.93474L1.4403 4.68474C1.39956 4.6441 1.36723 4.59582 1.34518 4.54267C1.32312 4.48952 1.31177 4.43253 1.31177 4.37499C1.31177 4.31744 1.32312 4.26046 1.34518 4.20731C1.36723 4.15416 1.39956 4.10588 1.4403 4.06524Z" fill="white" />
                    </svg>
                  </div>
                </div>
                <div className={`absolute mt-[10px] overflow-hidden flex rounded-[24px] transition-all duration-300 cursor-pointer px-[18px] ${dropdown1 ? 'py-[14px] max-h-[154px]' : 'py-0 max-h-0'} bg-black w-full sm:w-[110px]`}>
                  <ul className='flex flex-col gap-[10px] overflow-y-auto w-full'>
                    {Object.keys(rates).map((rate, index) => (
                      <li onClick={() => {
                        setCurrency1(rate);
                        setDropdown1(false);
                      }} key={index} className='font-medium text-white70 transition-all duration-200 hover:text-white text-[16px]'>{rate}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <hr className='min-w-[18px] border-[1px] border-white50' />
              <div className='relative w-full'>
                <div onClick={() => setDropdown2(!dropdown2)} className='flex items-center justify-center rounded-[24px] cursor-pointer px-[18px] bg-black h-[48px] w-full sm:w-[110px]'>
                  <div className='flex items-center justify-between w-full'>
                    <span className='font-medium text-[16px]'>{currency2}</span>
                    <svg className={`transition-all duration-300 ${dropdown2 ? 'rotate-180' : null}`} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.4403 4.06524C1.48094 4.0245 1.52922 3.99217 1.58237 3.97011C1.63552 3.94806 1.6925 3.93671 1.75005 3.93671C1.8076 3.93671 1.86458 3.94806 1.91773 3.97011C1.97088 3.99217 2.01916 4.0245 2.0598 4.06524L7.00005 9.00636L11.9403 4.06524C11.981 4.02456 12.0293 3.99229 12.0824 3.97028C12.1356 3.94827 12.1925 3.93694 12.25 3.93694C12.3076 3.93694 12.3645 3.94827 12.4177 3.97028C12.4708 3.99229 12.5191 4.02456 12.5598 4.06524C12.6005 4.10592 12.6327 4.15421 12.6548 4.20735C12.6768 4.2605 12.6881 4.31746 12.6881 4.37499C12.6881 4.43251 12.6768 4.48948 12.6548 4.54262C12.6327 4.59577 12.6005 4.64406 12.5598 4.68474L7.3098 9.93474C7.26916 9.97548 7.22088 10.0078 7.16773 10.0299C7.11458 10.0519 7.0576 10.0633 7.00005 10.0633C6.9425 10.0633 6.88552 10.0519 6.83237 10.0299C6.77922 10.0078 6.73094 9.97548 6.6903 9.93474L1.4403 4.68474C1.39956 4.6441 1.36723 4.59582 1.34518 4.54267C1.32312 4.48952 1.31177 4.43253 1.31177 4.37499C1.31177 4.31744 1.32312 4.26046 1.34518 4.20731C1.36723 4.15416 1.39956 4.10588 1.4403 4.06524Z" fill="white" />
                    </svg>
                  </div>
                </div>
                <div className={`absolute mt-[10px] overflow-hidden flex rounded-[24px] transition-all duration-300 cursor-pointer px-[18px] ${dropdown2 ? 'py-[14px] max-h-[154px]' : 'py-0 max-h-0'} bg-black w-full sm:w-[110px]`}>
                  <ul className='flex flex-col gap-[10px] overflow-y-auto w-full'>
                    {Object.keys(rates).map((rate, index) => (
                      <li key={index} onClick={() => {
                        setCurrency2(rate);
                        setDropdown2(false);
                      }} className='font-medium text-white70 transition-all duration-200 hover:text-white text-[16px]'>{rate}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <button onClick={handleConvert} className='h-[48px] w-full rounded-[24px] bg-green text-[16px] font-bold text-black'>Dönüştür</button>
          </div>
          {result ? (
            <p className='font-bold break-all text-center text-[28px] sm:text-[32px]'><span className='text-green'>Sonuç:</span> {`${result} ${currency2}`}</p>
          ) : null
          }
        </div>
      </div>
    </div>
  );
}

export default App;
