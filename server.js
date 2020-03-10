const http = require('http');
const url = require('url');

http.createServer(function (request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Access-Control-Allow-Headers', '*');
    console.log('request ', request.url);
    const query = url.parse(request.url, true).query;
    if (request.url.includes('/getEMIPaymentDetails')) {
        if (!query.principal || query.principal <= 0) {
            response.write(JSON.stringify({ statusMessage: 'Invalid principal amount' }));
            response.end();
            return;
        }
        if (!query.roi || query.roi <= 0) {
            response.write(JSON.stringify({ statusMessage: 'Invalid rate of interest' }));
            response.end();
            return;
        }
        if (!query.timePeriod || query.timePeriod <= 0) {
            response.write(JSON.stringify({ statusMessage: 'Invalid time period' }));
            response.end();
            return;
        }
        let payments = new Array();

        let roi = +((parseFloat(query.roi) / 100)) / 12;
        for (let index = 1; index <= parseInt(query.timePeriod); index++) {
            let paymentAmount = (roi * parseFloat(query.principal)) * Math.pow((1 + roi), parseFloat(query.timePeriod)) / (Math.pow((1 + roi), parseFloat(query.timePeriod)) - 1);
            let principalAmount = paymentAmount * Math.pow((1 + roi), -(1 + parseFloat(query.timePeriod) - index));
            let intrestAmount = paymentAmount - principalAmount;
            let outstanding = (intrestAmount / roi) - principalAmount;
            payments.push({
                paymentAmount,
                principalAmount,
                intrestAmount,
                outstanding
            })
        }
        response.write(JSON.stringify(payments));
        response.end();
        return;
    }
}).listen(4000);