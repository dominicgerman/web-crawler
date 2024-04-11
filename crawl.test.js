const { test, expect } = require('@jest/globals');
const { normalizeURL } = require('./crawl.js');

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
