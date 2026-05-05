import test from 'node:test';
import assert from 'node:assert/strict';
import { registerSchema, searchReportsSchema, adminReportsQuerySchema } from '../src/schemas/validation.schemas.js';

test('register schema rejects role from untrusted payload', () => {
  assert.throws(
    () => registerSchema.parse({
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      role: 'ADMIN'
    }),
    /unrecognized key/i
  );
});

test('search schema enforces pagination bounds', () => {
  const parsed = searchReportsSchema.parse({ page: '2', limit: '25' });
  assert.equal(parsed.page, 2);
  assert.equal(parsed.limit, 25);

  assert.throws(() => searchReportsSchema.parse({ page: '0', limit: '10' }));
  assert.throws(() => searchReportsSchema.parse({ page: '1', limit: '101' }));
});

test('admin query schema accepts valid status and rejects invalid values', () => {
  const parsed = adminReportsQuerySchema.parse({ status: 'PENDING' });
  assert.equal(parsed.status, 'PENDING');
  assert.equal(parsed.page, 1);
  assert.equal(parsed.limit, 10);

  assert.throws(() => adminReportsQuerySchema.parse({ status: 'UNKNOWN' }));
});
