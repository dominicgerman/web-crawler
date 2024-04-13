const { test, expect } = require('@jest/globals');
const { crawlPage, normalizeURL, getURLsFromHTML } = require('./crawl.js');

test('normalizeURL strip protocol', () => {
  const input = 'https://dominicgerman.com/about';
  const acutal = normalizeURL(input);
  const expected = 'dominicgerman.com/about';
  expect(acutal).toEqual(expected);
});

test('normalizeURL strip trailing slash', () => {
  const input = 'https://dominicgerman.com/about/';
  const acutal = normalizeURL(input);
  const expected = 'dominicgerman.com/about';
  expect(acutal).toEqual(expected);
});

test('normalizeURL capitals', () => {
  const input = 'https://DOMINICGERMAN.COM/about/';
  const acutal = normalizeURL(input);
  const expected = 'dominicgerman.com/about';
  expect(acutal).toEqual(expected);
});

test('getURLsFromHTML absolute', () => {
  const inputHTML = `
  <html>
    <body>
        <a href="https://dominicgerman.com/about"><span>Go to my website</span></a>
    </body>
  </html>
  `;
  const inputURL = 'https://dominicgerman.com/about';
  const acutal = getURLsFromHTML(inputHTML, inputURL);
  const expected = ['https://dominicgerman.com/about'];
  expect(acutal).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
  const inputHTML = `
  <html>
    <body>
        <a href="/about"><span>Go to my website</span></a>
    </body>
  </html>
  `;
  const inputURL = 'https://dominicgerman.com';
  const acutal = getURLsFromHTML(inputHTML, inputURL);
  const expected = ['https://dominicgerman.com/about'];
  expect(acutal).toEqual(expected);
});

test('getURLsFromHTML both relative and absolute', () => {
  const inputHTML = `
  <html>
    <body>
        <a href="/resume"><span>Go to my resume</span></a>
        <a href="https://dominicgerman.com/about"><span>Go to my website</span></a>
    </body>
  </html>
  `;
  const inputURL = 'https://dominicgerman.com';
  const acutal = getURLsFromHTML(inputHTML, inputURL);
  const expected = [
    'https://dominicgerman.com/resume',
    'https://dominicgerman.com/about',
  ];
  expect(acutal).toEqual(expected);
});

test('getURLsFromHTML invalid', () => {
  const inputHTML = `
  <html>
    <body>
        <a href="invalid"><span>An invalid URL</span></a>
    </body>
  </html>
  `;
  const inputURL = 'https://dominicgerman.com';
  const acutal = getURLsFromHTML(inputHTML, inputURL);
  const expected = [];
  expect(acutal).toEqual(expected);
});
