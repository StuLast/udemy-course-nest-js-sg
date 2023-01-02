import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should handle a signup request', async () => {
    const payload = { email: 'test2@test2.com', password: 'password' };
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(payload)
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(payload.email);
      });
  });

  it('should signup as a new user then get currently logged in user', async () => {
    const payload = { email: 'test3@test3.com', password: 'password' };

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(payload)
      .expect(201);

    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(payload.email);
  });
});
