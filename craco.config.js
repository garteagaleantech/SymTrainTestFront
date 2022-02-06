module.exports = {
  eslint: {
    enable: false
  },
  typescript: {
    enableTypeChecking: false
  },
  plugins: [
    {
      plugin: require('craco-alias'),
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.extend.json'
      }
    }
  ]
};
