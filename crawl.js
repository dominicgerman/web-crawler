function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const newURLString = urlObj.hostname + urlObj.pathname;
  if (newURLString.length > 0 && newURLString.slice(-1) === '/') {
    return newURLString.slice(0, -1);
  }
  return newURLString;
}

module.exports = {
  normalizeURL,
};
