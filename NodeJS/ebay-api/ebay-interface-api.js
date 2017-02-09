/**
 * Created by grill on 30.01.2017.
 */
module.exports = (app) =>{
    var querystring = require('querystring');
    var tunnel = require('tunnel');
    var accessToken = 'v^1.1#i^1#r^0#p^3#I^3#f^0#t^H4sIAAAAAAAAAOVXa2wURRzvXl80WFBDUJSEy6II1r2bfdztdqUXrrTYIn3ItaRtwmNudrZd2Nu97OPaMwZqSUpMJNFG5ANomqjRkGhEIsVQUAm2xA98wMSQKPKhJSGgxEeMr4DOXh9cSyx9kNjE+zI3M//X7////WdnQGdB0ZPdVd2/FVOFvt5O0OmjKHYhKCrIL1mU63skPwdkCVC9nY915nXlXl1rw4SelDdjO2kaNvZ3JHTDljOLZbRrGbIJbc2WDZjAtuwgORat2SRzASAnLdMxkanT/uqKMpoDCkJhBKBQyrI8y5JVY8xmg1lGi3EcxiEpzIZDnCKoItm3bRdXG7YDDcfTZ0UGcAyQGlhe5oHMiwGRZ1to/xZs2ZppEJEAoCOZcOWMrpUV69ShQtvGlkOM0JHq6IZYXbS6orK2YW0wy1ZkNA8xBzquPXG23lSwfwvUXTy1GzsjLcdchLBt08HIiIeJRuXoWDCzCD+TaolXgSiAMC8KXJzF8J6kcoNpJaAzdRzeiqYwakZUxoajOem7ZZRkI74TI2d0VktMVFf4veE5F+qaqmGrjK4sjzY3xio30/5Yfb1lpjQFKx5Slud5SQK8REccbJMUYmu7oVkmAPyoqxF7o4me5Gu9aSialzbbX2s65ZjEjSdnh8vKDhGqM+qsqOp4MWXLhcayyPItXllH6ug6bYZXWZwgqfBnpnevwRgpbtPgXtGiFHFhXsIsVwqgisLqJFp4vT4rakS86kTr64M4DtNMAlq7sJPUIcIMIql1E9jSFFkQ4kIYIpXhOQkxghJCTGlpCDMc6fowB3kBqML/ix2OY2lx18HjDJm8kYFZRseQmcT1pq6hND1ZJHPmjPKhwy6j2xwnKQeD7e3tgXY+YFqtQQ4ANthUsymG2nCCnARjstrdhRktwwyEiZatyU46SaLpIMQjzo1WOsJbSj20nHS5mybzGNZ1MoyRd0KEkcmr/wLV9qDOL5Cevk0MwKQW8PgdQGYiaELSy97S9kzE/ukIBeNumvhXsBWwMFRMQ09PX6/VJfwd0Z6ekk2qERhpRQLjDo9er8/EwAycakaKcNm00jOEOVF5BjoQIdM1nNm4G1WdgYbq6qqm6167zsZhlvpMwjSgnnY0ZI+7nFOXRZPJamV+dVmthtpMHdpM1EVt3pnLxMqbGKAAHBJDiGcEIQQFQYVzwq3glIbwdm2eYTdcXZ8TrprWKSGRXj/0X5Q0GJ0Tqgqcmm8sZRFWOChKjDcwAitgBiJRYLAq4lIuJMQVxM0J83pdIydDQ3q+fQSrTNvBytygkZvo/ALlnTBjBwzHSRLDS2GOEcKiSm6mgkT+qfHpQp60kHWlu+MuH5z4nI7kZH5sF3UKdFGfkBc5EAHDloA1BbmNebn30bbm4IANDSVudgQ0qAZsrdUgr0ULB3bhdBJqlq+Aqhl6uXlP1kO+dyt4ePwpX5TLLsx614Plt3fy2cUPFbMi4IBELsuAF1vAytu7eezSvCXL+KXvdVV+2v/mscJeuO1Wr3q2IgWKx4UoKj8nr4vKuf/EwYFBc8jXu//P1MWfXn368Lkzj74efndr9OdLprBs2+ljQ01fbHqntqfq90OLB5P+1dH+M9frXxnet+OS3LqIevvwqXbfqr/3lyNmZ+GGjU81n/T5owf7Sj/e9+yDDaku33Dni917dxdePjr4/uM39qxsqer6/MjNbz5rLN77QDrwQ8/N09dyN/LdywZunV0yQFFmS49act7X99cz6348/+WV4RMfXFh+7rs96UTopfCB/F8vrxiu7DtafWjFW6vX6P4r6MDxviekK/Jrfd/nH3vhGvz6+sn2G807+qrydvffyF97ddWHRd8e+WMblffR8xf2vUENDzSVtH+1c8GCRmlpz7ra44MNF+uGfukfKeM/VDIJqmIRAAA='
    var tunnelingAgent = tunnel.httpsOverHttp({
        maxSockets: 50, // Defaults to 5

        proxy: { // Proxy settings
            host: '192.168.51.8', // Defaults to 'localhost'
            port: 3128, // Defaults to 80

            // Basic authorization for proxy server if necessary
            proxyAuth: 'dev:perf0110',

            // Header fields for proxy server if necessary
        }
    });
    var tunnelingAgentHTTP = tunnel.httpOverHttp({
        maxSockets: 50, // Defaults to 5

        proxy: { // Proxy settings
            host: '192.168.51.8', // Defaults to 'localhost'
            port: 3128, // Defaults to 80

            // Basic authorization for proxy server if necessary
            proxyAuth: 'dev:perf0110',

            // Header fields for proxy server if necessary
        }
    });



    var optionsHTTP = {
        hostname : 'open.api.sandbox.ebay.com',
        agent : tunnelingAgentHTTP,
        port : 80
    }
    app.get('/api/ebay/search/:id', function (req, res) {
        let options = {
            hostname: 'svcs.sandbox.ebay.com',
            port: 443,
            agent: tunnelingAgent,
            path: '/services/search/FindingService/v1' +
            '?SECURITY-APPNAME=Nicholas-Auchtion-SBX-0d0e575c3-445a44fa&OPERATION-NAME=findItemsByKeywords&' +
            'SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&' +
            'REST-PAYLOAD&keywords='+req.params.id+'&paginationInput.entriesPerPage=20&GLOBAL-ID=EBAY-US&siteid=0',
            method: 'GET'
        };
        let ret= "";
        var httpsReq = https.request(options, (httpRes) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            httpRes.on('data', (d) => {
                ret += d;
                console.log(d);
                console.log("Got data from ebay search!")
            });
            httpRes.on('end', () => {
                console.log("End of HTTPS SESSION!")
            res.send(ret);
    });
        });

        httpsReq.on('error', (e) => {
            console.error(e);
            res.send(e);
        });
        httpsReq.end();
    });

    app.get('/api/ebay/product/:id', function (req, res) {
        console.log("getting product details...");
        console.log(req.params.id);
        optionsHTTP.path = `/shopping?callname=GetSingleItem&responseencoding=JSON&appid=Nicholas-Auchtion-PRD-dcd409a1e-09cb3c14&siteid=0&version=967&ItemID=`+req.params.id;
        let ret= "";
        let httpReq = httpTun.get(optionsHTTP, (httpRes) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            httpRes.on('data', (d) => {
                ret += d;
            console.log(d);
            console.log("Got data from ebay get item!")
            });
            httpRes.on('end', () => {
                console.log("End of HTTPS SESSION!")
            res.send(ret);
            });
        });

        httpReq.on('error', (e) => {
            console.error(e);
        res.send(e);
        });
        httpReq.end();
    });

    app.get('/api/ebay/buy/search/:id', function (req, res) {
        let options = {
            hostname: 'api.sandbox.ebay.com',
            port: 443,
            agent: tunnelingAgent,
            path: 'buy/browse/v1/item_summary/search?q='+req.params.id,
            method: 'GET',
            headers: {
                Authorization:'Bearer '+ accessToken,
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        };
        let ret= "";
        var httpsReq = https.request(options, (httpRes) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            httpRes.on('data', (d) => {
                ret += d;
                console.log(d);
                console.log("Got data from ebay search!")
            });
            httpRes.on('end', () => {
                console.log("End of HTTPS SESSION!")
                res.send(ret);
            });
        });

        httpsReq.on('error', (e) => {
            console.error(e);
            res.send(e);
        });
        httpsReq.end();
    });

    app.get('/api/ebay/buy/get/item/:id', function (req, res) {
        let options = {
            hostname: 'api.sandbox.ebay.com',
            port: 443,
            agent: tunnelingAgent,
            path: '/buy/browse/v1/item/'+req.params.id,
            method: 'GET',
            headers: {
                Authorization:'Bearer '+ accessToken,
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        };
        let ret= "";
        let httpsReq = https.request(options, (httpRes) => {
            httpRes.on('data', (d) => {
                ret += d;
            });
            httpRes.on('end', () => {
                res.send(ret);
            });
        });
        httpsReq.on('error', (e) => {
            console.error(e);
            res.send(e);
        });
        httpsReq.end();
    });

    app.get('/api/ebay/accesstoken/:code', function (req, res) {
        console.log("getting access token...");

        let code = encodeURIComponent(req.params.code);
        var post_data = querystring.stringify({
            'grant_type' : 'authorization_code',
            'code': code,
            'redirect_uri': 'Nicholas_Grill-Nicholas-Auchti-rydextmr',
        });
        console.log(code);
        options.method = 'POST';
        options.hostname = `api.sandbox.ebay.com`;
        options.path = `/identity/v1/oauth2/token`;
        options.headers = {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization': 'Basic TmljaG9sYXMtQXVjaHRpb24tU0JYLTBkMGU1NzVjMy00NDVhNDRmYTpTQlgtZDBlNTc1YzMyMjg4LTM4NjItNDY3Zi05OTQ4LTQ2ZmI='
        };

        let ret= "";
        let httpsReq = https.request(options, (httpsRes) => {
            console.log('statusCode:', httpsRes.statusCode);
            console.log('headers:', httpsRes.headers);

            httpsRes.on('data', (d) => {
                ret += d;
                console.log(d);
                console.log("Got data from ebay get item!")
            });
            httpsRes.on('end', () => {
                console.log("End of HTTPS SESSION!")
                res.send(ret);
            });
        });

        httpsReq.on('error', (e) => {
            console.error(e);
            res.send(e);
        });
        httpsReq.write(post_data);
        httpsReq.end();
    });


}