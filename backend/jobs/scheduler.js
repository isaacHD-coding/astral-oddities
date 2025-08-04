const cron = require('node-cron');
const cache = require('../cache');

const NASA_API_KEY = process.env.NASA_API_KEY || 'YOUR_KEY';

async function fetchAsteroidData() {
  try {
    const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${NASA_API_KEY}`);
    const data = await res.json();
    cache.set('asteroidData', data);
  } catch (err) {
    console.error('Failed to fetch asteroid data:', err);
  }
}

async function fetchSpaceWeather() {
  try {
    const res = await fetch(`https://api.nasa.gov/DONKI/alerts?api_key=${NASA_API_KEY}`);
    const data = await res.json();
    cache.set('spaceWeatherAlerts', data);
  } catch (err) {
    console.error('Failed to fetch space weather alerts:', err);
  }
}

async function fetchLaunches() {
  try {
    const res = await fetch('https://api.spacexdata.com/v5/launches/upcoming');
    const data = await res.json();
    cache.set('upcomingLaunches', data);
  } catch (err) {
    console.error('Failed to fetch launch data:', err);
  }
}

// Schedule jobs
cron.schedule('0 */2 * * *', fetchAsteroidData); // every 2 hours
cron.schedule('0 * * * *', fetchSpaceWeather); // hourly
cron.schedule('0 */12 * * *', fetchLaunches); // twice daily

module.exports = {
  fetchAsteroidData,
  fetchSpaceWeather,
  fetchLaunches
};
