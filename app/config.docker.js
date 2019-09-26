'use strict';

module.exports = {
    GUS_API_KEY: process.env.GUS_API_KEY,
    PRODUCTION: process.env.NODE_ENV === 'production'
}