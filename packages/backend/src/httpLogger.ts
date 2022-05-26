const morgan = require('morgan');
const json = require('morgan-json');
const format = json({
  method: ':method',
  url: ':url',
  status: ':status',
  contentLength: ':res[content-length]',
  remoteAddress: ':remote-addr',
  responseTime: ':response-time'
});

const wistonLoger = require('./logger');
const httpLogger = morgan(format, {
  stream: {
    write: message => {
      const {
        method,
        url,
        status,
        contentLength,
        remoteAddress,
        responseTime
      } = JSON.parse(message);

      wistonLoger.info('HTTP Access Log', {
        timestamp: new Date().toString(),
        method,
        url,
        status: Number(status),
        contentLength,
        remoteAddress,
        responseTime: Number(responseTime)
      });
    }
  }
});

module.exports = httpLogger;
