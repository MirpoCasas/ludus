'use strict';

/**
 * produccion service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::produccion.produccion');
