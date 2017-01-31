/**
 * Created by grill on 30.01.2017.
 */
module.exports = (app) =>{
    const https = require("https");
    app.get('/api/ebay/search', function (req, res) {

        https.get('https://encrypted.google.com/', (res) => {
            console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            process.stdout.write(d);
        });

        }).on('error', (e) => {
                console.error(e);
        });
    });
}