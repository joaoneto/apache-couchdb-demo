var agentkeepalive = require('agentkeepalive');
var agent = new agentkeepalive({ maxSockets: 30, maxKeepAliveRequests: 1000000, maxKeepAliveTime: 1000000 });
var nano = require('nano')({ url: 'http://localhost:5984', requestDefaults: { agent : agent } });

module.exports = nano;