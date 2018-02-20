const fs = require('fs');
const path = require('path');
const Blocker = require('ad-block');

const client = new Blocker.AdBlockClient();
module.exports.client = client;

const file = path.resolve(__dirname, 'detector.buffer');
module.exports.initialize = () => new Promise((resolve, reject) => {
  fs.readFile(file, (err, buffer) => {
    if (err) { return reject(err); }
    client.deserialize(buffer);
    return resolve();
  });
});

const none = Blocker.FilterOptions.noFilterOption;
const isAd = (req, base) => client.matches(req, none, base);
module.exports.containsAd = (req, base) => isAd(req, base);
module.exports.isAd = isAd;
