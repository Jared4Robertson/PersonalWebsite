const api = require('binance');

const binanceWS = new api.BinanceWS(true); // Argument specifies whether the responses should be beautified, defaults to true

binanceWS.onDepthUpdate('BNBBTC', (data) => {
    console.log(data);

});