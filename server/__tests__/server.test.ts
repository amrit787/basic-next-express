import request, { Request } from 'supertest';
import app from '../src/app';

test('get list of tests', async () => {
  const response = await request(app).get('/api');

  expect(response.body.success).toBe(true);
});
