import 'reflect-metadata';

import express from 'express';

async function startServer() {
  const app = express();

  app.listen(4000, (err?: any) => {
    if (err) {
      console.log(err);
      process.exit(1);
      return;
    }
    console.log(`
      ################################################
      ⚛️  Server listening on port: ${4000}    ⚛️
      ################################################
    `);
  });
}

startServer();
