const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getCurrencyData = async (fromCurrency, toCurrency, amount) => {
    try {
        const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=${fromCurrency}`);
        const rate = response.data.rates[toCurrency];
        console.log(`${amount} ${fromCurrency} is ${amount * rate} ${toCurrency}`);
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
    }
};

rl.question('Enter the currency to convert from (e.g., USD): ', (fromCurrency) => {
    rl.question('Enter the currency to convert to (e.g., EUR): ', (toCurrency) => {
        rl.question('Enter the amount to convert: ', (amount) => {
            getCurrencyData(fromCurrency.toUpperCase(), toCurrency.toUpperCase(), parseFloat(amount));
            rl.close();
        });
    });
});
