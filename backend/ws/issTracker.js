const API_URL = 'http://api.open-notify.org/iss-now.json';

/**
 * Starts polling the ISS location and broadcasts updates to clients.
 * @param {import('socket.io').Server} io Socket.IO server instance
 */
function startIssTracker(io) {
  if (!io) return;

  const poll = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`Status ${res.status}`);
      }
      const data = await res.json();
      const { latitude: lat, longitude: lon } = data.iss_position || {};
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);
      if (!Number.isNaN(latitude) && !Number.isNaN(longitude)) {
        io.emit('iss-position', { latitude, longitude });
      }
    } catch (err) {
      console.error('Failed to fetch ISS position:', err.message);
    }
  };

  // Fetch immediately, then every 5 seconds
  poll();
  setInterval(poll, 5000);
}

module.exports = startIssTracker;
