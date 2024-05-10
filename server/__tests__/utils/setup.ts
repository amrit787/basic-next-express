/* istanbul ignore file */
import prisma from '../../src/lib/prisma';
import { beforeAll, beforeEach, afterAll } from '@jest/globals';

const setupTestDB = () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.test.deleteMany();
  });

  afterAll(async () => {
    await prisma.test.deleteMany();
    await prisma.$disconnect();
    // console.log('everythingd deleted')
  });
};

export default setupTestDB;
