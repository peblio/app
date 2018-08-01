module.exports = {
  apps : [{
    name      : 'server',
    script    : 'server.js',
    env: {
      PORT: 8081,
      NODE_ENV: 'development'
    },
    env_production : {
      PORT: 8080,
      NODE_ENV: 'production'
    }
  }]
};
