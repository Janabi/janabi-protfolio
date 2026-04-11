/**
 * @jest-environment node
 */

describe('absoluteUrl', () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = original;
    jest.resetModules();
  });

  it('joins base and path for GitHub Pages-style base path', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const { absoluteUrl: abs } = require('../lib/urls');
    expect(abs('/about')).toBe(
      'https://janabi.github.io/janabi-protfolio/about'
    );
    expect(abs('/')).toBe('https://janabi.github.io/janabi-protfolio');
  });

  it('respects NEXT_PUBLIC_SITE_URL when set', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com/sub';
    const { absoluteUrl: abs } = require('../lib/urls');
    expect(abs('/page')).toBe('https://example.com/sub/page');
  });
});
