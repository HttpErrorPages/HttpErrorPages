const _express = require('./express');
const _koa = require('./koa');

// framework specific error-handler
module.exports = {
    koa: _koa,
    express: _express
};