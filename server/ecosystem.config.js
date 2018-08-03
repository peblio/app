module.exports = {
  apps: [{
    name: 'server',
    script: 'run_with_credstash.sh',
    args: 'node server.js',
    env: {
      PORT: 8081,
      NODE_ENV: 'development',
      ENVIRONMENT: 'local',
    },
    env_staging: {
      PORT: 8080,
      NODE_ENV: 'production',
      ENVIRONMENT: 'staging'
    },
    env_production: {
      PORT: 8080,
      NODE_ENV: 'production',
      ENVIRONMENT: 'production'
    }
  }]
};
