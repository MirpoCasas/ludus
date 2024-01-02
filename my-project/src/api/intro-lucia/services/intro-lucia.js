'use strict';

/**
 * intro-lucia service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::intro-lucia.intro-lucia');
