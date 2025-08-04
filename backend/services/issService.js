const axios = require('axios');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 5 }); // cache for 5 seconds
const CACHE_KEY = 'iss-data';

async function getISSPosition() {
  const cached = cache.get(CACHE_KEY);
  if (cached) {
    return cached;
  }
  const response = await axios.get('http://api.open-notify.org/iss-now.json');
  cache.set(CACHE_KEY, response.data);
  return response.data;
}

module.exports = { getISSPosition };
