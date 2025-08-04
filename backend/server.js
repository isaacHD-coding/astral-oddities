const express = require('express');
const { getISSPosition } = require('./services/issService');

const app = express();

app.get('/api/iss', async (req, res) => {
  try {
    const data = await getISSPosition();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ISS data' });
  }
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
