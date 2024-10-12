"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = {
    info: (message) => console.log(`INFO: ${message}`),
    error: (message) => console.error(`ERROR: ${message}`)
};
exports.default = logger;
