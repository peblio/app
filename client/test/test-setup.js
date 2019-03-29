require('babel-register')({
    plugins: ['babel-plugin-rewire']
  })
  require.extensions['.svg'] = () => null;