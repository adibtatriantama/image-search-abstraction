import 'reflect-metadata';
import {Application} from 'express';
import request from 'supertest';
import {bootstrap} from '../src/bootstrap';
import {PrismaClient} from '@prisma/client';
import {TYPES} from '../src/types';

describe('app', () => {
  let server: Application;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    const ref = await bootstrap();

    server = ref.server;
    prismaClient = ref.container.get<PrismaClient>(TYPES.PrismaClient);
  });

  describe('GET /query', () => {
    it('should return statusCode 200', async () => {
      const res = await request(server).get('/query/cat?page=3');

      expect(res.statusCode).toBe(200);
    });

    it('should return images', async () => {
      const res = await request(server).get('/query/cat');

      expect(res.body.images.length).toBeGreaterThan(1);
    });
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });
});
