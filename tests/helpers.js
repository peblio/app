import { ClientFunction } from 'testcafe';
import config from './config';

export * from '../server/testUtils';

/* global baseUrl */
export const login = ClientFunction((email, password) => window.fetch(`${baseUrl}/api/users/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: email,
    password: password
  })
}), {
  dependencies: {
    baseUrl: config.baseUrl
  },
});
