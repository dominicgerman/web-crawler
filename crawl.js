const { JSDOM } = require('jsdom');

async function crawlPage(currentURL) {
  console.log(`actively crawling: ${currentURL}`);

  try {
    const res = await fetch(currentURL);
    const contentType = res.headers.get('content-type');

    if (res.status > 399) {
      console.log(
        `error in fetch with status code: ${res.status} on page: ${currentURL}`
      );
    }

    if (!contentType.includes('text/html')) {
      console.log(`non-HTML response: content type was ${contentType}`);
      return;
    }

    return await res.text();
  } catch (error) {
    console.log('There was an error:', error.message);
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const urlObjects = Array.from(dom.window.document.querySelectorAll('a'));
  const arrayOfURLs = urlObjects.map((el) => {
    try {
      if (el.href.startsWith('/')) {
        const url = new URL(`${baseURL}${el.href}`);
        return url.href;
      }
      const url = new URL(el.href);
      return url.href;
    } catch (err) {
      console.log('Error from getURLsFromHTML:', err.message);
    }
  });
  return arrayOfURLs;
}

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
  getURLsFromHTML,
  crawlPage,
};
