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

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAY = 24 * 30 * 60 * 60 * 1000;

bootstrap();