const serverUrl = process.env.SERVER_API_DOMAIN && process.env.SERVER_API_DOMAIN !== ''
  ? process.env.SERVER_API_DOMAIN
  : 'localhost:8081';
export default serverUrl;
