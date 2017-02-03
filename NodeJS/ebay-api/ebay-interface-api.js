/**
 * Created by grill on 30.01.2017.
 */
module.exports = (app) =>{
    var tunnel = require('tunnel');

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

    var options = {
        hostname: 'svcs.ebay.com',
        port: 443,
        agent: tunnelingAgent,
        path: '/',
        method: 'GET'
    };
    app.get('/api/ebay/search', function (req, res) {
        options.path = '/services/search/FindingService/v1' +
            '?SECURITY-APPNAME=Nicholas-Auchtion-PRD-dcd409a1e-09cb3c14&OPERATION-NAME=findItemsByKeywords&' +
            'SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&' +
            'REST-PAYLOAD&keywords=iPhone&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-US&siteid=0',
        var ret= "";
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

    app.get('/api/ebay/product', function (req, res) {
        options.hostname = 'open.api.ebay.com';
        options.path = `/shopping?
        callname=GetSingleItem&
        responseencoding=JSON&
        appid=YourAppIDHere&
        siteid=0&
        version=967&
        ItemID=180126682091`;
        var ret= "";
        var httpsReq = https.request(options, (httpRes) => {
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

        httpsReq.on('error', (e) => {
            console.error(e);
        res.send(e);
    });
        httpsReq.end();
    });

    const https = require('https');

}