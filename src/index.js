import { initMongoDB } from './db/initMongoDB.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMongoDB();
  setupServer();
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

bootstrap();