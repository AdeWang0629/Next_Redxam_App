module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn start',
      startServerReadyPattern:
        'ready - started server on 0.0.0.0:3000, url: http://localhost:3000',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/careers',
        'http://localhost:3000/about',
        'http://localhost:3000/blog'
      ],
      upload: {
        target: 'temporary-public-storage'
      }
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'uses-rel-preconnect': 'off',
        'unused-javascript': 'off',
        'tap-targets': 'warn',
        'errors-in-console': 'warn'
      }
    }
  }
};
