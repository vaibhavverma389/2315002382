const axios = require('axios');

const VALID_STACKS = new Set(['backend', 'frontend']);
const VALID_LEVELS = new Set(['debug', 'info', 'warn', 'error', 'fatal']);
const VALID_PACKAGES = new Set([
    'cache', 'controller', 'cron_job', 'db', 'domain', 'handler', 'repository', 'route', 'service', // Backend
    'api', 'component', 'hook', 'page', 'state', 'style',                                          // Frontend
    'auth', 'config', 'middleware', 'utils'                                                         // Shared
]);

const LOG_API_URL = "http://4.224.186.213/evaluation-service/logs";

/**
 * Reusable Log function that validates schemas and sends data to the Test Server.
 * @param {string} stack - 'backend' or 'frontend'
 * @param {string} level - 'debug', 'info', 'warn', 'error', 'fatal'
 * @param {string} pkg - The localized package domain context 
 * @param {string} message - Descriptive log narrative text
 * @param {string} token - Bearer JWT Access Token for Authentication
 */
async function Log(stack, level, pkg, message, token) {
    
    const normalizedStack = String(stack).toLowerCase();
    const normalizedLevel = String(level).toLowerCase();
    const normalizedPkg = String(pkg).toLowerCase();

    
    if (!VALID_STACKS.has(normalizedStack)) {
        console.error(`❌ Logging Error: Invalid stack [${stack}]. Must be 'backend' or 'frontend'.`);
        return null;
    }
    if (!VALID_LEVELS.has(normalizedLevel)) {
        console.error(`❌ Logging Error: Invalid  [${level}].`);
        return null;
    }
    if (!VALID_PACKAGES.has(normalizedPkg)) {
        console.error(`❌ Logging Error: Invalid package  [${pkg}].`);
        return null;
    }
    const payload = {
        stack: normalizedStack,
        level: normalizedLevel,
        package: normalizedPkg,
        message: message
    };

    try {
        const response = await axios.post(LOG_API_URL, payload, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(` [Remote Log Sent Successfully] ID: ${response.data.logID} | Message: "${message}"`);
        return response.data;
    } catch (error) {
        console.error("❌ Failed to push event telemetry to remote logging server:", 
            error.response ? error.response.data : error.message
        );
        return null;
    }
}

module.exports = { Log };