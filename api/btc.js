const fetch = require("node-fetch");

async function getInfo() {
    const response = await fetch('https://btc-trade.com.ua/api/ticker/btc_uah');
    const data = await response.json();
    return {
        currency_trade: data.btc_uah.currency_trade,
        currency_base: data.btc_uah.currency_base,
        buy: data.btc_uah.buy
    }
}

module.exports.getInfo = getInfo;