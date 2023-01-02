import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});

global.afterAll(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
    console.log('test db file deleted');
  } catch (err) {
    console.log('unable to delete test db file');
  }
});
