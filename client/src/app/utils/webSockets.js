const serverUrl = process.env.SERVER_API_DOMAIN && process.env.SERVER_API_DOMAIN !== ''
  ? `wss://${process.env.SERVER_API_DOMAIN}`
  : 'ws://localhost:8081';
export default serverUrl;
