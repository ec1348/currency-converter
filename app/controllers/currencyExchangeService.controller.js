// 靜態匯率資料
const currencies = { 
  "TWD": { "TWD": 1, "JPY": 3.669, "USD": 0.03281 }, 
  "JPY": { "TWD": 0.26956, "JPY": 1, "USD": 0.00885 }, 
  "USD": { "TWD": 30.444, "JPY": 111.801, "USD": 1 } 
};

// exchang rate service 類別 
class ExchangeRateService {
  constructor(currencies) {
    this.currencies = currencies
  }
  convert(source, target, amount) {
    //handle 若輸入的 source 或 target 系統並不提供時的案例
    if(!(source in this.currencies) || !(target in this.currencies[source])){
      throw new Error('Invalid source or target')
    } 
    //先將輸入的金額移除 ',' 
    amount = amount.replace(/,/g, '')
    //若輸入的金額為非數字或無法辨認時的案例
    if (!/^\d+(\.\d+)?$/.test(amount)) {
      throw new Error('Invalid amount')
    }
    //輸入的數字需四捨五入到小數點第二位，並請提供覆蓋有小數與沒有 小數的多種案例
    //若輸入的數字有小數點，四捨五入至第二位，若無則不變
    amount = (amount % 1 !== 0) ? parseFloat(amount).toFixed(2) : amount
    const rate = this.currencies[source][target]
    const total = parseFloat((amount * rate).toFixed(2)) //結果四捨五入至小數點第二位
    return total.toLocaleString('en-US') //使用內建函數每千位加上半形逗號
  }
}

//創建匯率轉換實例並DI靜態匯率
const exchangeRateService = new ExchangeRateService(currencies);

// 處理 GET 請求端點
exports.exchangeRate = async (req, res) => {
  const source = req.query.source;
  const target = req.query.target;
  const amount = req.query.amount;

  try {
    const convertedAmount = exchangeRateService.convert(source, target, amount);
    res.json({ msg: "success", amount: convertedAmount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};