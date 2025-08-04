const cache = {};

function set(key, value) {
  cache[key] = value;
}

function get(key) {
  return cache[key];
}

module.exports = { set, get };
